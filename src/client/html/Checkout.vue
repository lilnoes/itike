<template>
  <div>
    <div>
      <span class="text-sm">iyi tike mugomba kuba mwayiguze mu minota</span>
      <span class="text-red-700 font-bold">{{ time }}</span>
    </div>
    <div class="flex items-start flex-row p-1">
      <div class="w-1/3 p-2 m-1 relative shadow rounded-lg">
        <img :src="type_url" class="w-32 h-10" />
        <div class="absolute inset-y-0 right-1">{{ type }}</div>
        <hr class="m-1" />
        <div class="font-bold">
          <span class="float-left">Uvuye</span
          ><span class="float-right">Ukagera</span>
        </div>
        <div class="clear-both"></div>
        <div>
          <span class="float-left">{{ bus.from }}</span
          ><span class="float-right">{{ bus.to }}</span>
        </div>
        <div class="clear-both"></div>
        <p class="font-bold mt-3">Igihe</p>
        <p>{{ date }}</p>
        <p class="font-bold mt-3">Amategeko</p>
        <p>iyi tike ntago isubizwa</p>
      </div>

      <div class="w-1/3 p-2 m-1">
        <imyirondoro></imyirondoro>
      </div>

      <div class="w-1/3 p-2 m-1 relative shadow rounded-lg">
        <h2 class="title">Kwishyura</h2>
        <hr class="m-3" />
        <p>Hitamo uburyo bwo kwishyura</p>
        <p v-show="!is_registered" class="text-red-800 font-bold text-sm">{{ error }}</p>
        <button
          v-show="is_registered"
          :disabled="!is_registered"
          class="bg-green-800 text-white text-lg font-bold p-3 rounded-lg"
          @click="buy"
        >
          ishyura 2000 Rwf
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply block;
}
input {
  @apply border-black border-2;
}
.title {
  @apply font-bold ml-3 text-lg;
}
</style>

<script>
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import Imyirondoro from "../components/Imyirondoro.vue";
export default {
  components: { Imyirondoro },
  beforeRouteEnter(to, from) {
    // console.log("to", to, "from", from.path);
  },
  setup() {
    const src = ref("https://itike.s3.amazonaws.com/volcano.png");
    const store = useStore();
    const router = useRouter();
    const mins = 15;
    const ticket = computed(() => store.state.ticket);
    const bus = computed(() => ticket.value.bus);
    const type = computed(() => bus.value.type);
    const type_url = computed(() => bus.value.type_url);
    const date = computed(() => new Date(bus.value.date).toDateString());
    const is_registered = computed(()=>store.state.bTicket!=null)
    
    const error = ref("mubanze mwinjizemo amakuru yanyu");
    const enabled1 = ref("red");
    const disabled1 = ref("red");
    window.date = date;
    const start = computed(
      () => new Date(ticket.value.started).getTime() + mins * 60 * 1000
    );
    const id = ref(0);
    const now = ref(Date.now());
    const time = computed(() =>
      new Date(start.value - now.value).toTimeString().slice(3, 8)
    );
    onMounted(async () => {
      try {
        const res = await axios.get("/api/tickets/existingticket");
        const ticket = res.data.ticket;
        window.store = store;
        console.log("committing", ticket);
        await store.commit("setTicket", ticket);
        console.log("finished committing", ticket);
      } catch (e) {
        console.log("error no existing");
        router.replace("/buses");
      }
      id.value = setInterval(() => {
        now.value = Date.now();
        if (start.value - now.value <= 1000) clearInterval(id.value);
      }, 1000);
    });

    const buy = async () => {
      try {
        console.log("buying");
        const resp = await axios.post("api/payments/checkout", {
          bTicket: store.state.bTicket
        });
        console.log("received from checkout", resp.data);
        const stripe = Stripe(
          "pk_test_51IJe88GOrOLpFC58YcxrRc8Rkp11gPrNGs0LlFc4wRUDx981Mf47rd4kYkFfdRpBihaKdAj2hfkc5jA3LnvZfGNW00lVyuQ3Hp"
        );
        return stripe.redirectToCheckout({ sessionId: resp.data.id });
      } catch (e) {
        console.log("error checking out", e);
      }
    };

    return {
      time,
      bus,
      buy,
      src,
      type,
      type_url,
      date,
      is_registered,
      enabled1,
      disabled1,
      error,
    };
  },
};
</script>