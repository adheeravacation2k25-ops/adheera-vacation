import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Chatbot } from './components/layout/Chatbot';
import { BackToTop } from './components/layout/BackToTop';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { PackagesPage } from './pages/PackagesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { BookingPage } from './pages/BookingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-deep-blue transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/destination/:id" element={<DestinationDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
        <Footer />
        <Chatbot />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
