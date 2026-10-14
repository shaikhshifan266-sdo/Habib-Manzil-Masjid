import React from 'react';
import { MasjidProvider, useMasjid } from './context/MasjidContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ServicesPage } from './pages/ServicesPage';
import { PrayerTimingsPage } from './pages/PrayerTimingsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './components/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentPage } = useMasjid();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F0] text-[#26332E]">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'activities' && <ActivitiesPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'prayer-timings' && <PrayerTimingsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />
      <AdminDashboard />
    </div>
  );
};

export default function App() {
  return (
    <MasjidProvider>
      <MainContent />
    </MasjidProvider>
  );
}
