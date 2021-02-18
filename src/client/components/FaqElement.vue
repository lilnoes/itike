<template>
    <div class="border p-3 shadow-lg rounded-lg my-2 relative">
        <p @click="is_open?close():open()" class="font-bold cursor-pointer">Faq Title</p>
        <p v-show="is_open">Faq Paragraph</p>
        <div @click="open()" v-show="!is_open" class="absolute top-0 right-0 font-extrabold text-3xl transform rotate-90 cursor-pointer hover:text-blue-600">></div>
        <div @click="close()" v-show="is_open" class="absolute top-1 right-1 font-extrabold cursor-pointer border border-red-700 rounded-full h-5 w-5 text-red-700 flex items-center justify-center active:bg-red-600 active:text-white hover:border-green-900">X</div>
    </div>
</template>

<script>
import {ref, watch} from "vue";
import {useStore} from "vuex";
export default {
    setup(props){
        const store = useStore();
        const is_open = ref(false);
        watch(()=>store.state.faq_open, (newVal, oldVal)=>{
            is_open.value = false;
            console.log("faq state changed");
        })
        const open = async()=>{
            await store.commit("closeFaq");
            is_open.value=true;
        }
        const close = ()=>{
            store.commit("closeFaq");
        }
        return {is_open, open, close};
    }
}
</script>