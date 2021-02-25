<template>
    <div class="p-2">
        <p class="text-lg">
            Kugura Itike <span v-if="success" class="font-bold">byakunze</span>
            <span v-if="!success" class="font-bold">byanze</span>
        </p>
        <div>
            <p>amazina: {{ticket.first_name}} {{ticket.last_name}}</p>
            <p>iva: {{ticket.bus.from}} ikagera: {{ticket.bus.to}}</p>
            <p>itariki: {{ticket.bus.date}}</p>
            <div><img class="w-20 h-20" :src="src"/></div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
    setup() {
        const route = useRoute();
        const success = ref(false);
        const src = ref("");
        const id = route.query.session_id;
        const ticket = ref({});
        onBeforeMount(async () => {
            try {
                const res = await axios.post("/api/payments/stripe", {
                    session_id: id,
                });
                ticket.value = res.data.ticket;
                success.value = ticket.value.paid;
                src.value = ticket.value.qr_url;
                console.log("stripe data", res);
                console.log("mounted success");
            } catch (e) {
                console.log("error", e);
            }
        });
        return { success, ticket , src};
    },
};
</script>
