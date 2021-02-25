<template>
  <div class="relative shadow rounded-lg">
    <h2 class="title">imyirondoro</h2>
    <hr class="m-2" />
    <div>
      <label for="imeri" class="block">imeri</label>
      <input :disabled="success" :class="[success? disabled_input_class: enabled_input_class]" v-model="email" type="email" id="imeri" />
    </div>
    <div class="mt-3">
      <label for="tel">telefon</label>
      <input :disabled="success" :class="[success? disabled_input_class: enabled_input_class]" v-model="phone" type="tel" id="tel"/>
    </div>
    <div class="mt-3">
      <label for="fname">first name</label>
      <input :disabled="success" :class="[success? disabled_input_class: enabled_input_class]" v-model="first_name" type="email" id="fname"/>
    </div>
    <div class="mt-3">
      <label for="lname">last name</label>
      <input :disabled="success" :class="[success? disabled_input_class: enabled_input_class]" v-model="last_name" type="email" id="lname"/>
    </div>

    <div class="mt-3" v-show="!success">
      <label class="inline" for="imeri">nemeye <span class="font-bold text-sm underline">aya</span> mabwiriza</label>
      <input class="inline" v-model="agree" type="checkbox" />
    </div>

    
    <p class="text-red-800 font-bold text-sm">{{error}}</p>
    <button
        v-show="!success"
        @click="register"
      class="p-2 text-xl font-bold bg-green-800 text-white mt-2 rounded-lg"
    >
      Emeza
    </button>

    <button
        @click="success=false" v-show="success"
      class="p-1 ml-5 font-bold bg-gray-500 text-white rounded-lg"
    >
      Hindura
    </button>
  </div>
</template>

<style scoped>
label {
  @apply block;
}
.title {
  @apply font-bold ml-3 text-lg;
}
</style>

<script>
import {ref, computed} from "vue";
import {useStore} from "vuex";
import axios from "axios";
export default {
    setup(props){
        const store = useStore();
        const ticket = computed(()=>store.state.ticket);
        const email = ref("");
        const phone = ref("");
        const first_name = ref("");
        const last_name = ref("");
        const agree = ref(false);
        const error = ref("");
        const success = ref(false);
        const disabled_input_class = ref("font-bold text-gray-500 disabled");
        const enabled_input_class = ref("border-black border-2");
        const register = async()=>{
            error.value = "";
            if(email.value.length<=8) return error.value="imeri ntago ibaho";
            if(phone.value.length<=10) return error.value="telefone ntago ibaho";
            if(first_name.value.length<=3) return error.value="first name ntago ibaho";
            if(last_name.value.length<=3) return error.value="last name ntago ibaho";
            if(!agree.value) return error.value="mugomba kwemera amategeko";
            try{
                const res = await axios.post("api/tickets/buy-ticket", {
                    email: email.value,
                    phone: phone.value,
                    first_name: first_name.value,
                    last_name: last_name.value,
                    ticket_id: ticket.value._id,
                    bus_id: ticket.value.bus._id,
                })
                success.value = true;
                store.commit("setBTicket", res.data.bTicket)
                console.log("bticket", res.data);
            }catch(e){console.log("error registering"); error.value="mwongere mugerageze"}
        }
        return {email, phone, first_name, last_name, register, agree, error, success, enabled_input_class, disabled_input_class}
    }
}
</script>