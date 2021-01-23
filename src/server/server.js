require("dotenv").config()
const path = require("path")
const APP_DIR = process.env.APP_DIR
const express = require("express")
const webpack = require("webpack")
const middleware = require("webpack-dev-middleware")
const config = require(path.join(APP_DIR, "webpack.config.js"))
const compiler = webpack(config)
const accountApi = require("./api/account.js")
const cookieSession = require("cookie-session")

const app = express()

app.use(cookieSession({
    name: "session",
    keys: ["key1", "key2"]
}))

app.set("trust-proxy", 1)

app.use(middleware(compiler, {}))
app.use( express.static(path.join(APP_DIR, "dist")) )

app.use("/account", accountApi);

app.get("*", (req, res)=>{
    res.sendFile(path.join(APP_DIR, "dist", "index.html"));
})

app.listen(3000, (err)=>{
    console.log("listening on port 3000")
})