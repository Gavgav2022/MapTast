import * as turf from "@turf/turf";

export function useMapApi() {
  const getCenterPolygons = (coordinates) => {
    const center = turf.center(turf.polygon(coordinates));
    return center.geometry.coordinates;
  };

  const getCenterSingle = (coordinates) => {
    const center = turf.center(turf.points(coordinates));
    return center.geometry.coordinates;
  };

  const getBounds = (allCoordinatesList) => {
    const bbox = turf.bbox(turf.polygon(allCoordinatesList));
    const bounds = [
      [bbox[0], bbox[1]], // minLat, minLon
      [bbox[2], bbox[3]], // maxLat, maxLon
    ];
    return bounds;
  };

  return {
    getCenterPolygons,
    getCenterSingle,
    getBounds,
  };
}
