import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import AcceptedDevices from "./pages/AcceptedDevices";
import Phones from "./pages/Phones";
import Laptops from "./pages/Laptops";
import Tablets from "./pages/Tablets";
import GamingConsoles from "./pages/GamingConsoles";
import Cameras from "./pages/Cameras";
import Drones from "./pages/Drones";
import SmartWatches from "./pages/SmartWatches";
import Headphones from "./pages/Headphones";
import OtherDevices from "./pages/OtherDevices";
import Shop from "./pages/Shop";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import GamingPC from "./pages/gamingpc";
import PhoneBrandPage from "./pages/PhoneBrandPage";
import EditorialPage from "./pages/EditorialPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/accepted-devices" element={<AcceptedDevices />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/phones/iphone" element={<PhoneBrandPage brandKey="iphone" />} />
            <Route path="/phones/samsung" element={<PhoneBrandPage brandKey="samsung" />} />
            <Route path="/phones/google-pixel" element={<PhoneBrandPage brandKey="pixel" />} />
            <Route path="/phones/motorola" element={<PhoneBrandPage brandKey="motorola" />} />
            <Route path="/how-it-works" element={<EditorialPage pageKey="how-it-works" />} />
            <Route path="/about" element={<EditorialPage pageKey="about" />} />
            <Route path="/contact" element={<EditorialPage pageKey="contact" />} />
            <Route path="/guides/phone-selling-checklist" element={<EditorialPage pageKey="phone-selling-checklist" />} />
            <Route path="/guides/device-data-and-privacy" element={<EditorialPage pageKey="device-data-and-privacy" />} />
            <Route path="/guides/device-condition-guide" element={<EditorialPage pageKey="condition-guide" />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/gaming-consoles" element={<GamingConsoles />} />
            <Route path="/gamingpc" element={<GamingPC />} />
            <Route path="/gaming-pc" element={<GamingPC />} />
            <Route path="/gaming-pcs" element={<GamingPC />} />
            <Route path="/cameras" element={<Cameras />} />
            <Route path="/drones" element={<Drones />} />
            <Route path="/smart-watches" element={<SmartWatches />} />
            <Route path="/headphones" element={<Headphones />} />
            <Route path="/other-devices" element={<OtherDevices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
