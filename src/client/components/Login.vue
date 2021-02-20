<template>
  <div>
    <div class="z-10 fixed w-full h-full bg-gray-800 inset-0 bg-opacity-95">.</div>
    <div class="p-3 z-20 absolute h-auto w-80 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p v-show="registered" class="bg-green-500 text-white p-1 mr-3">Konti yanyu yafunguwe, mwinjire</p>
      <h1 class="font-bold text-center text-2xl">INJIRA</h1>
      <label class="block">username</label>
      <input v-model="username" class="border rounded-lg w-full h-10" type="text" />
      <label class="block mt-5">password</label>
      <input v-model="password" class="border rounded-lg w-full h-10" type="password" />

      <p class="float-right font-bold text-sm mb-4 cursor-pointer">mwibagiwe ijambo banga?</p>
      <div class="clear-both"></div>

      <p><span class="float-left text-sm"><input type="checkbox" id="nyibuka"/> <label for="nyibuka">nyibuka</label></span></p>
      <div class="clear-both"></div>


      <p class="text-red-600 font-bold text-sm mt-5">{{error}}</p>
      <button @click="login" class="w-full bg-green-800 rounded-lg text-white mb-5 h-10 font-bold text-xl border-2 border-green-800 hover:text-green-800 hover:bg-white hover:border-green-800"><span v-show="progress" class="w-7 h-7 inline float-left ml-3 animate-spin"><img :src="spinner"></span>INJIRA</button>
      <p class="font-bold text-sm">Nta konti mufite?</p>
      <button @click="register" class="w-full border-2 border-green-800 rounded-lg text-green-800 h-10 font-bold text-xl hover:text-green-900 hover:bg-green-200">Fungura konti nshya</button>
      <button @click="close" class="absolute top-0 right-0 p-1 text-green-800 border border-green-800 font-bold text-lg rounded-circle hover:text-white hover:bg-green-800">X</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const spinner_white = "https://itike.s3.amazonaws.com/assets/spinner_white.svg";
    const spinner_blue = "https://itike.s3.amazonaws.com/assets/spinner_blue.svg";
    const spinner = ref(spinner_white);
    const progress = ref(false);
    const error = ref("");
    const registered = ref(false);
    const close = () => {
      router.back();
    };
    const register = async () => {
      router.replace("/register");
    };
    const username = ref("");
    const password = ref("");

    onMounted(()=>{
      if(store.state.registered){store.commit("setLogged", false); registered.value=true}
      setTimeout(()=>registered.value=false, 5000);
    });

    const login = async () => {
      error.value="";
      try {
        if(username.value.length <=5){error.value="akazina ntikemewe"; return;}
        if(password.value.length <=5){error.value="ijambo banga ntiryemewe"; return;}
        progress.value = true;
        const response = await axios.post("api/account/login", {
          username: username.value,
          password: password.value,
        });
        if (response.data) {
          const data = response.data;
          console.log(data);
          if(response.status != 200) {error.value = data.text; return;}
          store.dispatch("getuser");
          router.back();
        }
      } catch (e) {
        error.value="mwongere mugerageze!";
      }
    };
    return { close, register, username, password, login, spinner, progress, registered, error};
  },
};
</script>

<style lang="less" scoped>
</style>