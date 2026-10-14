import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import { PrayerWidget } from '../components/PrayerWidget';
import { IslamicCalendarWidget } from '../components/IslamicCalendarWidget';
import { Announcement, PageView } from '../types/masjid';
import {
  Clock,
  BookOpen,
  Calendar,
  HeartHandshake,
  Navigation,
  Mail,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Users,
  Compass,
  ArrowUpRight,
  MapPin,
  Sparkles,
  Search,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, announcements, events, janazahInfo } = useMasjid();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [announcementCategory, setAnnouncementCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');

  const heroMosqueBg = '/src/assets/images/habib_manzil_hero_1792001493268.jpg';
  const prayerHallBg = '/src/assets/images/masjid_prayer_hall_1792001492556.jpg';

  const quickAccessCards: {
    title: string;
    description: string;
    icon: React.ElementType;
    actionText: string;
    page: PageView;
  }[] = [
    {
      title: 'Prayer Timings',
      description: 'Daily Fajr to Isha & Friday Jumu’ah congregation schedule.',
      icon: Clock,
      actionText: 'View Timetable',
      page: 'prayer-timings',
    },
    {
      title: 'About Our Masjid',
      description: 'Our humble journey from mud to a formally registered institution.',
      icon: Compass,
      actionText: 'Read Our Story',
      page: 'about',
    },
    {
      title: 'Upcoming Events',
      description: 'Weekly Dars, youth classes, competitions, and gatherings.',
      icon: Calendar,
      actionText: 'Explore Events',
      page: 'activities',
    },
    {
      title: 'Community Services',
      description: 'Nikah, Sandook-e-Janazah, and welfare initiatives.',
      icon: HeartHandshake,
      actionText: 'View Services',
      page: 'services',
    },
    {
      title: 'Get Directions',
      description: 'Behind SBI Bank, Nerul, Sector 20, Navi Mumbai.',
      icon: Navigation,
      actionText: 'Find Location',
      page: 'contact',
    },
    {
      title: 'Contact the Masjid',
      description: 'Enquiries, feedback, and committee communication.',
      icon: Mail,
      actionText: 'Get in Touch',
      page: 'contact',
    },
  ];

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesCat = announcementCategory === 'All' || ann.category === announcementCategory;
    const matchesSearch =
      ann.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Habib+Manzil+Masjid+Nerul+Sector+20+Navi+Mumbai',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Section: A Beautiful Welcome */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden">
        {/* Background image with fallback */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroMosqueBg}
            alt="Habib Manzil Masjid exterior with white and emerald domes"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Dark Emerald & Charcoal Measured Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e3b2e] via-[#0e3b2e]/80 to-[#145744]/75" />
          {/* Geometric Pattern Subtle Texture */}
          <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-15 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Welcome Salutation */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-[#E8DCC7] text-xs sm:text-sm font-medium tracking-wide mb-6 border border-white/15">
            <Sparkles className="w-4 h-4 text-[#C6A15B]" />
            <span>Assalamu Alaikum wa Rahmatullahi wa Barakatuh</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            Welcome to Habib Manzil Masjid
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#E8DCC7] font-light leading-relaxed mb-8">
            A place to strengthen our connection with Allah, seek authentic knowledge, and serve our community in Nerul, Navi Mumbai.
          </p>

          {/* Revered Quranic Verse Callout */}
          <div className="max-w-xl mx-auto bg-black/25 backdrop-blur-md rounded-2xl p-6 border border-[#C6A15B]/30 mb-10 shadow-lg">
            <div className="font-arabic text-2xl sm:text-3xl text-[#C6A15B] leading-loose mb-2 text-center" dir="rtl">
              إِنَّ مَعَ الْعُسْرِ يُسْرًا
            </div>
            <p className="text-sm sm:text-base text-white italic font-serif">
              "Indeed, with hardship comes ease."
            </p>
            <div className="text-xs text-[#A8BFA8] mt-1 font-sans">
              — Surah Ash-Sharh (94:6)
            </div>
          </div>

          {/* Two Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('about')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-white text-[#145744] hover:bg-[#FAF8F0] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Explore Our Masjid
            </button>
            <button
              onClick={() => setCurrentPage('prayer-timings')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#C6A15B] text-[#0e3b2e] hover:bg-[#d8b56f] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>View Prayer Timings</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* 2. Islamic Date, Moon Phase & Daily Hadith Section */}
        <section aria-label="Islamic Date and Hadith">
          <IslamicCalendarWidget />
        </section>

        {/* 3. Daily Prayer Timings Widget */}
        <section aria-label="Daily Prayer Timings">
          <PrayerWidget onViewFullSchedule={() => setCurrentPage('prayer-timings')} />
        </section>

        {/* 4. Quick Access Cards Grid */}
        <section aria-label="Quick Access">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#145744]">
              Serving Your Daily Needs
            </h2>
            <p className="text-sm text-[#445650] mt-2">
              Everything you need to engage with Habib Manzil Masjid, from prayer timetables to welfare assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccessCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  onClick={() => setCurrentPage(card.page)}
                  className="group bg-white rounded-xl border border-[#E8DCC7] p-6 shadow-xs hover:shadow-md hover:border-[#145744]/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-[#145744]/10 text-[#145744] flex items-center justify-center mb-4 group-hover:bg-[#145744] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#26332E] group-hover:text-[#145744] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#445650] mt-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#E8DCC7]/50 flex items-center justify-between text-xs font-semibold text-[#145744]">
                    <span>{card.actionText}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Welcome & Community Highlights Split */}
        <section className="bg-white rounded-2xl border border-[#E8DCC7] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Narrative */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold mb-2">
                  Our Community Heritage
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#145744] leading-tight mb-4">
                  A Place of Worship, Knowledge, Service &amp; Community
                </h2>
                <p className="text-sm sm:text-base text-[#445650] leading-relaxed mb-4">
                  Habib Manzil Masjid stands as a testament to the sincere dedication of the Nerul Muslim community.
                  What began as humble prayer arrangements on open ground has grown through continuous collective effort,
                  perseverance, and Allah’s divine grace into a structured sanctuary of peace, education, and welfare.
                </p>
                <p className="text-sm text-[#445650] leading-relaxed mb-6">
                  Managed under the registered banner of <strong>Fahad Education &amp; Welfare Society (ESTD 2012)</strong>,
                  our doors remain open five times every day for brothers, sisters, children, and families seeking Islamic enlightenment and unity.
                </p>

                {/* Key Pillars */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E8DCC7]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#145744] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#26332E]">Congregational Salah</h4>
                      <p className="text-[11px] text-[#64746B]">5 daily prayers &amp; dual Jumu'ah congregations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#145744] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#26332E]">Children’s Maktab</h4>
                      <p className="text-[11px] text-[#64746B]">Quran recitation with Tajweed &amp; Islamic ethics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#145744] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#26332E]">Sandook-e-Janazah</h4>
                      <p className="text-[11px] text-[#64746B]">
                        {janazahInfo.isAvailable ? 'Available 24/7' : 'Contact for Availability'} free funeral bier service
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#145744] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#26332E]">Welfare &amp; Rations</h4>
                      <p className="text-[11px] text-[#64746B]">Ramadan food drives &amp; blood donation camps</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8DCC7] flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-xs cursor-pointer transition-colors"
                >
                  <span>Discover Our Journey</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#64746B]">ESTD 2012 · Society Reg. Active</span>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={prayerHallBg}
                alt="Interior prayer hall of Habib Manzil Masjid with green geometric carpets"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-xs">
                  <div className="font-semibold text-white">Main Prayer Hall</div>
                  <div className="text-[#E8DCC7]">Peaceful congregational space for Nerul Sector 20</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Featured Activities & Events Preview */}
        <section aria-label="Featured Activities">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">
                Religious &amp; Educational Life
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#145744]">
                Masjid Activities &amp; Programs
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('activities')}
              className="text-xs font-bold text-[#145744] hover:text-[#0e3b2e] flex items-center gap-1 cursor-pointer"
            >
              <span>View All 10 Activity Programs</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={() => setCurrentPage('activities')}
                className="group bg-white rounded-xl border border-[#E8DCC7] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#145744]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                    {event.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#64746B] mb-1 font-medium">{event.date}</div>
                    <h3 className="font-display text-base font-bold text-[#26332E] group-hover:text-[#145744] transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs text-[#445650] mt-2 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E8DCC7]/50 flex items-center justify-between text-xs text-[#145744] font-semibold">
                    <span>Learn More &amp; Timings</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Latest Announcements Section */}
        <section aria-label="Latest Announcements">
          <div className="bg-white rounded-2xl border border-[#E8DCC7] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8DCC7]">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#145744]">
                  Latest Announcements &amp; Notices
                </h2>
                <p className="text-xs text-[#64746B] mt-1">
                  Updates on weekly programs, special khutbahs, and community initiatives.
                </p>
              </div>

              {/* Category Filter Pills (Functional Buttons) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F0] rounded-lg border border-[#E8DCC7]">
                {['All', 'Friday Khutbah', 'Classes', 'Welfare', 'Program'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAnnouncementCategory(cat)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      announcementCategory === cat
                        ? 'bg-[#145744] text-white shadow-xs'
                        : 'text-[#445650] hover:text-[#145744]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-[#64746B] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search announcements (e.g., Nikah, Khutbah, Maktab)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
              />
            </div>

            {/* Announcements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => setSelectedAnnouncement(ann)}
                  className="p-5 rounded-xl border border-[#E8DCC7]/80 hover:border-[#145744]/50 bg-[#FAF8F0]/40 hover:bg-white transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#64746B] mb-2">
                      <span className="font-semibold text-[#145744]">{ann.category}</span>
                      <span>{ann.date}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-[#26332E] leading-snug">
                      {ann.title}
                    </h3>
                    <p className="text-xs text-[#445650] mt-2 line-clamp-3 leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E8DCC7]/40 flex items-center justify-between text-xs text-[#145744] font-medium">
                    <span>Read full notice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-10 text-xs text-[#64746B]">
                No announcements match your search filter.
              </div>
            )}
          </div>
        </section>

        {/* 8. Location & Visit Invitation */}
        <section className="bg-gradient-to-r from-[#145744] to-[#0e3b2e] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C6A15B] font-medium mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Sector 20, Nerul, Navi Mumbai</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-3">
                Join Us for Daily Salah &amp; Community Service
              </h2>
              <p className="text-xs sm:text-sm text-[#E8DCC7] leading-relaxed max-w-2xl">
                Located conveniently behind State Bank of India (SBI) in Nerul Sector 20.
                Whether you are a resident worshipper, visiting traveler, or seeking community assistance,
                you are warmly welcomed to Habib Manzil Masjid.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={openGoogleMaps}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-[#C6A15B] text-[#0e3b2e] hover:bg-[#d8b56f] shadow-md transition-all duration-200 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (Google Maps)</span>
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Committee Office</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCC7] relative">
            <div className="flex items-center justify-between text-xs text-[#64746B] mb-2 pb-2 border-b border-[#E8DCC7]">
              <span className="font-semibold text-[#145744]">{selectedAnnouncement.category}</span>
              <span>{selectedAnnouncement.date}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#145744] mb-3">
              {selectedAnnouncement.title}
            </h3>
            <p className="text-sm text-[#26332E] leading-relaxed whitespace-pre-line mb-6">
              {selectedAnnouncement.content}
            </p>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E8DCC7]">
              {selectedAnnouncement.actionTarget ? (
                <button
                  onClick={() => {
                    const target = selectedAnnouncement.actionTarget!;
                    setSelectedAnnouncement(null);
                    setCurrentPage(target);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] cursor-pointer"
                >
                  {selectedAnnouncement.actionText || 'Proceed'}
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#64746B] hover:bg-[#FAF8F0] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
