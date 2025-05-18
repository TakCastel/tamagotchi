<template>
  <div
    class="min-h-screen bg-orange-200 flex flex-col items-center justify-between p-4"
  >
    <NameGenerator />

    <!-- Tamagoshi -->
    <Tamagotchi :emotion="emotion" />

    <!-- Jauges -->
    <div
      class="w-full max-w-md bg-white/50 p-4 rounded-xl shadow-md space-y-4 mb-[110px]"
    >
      <Gauge label="Faim" color="orange" :value="store.hunger" />
      <div class="h-px bg-[#E5B87D]" />

      <Gauge label="Propreté" color="blue" :value="store.cleanliness" />
      <div class="h-px bg-[#E5B87D]" />

      <Gauge label="Amusement" color="green" :value="store.fun" />
      <div class="h-px bg-[#E5B87D]" />

      <Gauge label="Énergie" color="purple" :value="store.energy" />
      <div class="h-px bg-[#E5B87D]" />

      <Gauge label="Santé" color="red" :value="store.health" />
    </div>

    <!-- Actions -->
    <div class="fixed bottom-4 w-full flex justify-center">
      <BottomActions :is-sleeping="store.isSleeping" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTamagotchiStore } from "~/stores/useTamagotchiStore";

const emotion = ref("heureuse");
const store = useTamagotchiStore();

onMounted(() => {
  store.startDecay();
});
</script>
