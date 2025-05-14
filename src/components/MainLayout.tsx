
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MusicPlayer from "./MusicPlayer";
import { useEffect } from "react";

const MainLayout = () => {
  useEffect(() => {
    // Set theme to dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <main className="flex-grow overflow-y-auto relative">
          <TopBar />
          <Outlet />
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
