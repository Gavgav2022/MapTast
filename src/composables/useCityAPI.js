import axios from "axios";

export function useCityApi() {
  const fetchCityByCoordinates = async (coordinates) => {
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
    return response;
  };

  const fetchPlaceDetails = async (cityData) => {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: cityData.display_name,
          format: "json",
          addressdetails: 1,
        },
      }
    );
    return response;
  };

  return {
    fetchCityByCoordinates,
    fetchPlaceDetails,
  };
}
