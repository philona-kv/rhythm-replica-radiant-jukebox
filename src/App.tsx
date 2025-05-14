import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import PlaylistView from "./pages/PlaylistView";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerProvider>
        <div className="h-full overflow-hidden">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="library" element={<Library />} />
                <Route path="playlist/:id" element={<PlaylistView />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
