import { useEffect } from "react";
import { getMyInfo } from "../../api/authApi";
import { useAuthStore } from "../../stores/authStore";

function AuthInitializer({ children }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  const isInitialized = useAuthStore((state) => state.isInitialized);

  const setUser = useAuthStore((state) => state.setUser);

  const clearAuth = useAuthStore((state) => state.clearAuth);

  const finishInitialization = useAuthStore(
    (state) => state.finishInitialization,
  );

  useEffect(() => {
    async function initializeAuth() {
      if (!accessToken) {
        finishInitialization();
        return;
      }
      //토큰이 있을경우 유저정보를 가져옴
      try {
        const user = await getMyInfo();

        setUser(user); // 유저 정보 저장
      } catch {
        clearAuth(); // 에러 발생 시 토큰 삭제
      } finally {
        finishInitialization(); // 종료
      }
    }

    initializeAuth(); // 처음 시작 또는 새로고침 실행
  }, [accessToken, setUser, clearAuth, finishInitialization]);
  //토큰 바뀜, 새로 유저 저장, 토큰 삭제, 상태 변경 시 재시작
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            로그인 정보를 확인하고 있습니다.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

export default AuthInitializer;
