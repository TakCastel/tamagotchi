<template>
  <div class="flex flex-col items-center space-y-4">
    <TamagotchiSpeech :emotion="currentEmotion" />

    <img
      :src="images[currentEmotion]"
      alt="Tamagoshi"
      class="w-48 h-48 object-contain mx-auto transition-transform duration-300"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useTamagotchiStore } from "@/stores/useTamagotchiStore";

const store = useTamagotchiStore();
const { hunger, cleanliness, fun, energy, health, isSleeping } =
  storeToRefs(store);

const images = {
  heureuse: "/images/heureuse.png",
  musclée: "/images/musclee.png",
  triste: "/images/triste.png",
  fatiguée: "/images/fatiguee.png",
  malade: "/images/malade.png",
  grognon: "/images/grognon.png",
  cracra: "/images/cracra.png",
  bienMangee: "/images/bienmangee.png",
  endormie: "/images/endormie.png",
  morte: "/images/morte.png",
};

const currentEmotion = computed(() => {
  if (health.value <= 0) return "morte";
  if (isSleeping.value) return "endormie";
  if (health.value < 30) return "malade";
  if (energy.value < 30) return "fatiguée";

  const lowStats = {
    hunger: hunger.value < 50,
    cleanliness: cleanliness.value < 50,
    fun: fun.value < 50,
  };

  const lowCount = Object.values(lowStats).filter(Boolean).length;

  if (lowCount >= 2) return "triste";
  if (lowCount === 1 && lowStats.cleanliness) return "cracra";
  if (lowCount === 1) return "grognon";

  if (hunger.value > 100) return "bienMangee"; // Cas spécial : a trop mangé !
  if (health.value > 100) return "musclée";

  return "heureuse";
});
</script>
