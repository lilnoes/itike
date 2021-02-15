<template>
  <div>
    <h2>Checkout page</h2>
    <p>Hello</p>
    <p>from {{ bus.from }} to {{ bus.to }}</p>
    <p>
      You need to buy this ticket in <span>{{ time }}</span> minutes
    </p>
    <button @click="buy">Buy</button>
  </div>
</template>

<style scoped>
span {
  font-size: 3em;
}
</style>

<script>
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default {
  beforeRouteEnter(to, from) {
    console.log("to", to, "from", from.path);
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const mins = 15;
    const bus = computed(() => store.state.bus);
    const start = computed(() => bus.value.started + mins * 60 * 1000);
    const id = ref(0);
    const now = ref(Date.now());
    const time = computed(() =>
      new Date(start.value - now.value).toTimeString().slice(3, 8)
    );
    onMounted(async () => {
      try {
        const res = await axios.get("/api/tickets/existingticket");
        const ticket = res.data.ticket;
        console.log("time started", new Date(ticket.started).getTime());
        store.commit("setBus", {
          started: new Date(ticket.started).getTime(),
          from: ticket.bus.from,
          to: ticket.bus.to,
        });
        console.log("existing", res.data);
        console.log(bus.value);
      } catch (e) {
        console.log("error no existing");
        router.push("/buses");
      }
      id.value = setInterval(() => {
        now.value = Date.now();
        if (start.value - now.value <= 3000) clearInterval(id.value);
      }, 1000);
    });

    const buy = async () => {
      try {
        const resp = await axios.post("api/payments/checkout");
        const stripe = Stripe("pk_test_51IJe88GOrOLpFC58YcxrRc8Rkp11gPrNGs0LlFc4wRUDx981Mf47rd4kYkFfdRpBihaKdAj2hfkc5jA3LnvZfGNW00lVyuQ3Hp")
        return stripe.redirectToCheckout({sessionId: resp.data.id});
        console.log("response from server", resp);
      } catch (e) {
        console.log("error checking out", e);
      }
    };

    return { time, bus, buy };
  },
};
</script>