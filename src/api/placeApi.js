import apiClient from "./apiClient";

export async function getPlaces(params = {}) {
  const response = await apiClient.get("/places", {
    params,
  });

  return response.data;
}

export async function getPlace(placeId) {
  const response = await apiClient.get(`/places/${placeId}`);

  return response.data;
}
