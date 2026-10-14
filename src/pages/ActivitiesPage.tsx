import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import { MasjidEvent, EventCategory } from '../types/masjid';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Filter,
  Maximize2,
  X,
  PlusCircle,
  Sparkles,
  Search,
} from 'lucide-react';

export const ActivitiesPage: React.FC = () => {
  const { events, addEvent, isAdminAuthenticated, setIsAdminModalOpen } = useMasjid();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightboxEvent, setActiveLightboxEvent] = useState<MasjidEvent | null>(null);

  // New event submission state for admins/authorized users
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<EventCategory>('Weekly Dars');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('Main Prayer Hall, Habib Manzil Masjid');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('/src/assets/images/masjid_prayer_hall_1792001492556.jpg');
  const [newSpeaker, setNewSpeaker] = useState('');

  const categories: string[] = [
    'All',
    'Weekly Dars',
    'Islamic Classes for Children',
    'Arabic Classes',
    'Special Friday Khutbahs',
    "Women's Bayan",
    'Ramadan Ration Distribution',
    'Fitrah Service',
    'Qirat and Adhaan Competitions',
    'Islamic Quiz Competitions',
    'Social and Community Events',
  ];

  const filteredEvents = events.filter((ev) => {
    const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ev.instructorOrSpeaker && ev.instructorOrSpeaker.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    addEvent({
      title: newTitle,
      category: newCategory,
      date: newDate || 'Scheduled Program',
      location: newLocation,
      description: newDescription,
      imageUrl: newImageUrl,
      instructorOrSpeaker: newSpeaker || undefined,
      isUpcoming: true,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewSpeaker('');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#145744] to-[#0e3b2e] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C6A15B] font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual, Educational &amp; Social Initiatives</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Activities, Events &amp; Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#E8DCC7] max-w-2xl mx-auto leading-relaxed">
            Celebrating our educational classes, weekly religious reminders, youth Quran competitions,
            and humanitarian outreach initiatives in Nerul.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls Bar: Search & Admin Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E8DCC7]">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#64746B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search programs, speakers, classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
            />
          </div>

          {/* Add Event Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  setIsAddModalOpen(true);
                } else {
                  setIsAdminModalOpen(true);
                }
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#145744] hover:bg-[#0e3b2e] flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-[#C6A15B]" />
              <span>{isAdminAuthenticated ? 'Add New Program' : 'Admin: Add Event'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-[#145744] shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#145744] text-white shadow-xs'
                  : 'bg-white text-[#445650] border border-[#E8DCC7] hover:border-[#145744]/40 hover:text-[#145744]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events & Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl border border-[#E8DCC7] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {/* Photo Card with Lightbox Affordance */}
              <div
                className="relative h-56 overflow-hidden bg-stone-100 cursor-pointer"
                onClick={() => setActiveLightboxEvent(event)}
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                  <span className="text-xs font-medium">Click to view photo &amp; details</span>
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="absolute top-3 left-3 bg-[#145744]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {event.category}
                </div>
              </div>

              {/* Event Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64746B] mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#26332E] group-hover:text-[#145744] transition-colors leading-snug mb-2">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#445650] leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DCC7]/60 space-y-2 text-xs text-[#64746B]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#145744] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  {event.instructorOrSpeaker && (
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                      <span className="truncate font-medium text-[#26332E]">
                        {event.instructorOrSpeaker}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DCC7] text-sm text-[#64746B]">
            No programs found in the "{selectedCategory}" category matching your search.
          </div>
        )}

        {/* Photographic Transparency & Privacy Policy */}
        <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] text-xs text-[#64746B] leading-relaxed">
          <p>
            <strong>Note on Photographs &amp; Media Guidelines:</strong> Habib Manzil Masjid complies strictly with Islamic propriety and privacy principles. Identifiable photographs of congregants and students are published only with consent. Original high-resolution photographs from programs can be uploaded directly by the authorized committee through the portal.
          </p>
        </div>
      </div>

      {/* Lightbox / Details Modal */}
      {activeLightboxEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8DCC7] relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setActiveLightboxEvent(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-80 bg-stone-900 shrink-0">
              <img
                src={activeLightboxEvent.imageUrl}
                alt={activeLightboxEvent.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#145744] text-white text-xs px-3 py-1 rounded-md font-medium">
                {activeLightboxEvent.category}
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#64746B]">
                <Calendar className="w-4 h-4 text-[#C6A15B]" />
                <span className="font-semibold text-[#145744]">{activeLightboxEvent.date}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#145744]">
                {activeLightboxEvent.title}
              </h2>
              <p className="text-sm text-[#26332E] leading-relaxed whitespace-pre-line">
                {activeLightboxEvent.description}
              </p>

              <div className="pt-4 border-t border-[#E8DCC7] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#64746B]">
                <div>
                  <span className="font-semibold text-[#26332E]">Location:</span>{' '}
                  {activeLightboxEvent.location}
                </div>
                {activeLightboxEvent.instructorOrSpeaker && (
                  <div>
                    <span className="font-semibold text-[#26332E]">Conducted by:</span>{' '}
                    {activeLightboxEvent.instructorOrSpeaker}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Event Modal (Admin) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCC7] relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCC7] mb-4">
              <h3 className="font-display text-lg font-bold text-[#145744]">
                Add New Event / Activity
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#64746B] hover:text-[#26332E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#26332E] mb-1">
                  Program Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Special Seerah Lecture"
                  className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#26332E] mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as EventCategory)}
                  className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                >
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Date &amp; Schedule
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. Every Friday 08:00 PM"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Speaker / Lead
                  </label>
                  <input
                    type="text"
                    value={newSpeaker}
                    onChange={(e) => setNewSpeaker(e.target.value)}
                    placeholder="e.g. Maulana or Guest Scholar"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#26332E] mb-1">
                  Location Venue
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#26332E] mb-1">
                  Image URL / Asset Reference
                </label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="/src/assets/images/... or uploaded URL"
                  className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#26332E] mb-1">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain the objectives, who can attend, and prerequisites..."
                  className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DCC7]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-medium text-[#64746B] hover:bg-[#FAF8F0] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] rounded-lg shadow-xs cursor-pointer"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
