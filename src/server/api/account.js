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
        const user = await User.findOne({username: _.defaultTo(req.body.username, "username")})
        console.log(user)
        if(_.isNull(user)) return res.send(404)
        if(user.password != req.body.password) return res.send(404)
        req.session.user = user
        console.log("success", user)
    }
    catch(e){console.log(e)}
    // req.session.user = true
    res.send(true)

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