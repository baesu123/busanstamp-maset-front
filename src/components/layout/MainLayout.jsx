import { Outlet } from "react-router";
import Header from "./Header";

function MainLayout() {
  return (
    //기본 화면 구조 (헤더 상단), Outlet 을 통해 페이지 별 표시
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
