import apiClient from "./apiClient";

export async function getPlaceQr(placeId) {
  const response = await apiClient.get(`/admin/places/${placeId}/qr`, {
    responseType: "blob",
  });

  return response.data;
}
