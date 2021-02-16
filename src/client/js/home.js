import { createApp } from "vue"
import { createStore } from "vuex"
import _ from "lodash"
import { createRouter, createWebHashHistory, createWebHistory, useRoute } from "vue-router"
import mitt from "mitt"
import axios from "axios"
import "../../index.css"
import regenerator from "regenerator-runtime"
// require("https://www.w3schools.com/w3css/4/w3.css")

import Main from "../html/Main.vue"
import Home from "../html/Home.vue"
import Buses from "../html/Buses.vue"
import Checkout from "../html/Checkout.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import utils from "./utils.js"

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
    "Rutsiro"]

const store = createStore({
    state() {
        return {
            user: { username: "", is_logged_in: false, logged_at: new Date() },
            from: options[0],
            to: options[1],
            date: utils.getStandardDate(),
            time: utils.getStandardTime(),
            options: options,
            buses: [],
            bus: {var: false, date: new Date().getUTCMilliseconds(), from: "", to: "", started: new Date().getUTCMilliseconds()},
        }
    },
    mutations: {
        setlocation(state, payload) {
            // console.log(payload);
            state.from = payload.from;
            state.to = payload.to;
            state.date = payload.date;
            state.time = payload.time;
        },
        setuser(state, username) {
            state.user.username = username;
            state.user.is_logged_in = true;
        },
        setBus(state, payload){
            state.bus.date = payload.date;
            state.bus.time = payload.time;
            state.bus.from = payload.from;
            state.bus.to = payload.to;
            state.bus.var = true;
            state.bus.started = payload.started || new Date().getUTCMilliseconds()
        }
    },
    actions: {
        async getuser(context) {
            try {
                const response = await axios.get("/api/account/status")
                if (!response.data) {
                    console.log("not logged in", response);
                    context.state.user.is_logged_in = false;
                    return;
                }
                context.state.user.username = response.data.username;
                context.state.user.is_logged_in = true;
            } catch (e) { console.log("error when connecting"); }
        },

        async getBuses(context) {
            try {
                let date = new Date(`${context.state.date}T${context.state.time}Z`).getTime();
                const res = await axios.get("/api/buses/buses", {
                    params: {
                        from: context.state.from,
                        to: context.state.to,
                        date: date
                    }
                })
                console.log("response", res, date);
                context.state.buses = res.data
            } catch (e) { console.log(e, "error when getting buses"); }
        }
    }
});

const routes = [
    { path: "/", component: Home },
    { path: "/login", components: { default: Home, account: Login } },
    { path: "/register", components: { default: Home, account: Register } },
    { path: "/buses", component: Buses },
    {
        path: "/checkout", component: Checkout,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})



const app = createApp(Main)
window._ = _
app.use(router)
app.use(store)
window.router = router;

app.mount("#app")