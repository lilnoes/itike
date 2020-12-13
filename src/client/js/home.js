import {createApp} from "vue"
import {createStore} from "vuex"
// require("https://www.w3schools.com/w3css/4/w3.css")

import Home from "../html/Home.vue"

const app = createApp(Home)

const store = createStore({
    state(){
        return {
            count: 10,
        }
    },
    
    mutations: {
        increment(state){
            state.count++;
        }
    },
    
    getters: {
        getCount(state){
            return state.count;
        },
    }
})

window.store = store
app.use(store)

app.mount("#app")