<template>
  <div class="ticket w3-container">
    <div class="image">
      <img src="../assets/volcano.png" />
    </div>
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
    <p class="location">{{ from }} > {{ to }}</p>
    <p class="duration">(amasaha 5)</p>
    <p class="money">2000 RWF</p>
    <button @click="fata" class="w3-btn fata">Fata</button>
    <p class="imyanya">yuzuye</p>
    <hr />
  </div>
</template>

<style lang="less" scoped>
@import "../css/variables.less";
.ticket {
  color: @dark;
  box-shadow: 0px 4px 4px rgba(77, 77, 77, 0.74);
  border-radius: 10px;
  width: 90%;
  position: relative;
  height: 150px;
  margin-left: 5%;
  margin-top: 1%;
  overflow: hidden;
  p,
  hr,
  button {
    position: absolute;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .image {
    height: 50px;
    width: 100px;
  }
  hr {
    color: red;
  }
  .fata {
    right: 10px;
    top: 20px;
  }
  hr {
    width: 98%;
    top: 50%;
    opacity: 0.5;
    border: 1px solid #4d4d4d;
    left: 0.5%;
  }
  .imyanya {
    right: 2%;
    top: 70%;
  }
  .time {
    top: 0%;
    left: 30%;
  }
  .location {
    top: 12%;
    left: 33%;
  }
  .duration {
    top: 23%;
    left: 33%;
  }
  .money {
    right: 20%;
    top: 10%;
  }
  .date {
    top: 0%;
    left: 34%;
  }
}
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