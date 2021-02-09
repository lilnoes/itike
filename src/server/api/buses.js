const _ = require("lodash")
const mongoose = require("mongoose")
const User = require("../../models/User.js")
const Bus = require("../../models/Bus.js")
const utils = require("../api/utils.js")


const router = require("express").Router()

router.get("/buses", async(req, res)=>{
    try{
        utils.getDefaultConnection();
        console.log("session", req.session.id, "cookies", res.cookies);
        let from = _.defaultTo(req.query.from, "Kigali");
        let to = _.defaultTo(req.query.to, "Muhanga");
        let date = new Date(_.defaultTo(_.parseInt(req.query.date), Date.now()))
        // console.log(date, req.query.date);
        const buses = await Bus.find({from: from, to: to, date: {$gte: date}}).limit(10).sort("date").exec()
        // const buses = await Bus.find({from: from, to: to}).limit(10).exec();
        // console.log(buses);
        res.send(buses);
    }catch(e){console.log("error"); res.sendStatus(404);}
    // res.sendStatus(404);
})




// router.get("/generate", async (req, res) => {
//     try {
//         utils.getDefaultConnection();
//         const gen = utils.generate(100, 2);
//         res.send(200);
//         for await (const bus of gen) {
//             let newbus = new Bus();
//             newbus.from = bus.from;
//             newbus.to = bus.to;
//             newbus.date = bus.datetime;
//             newbus.plaka = bus.plaka;
//             newbus.type = bus.type;
//             newbus.save()
//         }
//         console.log("finished");
//     } catch (e) { console.log("error", e);}

// })

module.exports = router