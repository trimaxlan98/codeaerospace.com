
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import LoadingScreen from '@/components/LoadingScreen';
import StarfieldBackground from '@/components/StarfieldBackground';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        <StarfieldBackground />
        <div className="min-h-screen bg-[#0a0e27] text-slate-200 font-sans relative z-10">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
