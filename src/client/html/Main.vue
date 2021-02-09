<template>
  <div class="home-main-container">
    <Header></Header>
    <router-view></router-view>
    <router-view name="account"></router-view>
    <Faq></Faq>
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Faq from "../components/Faq.vue"
import {onMounted} from "vue"
import {useStore} from "vuex"
export default {
    components: {Header, Faq},
    setup(){
      const store = useStore();
      store.dispatch("getuser");
    }
}
</script>
