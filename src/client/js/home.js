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
            user: { username: "", is_logged_in: false, logged_at: Date.now() },
            options: options,
            ticket: {started: Date.now(), bus: {date: Date.now(), from: options[0], to: options[1]}},
            settings: {faq_open: false, registered: false, logged: false, loggedOut: false},
            buses: [],
        }
    },
    mutations: {
        setLocation(state, payload) {
            state.ticket.bus = payload
        },
        setUser(state, username) {
            state.user.username = username;
            state.user.is_logged_in = true;
        },
        setBus(state, payload){
            state.ticket.bus = payload;
        },
        setTicket(state, payload){
            state.ticket = payload;
        },
        closeFaq(state){
            state.settings.faq_open = !state.faq_open;
        },
        setRegistered(state, value){
            state.settings.registered=value;
        },
        setLogged(state, value){
            state.settings.logged=value;
        },
        setLoggedOut(state, value){
            state.settings.loggedOut=value;
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
                        from: context.state.ticket.bus.from,
                        to: context.state.ticket.bus.to,
                        date: context.state.ticket.bus.date
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