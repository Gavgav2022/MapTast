import polygons from "@/services/polygons.json";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import * as turf from "@turf/turf";

export const useAppStore = defineStore("app", () => {
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
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: coordinates[0],
            lon: coordinates[1],
            format: "json",
            addressdetails: 1,
          },
        }
      );
      if (
        response.data.addresstype !== "boundary" &&
        response.data.addresstype !== "town" &&
        response.data.addresstype !== "village" &&
        response.data.addresstype !== "municipality" &&
        response.data.addresstype !== "city"
      ) {
        return;
      }
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
    try {
      isLoadingDetails.value = true;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: cityData.display_name,
            format: "json",
            addressdetails: 1,
          },
        }
      );
      cityDetailData.value = response.data[0];
      isLoadingDetails.value = false;
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
    const center = turf.center(turf.polygon(coordinates));
    return center.geometry.coordinates;
  }

  function getCenterSingle(coordinates) {
    const center = turf.center(turf.points(coordinates));
    return center.geometry.coordinates;
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
