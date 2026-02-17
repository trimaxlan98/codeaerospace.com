
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import VetClinicDemo from '@/pages/demos/vet-clinic/VetClinicDemo';
import PharmacyDemo from '@/pages/demos/pharmacy/PharmacyDemo';
import LoadingScreen from '@/components/LoadingScreen';
import StarfieldBackground from '@/components/StarfieldBackground';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from "@/components/ui/toaster";

const MainLayout = ({ children, loading, setLoading }) => (
  <>
    {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
    <StarfieldBackground />
    <div className="min-h-screen bg-[#0a0e27] text-slate-200 font-sans relative z-10">
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster />
    </div>
  </>
);

const DemoLayout = ({ children }) => (
  <div className="min-h-screen">
    <main>{children}</main>
    <Toaster />
  </div>
);

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isDemo = location.pathname.startsWith('/demo');

  if (isDemo) {
    return (
      <DemoLayout>
        <ScrollToTop />
        <Routes>
          <Route path="/demo/veterinaria" element={<VetClinicDemo />} />
          <Route path="/demo/farmacia" element={<PharmacyDemo />} />
        </Routes>
      </DemoLayout>
    );
  }

  return (
    <MainLayout loading={loading} setLoading={setLoading}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MainLayout>
  );
};

const App = () => (
  <LanguageProvider>
    <Router>
      <AppRoutes />
    </Router>
  </LanguageProvider>
);

export default App;
