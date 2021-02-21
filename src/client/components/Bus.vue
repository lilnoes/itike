<template>
  <div class="relative h-auto bg-white m-4 rounded-lg shadow-xl">
    <div>
      <p class="ml-2 font-bold text-sm">{{type}}</p>
      <div class="h-14 w-52 inline-block">
        <img :src="type_url" />
      </div>
      <p class="relative inline ml-72 -top-10"><span class="text-2xl font-bold">{{ time }}</span><span class="font-bold text-sm ml-2 text-gray-600"> {{date}}</span></p>
      <button @click="fata" class="relative inline float-right m-3 -top-3 p-2 bg-green-800 text-white rounded-lg font-bold z-1">Fata</button>
      <p class="relative inline float-right right-80 -top-1 text-2xl font-bold">{{fee}} RWF</p>
      <div class="clear-both"></div>
    </div>
    <!-- <p class="inline">{{ bus.date }}</p> -->
    <p class="relative text-center -top-10 ml-5 text-gray-700 text-xl">{{ from }} > {{ to }}</p>
    <p class="relative text-center ml-5 -top-10 text-gray-700 text-sm">(amasaha {{hours}})</p>
    <hr class="relative border-4 mx-3 -mt-6" />
    <p class="float-right  mr-4 font-bold text-xl text-gray-600">{{places}}</p>
    <div class="clear-both mb-2"></div>
  </div>
</template>

<style lang="less" scoped>
</style>

<script>
import { computed, ref} from "vue";
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
    const store = useStore();
    const router = useRouter();
    // const bus = ref(props.bus);
    const from = computed(() => props.bus.from);
    const to = computed(() => props.bus.to);
    const hours = computed(() => props.bus.hours);
    const type = ref(props.bus.type);
    const fee = ref(props.bus.fee);
    const type_url = ref(props.bus.type_url);
    const places = computed(() => props.bus.available_places == 0 ? "yuzuye": `imyanya ${props.bus.available_places}`);
    let _date = new Date(props.bus.date);
    const date = computed(() => _date.toDateString());
    const time = computed(() => _date.toTimeString().slice(0, 5));

    const fata = async () => {
      await store.commit("setTicket", props.bus);
      try {
        const res = await axios.post("/api/tickets/initialticket", {
          bus_id: props.bus._id,
        });
      } catch (e) {}
      await router.push("/checkout");
    };

    return { from, to, date, time, fata, hours, places, type_url, type, fee};
  },
};
</script>