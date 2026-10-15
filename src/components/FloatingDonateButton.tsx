import React from 'react';
import { useMasjid } from '../context/MasjidContext';
import { HeartHandshake, Sparkles } from 'lucide-react';

export const FloatingDonateButton: React.FC = () => {
  const { currentPage, setCurrentPage } = useMasjid();

  // Hide when already on the donation page
  if (currentPage === 'donate') {
    return null;
  }

  return (
    <div
      className="fixed z-40 right-0 top-1/2 -translate-y-1/2 pointer-events-none"
      role="region"
      aria-label="Donation Quick Access"
    >
      {/* Desktop Bookmark / Ribbon: Vertical orientation on right edge */}
      <div className="hidden sm:block pointer-events-auto">
        <button
          onClick={() => setCurrentPage('donate')}
          aria-label="Donate Now to Habib Manzil Masjid"
          className="group relative flex flex-col items-center gap-2 py-4 px-2.5 bg-[#145744] hover:bg-[#0e3b2e] text-white rounded-l-2xl border-y border-l border-[#C6A15B]/50 shadow-xl hover:shadow-2xl hover:translate-x-[-2px] transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C6A15B]"
        >
          {/* Subtle gold ribbon top edge */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] group-hover:scale-125 transition-transform" />

          {/* Heart icon */}
          <div className="w-7 h-7 rounded-full bg-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-[#0e3b2e] transition-colors">
            <HeartHandshake className="w-4 h-4" />
          </div>

          {/* Vertical Text */}
          <span
            className="text-xs font-bold tracking-wider uppercase text-[#E8DCC7] group-hover:text-white py-1 [writing-mode:vertical-rl] rotate-180 font-sans"
            style={{ textOrientation: 'mixed' }}
          >
            Donate Now
          </span>

          <Sparkles className="w-3 h-3 text-[#C6A15B] opacity-70 group-hover:opacity-100" />
        </button>
      </div>

      {/* Mobile Floating Pill: Compact and non-intrusive on right side */}
      <div className="sm:hidden fixed bottom-6 right-4 pointer-events-auto">
        <button
          onClick={() => setCurrentPage('donate')}
          aria-label="Donate Now to Habib Manzil Masjid"
          className="flex items-center gap-2 px-4 py-3 bg-[#145744] hover:bg-[#0e3b2e] text-white rounded-full border border-[#C6A15B]/60 shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <HeartHandshake className="w-4 h-4 text-[#C6A15B]" />
          <span className="text-xs font-bold tracking-wide uppercase text-white font-sans">
            Donate Now
          </span>
        </button>
      </div>
    </div>
  );
};
