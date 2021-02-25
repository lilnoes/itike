<template>
  <div>
    <div class="bg-black h-10 py-3">
      <select v-model="from" class="text-white bg-gray-700 mr-6">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <button @click="interchange" class="text-white mr-6">
        <img :src="change_url" class="inline w-20 h-5" />
      </button>

      <select v-model="to" class="text-white bg-gray-700 mr-6">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <input v-model="date" type="date" class="text-white bg-gray-700 mr-6" />

      <button @click="search" class="text-white bg-gray-700 px-2">
        Ongera Ushake
      </button>

      <span v-show="progress"><img :src="spinner_url" class="ml-4 w-5 h-5 inline-block animate-spin"/></span>
    </div>

    <div class="bg-green-100 py-3">
      <Bus v-for="bus in buses" :key="bus.id" :bus="bus"></Bus>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import InlineSvg from "vue-inline-svg";
import { useStore } from "vuex";
import Bus from "../components/Bus.vue";
import axios from "axios";
import utils from "../js/utils.js"
export default {
  components: { Bus, InlineSvg},
  setup(props) {
    const store = useStore();
    const change_url = ref("https://itike.s3.amazonaws.com/assets/repeat.svg");
    const spinner_url = ref("https://itike.s3.amazonaws.com/assets/spinner.svg");
    const progress = ref(true);
    const ticket = ref(store.state.ticket);
    const from = ref(ticket.value.bus.from);
    const to = ref(ticket.value.bus.to);
    const _date = new Date(ticket.value.bus.date);
    const date = ref(`${_date.getFullYear()}-${utils.pad(_date.getMonth()+1)}-${utils.pad(_date.getDate())}`);
    const time = ref(`${utils.pad(_date.getHours())}:${utils.pad(_date.getMinutes())}`);
    const options = ref(store.state.options);
    const buses = computed(() => store.state.buses);
    onMounted(async() => {
      store.dispatch("getBuses");
      axios.post("/cookie");
    });
    watch(buses, (newval, oldval) => {
      progress.value = false;
    });

    const interchange = () => {
      let temp = from.value;
      from.value = to.value;
      to.value = temp;
    };

    const search = () => {
      progress.value=true;
      store.commit("setLocation", {
        from: from.value,
        to: to.value,
        date: new Date(`${date.value}T${time.value}`).getTime(),
      });
      store.dispatch("getBuses");
    };
    return {
      from,
      to,
      date,
      time,
      options,
      interchange,
      buses,
      search,
      change_url,
      spinner_url, progress
    };
  },
};
</script>