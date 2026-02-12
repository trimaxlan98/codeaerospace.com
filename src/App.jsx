
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0a0e27] text-slate-200 font-sans">
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
  );
};

export default App;
