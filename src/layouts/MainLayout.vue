<template>
  <div class="layout">
    <HeaderCustom />
    <main>
      <slot></slot>
    </main>
    <FooterCustom />
  </div>
</template>

<script setup>
import HeaderCustom from "@/components/HeaderCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}
</style>
