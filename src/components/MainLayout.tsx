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
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      <div className="flex-shrink-0">
        <TopBar />
      </div>

      <div className="flex w-full px-2 flex-grow overflow-hidden">
        <div className="w-full max-w-[98%] mx-auto flex gap-2 my-2">
          <div className="bg-spotify-dark rounded-lg overflow-hidden min-w-[280px] h-[calc(100vh-148px)]">
            <Sidebar />
          </div>

          <div className="flex-grow bg-spotify-dark rounded-lg overflow-hidden h-[calc(100vh-148px)]">
            <main className="h-full overflow-y-auto custom-scrollbar">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default MainLayout;
