// stores/useTamagotchiStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTamagotchiStore = defineStore(
  "tamagotchi",
  () => {
    const name = ref("");

    function initName() {
      if (!name.value) {
        name.value = generateRandomName();
      }
    }

    const hunger = ref(75);
    const cleanliness = ref(75);
    const fun = ref(80);
    const energy = ref(100);
    const health = ref(100);

    const DECAY_INTERVAL = 1000;
    const DECAY_AMOUNT = 1;

    const isSleeping = ref(false);

    function generateRandomName() {
      const prefixes = ["Mo", "Chi", "Ba", "Lu", "Ki", "Zo", "Po", "Ni"];
      const suffixes = ["mi", "chan", "bo", "ri", "nette", "ki", "zou", "pouf"];

      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

      return prefix + suffix;
    }

    function applyAction(action) {
      // Si mort, seul "soigner" est autorisé pour réanimer
      if (health.value <= 0 && action !== "soigner") return;

      // Si en train de dormir, tout est bloqué sauf "coucher" (pour réveiller) et "soigner"
      if (isSleeping.value && !["coucher", "soigner"].includes(action)) return;

      const increase = 10;
      const decrease = 2;
      const playCost = health.value > 100 ? 2 : 5;

      switch (action) {
        case "nourrir":
          hunger.value = Math.min(hunger.value + increase, 200);
          cleanliness.value = Math.max(cleanliness.value - decrease, 0);
          energy.value = Math.max(energy.value - decrease + 1, 0);
          break;

        case "laver":
          cleanliness.value = Math.min(cleanliness.value + increase, 100);
          break;

        case "jouer":
          fun.value = Math.min(fun.value + increase, 100);
          energy.value = Math.max(energy.value - playCost, 0);
          break;

        case "coucher":
          if (isSleeping.value) {
            isSleeping.value = false; // Réveil manuel
          } else if (energy.value < 10) {
            startSleeping();
          }
          break;

        case "soigner":
          if (health.value <= 0) {
            // Réanimation : santé et énergie de base
            health.value = 50;
            energy.value = 50;
            isSleeping.value = false;
          } else {
            health.value = Math.min(health.value + increase, 200);
          }
          break;
      }
    }

    function decay() {
      const decayRate = health.value > 100 ? DECAY_AMOUNT / 2 : DECAY_AMOUNT;
      const recoveryRate = health.value > 100 ? 2 : 1;

      hunger.value = Math.max(hunger.value - decayRate, 0);
      cleanliness.value = Math.max(cleanliness.value - decayRate, 0);
      fun.value = Math.max(fun.value - decayRate, 0);

      if (isSleeping.value) {
        // Pendant le sommeil, l'énergie remonte
        energy.value = Math.min(energy.value + recoveryRate, 100);

        if (energy.value >= 100) {
          isSleeping.value = false; // Réveil automatique
        }
      } else {
        energy.value = Math.max(energy.value - decayRate, 0);

        if (energy.value === 0) {
          isSleeping.value = true; // Sommeil forcé
        }
      }

      if (hunger.value === 0) {
        health.value = Math.max(health.value - decayRate, 0);
      }
    }

    function startDecay() {
      setInterval(decay, DECAY_INTERVAL);
    }

    function startSleeping() {
      isSleeping.value = true;
    }

    function wakeUp() {
      isSleeping.value = false;
    }

    return {
      name,
      initName,
      hunger,
      cleanliness,
      fun,
      energy,
      health,
      applyAction,
      wakeUp,
      startSleeping,
      startDecay,
      isSleeping,
    };
  },
  {
    persist: true,
  }
);
