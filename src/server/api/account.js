const _ = require("lodash")
const mongoose = require("mongoose")
const User = require("../../models/User.js")
const utils = require("../api/utils.js")

const router = require("express").Router()

router.get("/new", async (req, res)=>{
    console.log(utils)
    await utils.getDefaultConnection();
    res.send("duh");
})

router.post("/register", async(req, res)=>{
    try{
        await utils.getDefaultConnection();
        const email = _.defaultTo(req.body.email, "email");
        const password = _.defaultTo(req.body.password, "password");
        const username = _.defaultTo(req.body.username, "username");
        
        let user = await User.findOne({email: email})
        if(user) return res.send({code: 410, text: "imeli yarafashwe"})

        user = await User.findOne({username: username})
        if(user) return res.send({code: 411, text: " akazina karafashwe"})

        user = User();
        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        return res.send({code: 200, text: "byakunze"})

    }
    catch(e){console.log("error", e)}
    // req.session.user = true
    res.send({code: 403, text: "habaye ikibazo"})

})

router.post("/login", async(req, res)=>{
    try{
        await utils.getDefaultConnection();
        const username = _.defaultTo(req.body.username, "username");
        const password = _.defaultTo(req.body.password, "password");
        const user = await User.findOne({username: username})
        if(!user) return res.status(403).send({code: 403, text: "akazina n'ijambo banga ntibihura!"})
        if(user.password != req.body.password) return res.status(403).send({code: 403, text: "akazina n'ijambo banga ntibihura!"})
        req.session.user = user
        return res.status(200).send({code: 200, text: "success"});
    }
    catch(e){console.log(e)}
    // req.session.user = true
    return res.status(500).send({code: 500, text: "mwongere mugerageze!"})

})

router.post("/logout", async(req, res)=>{
    req.session.user = false
    res.send(true)

})

router.get("/status", async(req, res)=>{
    let status = req.session.user || false
    res.send(status)

})

module.exports = router