<template>
  <div class="home-login w3-display-container">
    <div class="fullscreen"></div>
    <div class="login-container w3-display-middle">
      <h1 data="chap">IYANDIKISHE</h1>
      <label>username</label>
      <input v-model="username" class="w3-input" type="text" />
      <label>email</label>
      <input v-model="email" class="w3-input" type="email" />
      <label>password</label>
      <input v-model="password" class="w3-input" type="password" />
      <button @click="register" class="w3-btn">Iyandikishe</button>
      <button @click="login" class="w3-btn">Login</button>
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
import {ref} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
export default {
    setup() {
    const store = useStore();
    const router = useRouter();
    const close = () => {
      router.back();
    };
    const login = async () => {
      router.replace("/login");
    };
    const test = () => {
      console.log("test");
    };
    const username = ref("");
    const email = ref("");
    const password = ref("");
    return { close, login, username, password, test, email };
  }
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