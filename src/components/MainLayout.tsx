import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const MainLayout = () => {
  useEffect(() => {
    // Set theme to dark mode
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden">
      <TopBar />

      <div className="flex justify-center w-full px-2 flex-grow pb-20">
        <div className="w-full max-w-[98%] flex gap-2 my-2">
          <div className="bg-spotify-dark rounded-lg overflow-hidden min-w-[280px] max-h-[calc(100vh-140px)]">
            <Sidebar />
          </div>

          <div className="flex-grow bg-spotify-dark rounded-lg overflow-hidden max-h-[calc(100vh-140px)]">
            <main className="h-full overflow-y-auto custom-scrollbar">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
