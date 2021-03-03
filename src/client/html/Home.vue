<template>
  <div class="">
    <div class="relative">
      <div class="">
        <img :src="background_src" />
      </div>

      <div class="absolute bg-white h-96 w-96 top-4 left-4 p-3 rounded-md">
        <div>
          <div  class="absolute w-5 h-5 p-px left-40 top-16 border-2 border-green-600 rounded-3xl cursor-pointer active:ring-2 active:ring-green-800">
            <img :src="reverse_url" @click="temp=ukagera;ukagera=uhagurukiye;uhagurukiye=temp" />
          </div>
          <label for="from-location-id" class="block font-bold">Uhagurukiye </label>
          <select
            v-model="uhagurukiye"
            class="w-full border-b-2 border-gray-600 bg-white mb-6"
            name="from-location-name"
            id="from-location-id"
          >
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <label for="to-location-id" class="block font-bold">Ukagera</label>
          <select
            v-model="ukagera"
            class="w-full border-b-2 border-gray-600 bg-white mb-6"
            name="to-location-name"
            id="to-location-id"
          >
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="">
          <label class="float-left font-bold">igihe cyo guhagurukira</label>
          <button @click="is_none=true" class="float-right px-2 mb-2" :class="[is_none ? 'selected': 'deselected']">none</button>
          <div class="clear-both"></div>

          <input type="time" v-model="isaha" class="border border-gray-600 mb-2 float-left"/>
          <button @click="is_none=false" class="float-right px-2" :class="[is_none ? 'deselected': 'selected']">ejo</button>
          <div class="clear-both"></div>

          <input type="date" v-model="itariki" class="border border-gray-600"/>
        </div>

        <div>
          <button @click="goToTickets" class="font-bold text-white bg-green-700 w-full p-3 mt-10 rounded-lg">Shaka imodoka</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setup, ref, computed, onMounted, watch} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import utils from "../js/utils.js";
import axios from "axios";

export default {
  setup() {
    const background_src = ref("");
    const reverse_url = ref("https://itike.s3.amazonaws.com/assets/reverse.svg");
    const store = useStore();
    const router = useRouter();
    const itariki = ref(utils.getStandardDate());
    const isaha = ref(utils.getStandardTime());
    const is_none = ref(true);
    const options = computed(() => store.state.options);
    const uhagurukiye = ref(store.state.ticket.bus.from);
    const ukagera = ref(store.state.ticket.bus.to);

    watch(is_none, (newVal, oldVal)=>{
      const date = new Date()
      if(newVal) itariki.value = utils.getStandardDate()
      else{
        date.setUTCDate(date.getUTCDate() + 1)
        itariki.value = utils.getStandardDate(date)
      }
    })

    onMounted(()=>{
      background_src.value="https://itike.s3.amazonaws.com/assets/kigali.jpg";
    })

    const goToTickets = async () => {
      store.commit("setLocation", {
        from: uhagurukiye.value,
        to: ukagera.value,
        date: new Date(`${itariki.value}T${isaha.value}`).getTime(),
      });

      await store.dispatch("getBuses");
      router.push("/buses");
    };
    return {
      goToTickets,
      options,
      uhagurukiye,
      ukagera,
      itariki,
      isaha,
      background_src,
      is_none,
      reverse_url
    };
  },
};
</script>

<style lang="less">
.selected{
  @apply bg-gray-800 text-white font-bold;
}
.deselected{
  @apply border-2 border-gray-600;
}
</style>

