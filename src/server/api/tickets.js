const _ = require("lodash")
const mongoose = require("mongoose")
const User = require("../../models/User.js")
const Bus = require("../../models/Bus.js")
const Ticket = require("../../models/Ticket.js")
const utils = require("../api/utils.js")
const Bull = require("bull")
const QRCode = require("qrcode")


const deleteTicketsQueue = new Bull("Tickets Queue");
const freeTicketsQueue = new Bull("Tickets Queue");

freeTicketsQueue.process(async (job) => {
    await utils.getDefaultConnection();
    console.log("running job free", job.data);
    const ticket = await Ticket.findOne({ _id: job.data.id }).populate("bus")
    const bus = ticket.bus;
    bus.available_places += 1
    bus.pending_places -= 1
    bus.save()
    // const
})

deleteTicketsQueue.process(async (job) => {
    await utils.getDefaultConnection();
    console.log("running job delete", job.data);
    Ticket.deleteOne({ _id: job.data.id })
})
const router = require("express").Router()

router.post("/initialticket", async (req, res) => {
    try {
        utils.getDefaultConnection();
        const tickets = await Ticket.find({ session_id: req.session.id, deleted: false })
        for (const ticket of tickets) {
            ticket.deleted = true;
            ticket.save()
            deleteTicketsQueue.add({ id: ticket._id }, { delay: 60 * 60 * 1000 })
            freeTicketsQueue.add({ id: ticket._id }, { delay: 1000 })
        }
        const bus = await Bus.findOne({ _id: req.body.bus_id })
        console.log("bus", bus);
        const ticket = new Ticket();
        ticket.bus = bus._id
        ticket.session_id = req.session.id
        freeTicketsQueue.add({ id: ticket._id }, { delay: 16 * 60 * 1000 })
        deleteTicketsQueue.add({ id: ticket._id }, { delay: 60 * 60 * 1000 })
        await ticket.save();
        bus.available_places -= 1;
        bus.pending_places += 1;
        bus.save()
        res.sendStatus(200);
    } catch (e) { console.log("error", e); res.sendStatus(404); }
    // res.sendStatus(404);
})

router.get("/existingticket", async (req, res) => {
    try {
        utils.getDefaultConnection();
        const ticket = await Ticket.findOne({ "session_id": req.session.id, deleted: false }).populate("bus")
        console.log("time", new Date(ticket.started).getTime());
        if (new Date(ticket.started).getTime() + 15 * 60 * 1000 <= Date.now()) {
            ticket.delete();
            ticket.save();
            return res.send({ ticket: null });
        }
        const s = await QRCode.toString("emma", {type: "svg"})
        console.log("qrcode", s);
        res.send({ ticket: ticket });
    } catch (e) { console.log("error", e); res.sendStatus(404); }
    // res.sendStatus(404);
})

module.exports = router