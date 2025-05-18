<template>
  <div class="flex justify-around w-full max-w-md p-4">
    <button
      v-for="action in actions"
      :key="action.name"
      :disabled="isButtonDisabled(action.name)"
      :style="{ '--bg-color': action.bgColor }"
      :class="{
        'opacity-50 cursor-not-allowed': isButtonDisabled(action.name),
      }"
      @click="handleClick($event, action.name)"
    >
      <div class="button-inner">
        <Icon
          :name="
            action.name === 'coucher' && store.isSleeping
              ? 'emojione:sun'
              : action.icon
          "
          class="icon"
        />
      </div>
    </button>
  </div>
</template>

<script setup>
import { useTamagotchiStore } from "~/stores/useTamagotchiStore";
const store = useTamagotchiStore();

const actions = [
  { name: "nourrir", icon: "emojione:bread", bgColor: "#f59e0b" },
  { name: "laver", icon: "emojione:bathtub", bgColor: "#3b82f6" },
  { name: "jouer", icon: "emojione:game-die", bgColor: "#22c55e" },
  {
    name: "coucher",
    icon: "emojione:last-quarter-moon-face",
    bgColor: "#8b5cf6",
  },
  { name: "soigner", icon: "emojione:syringe", bgColor: "#ef4444" },
];

function isButtonDisabled(actionName) {
  // Si la santé est à 0, seul le soin est possible
  if (store.health <= 0) return actionName !== "soigner";

  if (store.isSleeping) {
    return actionName !== "coucher";
  }
  if (actionName === "coucher" && store.energy >= 30) return true;
  if (actionName === "jouer" && store.energy < 10) return true;

  return false;
}

function handleClick(event, actionName) {
  triggerBlop(event);

  if (actionName === "coucher" && store.isSleeping) {
    store.wakeUp();
  } else if (actionName === "coucher") {
    store.startSleeping(); // 👈 Manque peut-être cette ligne !
  } else {
    store.applyAction(actionName);
  }
}

function triggerBlop(event) {
  const target = event.currentTarget.querySelector(".button-inner");
  target.classList.remove("blop-animate");
  void target.offsetWidth;
  target.classList.add("blop-animate");
}
</script>

<style scoped>
/* Fix highlight and touch behavior on mobile */
button {
  -webkit-tap-highlight-color: transparent;
}
body {
  touch-action: manipulation;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}

.button-inner {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.icon {
  width: 2rem;
  height: 2rem;
  pointer-events: none;
}

/* Remove native active effects */
.action-button:active .button-inner {
  transform: none;
}

/* Hover effect for desktop */
.action-button:hover .button-inner {
  filter: brightness(110%);
}

/* Animation */
.blop-animate {
  animation: blop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes blop {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(0.85);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
