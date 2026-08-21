import { Navigate, Outlet, useLocation } from "react-router";

import { useAuthStore } from "../../stores/authStore";

function AdminRoute() {
  const location = useLocation();

  const accessToken = useAuthStore((state) => state.accessToken);

  const user = useAuthStore((state) => state.user);

  if (!accessToken || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
