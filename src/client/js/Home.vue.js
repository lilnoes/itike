import {setup, ref, onMounted} from "vue"
import axios from "axios"

export default{
    setup(){
        onMounted(()=>{
            axios.get("account/statjus")
                .then((response)=>{console.log("response", response)})
        })
        const show_login = ref(true);
        const show_register = ref(false);
        const options = ref(["kigali", "muhanga"])
        const value = ref(null)
        return {
            show_login,
            show_register,
            options,
            value
        }
    }
}