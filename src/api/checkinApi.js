import apiClient from "./apiClient";

export async function checkin(token) {
  const response = await apiClient.post("/checkins", {
    token,
  });

  return response.data;
}
