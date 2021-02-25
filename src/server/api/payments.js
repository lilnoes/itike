const _ = require("lodash");
const mongoose = require("mongoose");
const utils = require("../api/utils.js");
const BTicket = require("../../models/BTicket.js");
const axios = require("axios");

const test_key = process.env.STRIPE_TEST_KEY;

const stripe = require("stripe")(test_key);
const router = require("express").Router();

router.post("/checkout", async (req, res) => {
    try {
        await utils.getDefaultConnection();
        const _bTicket = req.body.bTicket._id || req.session.bTicket._id;
        const bTicket = await BTicket.findById(_bTicket)
            .populate("ticket")
            .populate("user")
            .populate("bus");
        const ticket = bTicket.ticket;
        const bus = bTicket.bus;
        if (!ticket || !bus)
            return res
                .status(200)
                .send({ code: 40001, text: "ticket not found" });
        const user = bTicket.user;
        const diff = Date.now() - ticket.started;
        if (diff >= 15 * 60 * 1000)
            return res.status(200).send({ code: 40000, text: "time exceeded" });
        // console.log("diff", diff, diff > 15*60*1000);
        // return res.send(200);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            metadata: { id: _bTicket },
            success_url:
                "http://itike.com/#success?session_id={CHECKOUT_SESSION_ID}&status=success",
            cancel_url:
                "http://itike.com/#success?session_id={CHECKOUT_SESSION_ID}&status=failed",
            line_items: [
                {
                    price_data: {
                        currency: "rwf",
                        unit_amount: bus.fee,
                        product_data: {
                            name: `ticket from ${bus.from} to ${bus.to} - ${bus.type} at ${bus.date}`,
                            description: `Ticket id "${bTicket._id}" for ${bTicket.last_name} ${bTicket.first_name} at ${bus.date}`,
                        },
                    },
                    quantity: 1,
                },
            ],
        });

        bTicket.stripe_session_id = session.id;
        bTicket.save();
        const htmlMessage = `<div>
                                <h2>ITIKE.com invoice</h2>
                                <p>Mugiye kugura itike nimero <b>${bTicket._id}<b></p>
                                <p>iva ${bus.from} ikagera ${bus.to}</p>
                                <p>Bus ni volcano izahaguruka ${bus.date}</p>
                                <p>Mbere yo kugura iyi tike, mubanze musuzume koko</p>
                                <p>nimba ari mwe mugiye kuyigura.</p>
                                <p>Murakoze...</p>
                                <p>Tubifurije urugendo ruhire</p>
                            </div>`;
        axios
            .post(
                "https://en16uoyfk8.execute-api.us-east-1.amazonaws.com/qrCode",
                { name: bTicket._id }
            )
            .then(function (response) {
                console.log("received qr url", response.data);
                bTicket.qr_url = `https://itike.s3.amazonaws.com/qr/${response.data.name}`;
                bTicket.save().then((val) => {
                    utils.sendEmail(
                        htmlMessage,
                        `Kugura itike - ${bTicket._id}`,
                        bTicket.email
                    );
                });
            })
            .catch(function (err) {
                console.log("error when creating qr url", err);
            });
        // console.log("stripe session created", session);
        return res.send({ id: session.id });
    } catch (e) {
        console.log("error occured", e);
        return res.send(403);
    }
});

router.post("/stripe", async (req, res) => {
    console.log("coming here");
    try {
        await utils.getDefaultConnection();
        const session = await stripe.checkout.sessions.retrieve(
            req.body.session_id
        );
        const bTicket = await BTicket.findById(session.metadata.id)
            .populate("ticket")
            .populate("user")
            .populate("bus");
        // console.log("bTicket", bTicket);
        if (session.payment_status == "paid") {
            bTicket.paid = true;
            bTicket.save();
            const htmlMessage = `<div>
                                <h2>ITIKE yaguzwe neza</h2>
                                <p>itike nimero <b>${bTicket._id}<b></p>
                                <p>iva ${bTicket.bus.from} ikagera ${bTicket.bus.to}</p>
                                <p>Bus ni volcano izahaguruka ${bTicket.bus.date}</p>
                                <p>yaguzwe. Muzerekana iyi foto iri hasi mugiye kugenda</p>
                                <p>cyangwa nimero yitike</p>
                                <div style="width: 100px;height:100px"><img src='${bTicket.qr_url}'/></div>
                                <p>Tubifurije urugendo ruhire.</p>
                                <p><i>Mwakoze gukoresha itike.com mugura itike yanyu, turabarindiriye nubutaha!</i></p>
                            </div>`;
            utils.sendEmail(
                htmlMessage,
                `Itike ${bTicket._id} yaguzwe`,
                bTicket.email
            );
        }
        return res.send({ session: session, ticket: bTicket });
    } catch (e) {
        console.log("error getting stripe", e);
        res.status(400).send({ text: "try again" });
    }
});

router.get("/cancel", async (req, res) => {
    res.send("cancel");
});

module.exports = router;
