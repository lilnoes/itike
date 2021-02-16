<template>
  <div>
    <div class="bg-black h-10 py-3">
      <select v-model="from" class="text-white bg-gray-700 mr-6">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <button @click="interchange" class="text-white mr-6">hinduranya</button>

      <select v-model="to" class="text-white bg-gray-700 mr-6">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <input v-model="date" type="date" class="text-white bg-gray-700 mr-6"/>

      <button @click="search" class="text-white bg-gray-700">Ongera Ushake</button>
    </div>

    <div class="tickets-list">
      <Bus v-for="bus in buses" :key="bus.id" :bus="bus"></Bus>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted} from "vue";
import { useStore } from "vuex";
import Bus from "../components/Bus.vue";
import axios from "axios"
export default {
  components: { Bus },
  setup(props) {
    const store = useStore();
    const from = ref(store.state.from);
    const to = ref(store.state.to);
    const date = ref(store.state.date);
    const time = ref(store.state.time);
    const options = ref(store.state.options);
    const buses = computed(() => store.state.buses);
    onMounted(()=>{
      store.dispatch("getBuses")
      axios.post("/cookie");
    })
    watch(buses, (newval, oldval) => {
      console.log("buses changed from ", oldval.length, " to", newval.length);
    });

    const interchange = () => {
      let temp = from.value;
      from.value = to.value;
      to.value = temp;
    };

    const search = () => {
        console.log("searching...");
        store.commit("setlocation", {
          from: from.value,
          to: to.value,
          date: date.value,
          time: time.value,
        })
        store.dispatch("getBuses");
    }
    return { from, to, date, time, options, interchange, buses, search};
  },
};
</script>