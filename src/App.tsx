import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { MaintenanceMode } from "@/components/MaintenanceMode";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Gallery from "./pages/Gallery";
import VideoGallery from "./pages/VideoGallery";
import HighSchoolPrograms from "./pages/programs/HighSchoolPrograms";
import CollegiateAthletics from "./pages/programs/CollegiateAthletics";
import ClubTravel from "./pages/programs/ClubTravel";
import LeaguesAcademies from "./pages/programs/LeaguesAcademies";
import CustomTeamOutfit from "./pages/CustomTeamOutfit";
import About from "./pages/About";
import AffiliateProgram from "./pages/AffiliateProgram";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingReturns from "./pages/ShippingReturns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useSmoothScroll();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/custom-team-outfit" element={<CustomTeamOutfit />} />
        <Route path="/about" element={<About />} />
        <Route path="/affiliate" element={<AffiliateProgram />} />
        <Route path="/programs/high-school" element={<HighSchoolPrograms />} />
        <Route path="/programs/collegiate" element={<CollegiateAthletics />} />
        <Route path="/programs/club-travel" element={<ClubTravel />} />
        <Route path="/programs/leagues-academies" element={<LeaguesAcademies />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MaintenanceMode>
              <AppContent />
            </MaintenanceMode>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
