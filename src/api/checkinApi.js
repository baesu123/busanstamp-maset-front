import apiClient from "./apiClient";

/**
 * QR 체크인
 */
export async function checkin(token) {
  const response = await apiClient.post("/checkins", { token });

  return response.data;
}

/**
 * 내 스탬프북
 */
export async function getMyStampBook() {
  const response = await apiClient.get("/checkins/me");

  return response.data;
}
