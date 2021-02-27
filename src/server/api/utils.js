require("dotenv").config()
const mongoose = require("mongoose")
const _ = require("lodash")
const nodemailer = require("nodemailer");

module.exports = {
    async getDefaultConnection(conn = "mongodb://localhost/itikedatabase") {
        await mongoose.connect(conn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    },
    async *generate(no = 100, range = 2) {
        const types = ["Volcano", "Virunga", "Horizon", "Ritco"]
        const options = ["Gasabo",
            "Kicukiro",
            "Nyarugenge",
            "Kigali",
            "Burera",
            "Gakenke",
            "Gicumbi",
            "Musanze",
            "Rulindo",
            "Gisagara",
            "Huye",
            "Kamonyi",
            "Muhanga",
            "Nyamagabe",
            "Nyanza",
            "Nyaruguru",
            "Ruhango",
            "Bugesera",
            "Gatsibo",
            "Kayonza",
            "Kirehe",
            "Ngoma",
            "Nyagatare",
            "Rwamagana",
            "Karongi",
            "Ngororero",
            "Nyabihu",
            "Nyamasheke",
            "Rubavu",
            "Rusizi",
            "Rutsiro"];
        const lower = Date.now();
        const upper = lower + range * 24 * 3600 * 1000;
        const quarter = 15 * 60 * 1000;
        const half = quarter * 2;
        const tquarter = quarter * 3;
        const hour = quarter * 4;
        for (const from of options)
            for (let i = 0; i < no; ++i) {
                const to = _.sample(options)
                let type = _.sample(types);
                let date = _.random(lower, upper);
                let n1 = _.random(65, 90);
                let n2 = _.random(65, 90);
                let n3 = _.random(65, 90);
                let plaka = 'R' + String.fromCharCode(n1) + String.fromCharCode(n2);
                plaka += _.pad(_.random(1, 999), 3, '0') + String.fromCharCode(n3);
                if (date % quarter >= 12e5) date -= date % tquarter
                else if (date % quarter >= 8e5) date -= date % half
                else if (date % quarter >= 5e5) date -= date % quarter
                else date -= date % hour
                yield { from: from, to: to, datetime: new Date(date), type: type, plaka: plaka };
            }
    },

    async sendEmail(message, subject, to, sender = "Sales") {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER, // generated ethereal user
                    pass: process.env.SMTP_PASSWORD, // generated ethereal password
                },
                ignoreTLS: true
            });
            let info = await transporter.sendMail({
                from: `${sender} <itike@leonema.tech>`, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html: message, // html body
            });
        } catch (e) {
            console.log("error sending email to", to, "error", e);
        }
    }

}
