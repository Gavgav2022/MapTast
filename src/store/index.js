import polygons from "@/services/polygons.json";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import * as turf from "@turf/turf";
import { useApi } from "@/composables/useApi";

export const useAppStore = defineStore("app", () => {
  const { cityApi, mapApi } = useApi();
  const cityDetailData = ref();
  const mapData = ref([]);
  const cityCache = ref([]);
  const isLoadingDetails = ref(false);
  const isLoading = ref(false);
  const center = ref([51.505, -0.09]);
  const bounds = ref([
    [51.505, -0.09],
    [51.51, -0.1],
  ]);

  const allCoordinatesList = computed(() =>
    mapData.value.features.map((polygon) => polygon.geometry.coordinates)
  );

  function transformToGeoJSON() {
    mapData.value = {
      type: "FeatureCollection",
      features: polygons.map((polygon) => ({
        type: "Feature",
        properties: {
          id: polygon.id,
          name: polygon.name,
        },
        geometry: {
          type: "Polygon",
          coordinates: polygon.polygon.map((p) => [p.lat, p.lng]),
        },
      })),
    };
  }

  async function fetchCityByCoordinates(coordinates) {
    const cachedResult = cityCache.value.find(
      (item) =>
        item.key.lat === coordinates[0] && item.key.lon === coordinates[1]
    );
    if (cachedResult) {
      return cachedResult.data;
    }

    try {
      const response = await cityApi.fetchCityByCoordinates(coordinates);
      cityCache.value.push({
        key: { lat: coordinates[0], lon: coordinates[1] },
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при запросе города:", error);
      return null;
    }
  }

  async function fetchPlaceDetails(cityData) {
    const cachedPlace = cityCache.value.find(
      (item) => item.key.id === cityData.osm_id
    );
    if (cachedPlace) {
      cityDetailData.value = cachedPlace.data;
      return cachedPlace.data;
    }

    try {
      isLoadingDetails.value = true;
      const response = await cityApi.fetchPlaceDetails(cityData);
      cityDetailData.value = response.data[0];

      cityCache.value.push({
        key: { id: cityData.osm_id },
        data: response.data[0],
      });

      isLoadingDetails.value = false;
      return response.data[0];
    } catch (error) {
      console.error("Ошибка при получении данных о населенном пункте:", error);
      isLoadingDetails.value = false;
      return {};
    }
  }

  function getBoundsMain() {
    const bbox = turf.bbox(turf.polygon(allCoordinatesList.value));
    const boundsAll = [
      [bbox[0], bbox[1]],
      [bbox[2], bbox[3]],
    ];
    bounds.value = boundsAll;
  }

  function getCenterPolygons(coordinates) {
    return mapApi.getCenterPolygons(coordinates);
  }

  function getCenterSingle(coordinates) {
    return mapApi.getCenterSingle(coordinates);
  }

  return {
    mapData,
    cityCache,
    isLoading,
    center,
    bounds,
    cityDetailData,
    isLoadingDetails,
    allCoordinatesList,
    transformToGeoJSON,
    fetchCityByCoordinates,
    fetchPlaceDetails,
    getBoundsMain,
    getCenterPolygons,
    getCenterSingle,
  };
});
