<template>
  <div>
    <div class="z-10 fixed w-full h-full bg-gray-800 inset-0 bg-opacity-95">.</div>
    <div class="p-3 z-20 fixed h-auto w-80 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 class="font-bold text-center text-2xl">IYANDIKISHE</h1>
      <label class="block">akazina</label>
      <input v-model="username" class="border rounded-lg w-full h-10" type="text" />

      <label class="block mt-5">imeli</label>
      <input v-model="email" class="border rounded-lg w-full h-10" type="email" />

      <label class="block mt-5">ijambo banga</label>
      <input v-model="password1" class="border rounded-lg w-full h-10" type="password" />

      <label class="block mt-5">ongera wandike ijambo banga</label>
      <input v-model="password2" class="border rounded-lg w-full h-10" type="password" />

      <p class="float-right font-bold text-sm mb-4">mwibagiwe ijambo banga?</p>
      <div class="clear-both"></div>

      <p><span class="float-left text-sm"><input v-model="nasomye" type="checkbox"/> nasomye <span class="underline font-bold cursor-pointer">aya</span> mabwiriza, ndayemera</span></p>
      <div class="clear-both"></div>

      <p class="text-red-700 font-bold">{{error}}</p>
      <button @click="register" class="w-full bg-green-800 rounded-lg text-white my-5 h-10 font-bold text-xl border-2 border-green-800 hover:text-green-800 hover:bg-white hover:border-green-800"><span v-show="progress" class="w-7 h-7 inline float-left ml-3 animate-spin"><img :src="spinner"></span>IYANDIKISHE</button>
      <p class="font-bold text-sm">Mufite konti?</p>
      <button @click="login" class="w-full border-2 border-green-800 rounded-lg text-green-800 h-10 font-bold text-xl hover:text-green-900 hover:bg-green-200">INJIRA</button>
      <button @click="close" class="absolute top-0 right-0 p-1 text-green-800 border border-green-800 font-bold text-lg rounded-circle hover:text-white hover:bg-green-800">X</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const error = ref("");
    const nasomye = ref(false);
    const spinner = ref("https://itike.s3.amazonaws.com/assets/spinner.svg");
    const progress = ref(false);
    const close = () => {
      router.back();
    };
    const login = async () => {
      router.replace("/login");
    };
    const username = ref("");
    const password1 = ref("");
    const password2 = ref("");
    const email = ref("");
    const register = async () => {
      try {
        progress.value = true;
        error.value="";
        console.log("pass1", password1.value, password2.value);
        if(!nasomye.value){error.value="mugomba kwemera amabwiriza!"; return;}
        if(password1.value!=password2.value){error.value="amagambo banga ntahura!"; return;}
        if(username.value.length <= 5){error.value="akazina kagomba kuba hejuru yamagambo 6"; return;}
        if(password1.value.length <= 5){error.value="ijambo banga rigomba kuba hejuru yamagambo 6"; return;}
        const response = await axios.post("api/account/login", {
          username: username.value,
          password1: password.value,
          email: email.value
        });
        if (response.data) {
          store.dispatch("getuser");
          router.back();
        }
        console.log("response login", response);
      } catch (e) {
        error.value = "habayemo ikibazo, mwongere gato";
        console.log("error logging in");
      }
    };
    return { close, register, username, email, password1, password2, login, spinner, progress, error, nasomye};
  },
};
</script>

<style lang="less" scoped>
</style>