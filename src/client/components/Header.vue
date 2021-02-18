<template>
  <div class="p-2">
    <div class="bg-green-800 p-2 text-white font-bold text-xl">
        itangazo: Nta muntu wemerewe kugura itike atayikuye hano...
    </div>
    <div><p v-show="logged" class="bg-green-500 text-white p-1">{{log_text}}</p></div>

    <div class="relative h-12">
      <div class="absolute left-0">itike.COM</div>

      <div class="absolute right-0 top-3">
        <button class="ml-2">
          <i class="fas fa-headphones"></i>Ubufasha
        </button>
        <button @click="generate" class="ml-2">generate</button>
        <button
          v-if="!is_logged_in"
          @click="(show_login = true), goToLogin()"
          class="ml-2"
        >
          <i class="fas fa-user"></i>Injira
        </button>
        <button v-if="is_logged_in" class="ml-2">
          <i class="fas fa-user"></i>{{ username }}
        </button>
        <button v-if="is_logged_in" @click="logout" class="ml-2">
          <i class="fas fa-user"></i>logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, watch, ref} from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const log_text = ref("");
    const is_logged_in = computed(() => store.state.user.is_logged_in);
    const username = computed(() => store.state.user.username);
    const logged = ref(false);
    watch(is_logged_in, (newval, oldval) => {
      if(oldval) log_text.value = `Konti yanyu mwayisohotsemo`;
      else if(!store.state.logged) return;
      else log_text.value = `Murakaza neza nyakubahwa ${username.value}`;
      logged.value = true;
      setTimeout(()=>logged.value=false, 5000);
    });
    const goToLogin = async () => {
      router.push("/login");
    };
    const logout = async () => {
      await axios.post("api/account/logout");
      store.dispatch("getuser");
    };

    const generate = async () => {
      const res = await axios.get("api/buses/generate");
      console.log("generate", res);
      // store.dispatch("getuser");
    };
    return {
      goToLogin,
      logout,
      is_logged_in,
      username,
      generate,
      logged,
      log_text
    };
  },
};
</script>