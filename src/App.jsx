import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PackageDetailPage from './pages/PackageDetailPage';
import Portfolio from './pages/Portfolio';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Cursor />
        <FloatingWhatsApp />
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
            <Route path="/services/packages/:packageSlug" element={<PackageDetailPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancelled" element={<PaymentCancelled />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
