import { setup, ref, onMounted, watch, getCurrentInstance} from "vue"
import {useStore} from "vuex"
import utils from "./utils.js"
import axios from "axios"

export default {
    setup() {
        const store = useStore();
        watch(()=>store.state.count, (newval, oldval)=>{
            console.log(newval, oldval, "watched");
        })
        const itariki = ref(utils.getStandardDate())
        const isaha = ref(utils.getStandardTime())
        const options = ref(["Gasabo","Kicukiro","Nyarugenge","Kigali", "Burera","Gakenke","Gicumbi","Musanze","Rulindo","Gisagara","Huye","Kamonyi","Muhanga","Nyamagabe","Nyanza","Nyaruguru","Ruhango","Bugesera","Gatsibo","Kayonza","Kirehe","Ngoma","Nyagatare","Rwamagana","Karongi","Ngororero","Nyabihu","Nyamasheke","﻿Rubavu","Rusizi","Rutsiro"])
        const uhagurukiye = ref("Kigali");
        const ukagera = ref("Huye");
        return {
            options,
            uhagurukiye,
            ukagera,
            itariki,
            isaha
        }
    }
}