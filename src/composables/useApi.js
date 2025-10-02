import { useCityApi } from "./useCityAPI";
import { useMapApi } from "./useMapApi";

export function useApi() {
  return {
    cityApi: useCityApi(),
    mapApi: useMapApi(),
  };
}
