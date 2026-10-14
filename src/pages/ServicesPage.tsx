import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import {
  HeartHandshake,
  Heart,
  BookOpen,
  Calendar,
  Users,
  CheckCircle,
  Phone,
  Clock,
  Send,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const {
    janazahInfo,
    submitNikahInquiry,
    submitVolunteerApplication,
    submitProgrammeRequest,
  } = useMasjid();

  // Active Tab: Overview or specific Service Form
  const [activeFormModal, setActiveFormModal] = useState<
    'nikah' | 'volunteer' | 'programme' | null
  >(null);

  // Nikah Form State
  const [nikahApplicant, setNikahApplicant] = useState('');
  const [nikahPhone, setNikahPhone] = useState('');
  const [nikahEmail, setNikahEmail] = useState('');
  const [nikahDate, setNikahDate] = useState('');
  const [nikahGuests, setNikahGuests] = useState('50');
  const [nikahNotes, setNikahNotes] = useState('');
  const [nikahSuccess, setNikahSuccess] = useState(false);
  const [nikahSubmitting, setNikahSubmitting] = useState(false);

  // Volunteer Form State
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volInterest, setVolInterest] = useState('Ramadan Ration & Food Drives');
  const [volAvailability, setVolAvailability] = useState('Weekends (Saturday/Sunday)');
  const [volExperience, setVolExperience] = useState('');
  const [volSuccess, setVolSuccess] = useState(false);
  const [volSubmitting, setVolSubmitting] = useState(false);

  // Programme Form State
  const [progName, setProgName] = useState('');
  const [progPhone, setProgPhone] = useState('');
  const [progEmail, setProgEmail] = useState('');
  const [progType, setProgType] = useState('Quranic Gathering / Khatm');
  const [progDate, setProgDate] = useState('');
  const [progPurpose, setProgPurpose] = useState('');
  const [progSuccess, setProgSuccess] = useState(false);
  const [progSubmitting, setProgSubmitting] = useState(false);

  const handleNikahSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNikahSubmitting(true);
    await submitNikahInquiry({
      applicantName: nikahApplicant,
      phone: nikahPhone,
      email: nikahEmail,
      preferredDate: nikahDate,
      expectedGuests: parseInt(nikahGuests, 10) || 50,
      notes: nikahNotes,
    });
    setNikahSubmitting(false);
    setNikahSuccess(true);
    setTimeout(() => {
      setNikahSuccess(false);
      setActiveFormModal(null);
      setNikahApplicant('');
      setNikahPhone('');
      setNikahEmail('');
      setNikahNotes('');
    }, 2500);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolSubmitting(true);
    await submitVolunteerApplication({
      fullName: volName,
      phone: volPhone,
      email: volEmail,
      areaOfInterest: volInterest,
      availability: volAvailability,
      experience: volExperience,
    });
    setVolSubmitting(false);
    setVolSuccess(true);
    setTimeout(() => {
      setVolSuccess(false);
      setActiveFormModal(null);
      setVolName('');
      setVolPhone('');
      setVolEmail('');
      setVolExperience('');
    }, 2500);
  };

  const handleProgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgSubmitting(true);
    await submitProgrammeRequest({
      organizerName: progName,
      phone: progPhone,
      email: progEmail,
      programmeType: progType,
      proposedDate: progDate,
      purpose: progPurpose,
    });
    setProgSubmitting(false);
    setProgSuccess(true);
    setTimeout(() => {
      setProgSuccess(false);
      setActiveFormModal(null);
      setProgName('');
      setProgPhone('');
      setProgEmail('');
      setProgPurpose('');
    }, 2500);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#145744] to-[#0e3b2e] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C6A15B] font-medium mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community Support &amp; Social Welfare</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Our Masjid, Your Community
          </h1>
          <p className="text-sm sm:text-base text-[#E8DCC7] max-w-2xl mx-auto leading-relaxed">
            Beyond daily worship, we aim to make our masjid a centre for knowledge, connection, and compassionate community service.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Service 1: Sandook-e-Janazah Service (Prominent Community Service) */}
        <section className="bg-white rounded-2xl border-2 border-[#145744]/30 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#E8DCC7]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold">
                  Funeral Assistance Service
                </span>
                {/* Live Status Pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                    janazahInfo.isAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      janazahInfo.isAvailable ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                  />
                  <span>{janazahInfo.isAvailable ? 'Service Available' : 'Currently in Use'}</span>
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#145744]">
                Sandook-e-Janazah (Funeral Bier Service)
              </h2>
              <p className="text-xs sm:text-sm text-[#445650] mt-1 max-w-2xl leading-relaxed">
                Habib Manzil Masjid maintains a clean, dignified Sandook-e-Janazah provided completely free of charge to community families during times of bereavement.
              </p>
            </div>

            {/* Emergency Hotline Contact Card */}
            <div className="bg-[#FAF8F0] p-4 rounded-xl border border-[#E8DCC7] text-xs space-y-1.5 shrink-0 w-full sm:w-auto">
              <div className="text-[11px] text-[#64746B] font-semibold uppercase tracking-wider">
                Emergency Caretaker Helpline (24/7)
              </div>
              <div className="text-sm font-bold font-mono text-[#145744] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C6A15B]" />
                <span>{janazahInfo.contactPhone}</span>
              </div>
              <div className="text-[11px] text-[#64746B]">
                Secondary: {janazahInfo.secondaryPhone}
              </div>
            </div>
          </div>

          {/* Procedure Steps */}
          <div>
            <h3 className="font-display text-base font-bold text-[#26332E] mb-4">
              Arrangement Guidelines &amp; Procedure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {janazahInfo.procedureSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAF8F0]/70 border border-[#E8DCC7]/80 text-xs text-[#445650] flex items-start gap-3"
                >
                  <span className="font-mono text-xs font-bold text-[#145744] bg-[#145744]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8DCC7] text-[11px] text-[#64746B] flex items-center justify-between">
            <span>Availability verified as of: {janazahInfo.lastCheckedDate}</span>
            <span className="text-[#145744] font-medium">Free of charge for all Muslims in need</span>
          </div>
        </section>

        {/* 5 Other Services in 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service A: Nikah at the Masjid */}
          <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#145744]/10 text-[#145744] flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#145744]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
                Sacred Union
              </div>
              <h3 className="font-display text-2xl font-bold text-[#145744] mb-3">
                Nikah at the Masjid
              </h3>
              <p className="text-xs sm:text-sm text-[#445650] leading-relaxed mb-4">
                Conducting the sacred covenant of Nikah in the peaceful setting of the masjid revives the prophetic Sunnah: "Announce this marriage, perform it in mosques, and beat the tambourines for it" (Tirmidhi).
              </p>
              <ul className="space-y-2 text-xs text-[#64746B] mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Nikah ceremony solemnized by respected resident Qazi / Imam</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Official Nikahnama certificate documentation issued</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Modest arrangements for up to 100 guests in attendance</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8DCC7]">
              <button
                onClick={() => setActiveFormModal('nikah')}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#145744] hover:bg-[#0e3b2e] cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Nikah Enquiry</span>
              </button>
            </div>
          </div>

          {/* Service B: Special Islamic Programmes */}
          <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#145744]/10 text-[#145744] flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-[#145744]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
                Religious Gatherings
              </div>
              <h3 className="font-display text-2xl font-bold text-[#145744] mb-3">
                Special Islamic Programmes
              </h3>
              <p className="text-xs sm:text-sm text-[#445650] leading-relaxed mb-4">
                Community members and religious teachers may request permission to organise Islamic talks, Quranic study circles, Seerah sessions, or commemorative gatherings in the masjid hall.
              </p>
              <ul className="space-y-2 text-xs text-[#64746B] mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Sound system &amp; mic facilities available upon approval</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Segregated seating arrangements for male and female attendees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Subject to formal vetting and committee clearance</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8DCC7]">
              <button
                onClick={() => setActiveFormModal('programme')}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#145744] hover:bg-[#0e3b2e] cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Programme Permission</span>
              </button>
            </div>
          </div>

          {/* Service C: Social Welfare & Blood Donation */}
          <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#145744]/10 text-[#145744] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-[#145744]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
                Humanitarian Relief
              </div>
              <h3 className="font-display text-2xl font-bold text-[#145744] mb-3">
                Social Welfare &amp; Blood Donation
              </h3>
              <p className="text-xs sm:text-sm text-[#445650] leading-relaxed mb-4">
                Under Fahad Education &amp; Welfare Society, our team coordinates humanitarian assistance for widows, orphans, and families in acute distress across Navi Mumbai with strict privacy.
              </p>
              <ul className="space-y-2 text-xs text-[#64746B] mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Annual Ramadan staple food kit distributions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Emergency blood donation directory and donor drives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Educational fee subsidies for deserving underprivileged students</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8DCC7]">
              <button
                onClick={() => setActiveFormModal('volunteer')}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-[#145744] bg-[#145744]/10 hover:bg-[#145744]/20 cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Volunteer for Welfare Drives</span>
              </button>
            </div>
          </div>

          {/* Service E: Islamic Education & Learning */}
          <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#145744]/10 text-[#145744] flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-[#145744]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
                Prophetic Knowledge
              </div>
              <h3 className="font-display text-2xl font-bold text-[#145744] mb-3">
                Islamic Education &amp; Learning
              </h3>
              <p className="text-xs sm:text-sm text-[#445650] leading-relaxed mb-4">
                Equipping young minds and adult learners with sound religious literacy, correct Tajweed, and practical application of Islamic etiquette (Adab).
              </p>
              <ul className="space-y-2 text-xs text-[#64746B] mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Daily Evening Maktab for Boys &amp; Girls (5:30 PM - 7:00 PM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Weekend Quranic Arabic Grammar for Working Professionals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#145744] shrink-0" />
                  <span>Sunday Morning Sister's Bayan and Tajweed Circle</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8DCC7]">
              <button
                onClick={() => setActiveFormModal('volunteer')}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-[#145744] bg-[#145744]/10 hover:bg-[#145744]/20 cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Enquire About Admissions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Volunteer Invitation Callout */}
        <section className="bg-gradient-to-r from-[#145744] to-[#0e3b2e] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-2">
              Sincere Opportunity
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold mb-3">
              Volunteer With Habib Manzil Masjid
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DCC7] leading-relaxed mb-6">
              "The most beloved of people to Allah are those who are most beneficial to people." (Al-Mu’jam al-Awsat).
              Join our dedicated corps of youth, professionals, and elders lending their time for prayer organization, Ramadan iftars, educational programs, and humanitarian support.
            </p>

            <button
              onClick={() => setActiveFormModal('volunteer')}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-[#C6A15B] text-[#0e3b2e] hover:bg-[#d8b56f] shadow-md transition-all duration-200 cursor-pointer"
            >
              Fill Volunteer Interest Form &rarr;
            </button>
          </div>
        </section>
      </div>

      {/* Modal: Nikah Enquiry Form */}
      {activeFormModal === 'nikah' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCC7] relative max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl font-bold text-[#145744] mb-2">
              Nikah Ceremony Enquiry
            </h3>
            <p className="text-xs text-[#64746B] mb-6">
              Please submit preliminary details. Our administration office will contact you to verify documentation and solemnization dates.
            </p>

            {nikahSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs text-emerald-800 space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Enquiry Received Successfully!</div>
                <p>JazakAllah Khair. A committee member will review your requested date and contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleNikahSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Representative / Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={nikahApplicant}
                    onChange={(e) => setNikahApplicant(e.target.value)}
                    placeholder="e.g. Mohammed Farooq"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={nikahPhone}
                      onChange={(e) => setNikahPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={nikahEmail}
                      onChange={(e) => setNikahEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Preferred Date of Nikah *
                    </label>
                    <input
                      type="date"
                      required
                      value={nikahDate}
                      onChange={(e) => setNikahDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Expected Attendees
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="150"
                      value={nikahGuests}
                      onChange={(e) => setNikahGuests(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Special Requirements / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={nikahNotes}
                    onChange={(e) => setNikahNotes(e.target.value)}
                    placeholder="Preferred time (e.g., after Asr or Maghrib), Qazi preferences, or other notes..."
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="p-3 rounded-lg bg-[#FAF8F0] border border-[#E8DCC7] text-[11px] text-[#64746B]">
                  Notice: Final booking is subject to verification of legal identity documents and committee schedule approval.
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DCC7]">
                  <button
                    type="button"
                    onClick={() => setActiveFormModal(null)}
                    className="px-4 py-2 font-medium text-[#64746B] hover:bg-[#FAF8F0] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={nikahSubmitting}
                    className="px-5 py-2 font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] rounded-lg shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {nikahSubmitting ? 'Sending...' : 'Submit Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Volunteer Form */}
      {activeFormModal === 'volunteer' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCC7] relative max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl font-bold text-[#145744] mb-2">
              Volunteer Application
            </h3>
            <p className="text-xs text-[#64746B] mb-6">
              Lend your time, skills, and energy for the sake of Allah to support our community.
            </p>

            {volSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs text-emerald-800 space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Application Submitted!</div>
                <p>May Allah reward your sincere intention. Our volunteer coordinator will connect with you.</p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    placeholder="e.g. Tariq Khan"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      placeholder="tariq@example.com"
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Primary Area of Interest *
                  </label>
                  <select
                    value={volInterest}
                    onChange={(e) => setVolInterest(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  >
                    <option value="Ramadan Ration & Food Drives">Ramadan Ration &amp; Food Drives</option>
                    <option value="Sandook-e-Janazah Support">Sandook-e-Janazah Support Team</option>
                    <option value="Blood Donation Coordination">Blood Donation Coordination</option>
                    <option value="Children Islamic Classes Assistance">Children Islamic Classes Assistance</option>
                    <option value="Audio/Visual & IT Support">Audio/Visual &amp; IT Support</option>
                    <option value="Facility Cleanliness & Maintenance">Facility Cleanliness &amp; Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Availability *
                  </label>
                  <select
                    value={volAvailability}
                    onChange={(e) => setVolAvailability(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  >
                    <option value="Weekends (Saturday/Sunday)">Weekends (Saturday/Sunday)</option>
                    <option value="Friday Jumuah Hours">Friday Jumu'ah Hours</option>
                    <option value="Evenings After Maghrib">Evenings After Maghrib</option>
                    <option value="Emergency On-Call">Emergency On-Call (Janazah &amp; Welfare)</option>
                    <option value="Flexible / As Needed">Flexible / As Needed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Past Experience / Skills (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={volExperience}
                    onChange={(e) => setVolExperience(e.target.value)}
                    placeholder="e.g. First aid, event management, driving, teaching..."
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DCC7]">
                  <button
                    type="button"
                    onClick={() => setActiveFormModal(null)}
                    className="px-4 py-2 font-medium text-[#64746B] hover:bg-[#FAF8F0] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={volSubmitting}
                    className="px-5 py-2 font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] rounded-lg shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {volSubmitting ? 'Submitting...' : 'Register as Volunteer'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Programme Request Form */}
      {activeFormModal === 'programme' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DCC7] relative max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl font-bold text-[#145744] mb-2">
              Request Special Programme Permission
            </h3>
            <p className="text-xs text-[#64746B] mb-6">
              All religious talks and educational gatherings require prior review and consent from the masjid administration.
            </p>

            {progSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs text-emerald-800 space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Request Submitted!</div>
                <p>The committee will review your request and get back to you.</p>
              </div>
            ) : (
              <form onSubmit={handleProgSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Organizer / Group Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={progName}
                    onChange={(e) => setProgName(e.target.value)}
                    placeholder="e.g. Sector 20 Youth Group"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={progPhone}
                      onChange={(e) => setProgPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={progEmail}
                      onChange={(e) => setProgEmail(e.target.value)}
                      placeholder="organizer@example.com"
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Programme Nature
                    </label>
                    <select
                      value={progType}
                      onChange={(e) => setProgType(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    >
                      <option value="Quranic Gathering / Khatm">Quranic Gathering / Khatm</option>
                      <option value="Islamic Lecture / Bayan">Islamic Lecture / Bayan</option>
                      <option value="Educational Workshop">Educational Workshop</option>
                      <option value="Youth Mentorship Session">Youth Mentorship Session</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Proposed Date &amp; Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={progDate}
                      onChange={(e) => setProgDate(e.target.value)}
                      placeholder="e.g. Next Sunday after Maghrib"
                      className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Purpose &amp; Speaker Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={progPurpose}
                    onChange={(e) => setProgPurpose(e.target.value)}
                    placeholder="Mention the topic, invited speaker credentials, and anticipated crowd size..."
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DCC7]">
                  <button
                    type="button"
                    onClick={() => setActiveFormModal(null)}
                    className="px-4 py-2 font-medium text-[#64746B] hover:bg-[#FAF8F0] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={progSubmitting}
                    className="px-5 py-2 font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] rounded-lg shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {progSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
