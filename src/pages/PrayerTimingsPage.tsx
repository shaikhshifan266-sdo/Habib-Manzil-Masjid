import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import {
  Clock,
  Printer,
  Calendar,
  ShieldCheck,
  Moon,
  Sun,
  Sunrise,
  AlertCircle,
  Sparkles,
  Info,
  ChevronRight,
  Download,
} from 'lucide-react';

export const PrayerTimingsPage: React.FC = () => {
  const { prayerSchedule, calendarInfo, setIsAdminModalOpen, isAdminAuthenticated } = useMasjid();
  const [activeTab, setActiveTab] = useState<'daily' | 'ramadan' | 'monthly'>('daily');
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);

  const prayerHallBg = '/images/masjid_prayer_hall.jpg';

  const prayers = [
    {
      name: 'Fajr',
      arabic: 'الفجر',
      icon: Moon,
      azan: prayerSchedule.fajr.azan,
      jamaah: prayerSchedule.fajr.jamaah,
      note: 'Congregation 30 mins after Azan',
    },
    {
      name: 'Sunrise (Ishraq)',
      arabic: 'الشروق',
      icon: Sunrise,
      azan: '—',
      jamaah: prayerSchedule.sunrise.time,
      note: 'Prohibited prayer time during sunrise',
    },
    {
      name: 'Dhuhr',
      arabic: 'الظهر',
      icon: Sun,
      azan: prayerSchedule.dhuhr.azan,
      jamaah: prayerSchedule.dhuhr.jamaah,
      note: 'Sunnah followed by 4 Fardh',
    },
    {
      name: 'Asr',
      arabic: 'العصر',
      icon: Sun,
      azan: prayerSchedule.asr.azan,
      jamaah: prayerSchedule.asr.jamaah,
      note: prayerSchedule.asrMethod ? `${prayerSchedule.asrMethod} calculation` : 'Hanafi (2x shadow) calculation',
    },
    {
      name: 'Maghrib',
      arabic: 'المغرب',
      icon: Moon,
      azan: prayerSchedule.maghrib.azan,
      jamaah: prayerSchedule.maghrib.jamaah,
      note: 'Congregation 5 mins after Azan',
    },
    {
      name: 'Isha',
      arabic: 'العشاء',
      icon: Moon,
      azan: prayerSchedule.isha.azan,
      jamaah: prayerSchedule.isha.jamaah,
      note: 'Followed by 3 Witr Wajib',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#145744] to-[#0e3b2e] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden no-print">
        <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C6A15B] font-medium mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Nerul Sector 20 · Approved Congregation Schedule</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Prayer &amp; Jama'ah Timetable
          </h1>
          <p className="text-sm sm:text-base text-[#E8DCC7] max-w-2xl mx-auto leading-relaxed">
            Verified daily prayer schedule, Azan begins, and approved congregation times
            for Habib Manzil Masjid, Navi Mumbai.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-[#145744] bg-white hover:bg-[#FAF8F0] shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-[#145744]" />
              <span>Print Timetable (A4)</span>
            </button>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-5 py-2.5 rounded-lg text-xs font-medium text-[#E8DCC7] bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
              <span>{isAdminAuthenticated ? 'Admin: Edit Timings' : 'Committee Login'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Verification Status Banner */}
        <div className="p-4 rounded-xl bg-white border border-[#E8DCC7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#145744] shrink-0" />
            <div>
              <span className="font-bold text-[#26332E]">Status: Verified by Administration</span>
              <span className="text-[#64746B] ml-2">
                Last updated on {prayerSchedule.lastUpdated} by {prayerSchedule.verifiedBy}
              </span>
            </div>
          </div>
          <div className="text-[#145744] font-medium bg-[#145744]/10 px-3 py-1 rounded-md">
            Nerul Coordinates: 19.0330° N, 73.0166° E
          </div>
        </div>

        {/* View Switcher Tabs (Buttons) */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-xl border border-[#E8DCC7] max-w-md no-print">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              activeTab === 'daily'
                ? 'bg-[#145744] text-white shadow-xs'
                : 'text-[#445650] hover:text-[#145744]'
            }`}
          >
            Daily Prayers
          </button>
          <button
            onClick={() => setActiveTab('ramadan')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              activeTab === 'ramadan'
                ? 'bg-[#145744] text-white shadow-xs'
                : 'text-[#445650] hover:text-[#145744]'
            }`}
          >
            Ramadan Timetable
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              activeTab === 'monthly'
                ? 'bg-[#145744] text-white shadow-xs'
                : 'text-[#445650] hover:text-[#145744]'
            }`}
          >
            Jumu'ah &amp; Special
          </button>
        </div>

        {/* Print-Only Header */}
        <div className="print-only text-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Habib Manzil Masjid</h2>
          <p className="text-sm text-gray-600">
            Behind SBI Bank, Nerul Sector 20, Navi Mumbai - 400706
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Official Timetable · Verified: {prayerSchedule.lastUpdated}
          </p>
        </div>

        {/* TAB 1: DAILY PRAYERS TIMETABLE */}
        {activeTab === 'daily' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DCC7] overflow-hidden shadow-sm">
              <div className="bg-[#FAF8F0] p-6 border-b border-[#E8DCC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#145744]">
                    Daily 5 Prayers &amp; Congregation
                  </h3>
                  <p className="text-xs text-[#64746B] mt-1">
                    Calculated Azan start times vs verified Masjid Jama'ah congregation times.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#145744] font-medium bg-white px-3 py-1.5 rounded-lg border border-[#E8DCC7]">
                  {calendarInfo.hijriDay} {calendarInfo.hijriMonth} {calendarInfo.hijriYear} AH
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F0]/50 border-b border-[#E8DCC7] text-xs font-semibold text-[#445650] uppercase tracking-wider">
                      <th className="py-4 px-6">Prayer</th>
                      <th className="py-4 px-6 text-center">Arabic</th>
                      <th className="py-4 px-6 text-center">Azan (Begins)</th>
                      <th className="py-4 px-6 text-center">Jama'ah (Iqamah)</th>
                      <th className="py-4 px-6 text-right">Guideline / Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DCC7]/50 text-sm">
                    {prayers.map((prayer) => {
                      const Icon = prayer.icon;
                      return (
                        <tr key={prayer.name} className="hover:bg-[#FAF8F0]/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 text-[#145744]" />
                              <span className="font-bold text-[#26332E]">{prayer.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center font-arabic text-xl text-[#145744]">
                            {prayer.arabic}
                          </td>
                          <td className="py-4 px-6 text-center font-mono text-sm text-[#64746B]">
                            {prayer.azan}
                          </td>
                          <td className="py-4 px-6 text-center font-mono text-base font-bold text-[#145744]">
                            {prayer.jamaah}
                          </td>
                          <td className="py-4 px-6 text-right text-xs text-[#64746B]">
                            {prayer.note}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dua upon entering and leaving masjid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-[#E8DCC7] p-5">
                <div className="text-xs font-bold text-[#145744] uppercase tracking-wider mb-2">
                  Dua upon Entering the Masjid
                </div>
                <div className="font-arabic text-lg text-[#145744] mb-2 text-right" dir="rtl">
                  اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ
                </div>
                <p className="text-xs text-[#26332E] italic">
                  "O Allah, open for me the doors of Your mercy." (Sahih Muslim)
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E8DCC7] p-5">
                <div className="text-xs font-bold text-[#145744] uppercase tracking-wider mb-2">
                  Dua upon Leaving the Masjid
                </div>
                <div className="font-arabic text-lg text-[#145744] mb-2 text-right" dir="rtl">
                  اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ
                </div>
                <p className="text-xs text-[#26332E] italic">
                  "O Allah, I ask You of Your bounty." (Sahih Muslim)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RAMADAN TIMETABLE */}
        {activeTab === 'ramadan' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DCC7] mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#145744]/10 text-xs text-[#145744] font-medium mb-2">
                    <Moon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Blessed Month of Fasting</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#145744]">
                    Ramadan Mubarak Schedule
                  </h3>
                  <p className="text-xs text-[#64746B] mt-1">
                    Suhoor end (Imsak), Iftar timings, and Taraweeh congregation in Nerul.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#64746B]">Status:</span>
                  <div className="text-xs font-bold text-[#145744]">
                    {prayerSchedule.ramadan.active ? 'Ramadan Schedule Active' : 'Off-Season / Reference'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] text-center">
                  <div className="text-xs text-[#64746B] uppercase font-bold tracking-wider mb-1">
                    Suhoor Ends (Imsak)
                  </div>
                  <div className="font-mono text-3xl font-bold text-[#145744] my-2">
                    {prayerSchedule.ramadan.suhoorEnd}
                  </div>
                  <div className="text-[11px] text-[#64746B]">
                    Stop eating 5 mins prior for precaution
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] text-center">
                  <div className="text-xs text-[#64746B] uppercase font-bold tracking-wider mb-1">
                    Iftar Time (Maghrib Azan)
                  </div>
                  <div className="font-mono text-3xl font-bold text-[#C6A15B] my-2">
                    {prayerSchedule.ramadan.iftarTime}
                  </div>
                  <div className="text-[11px] text-[#64746B]">
                    Dates &amp; water arranged daily in courtyard
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] text-center">
                  <div className="text-xs text-[#64746B] uppercase font-bold tracking-wider mb-1">
                    Taraweeh Prayer
                  </div>
                  <div className="font-mono text-3xl font-bold text-[#145744] my-2">
                    {prayerSchedule.ramadan.taraweehTime}
                  </div>
                  <div className="text-[11px] text-[#64746B]">
                    20 Rak'ahs with complete Quran recitation
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] text-xs text-[#445650] space-y-2">
                <div className="font-bold text-[#26332E]">Ramadan Services at Habib Manzil Masjid:</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Daily community Iftar hosted in the courtyard for travellers and local worshippers.</li>
                  <li>Khatm-ul-Quran completion ceremony during the 27th night of Ramadan.</li>
                  <li>Itikaf arrangements in the last ten nights (registration mandatory at office).</li>
                  <li>Zakat-ul-Fitr collection desk open until the morning of Eid.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: JUMU'AH & SPECIAL PRAYERS */}
        {activeTab === 'monthly' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-[#145744] mb-2">
                Friday Jumu'ah Arrangements
              </h3>
              <p className="text-xs text-[#64746B] mb-6">
                Habib Manzil Masjid conducts two Friday congregation shifts to comfortably accommodate workers, students, and worshippers from Sector 20 and surrounding areas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Jumuah 1 */}
                <div className="p-6 rounded-xl bg-[#145744]/5 border border-[#145744]/20">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#145744] text-white text-[11px] font-bold mb-3">
                    Shift 1 (Primary)
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#26332E] mb-3">
                    First Jumu'ah Congregation
                  </h4>
                  <div className="space-y-2 text-xs text-[#445650]">
                    <div className="flex justify-between border-b border-[#E8DCC7] pb-1.5">
                      <span>Urdu/Hindi Bayan (Lecture):</span>
                      <span className="font-mono font-bold text-[#145744]">
                        {prayerSchedule.jumuah1.bayan}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#E8DCC7] pb-1.5">
                      <span>Arabic Khutbah:</span>
                      <span className="font-mono font-bold text-[#145744]">
                        {prayerSchedule.jumuah1.khutbah}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-bold text-[#26332E]">Jama'ah Prayer:</span>
                      <span className="font-mono font-bold text-base text-[#145744]">
                        {prayerSchedule.jumuah1.jamaah}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Jumuah 2 */}
                <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7]">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C6A15B] text-[#0e3b2e] text-[11px] font-bold mb-3">
                    Shift 2 (Additional)
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#26332E] mb-3">
                    Second Jumu'ah Congregation
                  </h4>
                  <div className="space-y-2 text-xs text-[#445650]">
                    <div className="flex justify-between border-b border-[#E8DCC7] pb-1.5">
                      <span>Arabic Khutbah:</span>
                      <span className="font-mono font-bold text-[#145744]">
                        {prayerSchedule.jumuah2.khutbah}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-bold text-[#26332E]">Jama'ah Prayer:</span>
                      <span className="font-mono font-bold text-base text-[#C6A15B]">
                        {prayerSchedule.jumuah2.jamaah}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#64746B] mt-4">
                    Specifically scheduled for office attendees and retail employees who cannot make the first shift.
                  </p>
                </div>
              </div>

              {/* Special Eid Prayers Information */}
              <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7]">
                <h4 className="font-display text-base font-bold text-[#26332E] mb-2">
                  Eid-ul-Fitr &amp; Eid-ul-Adha Notice
                </h4>
                <p className="text-xs text-[#445650] leading-relaxed">
                  Eid prayer timings are formally finalized after the local Hilal (crescent moon) sighting is verified on the eve of Eid. Typically, two Jama'ahs are held at 07:00 AM and 08:00 AM. Announcements are published on the website homepage immediately upon confirmation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Calculation Method and Astronomical Disclaimers */}
        <div className="p-6 rounded-xl bg-white border border-[#E8DCC7] text-xs text-[#64746B] leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#26332E]">
            <Info className="w-4 h-4 text-[#145744]" />
            <span>Calculation Method &amp; Congregation Etiquette:</span>
          </div>
          <p>
            Calculated Azan timings correspond to standard astronomical solar coordinates for Navi Mumbai (Fajr angle 18°, Isha angle 18°, Hanafi Asr juristic calculation).
          </p>
          <p>
            Actual Jama'ah congregation timings are independently determined and verified by the Habib Manzil Masjid Committee to provide reasonable time for wudu and travel for neighbourhood worshippers.
          </p>
        </div>
      </div>
    </div>
  );
};
