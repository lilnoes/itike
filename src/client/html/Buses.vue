<template>
  <div>
    <div class="tickets-header">
      <select v-model="from" class="">
        vu
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <button @click="interchange" class="w3-btn">change</button>

      <select v-model="to" class="">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <input v-model="date" type="date" />

      <button @click="search" class="w3-btn">Ongera Ushake</button>
    </div>

    <div class="tickets-list">
      <Bus v-for="bus in buses" :key="bus.id" :bus="bus"></Bus>
    </div>
  </div>
</template>


<style lang="less" scoped>
@import "../css/variables.less";
.tickets-header {
  background-color: @dark;
  height: 70px;
}
</style>

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