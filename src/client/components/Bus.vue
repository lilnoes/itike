<template>
  <div class="relative h-auto bg-white m-4 rounded-lg shadow-xl">
    <div>
      <div class="h-14 w-52 inline-block">
        <img src="../assets/volcano.png" />
      </div>
      <p class="relative inline ml-72 text-2xl font-bold">{{ time }}</p>
      <button @click="fata" class="relative inline float-right m-3 mt-8 p-2 bg-green-800 text-white rounded-lg font-bold">Fata</button>
      <p class="relative inline float-right right-80 mt-8 text-2xl font-bold">2000 RWF</p>
      <div class="clear-both"></div>
    </div>
    <!-- <p class="inline">{{ bus.date }}</p> -->
    <p class="relative text-center -mt-5 ml-5 text-gray-700 text-xl">{{ from }} > {{ to }}</p>
    <p class="relative text-center ml-5 -mt-0 text-gray-700 text-sm">(amasaha 5)</p>
    <hr class="border-4 mx-5" />
    <p class="float-right  mr-4 font-bold text-xl text-gray-600">yuzuye</p>
    <div class="clear-both mb-2"></div>
  </div>
</template>

<style lang="less" scoped>
</style>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default {
  props: {
    bus: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log("bus", props);
    const store = useStore();
    const router = useRouter();
    const from = computed(() => props.bus.from);
    const to = computed(() => props.bus.to);
    let _date = new Date(props.bus.date);
    const date = computed(() => _date.toDateString());
    const time = computed(() => _date.toTimeString().slice(0, 5));

    const fata = async () => {
      await store.commit("setBus", props.bus);
      try {
        const res = await axios.post("/api/tickets/initialticket", {
          bus_id: props.bus._id,
        });
      } catch (e) {}
      await router.push("/checkout");
    };

    return { from, to, date, time, fata };
  },
};
</script>