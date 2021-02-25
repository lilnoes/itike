import { createStore } from "vuex"
import axios from "axios"

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
            ticket: { started: Date.now(), bus: { date: Date.now(), from: options[0], to: options[1] } },
            bTicket: null,
            settings: { faq_open: false, registered: false, logged: false, loggedOut: false },
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
        setBus(state, payload) {
            state.ticket.bus = payload;
        },
        setTicket(state, payload) {
            state.ticket = payload;
        },
        setBTicket(state, payload) {
            state.bTicket = payload;
        },
        closeFaq(state) {
            state.settings.faq_open = !state.settings.faq_open;
        },
        setRegistered(state, value) {
            state.settings.registered = value;
        },
        setLogged(state, value) {
            state.settings.logged = value;
        },
        setLoggedOut(state, value) {
            state.settings.loggedOut = value;
        }
    },
    actions: {
        async getuser(context) {
            try {
                const response = await axios.get("/api/account/status")
                if (!response.data) {
                    context.state.user.is_logged_in = false;
                    return;
                }
                context.state.user.username = response.data.username;
                context.state.user.is_logged_in = true;
            } catch (e) { console.log("error when connecting"); }
        },

        async getBuses(context) {
            try {
                console.log("getting buses");
                const res = await axios.post("/api/buses/buses", {
                    from: context.state.ticket.bus.from,
                    to: context.state.ticket.bus.to,
                    date: context.state.ticket.bus.date
                })
                console.log("finished getting buses");
                context.state.buses = res.data
            } catch (e) { console.log(e, "error when getting buses"); }
        }
    }
});

export default store;