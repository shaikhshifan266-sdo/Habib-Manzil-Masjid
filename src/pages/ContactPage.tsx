import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  MessageSquare,
  CheckCircle,
  Shield,
  Star,
  ExternalLink,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContactMessage, submitFeedback } = useMasjid();

  // General Enquiry Form State
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryContact, setEnquiryContact] = useState('');
  const [enquiryCategory, setEnquiryCategory] = useState('General Enquiry');
  const [enquirySubject, setEnquirySubject] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);

  // Community Feedback State
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackContact, setFeedbackContact] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('Facilities');
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitting(true);
    await submitContactMessage({
      fullName: enquiryName,
      contact: enquiryContact,
      category: enquiryCategory,
      subject: enquirySubject,
      message: enquiryMessage,
    });
    setEnquirySubmitting(false);
    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setEnquiryName('');
      setEnquiryContact('');
      setEnquirySubject('');
      setEnquiryMessage('');
    }, 3000);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitting(true);
    await submitFeedback({
      name: feedbackName || undefined,
      contact: feedbackContact || undefined,
      category: feedbackCategory,
      rating: feedbackRating,
      message: feedbackMessage,
    });
    setFeedbackSubmitting(false);
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setFeedbackName('');
      setFeedbackContact('');
      setFeedbackMessage('');
    }, 3000);
  };

  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Habib+Manzil+Masjid+Behind+SBI+Bank+Nerul+Sector+20+Navi+Mumbai',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#145744] to-[#0e3b2e] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C6A15B] font-medium mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Nerul, Navi Mumbai · We Are Here to Serve You</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Contact &amp; Find Us
          </h1>
          <p className="text-sm sm:text-base text-[#E8DCC7] max-w-2xl mx-auto leading-relaxed">
            Reach out with enquiries, feedback, or guidance. Visitors and worshippers are always welcome.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Info Cards & Map Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Official Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-[#145744] mb-6">
                Habib Manzil Masjid
              </h2>

              <div className="space-y-5 text-xs text-[#445650]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#145744]/10 text-[#145744] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#26332E] text-sm">Physical Address</h3>
                    <p className="mt-1 leading-relaxed">
                      Behind State Bank of India (SBI), Sector 20, Nerul, Navi Mumbai, Maharashtra 400706, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#145744]/10 text-[#145744] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#26332E] text-sm">Masjid &amp; Office Timings</h3>
                    <p className="mt-1 leading-relaxed">
                      <strong>Prayer Hall:</strong> Open daily 05:00 AM – 10:00 PM for all 5 prayers.
                    </p>
                    <p className="mt-1 text-[#64746B]">
                      <strong>Administrative Office:</strong> 10:00 AM – 01:00 PM &amp; 05:00 PM – 08:00 PM.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#145744]/10 text-[#145744] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#26332E] text-sm">Telephone Helplines</h3>
                    <p className="mt-1 font-mono font-medium text-[#145744]">
                      +91 98200 12345 <span className="text-[11px] text-[#64746B] font-sans">(Office Helpline)</span>
                    </p>
                    <p className="mt-0.5 font-mono text-[#64746B]">
                      +91 98200 67890 <span className="text-[11px] font-sans">(Janazah Emergency 24/7)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#145744]/10 text-[#145744] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#26332E] text-sm">Official Email</h3>
                    <p className="mt-1 font-mono text-[#145744]">
                      contact@habibmanzilmasjid.org
                    </p>
                    <p className="text-[11px] text-[#64746B]">
                      Fahad Education &amp; Welfare Society
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8DCC7]">
                <button
                  onClick={openGoogleMaps}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-xs cursor-pointer transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#C6A15B]" />
                  <span>Open in Google Maps (Get Directions)</span>
                </button>
              </div>
            </div>

            {/* Respectful Transparency Notice */}
            <div className="p-4 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] text-xs text-[#64746B] leading-relaxed">
              <strong>Verification Standard:</strong> Contact numbers and official communications are maintained under the direct supervision of the masjid committee. Non-verified personal phone numbers are omitted to respect member privacy.
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed & Directions Guide */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8DCC7] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#E8DCC7]">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#145744]">
                    Location &amp; Landmark Guide
                  </h3>
                  <p className="text-xs text-[#64746B] mt-0.5">
                    Nerul, Sector 20, Navi Mumbai (Directly behind State Bank of India branch)
                  </p>
                </div>
                <button
                  onClick={openGoogleMaps}
                  className="text-xs font-semibold text-[#145744] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[#E8DCC7] shadow-inner bg-stone-100">
                <iframe
                  title="Habib Manzil Masjid Location Map"
                  src="https://maps.google.com/maps?q=Habib+Manzil+Masjid+Nerul+Sector+20+Navi+Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#445650]">
                <div className="p-3 rounded-lg bg-[#FAF8F0] border border-[#E8DCC7]/80">
                  <span className="font-bold text-[#26332E]">Transit by Train:</span> Nerul Railway Station (Harbour Line) is approx. 8–10 minutes via auto-rickshaw to Sector 20.
                </div>
                <div className="p-3 rounded-lg bg-[#FAF8F0] border border-[#E8DCC7]/80">
                  <span className="font-bold text-[#26332E]">Key Landmark:</span> State Bank of India (SBI) Nerul Branch. The masjid is located directly behind the bank building.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Forms Split: General Enquiry on Left, Help Us Serve Better Feedback on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form 1: General Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-[#145744] mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs text-[#64746B] mb-6">
              Have questions regarding prayer timings, Nikah arrangements, classes, or general masjid services? Write to our team.
            </p>

            {enquirySuccess ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs text-emerald-800 space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Message Received Successfully!</div>
                <p>JazakAllah Khair for reaching out. We will respond to your contact details promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    placeholder="e.g. Asad Shaikh"
                    className="w-full px-3 py-2.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Phone Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryContact}
                      onChange={(e) => setEnquiryContact(e.target.value)}
                      placeholder="+91 98XXX XXXXX or email"
                      className="w-full px-3 py-2.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#26332E] mb-1">
                      Enquiry Category *
                    </label>
                    <select
                      value={enquiryCategory}
                      onChange={(e) => setEnquiryCategory(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Prayer Timings">Prayer Timings &amp; Jama'ah</option>
                      <option value="Islamic Classes">Islamic Classes &amp; Maktab</option>
                      <option value="Nikah">Nikah at the Masjid</option>
                      <option value="Special Programmes">Special Programmes</option>
                      <option value="Community Services">Community &amp; Welfare Services</option>
                      <option value="Volunteering">Volunteering</option>
                      <option value="Other">Other Matter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquirySubject}
                    onChange={(e) => setEnquirySubject(e.target.value)}
                    placeholder="Brief summary of your question"
                    className="w-full px-3 py-2.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Detailed Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    placeholder="Please write your questions or comments with clarity..."
                    className="w-full px-3 py-2.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#C6A15B]" />
                    <span>{enquirySubmitting ? 'Sending Message...' : 'Submit Enquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Form 2: Community Feedback Form ("Help Us Serve Better") (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-[#C6A15B]" />
              <h3 className="font-display text-xl font-bold text-[#145744]">
                Help Us Serve Better
              </h3>
            </div>
            <p className="text-xs text-[#64746B] mb-6">
              Your candid constructive suggestions help the committee improve prayer arrangements, facilities, and educational programs.
            </p>

            {feedbackSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs text-emerald-800 space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Feedback Acknowledged!</div>
                <p>May Allah reward you for helping us uphold and better the House of Allah.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Your Name <span className="font-normal text-[#64746B]">(Optional / Anonymous)</span>
                  </label>
                  <input
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="Leave blank for anonymous submission"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Phone / Email <span className="font-normal text-[#64746B]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={feedbackContact}
                    onChange={(e) => setFeedbackContact(e.target.value)}
                    placeholder="If you desire a reply from the committee"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Feedback Category *
                  </label>
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  >
                    <option value="Facilities">Facilities &amp; Cleanliness (Wudu / Hall)</option>
                    <option value="Prayer Arrangements">Prayer &amp; Sound Arrangements</option>
                    <option value="Islamic Education">Islamic Education &amp; Maktab</option>
                    <option value="Community Programmes">Community &amp; Youth Programmes</option>
                    <option value="Social Services">Social &amp; Welfare Services</option>
                    <option value="Suggestions">General Constructive Suggestions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Overall Satisfaction Rating
                  </label>
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 cursor-pointer focus:outline-hidden"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= feedbackRating
                              ? 'text-[#C6A15B] fill-[#C6A15B]'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#64746B] ml-2 font-medium">
                      {feedbackRating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#26332E] mb-1">
                    Your Constructive Comments *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="What can we do to improve your prayer experience or educational programs?"
                    className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg focus:outline-hidden focus:border-[#145744]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={feedbackSubmitting}
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-xs cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    {feedbackSubmitting ? 'Saving...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Privacy Notice */}
        <section className="bg-white rounded-2xl border border-[#E8DCC7] p-6 sm:p-8 text-xs text-[#64746B] leading-relaxed shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-[#145744] mb-2">
            <Shield className="w-4 h-4" />
            <span>Privacy &amp; Data Transparency Notice</span>
          </div>
          <p>
            Habib Manzil Masjid values the confidentiality and trust of all community members. Information collected through our forms (such as names, phone numbers, and messages) is utilized solely for responding to your enquiries, coordinating services, and improving masjid facilities. We never sell, exchange, or publicly disclose personal identifiers without explicit prior authorization.
          </p>
        </section>
      </div>
    </div>
  );
};
