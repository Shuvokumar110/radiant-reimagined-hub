import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import HighSchoolPrograms from "./pages/programs/HighSchoolPrograms";
import CollegiateAthletics from "./pages/programs/CollegiateAthletics";
import ClubTravel from "./pages/programs/ClubTravel";
import LeaguesAcademies from "./pages/programs/LeaguesAcademies";
import CustomTeamOutfit from "./pages/CustomTeamOutfit";
import About from "./pages/About";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/custom-team-outfit" element={<CustomTeamOutfit />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs/high-school" element={<HighSchoolPrograms />} />
          <Route path="/programs/collegiate" element={<CollegiateAthletics />} />
          <Route path="/programs/club-travel" element={<ClubTravel />} />
          <Route path="/programs/leagues-academies" element={<LeaguesAcademies />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
