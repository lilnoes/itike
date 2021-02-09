<template>
  <div class="home-main-container">
    <div class="body w3-display-container">
      <div class="image">
        <img src="/assets/kigali.jpg" />
      </div>

      <div class="home-goto-widget w3-display-left">
        <div>
          <label>Uhagurukiye </label>
          <select
            v-model="uhagurukiye"
            class="w3-select"
            name="from-location-name"
            id="from-location-id"
          >
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <label>Ukagera</label>
          <select
            v-model="ukagera"
            class="w3-select"
            name="to-location-name"
            id="to-location-id"
          >
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="itariki w3-display-container">
          <label>itariki</label>
          <input type="date" v-model="itariki" />

          <input type="time" v-model="isaha" />

          <div class="none w3-display-right">
            <button class="w3-btn">none</button>
          </div>

          <div class="ejo w3-display-right">
            <button class="w3-btn">ejo</button>
          </div>
        </div>

        <div>
          <button @click="goToTickets">Shaka imodoka</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setup, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import utils from "../js/utils.js";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const itariki = ref(utils.getStandardDate());
    const isaha = ref(utils.getStandardTime());
    const options = computed(()=>store.state.options)
    const uhagurukiye = ref(options.value[0]);
    const ukagera = ref(options.value[1]);

    const goToTickets = async()=>{
      store.commit("setlocation", {
        from : uhagurukiye.value,
        to : ukagera.value,
        date : itariki.value,
        time : isaha.value,
      })

      await store.dispatch("getBuses")
      router.push("/buses")
    }
    return {
      goToTickets,
      options,
      uhagurukiye,
      ukagera,
      itariki,
      isaha,
    };
  },
};
</script>

<style lang="less">
@import "../css/variables.less";

.w3-main {
  background-color: @main;
}

.body {
  height: 500px;
  width: 100%;

  .image img {
    height: 100%;
    width: 100%;
    filter: brightness(60%);
  }

  .home-goto-widget {
    // height: 100px;
    width: 35%;
    top: 47%;
    left: 90px;
    background-color: white;

    .itariki {
      background-color: red;

      .none {
        top: 10px;
      }

      .ejo {
        top: 40px;
      }
    }
  }
}
</style>

