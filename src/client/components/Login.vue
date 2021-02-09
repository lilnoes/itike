<template>
  <div class="home-login w3-display-container">
    <div class="fullscreen"></div>
    <div class="login-container w3-display-middle">
      <h1 data="chap">INJIRA</h1>
      <label>username</label>
      <input v-model="username" class="w3-input" type="text" />
      <label>password</label>
      <input v-model="password" class="w3-input" type="password" />
      <button @click="login" class="w3-btn">Login</button>
      <button @click="register" class="w3-btn">Register</button>
      <button @click="test" class="w3-btn">Test</button>
      <div class="login-progress">
        <div class="progress-item"></div>
      </div>
      <div class="login-container-close">
        <button @click="close" class="w3-btn">X</button>
      </div>
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
    const close = () => {
      router.back();
    };
    const register = async () => {
      router.replace("/register");
    };
    const test = () => {
      console.log("test");
    };
    const username = ref("");
    const password = ref("");
    const login = async () => {
      try {
        const response = await axios.post("account/login", {
          username: username.value,
          password: password.value,
        });
        if (response.data) {
          store.dispatch("getuser");
          router.back();
        }
        console.log("response login", response);
      } catch (e) {
        console.log("error logging in");
      }
    };
    return { close, register, username, password, test, login };
  },
};
</script>

<style lang="less" scoped>
.login-progress {
  position: relative;
  height: 50px;
  border: 1px solid red;
  overflow: hidden;
  .progress-item {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      -45deg,
      red 25%,
      white 25%,
      white 50%,
      red 50%,
      red 75%,
      white 75%
    );
    background-size: 50px;
    animation: progress 3s;
    &::after {
      content: "";
    }
  }
}

@keyframes progress {
  from {
    background-position: 0%;
  }
  to {
    background-position: 100%;
  }
}

.home-login {
  position: relative;

  & {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0px;
    z-index: 10;
  }

  .login-container {
    z-index: 11;
    background-color: white;
    width: 40%;

    h1 {
      color: red;
      &:hover:before {
        content: "( " attr(data) " )";
        color: blue;
        background-color: yellow;
      }
    }
  }
}
</style>