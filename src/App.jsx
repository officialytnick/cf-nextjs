
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ToolPage from '@/pages/ToolPage';
// import StaticPage from '@/pages/StaticPage';
import ScrollToTop from '@/components/ScrollToTop';
import ImageTools from '@/components/ImageTools';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';
import Cookies from '@/pages/Cookies';


const App = () => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F8F9FA] dark:bg-[#18191a]">
        <Header key={location.key} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/image-tools" element={<ImageTools />} />
            <Route path="/:toolId" element={<ToolPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
};

export default App;
