require("dotenv").config()
const path = require("path")
const APP_DIR = process.env.APP_DIR
const express = require("express")
const webpack = require("webpack")
const middleware = require("webpack-dev-middleware")
const config = require(path.join(APP_DIR, "webpack.config.js"))
const compiler = webpack(config)
const accountApi = require("./api/account.js")
const busApi = require("./api/buses.js")
const ticketApi = require("./api/tickets.js")
const cookieSession = require("cookie-session")
const {v4: uuidv4, v4} = require("uuid")

const app = express()

app.use(express.json())

app.use(cookieSession({
    name: "session",
    keys: ["key1", "key2"]
}))

app.set("trust-proxy", 1)

app.use(middleware(compiler, {}))
app.use( express.static(path.join(APP_DIR, "dist")) )

app.post("/cookie", (req, res)=>{
    req.session.id = req.session.id || uuidv4();
    res.sendStatus(200);
})

app.use("/api/account", accountApi);
app.use("/api/buses", busApi);
app.use("/api/tickets", ticketApi);

app.get("*", (req, res)=>{
    res.sendFile(path.join(APP_DIR, "dist", "index.html"));
})

app.listen(3000, (err)=>{
    console.log("listening on port 3000")
})