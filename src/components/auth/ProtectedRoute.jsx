import { Navigate, Outlet, useLocation } from "react-router";

import { useAuthStore } from "../../stores/authStore";

function ProtectedRoute() {
  const location = useLocation(); //요청한 주소 객체

  const accessToken = useAuthStore((state) => state.accessToken);

  const user = useAuthStore((state) => state.user);

  if (!accessToken || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location, //이전 주소 전달
        }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
