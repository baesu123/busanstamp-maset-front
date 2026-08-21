import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 요청 interceptor
 *
 * Access Token이 있으면 모든 API 요청에 자동으로 추가합니다.
 */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 응답 interceptor
 *
 * 저장된 토큰이 있는데 401이 발생하면
 * 만료되거나 잘못된 토큰으로 판단하고 삭제합니다.
 */
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? "";

    const isLoginRequest = requestUrl.includes("/auth/login");

    const hasAccessToken = Boolean(useAuthStore.getState().accessToken);

    if (status === 401 && !isLoginRequest && hasAccessToken) {
      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
