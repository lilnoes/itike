const router = require("express").Router()
const mongoose = require("mongoose")
const User = require("../../models/User.js")
const utils = require("../api/utils.js")

router.get("/new", async (req, res)=>{
    console.log(utils)
    await utils.getDefaultConnection();
    res.send("duh");
})

router.get("/login", async(req, res)=>{
    req.session.user = true
    res.send(true)

})

router.get("/logout", async(req, res)=>{
    req.session.user = false
    res.send(true)

})

router.get("/status", async(req, res)=>{
    let status = req.session.user || false
    res.send(status)

})

module.exports = router