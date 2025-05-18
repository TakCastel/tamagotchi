<template>
  <div
    v-show="showMessage"
    :class="[
      'fixed px-4 py-2 rounded-full shadow-lg text-base max-w-xs transition-opacity duration-500',
      'bg-white/80 border-2 border-gray-800 text-gray-900 font-bold italic',
    ]"
    :style="bubblePosition"
  >
    {{ currentMessage }}
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";

const props = defineProps({
  emotion: {
    type: String,
    required: true,
  },
});

const currentMessage = ref("");
const showMessage = ref(false);
const position = ref("center");
const timer = ref(null);

const messageSets = {
  heureuse: {
    messages: ["Hihi !", "J'suis trop bien là !", "Ça c'est la belle vie !"],
  },
  triste: {
    messages: ["*soupir*", "Personne m'aime...", "La vie est dure..."],
  },
  cracra: {
    messages: ["Beurk, ça colle !", "Un bain vite !", "*renifle* ouhlala..."],
  },
  grognon: {
    messages: ["Grrr...", "S'occupe-toi de moi !", "Suis pas contente !"],
  },
  malade: { messages: ["J'suis pas bien...", "Docteur...?", "Tout tourne..."] },
  fatiguée: {
    messages: ["J'ai envie de dormir...", "Bonne nuit ?", "Je pique du nez..."],
  },
  endormie: {
    messages: ["Zzz...", "*ronfle bruyamment*", "Rronn... pich !"],
  },
  morte: { messages: ["...", "C'est fini pour moi...", "Oskour..."] },
  bienMangee: {
    messages: ["J'ai trop mangé...", "*rot* Oups !", "C'était délicieux !"],
  },
  musclée: {
    messages: [
      "Regarde ces biscotos !",
      "Je me sens invincible !",
      "Prête pour l'aventure !",
    ],
  },
};

let lastMessage = "";

function pickMessage() {
  const { messages } = messageSets[props.emotion] || { messages: ["..."] };

  let newMessage;
  do {
    newMessage = messages[Math.floor(Math.random() * messages.length)];
  } while (newMessage === lastMessage && messages.length > 1);

  lastMessage = newMessage;
  currentMessage.value = newMessage;

  const choices = ["left", "center", "right"];
  position.value = choices[Math.floor(Math.random() * choices.length)];
}

function startSpeechCycle() {
  timer.value = setInterval(() => {
    pickMessage();
    showMessage.value = true;

    setTimeout(() => {
      showMessage.value = false;
    }, 10000); // Visible pendant 10 secondes
  }, 30000); // Toutes les 30 secondes
}

const bubblePosition = computed(() => {
  const positions = {
    left: { top: "10%", left: "25%" },
    center: { top: "10%", left: "50%", transform: "translateX(-50%)" },
    right: { top: "10%", right: "25%" },
  };
  return positions[position.value];
});

onMounted(startSpeechCycle);
onUnmounted(() => clearInterval(timer.value));
</script>
