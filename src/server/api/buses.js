const _ = require("lodash")
const mongoose = require("mongoose")
const User = require("../../models/User.js")
const Bus = require("../../models/Bus.js")
const utils = require("../api/utils.js")


const router = require("express").Router()

router.post("/buses", async(req, res)=>{
    try{
        utils.getDefaultConnection();
        let from = _.defaultTo(req.body.from, "Kigali");
        let to = _.defaultTo(req.body.to, "Muhanga");
        // let date = new Date(_.defaultTo(_.parseInt(req.query.date), Date.now()))
        let date = new Date(req.body.date)
        if(isNaN(date)) date = new Date(_.defaultTo(_.parseInt(req.body.date), Date.now()));
        const buses = await Bus.find({from: from, to: to, date: {$gte: date}}).limit(10).sort("date").exec()
        // const buses = await Bus.find({from: from, to: to}).limit(10).exec();
        res.send(buses);
    }catch(e){console.log("error", e); res.sendStatus(404);}
    // res.sendStatus(404);
})




// router.get("/generate", async (req, res) => {
//     try {
//         utils.getDefaultConnection();
//         const gen = utils.generate(100, 7);
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