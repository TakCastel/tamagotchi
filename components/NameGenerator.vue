<template>
  <div class="text-center">
    <div class="text-2xl font-bold text-brown-800 mb-2">{{ store.name }}</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTamagotchiStore } from "~/stores/useTamagotchiStore";

const store = useTamagotchiStore();

onMounted(() => {
  store.initName();
});
</script>
