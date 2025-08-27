import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div
      className="min-h-screen grid 
      grid-rows-[auto_1fr] grid-cols-1 
      md:grid-rows-[auto_auto_1fr] md:grid-cols-1 
      lg:grid-rows-[auto_1fr] lg:grid-cols-[8rem_1fr]"
    >
      <Header className="row-start-1 col-span-full" />

      <Sidebar className="row-start-2 lg:col-start-1 lg:row-start-2" />

      <main className="row-start-3 md:row-start-3 lg:row-start-2 lg:col-start-2 bg-[#111]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
