import { createRouter, createWebHashHistory, createWebHistory, useRoute } from "vue-router"

import Main from "../html/Main.vue"
import Home from "../html/Home.vue"
import Success from "../html/Success.vue"
import Buses from "../html/Buses.vue"
import Checkout from "../html/Checkout.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import utils from "./utils.js"

const routes = [
    { path: "/", component: Home },
    { path: "/login", components: { default: Home, account: Login } },
    { path: "/register", components: { default: Home, account: Register } },
    { path: "/buses", component: Buses },
    { path: "/checkout", component: Checkout },
    { path: "/success", component: Success }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;