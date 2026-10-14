import React from 'react';
import { useMasjid } from '../context/MasjidContext';
import { Moon, Calendar, Sparkles, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

export const IslamicCalendarWidget: React.FC = () => {
  const { calendarInfo, currentHadith, nextHadith } = useMasjid();

  return (
    <div className="bg-white rounded-2xl border border-[#E8DCC7] shadow-sm p-6 sm:p-8">
      {/* 2-Column Split: Left Moon & Hijri Date, Right Curated Authentic Hadith */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Hijri Date & Moon Visualization (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-[#145744] to-[#0e3b2e] rounded-xl p-6 text-white relative overflow-hidden">
          {/* Subtle Islamic Tile Background Pattern */}
          <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 text-xs text-[#A8BFA8] mb-3">
              <span className="flex items-center gap-1.5 font-medium tracking-wider uppercase text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                Islamic Hijri Calendar
              </span>
              <span className="bg-[#FAF8F0]/10 px-2.5 py-0.5 rounded-full text-[11px] text-[#E8DCC7]">
                Year 1448 AH
              </span>
            </div>

            {/* Crescent Moon & Big Hijri Display */}
            <div className="flex items-center gap-5 my-4">
              {/* Crescent Moon SVG Visual */}
              <div className="relative w-16 h-16 shrink-0 bg-[#0A261D] rounded-full flex items-center justify-center border border-[#C6A15B]/30 shadow-inner">
                <svg
                  viewBox="0 0 100 100"
                  className="w-11 h-11 text-[#C6A15B]"
                  fill="currentColor"
                >
                  <path d="M 50 10 A 40 40 0 1 0 90 50 A 35 35 0 1 1 50 10 Z" />
                </svg>
                {/* Star accent */}
                <span className="absolute top-3 right-3 text-[#C6A15B] text-xs">✦</span>
              </div>

              <div>
                <div className="font-display text-3xl font-bold text-white tracking-tight">
                  {calendarInfo.hijriDay} {calendarInfo.hijriMonth}
                </div>
                <div className="text-xs text-[#A8BFA8] mt-0.5">
                  Phase: {calendarInfo.moonPhaseText} ({calendarInfo.moonIlluminationPercent}% illumination)
                </div>
              </div>
            </div>

            <div className="text-xs text-[#E8DCC7] pt-2 border-t border-white/10 flex items-center justify-between">
              <span>{calendarInfo.gregorianDateString}</span>
              {calendarInfo.hijriOffsetDays !== 0 && (
                <span className="text-[10px] text-[#C6A15B]">
                  Local moon offset ({calendarInfo.hijriOffsetDays > 0 ? '+1' : '-1'} day)
                </span>
              )}
            </div>
          </div>

          {/* Upcoming Key Dates preview */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
            <div className="text-[11px] text-[#C6A15B] uppercase tracking-wider font-semibold mb-2">
              Upcoming Observances
            </div>
            <div className="space-y-2">
              {calendarInfo.upcomingDates.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-baseline justify-between text-xs">
                  <span className="text-white font-medium">{item.title}</span>
                  <span className="text-[#A8BFA8] text-[11px] font-mono">{item.hijriDate}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#A8BFA8]/80 italic">
              <AlertCircle className="w-3 h-3 text-[#C6A15B] shrink-0" />
              <span>Hijri dates subject to local Hilal moon sighting in Navi Mumbai.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Curated Authentic Hadith of the Day (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-2">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8DCC7]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#145744]" />
                <span className="font-display text-sm font-bold text-[#145744] uppercase tracking-wider">
                  Daily Authentic Hadith
                </span>
                <span className="text-xs text-[#64746B]">·</span>
                <span className="text-xs text-[#64746B]">{currentHadith.sourceBook}</span>
              </div>
              <button
                onClick={nextHadith}
                className="text-xs text-[#145744] hover:text-[#0e3b2e] flex items-center gap-1.5 font-medium cursor-pointer"
                title="Read another verified Hadith"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span className="hidden sm:inline">Next Reminder</span>
              </button>
            </div>

            {/* Arabic Typography with High Reverence */}
            <div className="my-5 p-5 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]/80">
              <p
                className="font-arabic text-xl sm:text-2xl text-[#145744] leading-relaxed text-right"
                dir="rtl"
              >
                « {currentHadith.arabicText} »
              </p>
            </div>

            {/* English Translation */}
            <p className="text-sm sm:text-base text-[#26332E] leading-relaxed italic mb-4">
              "{currentHadith.englishTranslation}"
            </p>
          </div>

          {/* Citation & Grading Footer */}
          <div className="pt-4 border-t border-[#E8DCC7] flex flex-wrap items-center justify-between gap-2 text-xs text-[#64746B]">
            <div>
              <span className="font-medium text-[#26332E]">{currentHadith.narrator}</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span className="font-mono text-[#145744] font-medium">{currentHadith.hadithNumber}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#145744] font-medium bg-[#145744]/5 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Grading: {currentHadith.grading}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
