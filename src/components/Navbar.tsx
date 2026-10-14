import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import { MasjidLogo } from './MasjidLogo';
import { PageView } from '../types/masjid';
import { Navigation, Menu, X, Clock, MapPin, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, setIsAdminModalOpen, isAdminAuthenticated } = useMasjid();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Activities & Events', page: 'activities' },
    { label: 'Our Services', page: 'services' },
    { label: 'Prayer Timings', page: 'prayer-timings' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const openGoogleMaps = () => {
    // Verified location: Habib Manzil Masjid Behind SBI Bank, Nerul Sector 20, Navi Mumbai
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Habib+Manzil+Masjid+Nerul+Sector+20+Navi+Mumbai',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#0e3b2e] text-[#E8DCC7] text-xs py-1.5 px-4 text-center border-b border-[#145744]/40 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Nerul, Navi Mumbai</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="hidden sm:inline text-[#A8BFA8]">Behind SBI Bank, Sector 20</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('prayer-timings')}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="font-medium">Daily Jama'ah Timetable</span>
            </button>
            <span aria-hidden="true" className="opacity-30">·</span>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-[#A8BFA8] hover:text-[#C6A15B] transition-colors flex items-center gap-1 cursor-pointer"
              title="Masjid Administration Portal"
            >
              <Shield className="w-3 h-3" />
              <span>{isAdminAuthenticated ? 'Admin Panel' : 'Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation conforming to strict Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F0]/95 backdrop-blur-md border-b border-[#E8DCC7] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single Brand Zone wordmark (shrink-0, whitespace-nowrap) */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left cursor-pointer group focus:outline-hidden"
              aria-label="Habib Manzil Masjid Home"
            >
              <MasjidLogo size={46} showText={true} />
            </button>

            {/* Zone 2: 5-6 Clean Nav Links with subtle underline hover */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#26332E]">
              {navLinks.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`relative py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 text-sm ${
                      isActive
                        ? 'text-[#145744] font-semibold'
                        : 'text-[#445650] hover:text-[#145744]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#145744] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (Get Directions) + Mobile Menu Trigger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={openGoogleMaps}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Get Directions</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-[#145744] hover:bg-[#E8DCC7]/50 focus:outline-hidden"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8DCC7] bg-[#FAF8F0] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#145744] text-white font-semibold'
                        : 'text-[#26332E] hover:bg-[#E8DCC7]/40'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-3 border-t border-[#E8DCC7]/80 mt-2 flex flex-col gap-2">
                <button
                  onClick={openGoogleMaps}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-sm cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#C6A15B]" />
                  <span>Get Directions (Google Maps)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-[#145744] border border-[#145744]/20 hover:bg-[#E8DCC7]/30 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Administration Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
