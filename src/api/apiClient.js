import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
  baseURL: "https://busanstamp-69a9.onrender.com/api",
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
    const status = error.response?.status; //에러 상태코드 확인
    const requestUrl = error.config?.url ?? ""; //에러 요청주소 확인
    //로그인 요청인지 확인 (참, 거짓)
    const isLoginRequest = requestUrl.includes("/auth/login");
    //jwt 액세스 토큰이 있는지 확인
    const hasAccessToken = Boolean(useAuthStore.getState().accessToken);

    if (status === 401 && !isLoginRequest && hasAccessToken) {
      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
