const _ = require("lodash")
const mongoose = require("mongoose")
const User = require("../../models/User.js")
const Bus = require("../../models/Bus.js")
const Ticket = require("../../models/Ticket.js")
const utils = require("../api/utils.js")
const Bull = require("bull")
const QRCode = require("qrcode")


const deleteTicketsQueue = new Bull("Tickets Queue Delete");
const freeTicketsQueue = new Bull("Tickets Queue Free");

freeTicketsQueue.process(async (job) => {
    try {
        await utils.getDefaultConnection();
        const ticket = await Ticket.findOne({ _id: job.data.id, deleted: false }).populate("bus")
        ticket.deleted = true;
        deleteTicketsQueue.add({id: ticket._id}, {delay: 30 * 60 * 1000})
        const bus = ticket.bus;
        bus.available_places = bus.available_places>= bus.max_places-bus.taken_places ? bus.max_places-bus.taken_places: bus.available_places+1;;
        bus.pending_places -= 1
        ticket.save();
        bus.save()
        console.log("finished freeing job", job.data);
    } catch (e) { console.log("failed freeing job", job.data); }
})

deleteTicketsQueue.process(async (job) => {
    try {
        await utils.getDefaultConnection();
        Ticket.deleteOne({ _id: job.data.id })
        console.log("finished deleting job", job.data);
    } catch (e) { console.log("failed deleting job", job.data); }
})
const router = require("express").Router()

router.post("/initialticket", async (req, res) => {
    try {
        utils.getDefaultConnection();
        const bus = await Bus.findOne({ _id: req.body.bus_id })
        if (!bus) return res.status(413).send({ code: 413, text: "bus not found" })
        if (bus.available_places == 0) return res.status(414).send({ code: 414, text: "bus is full" })
        const tickets = await Ticket.find({ session_id: req.session.id, deleted: false })
        for (const ticket of tickets) {
            freeTicketsQueue.add({ id: ticket._id }, { delay: 1000 })
        }
        const ticket = new Ticket();
        ticket.bus = bus._id
        ticket.session_id = req.session.id
        freeTicketsQueue.add({ id: ticket._id }, { delay: 16 * 60 * 1000 })
        bus.available_places -= 1;
        bus.pending_places += 1;
        ticket.save();
        bus.save()
        return res.status(200).send({ code: 200, text: "bus ready to be taken" });
    } catch (e) { return res.status(500).send({ code: 500, text: "try again" }); }
})

router.get("/existingticket", async (req, res) => {
    try {
        utils.getDefaultConnection();
        const tickets = await Ticket.find({ "session_id": req.session.id, deleted: false }).populate("bus")
        let existing = null;
        for (const ticket of tickets) {
            if (new Date(ticket.started).getTime() + 15 * 60 * 1000 <= Date.now()) {
                freeTicketsQueue.add({ id: ticket._id }, { delay: 1000 });
            }
            else existing = ticket;
        }
        if(existing) return res.status(200).send({code: 200, ticket: existing})
        else return res.status(415).send({code: 415, ticket: existing})
    } catch (e) {console.log("error occured", e); return res.status(500).send({code: 500, text: "try again"})}
})

router.post("/free", async(req, res)=>{
    console.log("turned back");
    res.send("OK");
})

module.exports = router