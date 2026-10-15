import React from 'react';
import { useMasjid } from '../context/MasjidContext';
import { MasjidLogo } from './MasjidLogo';
import { PageView } from '../types/masjid';
import { MapPin, Phone, Mail, Navigation, Heart, Shield, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, prayerSchedule, setIsAdminModalOpen, isAdminAuthenticated } = useMasjid();

  const handleNav = (p: PageView) => {
    setCurrentPage(p);
  };

  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Habib+Manzil+Masjid+Nerul+Sector+20+Navi+Mumbai',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <footer className="bg-[#0e3b2e] text-[#E8DCC7] pt-16 pb-12 border-t border-[#145744]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Identity & Society */}
          <div className="space-y-4">
            <MasjidLogo size={52} inverted={true} />
            <p className="text-xs text-[#A8BFA8] leading-relaxed">
              Habib Manzil Masjid is a centre for congregational worship, authentic Islamic education,
              and compassionate community welfare in Nerul, Navi Mumbai under the aegis of Fahad Education &amp; Welfare Society (ESTD 2012).
            </p>
            <div className="pt-2 text-xs text-[#C6A15B] font-medium italic">
              "Rooted in Faith. United in Service."
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-display text-white text-base font-semibold tracking-wide mb-4">
              Explore Our Masjid
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BFA8]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home &amp; Announcements
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story &amp; Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('prayer-timings')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daily Prayer &amp; Jama'ah Timetable
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('activities')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Activities, Dars &amp; Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nikah, Welfare &amp; Janazah Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('donate')}
                  className="hover:text-white transition-colors cursor-pointer text-[#C6A15B] font-semibold"
                >
                  Donate &amp; Support (Zakat / Lillah)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Community Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Location & Hours */}
          <div>
            <h4 className="font-display text-white text-base font-semibold tracking-wide mb-4">
              Masjid Address &amp; Location
            </h4>
            <div className="space-y-3 text-xs text-[#A8BFA8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>
                  Behind SBI Bank, Nerul, Sector 20, Navi Mumbai, Maharashtra 400706, India.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>Open daily from Fajr (05:00 AM) until Isha (10:00 PM) for worshippers.</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={openGoogleMaps}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C6A15B] hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate with Google Maps</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Today's Jama'ah Snapshot */}
          <div className="bg-[#145744]/40 p-4 rounded-xl border border-[#145744]">
            <h4 className="font-display text-white text-sm font-semibold tracking-wide mb-3 flex items-center justify-between">
              <span>Jama'ah Schedule</span>
              <span className="text-[10px] text-[#C6A15B] font-mono">TODAY</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between border-b border-[#145744] pb-1">
                <span className="text-[#A8BFA8]">Fajr:</span>
                <span className="font-mono text-white font-semibold">{prayerSchedule.fajr.jamaah}</span>
              </div>
              <div className="flex justify-between border-b border-[#145744] pb-1">
                <span className="text-[#A8BFA8]">Dhuhr:</span>
                <span className="font-mono text-white font-semibold">{prayerSchedule.dhuhr.jamaah}</span>
              </div>
              <div className="flex justify-between border-b border-[#145744] pb-1">
                <span className="text-[#A8BFA8]">Asr:</span>
                <span className="font-mono text-white font-semibold">{prayerSchedule.asr.jamaah}</span>
              </div>
              <div className="flex justify-between border-b border-[#145744] pb-1">
                <span className="text-[#A8BFA8]">Maghrib:</span>
                <span className="font-mono text-white font-semibold">{prayerSchedule.maghrib.jamaah}</span>
              </div>
              <div className="flex justify-between border-b border-[#145744] pb-1">
                <span className="text-[#A8BFA8]">Isha:</span>
                <span className="font-mono text-white font-semibold">{prayerSchedule.isha.jamaah}</span>
              </div>
              <div className="flex justify-between border-b border-[#145744] pb-1">
                <span className="text-[#A8BFA8]">Jumu'ah 1:</span>
                <span className="font-mono text-[#C6A15B] font-semibold">{prayerSchedule.jumuah1.jamaah}</span>
              </div>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-[#A8BFA8] flex items-center justify-between">
              <span>Updated: {prayerSchedule.lastUpdated}</span>
              <button
                onClick={() => handleNav('prayer-timings')}
                className="text-[#C6A15B] hover:underline cursor-pointer"
              >
                Full Calendar &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Spiritual Reminder Callout */}
        <div className="border-t border-[#145744] pt-8 pb-6 text-center">
          <p className="font-arabic text-xl sm:text-2xl text-[#C6A15B] mb-2 leading-loose">
            إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
          </p>
          <p className="text-xs text-[#A8BFA8] max-w-2xl mx-auto italic">
            "The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day, establish prayer, and give Zakat..."
            <span className="text-[#C6A15B] ml-1 font-normal font-sans">— Surah At-Tawbah (9:18)</span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#145744]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8BFA8]">
          <p>
            &copy; {new Date().getFullYear()} Habib Manzil Masjid. Managed by Fahad Education &amp; Welfare Society (ESTD 2012).
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Feedback &amp; Inquiries
            </button>
            <span aria-hidden="true" className="opacity-30">·</span>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="hover:text-[#C6A15B] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3 text-[#C6A15B]" />
              <span>{isAdminAuthenticated ? 'Admin Panel (Authorized)' : 'Committee Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
