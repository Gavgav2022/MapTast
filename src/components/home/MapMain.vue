<template>
  <LMap
    v-if="store.center"
    :zoom="zoom"
    :center="store.center"
    style="height: calc(100vh - 108px); width: 100%"
    ref="mapInstance"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      :attribution="attribution"
    />
    <LPolygon
      v-for="(polygon, index) in polygons.features"
      :key="index"
      :lat-lngs="polygon.geometry.coordinates"
      :color="getRandomColor()"
      :fill="true"
      :fillOpacity="0.5"
      fillColor="#41b782"
      :weight="10"
    />
    <LRectangle v-if="store.bounds" :bounds="store.bounds" />
  </LMap>
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import {
  LMap,
  LTileLayer,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppStore } from "@/store";

const store = useAppStore();
store.transformToGeoJSON();
const mapInstance = ref(null);
const polygons = ref(store.mapData);
const zoom = ref(12);
const attribution = ref("© OpenStreetMap contributors");
const hasFitBoundsExecuted = ref(false);

const allCoordinates = computed(() =>
  store.mapData.features.map((polygon) => polygon.geometry.coordinates)
);

watch(
  () => mapInstance.value?.ready,
  (ready) => {
    if (!ready || hasFitBoundsExecuted.value) return;
    store.getBoundsMain();
    mapInstance.value.leafletObject.fitBounds(store.bounds);
    hasFitBoundsExecuted.value = true;
  }
);
watch(
  () => store.bounds,
  () => {
    if (!mapInstance.value?.ready && !hasFitBoundsExecuted.value) return;
    mapInstance.value.leafletObject.fitBounds([store.bounds], {
      animate: true,
    });
  }
);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

onBeforeMount(() => {
  store.center = store.getCenterPolygons(allCoordinates.value);
  const fetchCitiesList = async () => {
    store.isLoading = true;
    for (let i = 0; i < store.mapData.features.length; i++) {
      await store.fetchCityByCoordinates(
        store.getCenterSingle(store.mapData.features[i].geometry.coordinates)
      );
    }
    store.isLoading = false;
  };
  fetchCitiesList();
});
</script>

<style scoped>
.show-btn {
  position: absolute;
  bottom: 50px;
  left: 50px;
  z-index: 1000;
  padding: 10px 15px;
  background-color: #41b782;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
