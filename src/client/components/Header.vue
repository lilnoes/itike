<template>
  <div>
    <div class="itangazo">
      <p class="w3-container">
        itangazo: Nta muntu wemerewe kugura itike atayikuye hano...
      </p>
    </div>

    <div class="header w3-display-container">
      <div class="logo w3-display-left">itike.COM</div>

      <div class="menu w3-display-bottomright">
        <button class="w3-btn">
          <i class="fas fa-headphones"></i>Ubufasha
        </button>
        <button @click="generate">generate</button>
        <button
          v-if="!is_logged_in"
          @click="(show_login = true), goToLogin()"
          class="w3-btn"
        >
          <i class="fas fa-user"></i>Injira
        </button>
        <button v-if="is_logged_in" class="w3-btn">
          <i class="fas fa-user"></i>{{ username }}
        </button>
        <button v-if="is_logged_in" @click="logout" class="w3-btn">
          <i class="fas fa-user"></i>logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const is_logged_in = computed(() => store.state.user.is_logged_in);
    const username = computed(() => store.state.user.username);
    watch(is_logged_in, (newval, oldval) => {
      console.log(newval, oldval);
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
      generate
    };
  },
};
</script>

<style scoped lang="less">
@import "../css/variables.less";
div .itangazo {
  background-color: @main;
  color: white;
  font-size: 31;
  font-weight: bold;
}

.header {
  height: 80px;
  font-weight: bold;
}

.logo {
  color: @main;
  font-size: 102;
  top: 20px;
  left: 20px;
  z-index: -999;
}
</style>