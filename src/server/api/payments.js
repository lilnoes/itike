const _ = require("lodash")
const mongoose = require("mongoose")
const utils = require("../api/utils.js")


const test_key = process.env.STRIPE_TEST_KEY

const stripe = require("stripe")(test_key)
const router = require("express").Router()

router.post("/checkout", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://itike.com/api/payments/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://itike.com/api/payments/cancel",
        line_items: [{
            price_data: {
                currency: "rwf",
                unit_amount: 2000,
                product_data: {
                    name: "ticket from Gasabo to Kigali - Volcano - 17/02/2021 20:00"
                }
            },
            quantity: 1,
        }],

    })
    console.log("stripe session created", session);

    res.send({ id: session.id })
})

router.get("/success", async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
    res.send({data: session})
})

router.get("/cancel", async (req, res) => {
    res.send("cancel")
})

module.exports = router;