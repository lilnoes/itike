import {setup, ref} from "vue"

export default{
    setup(){
        const show_login = ref(true);
        const show_register = ref(false);
        return {
            show_login,
            show_register
        }
    }
}