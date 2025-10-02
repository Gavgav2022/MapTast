<script setup>
import { defineProps } from "vue";

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  textShow: {
    type: String,
    default: "Завантаження...",
  },
});
</script>

<template>
  <div v-if="isLoading" class="loader-container">
    <div class="loader"></div>
    <p class="loader-text">{{ textShow }}</p>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loader {
  border: 4px solid #f3f3f3; /* Светлый фон */
  border-top: 4px solid #3498db; /* Цвет вращающейся части */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1.5s linear infinite;
}

.loader-text {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 700;
  color: #3498db;
}

/* Анимация вращения */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
