import regenerator from "regenerator-runtime"
import { createApp } from "vue"
import "../../index.css"

import Main from "../html/Main.vue"
import store from "./store.js"
import router from "./router.js"


const app = createApp(Main)
app.use(router)
app.use(store)
window.router = router;

app.mount("#app")