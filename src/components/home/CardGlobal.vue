<script setup>
import { defineProps } from "vue";
defineProps({
  place: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="place-card">
    <h3 class="place-name">{{ place.data.name || place.data.display_name }}</h3>
    <p class="place-country">{{ place.data.address.country }}</p>
    <p class="place-district">{{ place.data.address.district }}</p>
  </div>
</template>

<style scoped lang="scss">
.place-card {
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #3498db99;
    cursor: pointer;
    border: 1px solid #06ab06;
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    border: 1px solid #3498db99;
  }
}

.place-name {
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
}

.place-country {
  font-size: 12px;
}

.place-district {
  font-size: 12px;
}
</style>
