<template>
  <MainLayout>
    <template #default>
      <div class="home-view">
        <LeftSidebar />
        <div class="map-container">
          <MapMain />
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import LeftSidebar from "@/components/home/LeftSidebar.vue";
import MapMain from "@/components/home/MapMain.vue";
</script>

<style scoped>
.home-view {
  display: flex;
  height: calc(100vh - 110px);
  margin-bottom: 50px;
}
.map-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
