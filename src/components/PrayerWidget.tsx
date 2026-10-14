import React, { useState, useEffect } from 'react';
import { useMasjid } from '../context/MasjidContext';
import { Clock, ShieldCheck, Moon, Sun, Sunrise, Calendar, ChevronRight } from 'lucide-react';

interface PrayerWidgetProps {
  onViewFullSchedule?: () => void;
  showAllDetails?: boolean;
}

export const PrayerWidget: React.FC<PrayerWidgetProps> = ({
  onViewFullSchedule,
  showAllDetails = true,
}) => {
  const { prayerSchedule, calendarInfo } = useMasjid();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [activePrayer, setActivePrayer] = useState<{
    currentName: string;
    nextName: string;
    timeRemainingText: string;
    nextTime: string;
  }>({
    currentName: 'Dhuhr',
    nextName: 'Asr',
    timeRemainingText: 'in approx 1 hr 20 min',
    nextTime: prayerSchedule.asr.jamaah,
  });

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Parse prayer times to calculate real next prayer
      calculateNextPrayer(now);
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerSchedule]);

  const parseTimeToToday = (timeStr: string): Date => {
    // Expected format: "05:15 AM" or "01:15 PM"
    const [time, period] = timeStr.trim().split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const calculateNextPrayer = (now: Date) => {
    const prayers = [
      { name: 'Fajr', timeStr: prayerSchedule.fajr.jamaah, date: parseTimeToToday(prayerSchedule.fajr.jamaah) },
      { name: 'Sunrise', timeStr: prayerSchedule.sunrise.time, date: parseTimeToToday(prayerSchedule.sunrise.time) },
      { name: 'Dhuhr', timeStr: prayerSchedule.dhuhr.jamaah, date: parseTimeToToday(prayerSchedule.dhuhr.jamaah) },
      { name: 'Asr', timeStr: prayerSchedule.asr.jamaah, date: parseTimeToToday(prayerSchedule.asr.jamaah) },
      { name: 'Maghrib', timeStr: prayerSchedule.maghrib.jamaah, date: parseTimeToToday(prayerSchedule.maghrib.jamaah) },
      { name: 'Isha', timeStr: prayerSchedule.isha.jamaah, date: parseTimeToToday(prayerSchedule.isha.jamaah) },
    ];

    let current = 'Isha';
    let next = prayers[0];

    for (let i = 0; i < prayers.length; i++) {
      if (now < prayers[i].date) {
        next = prayers[i];
        current = i === 0 ? 'Isha (Night)' : prayers[i - 1].name;
        break;
      }
    }

    // Difference in milliseconds
    let diff = next.date.getTime() - now.getTime();
    if (diff < 0) {
      // next is Fajr tomorrow
      diff += 24 * 60 * 60 * 1000;
    }

    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    setActivePrayer({
      currentName: current,
      nextName: next.name,
      timeRemainingText: `${diffHours > 0 ? `${diffHours}h ` : ''}${diffMinutes}m ${diffSeconds}s`,
      nextTime: next.timeStr,
    });
  };

  const prayerRows = [
    {
      name: 'Fajr',
      arabic: 'الفجر',
      icon: Moon,
      azan: prayerSchedule.fajr.azan,
      jamaah: prayerSchedule.fajr.jamaah,
      isNext: activePrayer.nextName === 'Fajr',
    },
    {
      name: 'Sunrise (Ishraq)',
      arabic: 'الشروق',
      icon: Sunrise,
      azan: '—',
      jamaah: prayerSchedule.sunrise.time,
      isNext: activePrayer.nextName === 'Sunrise',
    },
    {
      name: 'Dhuhr',
      arabic: 'الظهر',
      icon: Sun,
      azan: prayerSchedule.dhuhr.azan,
      jamaah: prayerSchedule.dhuhr.jamaah,
      isNext: activePrayer.nextName === 'Dhuhr',
    },
    {
      name: 'Asr',
      arabic: 'العصر',
      icon: Sun,
      azan: prayerSchedule.asr.azan,
      jamaah: prayerSchedule.asr.jamaah,
      isNext: activePrayer.nextName === 'Asr',
    },
    {
      name: 'Maghrib',
      arabic: 'المغرب',
      icon: Moon,
      azan: prayerSchedule.maghrib.azan,
      jamaah: prayerSchedule.maghrib.jamaah,
      isNext: activePrayer.nextName === 'Maghrib',
    },
    {
      name: 'Isha',
      arabic: 'العشاء',
      icon: Moon,
      azan: prayerSchedule.isha.azan,
      jamaah: prayerSchedule.isha.jamaah,
      isNext: activePrayer.nextName === 'Isha',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E8DCC7] shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#145744] text-[#FAF8F0] p-6 border-b border-[#0e3b2e]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A8BFA8]">
              <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{calendarInfo.gregorianDateString}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C6A15B] font-medium">
                {calendarInfo.hijriDay} {calendarInfo.hijriMonth} {calendarInfo.hijriYear} AH
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Daily Prayer &amp; Jama'ah Timings
            </h3>
          </div>

          {/* Next Prayer Countdown Callout */}
          <div className="bg-[#0e3b2e] px-4 py-2.5 rounded-xl border border-[#145744] flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#C6A15B] animate-pulse" />
            <div>
              <div className="text-[11px] text-[#A8BFA8] uppercase tracking-wider font-semibold">
                Next: {activePrayer.nextName} ({activePrayer.nextTime})
              </div>
              <div className="text-sm font-mono font-bold text-white">
                in {activePrayer.timeRemainingText}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timetable Table Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F0] border-b border-[#E8DCC7] text-xs font-semibold text-[#445650] uppercase tracking-wider">
              <th className="py-3 px-6">Prayer</th>
              <th className="py-3 px-6 text-center">Arabic</th>
              <th className="py-3 px-6 text-center">Azan (Begins)</th>
              <th className="py-3 px-6 text-right">Jama'ah (Congregation)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DCC7]/50 text-sm">
            {prayerRows.map((prayer) => {
              const Icon = prayer.icon;
              return (
                <tr
                  key={prayer.name}
                  className={`transition-colors ${
                    prayer.isNext
                      ? 'bg-[#145744]/5 font-semibold'
                      : 'hover:bg-[#FAF8F0]/50'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 ${
                          prayer.isNext ? 'text-[#145744]' : 'text-[#64746B]'
                        }`}
                      />
                      <span className="text-[#26332E]">{prayer.name}</span>
                      {prayer.isNext && (
                        <span className="text-[11px] font-medium text-[#145744] bg-[#A8BFA8]/30 px-2 py-0.5 rounded-md ml-1">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center font-arabic text-lg text-[#145744]">
                    {prayer.arabic}
                  </td>
                  <td className="py-4 px-6 text-center font-mono text-sm text-[#64746B]">
                    {prayer.azan}
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-base font-bold text-[#145744]">
                    {prayer.jamaah}
                  </td>
                </tr>
              );
            })}

            {/* Jumu'ah Friday Special Row */}
            <tr className="bg-[#FAF8F0] border-t-2 border-[#E8DCC7]">
              <td className="py-4 px-6 font-semibold text-[#145744]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                  <span>Jumu'ah 1st Prayer</span>
                </div>
              </td>
              <td className="py-4 px-6 text-center font-arabic text-lg text-[#145744]">
                الجمعة
              </td>
              <td className="py-4 px-6 text-center text-xs text-[#64746B]">
                Bayan: {prayerSchedule.jumuah1.bayan} · Khutbah: {prayerSchedule.jumuah1.khutbah}
              </td>
              <td className="py-4 px-6 text-right font-mono text-base font-bold text-[#C6A15B]">
                {prayerSchedule.jumuah1.jamaah}
              </td>
            </tr>
            <tr className="bg-[#FAF8F0]/60">
              <td className="py-3 px-6 font-medium text-[#445650] pl-10 text-xs">
                Jumu'ah 2nd Shift (Additional Jama'ah)
              </td>
              <td className="py-3 px-6 text-center font-arabic text-sm text-[#64746B]">
                الجمعة الثانية
              </td>
              <td className="py-3 px-6 text-center text-xs text-[#64746B]">
                Khutbah: {prayerSchedule.jumuah2.khutbah}
              </td>
              <td className="py-3 px-6 text-right font-mono text-sm font-semibold text-[#145744]">
                {prayerSchedule.jumuah2.jamaah}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Verification Notice and Action Footer */}
      <div className="bg-[#FAF8F0] px-6 py-4 border-t border-[#E8DCC7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64746B]">
        <div className="flex items-center gap-2 text-left">
          <ShieldCheck className="w-4 h-4 text-[#145744] shrink-0" />
          <span>
            Verified by <strong>{prayerSchedule.verifiedBy}</strong> · Last updated:{' '}
            <span className="font-medium text-[#26332E]">{prayerSchedule.lastUpdated}</span>
          </span>
        </div>

        {onViewFullSchedule && (
          <button
            onClick={onViewFullSchedule}
            className="flex items-center gap-1.5 font-semibold text-[#145744] hover:text-[#0e3b2e] cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <span>Full Monthly Calendar &amp; Ramadan Schedule</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </div>
  );
};
