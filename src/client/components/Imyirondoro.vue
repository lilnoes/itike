<template>
  <div class="relative shadow rounded-lg">
    <h2 class="title">imyirondoro</h2>
    <hr class="m-2" />
    <div>
      <label for="imeri" class="block">imeri</label>
      <input v-model="email" type="email" name="imeri" />
    </div>
    <div class="mt-3">
      <label for="imeri">telefon</label>
      <input v-model="phone" type="tel" />
    </div>
    <div class="mt-3">
      <label for="imeri">first name</label>
      <input v-model="first_name" type="email" />
    </div>
    <div class="mt-3">
      <label for="imeri">last name</label>
      <input v-model="last_name" type="email" />
    </div>
    <button
        @click="register"
      class="p-2 text-xl font-bold bg-green-800 text-white mt-2 rounded-lg"
    >
      Emeza
    </button>
  </div>
</template>

<style scoped>
label {
  @apply block;
}
input {
  @apply border-black border-2;
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
        const ticket = store.state.ticket;
        console.log("ticket", ticket);
        const email = ref("");
        const phone = ref("");
        const first_name = ref("");
        const last_name = ref("");
        const register = async()=>{
            try{
                const res = await axios.post("api/tickets/buy-ticket", {
                    email: email.value,
                    phone: phone.value,
                    first_name: first_name.value,
                    last_name: last_name.value,
                    ticket_id: ticket._id,
                })
                console.log("created bticket", res.data);
            }catch(e){console.log("error registering");}
        }
        return {email, phone, first_name, last_name, register}
    }
}
</script>