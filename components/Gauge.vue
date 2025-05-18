<template>
  <div class="flex items-center space-x-4 w-full">
    <!-- Label -->
    <span class="font-semibold text-brown-800 text-base w-24 text-left">
      {{ label }}
    </span>

    <!-- Jauge -->
    <div class="flex-1 bg-[#F5D8A8] rounded-full h-5 overflow-hidden">
      <div
        class="h-5 rounded-full transition-all duration-300"
        :style="{
          width: value + '%',
          backgroundColor: colorMap[color] || colorMap.default,
        }"
      />
    </div>

    <!-- Pourcentage -->
    <span class="text-base text-brown-800 font-semibold w-12 text-right">
      {{ value.toFixed(1) }}%
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  color: String,
  value: Number,
});

const colorMap = {
  orange: "#F59E0B",
  blue: "#3B82F6",
  green: "#22C55E",
  purple: "#8B5CF6",
  red: "#EF4444",
  default: "#6B7280",
};
</script>

<style scoped>
.text-brown-800 {
  color: #5c2e10;
}
</style>
