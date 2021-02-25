const nodemailer = require("nodemailer");
const QRCode = require("qrcode")
const fs = require("fs")
const path = require("path")

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.leonema.tech",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "itike@leonema.tech", // generated ethereal user
      pass: "(ncPq@t(T8", // generated ethereal password
    },
    ignoreTLS: true
  });

  const filename = path.join(__dirname, "test.png");
  await QRCode.toFile(filename, "emma")
  if(!fs.existsSync(filename)) console.log("doesnt exist");

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"do_not_reply" <itike@leonema.tech>', // sender address
    to: "ishimweleonj@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: `<div><b>Hello world html</b><img src='cid:test'/></div>`, // html body
    attachments: [{
        filename: "test.png",
        path: filename,
        cid: "test"
    }] 
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
