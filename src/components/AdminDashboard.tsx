import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import {
  X,
  Lock,
  Clock,
  Calendar,
  Bell,
  HeartHandshake,
  MessageSquare,
  Users,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Save,
  Phone,
  FileText,
  Download,
  Video,
  CreditCard,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Announcement, YouTubeVideoItem } from '../types/masjid';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    prayerSchedule,
    updatePrayerSchedule,
    calendarInfo,
    updateHijriOffset,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    janazahInfo,
    updateJanazahInfo,
    donationInfo,
    updateDonationInfo,
    youtubeConfig,
    updateYouTubeConfig,
    exportAllData,
    nikahInquiries,
    volunteerApplications,
    programmeRequests,
    contactMessages,
    feedbackList,
  } = useMasjid();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'timings' | 'calendar' | 'janazah' | 'announcements' | 'donations' | 'youtube' | 'inquiries' | 'feedback'
  >('timings');

  // Form states for prayer timings
  const [asrMethod, setAsrMethod] = useState<'Hanafi (2x shadow)' | 'Shafi’i / Standard (1x shadow)'>(
    prayerSchedule.asrMethod || 'Hanafi (2x shadow)'
  );

  // Form states for prayer timings
  const [fajrAzan, setFajrAzan] = useState(prayerSchedule.fajr.azan);
  const [fajrJamaah, setFajrJamaah] = useState(prayerSchedule.fajr.jamaah);
  const [sunriseTime, setSunriseTime] = useState(prayerSchedule.sunrise.time);
  const [dhuhrAzan, setDhuhrAzan] = useState(prayerSchedule.dhuhr.azan);
  const [dhuhrJamaah, setDhuhrJamaah] = useState(prayerSchedule.dhuhr.jamaah);
  const [asrAzan, setAsrAzan] = useState(prayerSchedule.asr.azan);
  const [asrJamaah, setAsrJamaah] = useState(prayerSchedule.asr.jamaah);
  const [maghribAzan, setMaghribAzan] = useState(prayerSchedule.maghrib.azan);
  const [maghribJamaah, setMaghribJamaah] = useState(prayerSchedule.maghrib.jamaah);
  const [ishaAzan, setIshaAzan] = useState(prayerSchedule.isha.azan);
  const [ishaJamaah, setIshaJamaah] = useState(prayerSchedule.isha.jamaah);
  const [jumuah1Jamaah, setJumuah1Jamaah] = useState(prayerSchedule.jumuah1.jamaah);
  const [jumuah2Jamaah, setJumuah2Jamaah] = useState(prayerSchedule.jumuah2.jamaah);
  const [ramadanActive, setRamadanActive] = useState(prayerSchedule.ramadan.active);
  const [suhoorEnd, setSuhoorEnd] = useState(prayerSchedule.ramadan.suhoorEnd);
  const [iftarTime, setIftarTime] = useState(prayerSchedule.ramadan.iftarTime);
  const [taraweehTime, setTaraweehTime] = useState(prayerSchedule.ramadan.taraweehTime);

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Janazah toggle
  const [janazahAvailable, setJanazahAvailable] = useState(janazahInfo.isAvailable);
  const [janazahContact, setJanazahContact] = useState(janazahInfo.contactPhone);

  // New Announcement
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<Announcement['category']>('Notice');
  const [newAnnDate, setNewAnnDate] = useState('October 2026');
  const [newAnnContent, setNewAnnContent] = useState('');

  // Donation form states
  const [donationUpi, setDonationUpi] = useState(donationInfo.upiId);
  const [donationAccountName, setDonationAccountName] = useState(donationInfo.accountName);
  const [donationBankName, setDonationBankName] = useState(donationInfo.bankName);
  const [donationAccountNumber, setDonationAccountNumber] = useState(donationInfo.accountNumber);
  const [donationIfsc, setDonationIfsc] = useState(donationInfo.ifscCode);
  const [donationBranch, setDonationBranch] = useState(donationInfo.branch);
  const [donationPhone, setDonationPhone] = useState(donationInfo.contactPhone);
  const [urgentActive, setUrgentActive] = useState(donationInfo.urgentAppeal?.active || false);
  const [urgentTitle, setUrgentTitle] = useState(donationInfo.urgentAppeal?.title || '');
  const [urgentDesc, setUrgentDesc] = useState(donationInfo.urgentAppeal?.description || '');
  const [urgentTarget, setUrgentTarget] = useState(donationInfo.urgentAppeal?.targetAmount || '');

  // YouTube states
  const [channelUrl, setChannelUrl] = useState(youtubeConfig.channelUrl);
  const [newYtTitle, setNewYtTitle] = useState('');
  const [newYtId, setNewYtId] = useState('');
  const [newYtCategory, setNewYtCategory] = useState<YouTubeVideoItem['category']>('Friday Khutbah');
  const [newYtDuration, setNewYtDuration] = useState('25:00');
  const [newYtSpeaker, setNewYtSpeaker] = useState('');

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pinInput);
    if (success) {
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleSaveTimings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePrayerSchedule({
      asrMethod,
      fajr: { azan: fajrAzan, jamaah: fajrJamaah },
      sunrise: { time: sunriseTime },
      dhuhr: { azan: dhuhrAzan, jamaah: dhuhrJamaah },
      asr: { azan: asrAzan, jamaah: asrJamaah },
      maghrib: { azan: maghribAzan, jamaah: maghribJamaah },
      isha: { azan: ishaAzan, jamaah: ishaJamaah },
      jumuah1: { ...prayerSchedule.jumuah1, jamaah: jumuah1Jamaah },
      jumuah2: { ...prayerSchedule.jumuah2, jamaah: jumuah2Jamaah },
      ramadan: {
        active: ramadanActive,
        suhoorEnd,
        iftarTime,
        taraweehTime,
      },
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveDonations = (e: React.FormEvent) => {
    e.preventDefault();
    updateDonationInfo({
      upiId: donationUpi,
      accountName: donationAccountName,
      bankName: donationBankName,
      accountNumber: donationAccountNumber,
      ifscCode: donationIfsc,
      branch: donationBranch,
      contactPhone: donationPhone,
      urgentAppeal: {
        active: urgentActive,
        title: urgentTitle,
        description: urgentDesc,
        targetAmount: urgentTarget,
      },
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveYouTubeChannel = (e: React.FormEvent) => {
    e.preventDefault();
    updateYouTubeConfig({ channelUrl });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAddYouTubeVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newYtTitle.trim() || !newYtId.trim()) return;
    const newVideo: YouTubeVideoItem = {
      id: `yt-${Date.now()}`,
      title: newYtTitle,
      publishedDate: 'Recently Added',
      duration: newYtDuration || '25:00',
      category: newYtCategory,
      youtubeVideoId: newYtId.trim(),
      speaker: newYtSpeaker || undefined,
    };
    updateYouTubeConfig({
      videos: [newVideo, ...youtubeConfig.videos],
    });
    setNewYtTitle('');
    setNewYtId('');
    setNewYtSpeaker('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleDeleteYouTubeVideo = (id: string) => {
    updateYouTubeConfig({
      videos: youtubeConfig.videos.filter((v) => v.id !== id),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSaveJanazah = (e: React.FormEvent) => {
    e.preventDefault();
    updateJanazahInfo({
      isAvailable: janazahAvailable,
      contactPhone: janazahContact,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    addAnnouncement({
      title: newAnnTitle,
      category: newAnnCategory,
      date: newAnnDate,
      content: newAnnContent,
      isPinned: false,
    });

    setNewAnnTitle('');
    setNewAnnContent('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#E8DCC7] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#0e3b2e] text-white p-5 flex items-center justify-between border-b border-[#145744]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#145744] text-[#C6A15B] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Habib Manzil Masjid Administration Portal
              </h3>
              <p className="text-[11px] text-[#A8BFA8]">
                Committee control panel for prayer times, announcements &amp; services
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-1.5 rounded-lg text-[#E8DCC7] hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!isAdminAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#145744]/10 text-[#145744] mx-auto flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-[#145744]">
                Committee Passcode Required
              </h4>
              <p className="text-xs text-[#64746B] mt-1.5 leading-relaxed">
                Enter authorized management PIN to adjust congregation times, publish announcements, or review community submissions.
              </p>
              <div className="mt-2 text-[11px] text-[#C6A15B] font-mono bg-[#FAF8F0] p-2 rounded-lg border border-[#E8DCC7]">
                Master Committee PIN: <strong>7860</strong> or <strong>2012</strong> (ESTD)
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN..."
                className="w-full text-center text-lg tracking-widest px-4 py-2.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded-xl focus:outline-hidden focus:border-[#145744]"
                autoFocus
              />

              {pinError && (
                <div className="text-xs text-rose-600 font-medium flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Invalid passcode. Please use 7860 or 2012.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-xs cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Tabs Bar */}
            <div className="bg-[#FAF8F0] border-b border-[#E8DCC7] px-4 pt-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('timings')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'timings'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Prayer Times</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'calendar'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Hijri Moon Adjuster</span>
              </button>

              <button
                onClick={() => setActiveTab('janazah')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'janazah'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Janazah Service</span>
              </button>

              <button
                onClick={() => setActiveTab('announcements')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'announcements'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Announcements ({announcements.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('donations')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'donations'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Donations &amp; UPI</span>
              </button>

              <button
                onClick={() => setActiveTab('youtube')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'youtube'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>YouTube Media ({youtubeConfig.videos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'inquiries'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Inquiries ({nikahInquiries.length + volunteerApplications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'feedback'
                    ? 'bg-white text-[#145744] border-t-2 border-[#145744]'
                    : 'text-[#64746B] hover:text-[#145744]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Feedback ({feedbackList.length})</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {saveSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2 border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Changes saved and published to the live website!</span>
                </div>
              )}

              {/* TAB: PRAYER TIMINGS */}
              {activeTab === 'timings' && (
                <form onSubmit={handleSaveTimings} className="space-y-6 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8DCC7]">
                    <div>
                      <h4 className="font-bold text-[#145744] text-sm">
                        Edit Daily Jama'ah Congregation Timetable
                      </h4>
                      <p className="text-[#64746B] text-[11px]">
                        Changes are timestamped and published instantly across all visitor screens.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save &amp; Update Live</span>
                    </button>
                  </div>

                  {/* Juristic Asr Calculation Method Selector */}
                  <div className="p-3.5 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-[#145744] block">Asr Juristic Calculation Method</span>
                      <span className="text-[11px] text-[#64746B]">
                        Applies to Asr Azan calculation and prints on daily &amp; monthly timetable sheets
                      </span>
                    </div>
                    <select
                      value={asrMethod}
                      onChange={(e) => setAsrMethod(e.target.value as any)}
                      className="px-3 py-1.5 bg-white border border-[#E8DCC7] rounded-lg text-xs font-semibold text-[#145744] cursor-pointer"
                    >
                      <option value="Hanafi (2x shadow)">Hanafi (2x shadow - Standard Indian Subcontinent)</option>
                      <option value="Shafi’i / Standard (1x shadow)">Shafi’i / Standard (1x shadow)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Fajr */}
                    <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]">
                      <div className="font-bold text-[#26332E] mb-2">Fajr</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] text-[#64746B]">Azan (Begins)</label>
                          <input
                            type="text"
                            value={fajrAzan}
                            onChange={(e) => setFajrAzan(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#64746B]">Jama'ah</label>
                          <input
                            type="text"
                            value={fajrJamaah}
                            onChange={(e) => setFajrJamaah(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs font-bold text-[#145744]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sunrise */}
                    <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]">
                      <div className="font-bold text-[#26332E] mb-2">Sunrise (Ishraq)</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] text-[#64746B]">Sunrise Time</label>
                          <input
                            type="text"
                            value={sunriseTime}
                            onChange={(e) => setSunriseTime(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dhuhr */}
                    <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]">
                      <div className="font-bold text-[#26332E] mb-2">Dhuhr</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] text-[#64746B]">Azan</label>
                          <input
                            type="text"
                            value={dhuhrAzan}
                            onChange={(e) => setDhuhrAzan(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#64746B]">Jama'ah</label>
                          <input
                            type="text"
                            value={dhuhrJamaah}
                            onChange={(e) => setDhuhrJamaah(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs font-bold text-[#145744]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Asr */}
                    <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]">
                      <div className="font-bold text-[#26332E] mb-2">Asr</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] text-[#64746B]">Azan</label>
                          <input
                            type="text"
                            value={asrAzan}
                            onChange={(e) => setAsrAzan(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#64746B]">Jama'ah</label>
                          <input
                            type="text"
                            value={asrJamaah}
                            onChange={(e) => setAsrJamaah(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs font-bold text-[#145744]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Maghrib */}
                    <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]">
                      <div className="font-bold text-[#26332E] mb-2">Maghrib</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] text-[#64746B]">Azan</label>
                          <input
                            type="text"
                            value={maghribAzan}
                            onChange={(e) => setMaghribAzan(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#64746B]">Jama'ah</label>
                          <input
                            type="text"
                            value={maghribJamaah}
                            onChange={(e) => setMaghribJamaah(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs font-bold text-[#145744]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Isha */}
                    <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]">
                      <div className="font-bold text-[#26332E] mb-2">Isha</div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] text-[#64746B]">Azan</label>
                          <input
                            type="text"
                            value={ishaAzan}
                            onChange={(e) => setIshaAzan(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#64746B]">Jama'ah</label>
                          <input
                            type="text"
                            value={ishaJamaah}
                            onChange={(e) => setIshaJamaah(e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs font-bold text-[#145744]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Jumuah Congregrations */}
                  <div className="pt-4 border-t border-[#E8DCC7]">
                    <div className="font-bold text-[#145744] text-xs mb-3">
                      Friday Jumu'ah Congregations
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-[#64746B]">Jumu'ah 1st Jama'ah</label>
                        <input
                          type="text"
                          value={jumuah1Jamaah}
                          onChange={(e) => setJumuah1Jamaah(e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs font-bold text-[#C6A15B]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#64746B]">Jumu'ah 2nd Jama'ah</label>
                        <input
                          type="text"
                          value={jumuah2Jamaah}
                          onChange={(e) => setJumuah2Jamaah(e.target.value)}
                          className="w-full px-2 py-1.5 bg-white border border-[#E8DCC7] rounded font-mono text-xs font-bold text-[#145744]"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB: HIJRI MOON ADJUSTER */}
              {activeTab === 'calendar' && (
                <div className="space-y-4 text-xs">
                  <h4 className="font-bold text-[#145744] text-sm">
                    Local Moon Sighting Adjustment
                  </h4>
                  <p className="text-[#64746B]">
                    Because the Islamic calendar relies on local crescent (Hilal) moon sightings verified by the Navi Mumbai / Mumbai Ruyat-e-Hilal Committee, administrators can offset the calendar by +1 or -1 day.
                  </p>

                  <div className="p-4 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7] space-y-3">
                    <div className="text-xs">
                      Current Displayed Hijri Date:{' '}
                      <strong className="text-[#145744]">
                        {calendarInfo.hijriDay} {calendarInfo.hijriMonth} {calendarInfo.hijriYear} AH
                      </strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateHijriOffset(-1)}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                          calendarInfo.hijriOffsetDays === -1
                            ? 'bg-[#145744] text-white border-[#145744]'
                            : 'bg-white border-[#E8DCC7]'
                        }`}
                      >
                        -1 Day Offset
                      </button>
                      <button
                        type="button"
                        onClick={() => updateHijriOffset(0)}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                          calendarInfo.hijriOffsetDays === 0
                            ? 'bg-[#145744] text-white border-[#145744]'
                            : 'bg-white border-[#E8DCC7]'
                        }`}
                      >
                        Standard Astronomical (0)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateHijriOffset(1)}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                          calendarInfo.hijriOffsetDays === 1
                            ? 'bg-[#145744] text-white border-[#145744]'
                            : 'bg-white border-[#E8DCC7]'
                        }`}
                      >
                        +1 Day Offset
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: JANAZAH SERVICE TOGGLE */}
              {activeTab === 'janazah' && (
                <form onSubmit={handleSaveJanazah} className="space-y-4 text-xs">
                  <h4 className="font-bold text-[#145744] text-sm">
                    Sandook-e-Janazah Live Availability
                  </h4>
                  <p className="text-[#64746B]">
                    Toggle the live badge displayed to the community so families know immediately whether the funeral bier is on-site or in active service.
                  </p>

                  <div className="p-4 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7] space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="janazahToggle"
                        checked={janazahAvailable}
                        onChange={(e) => setJanazahAvailable(e.target.checked)}
                        className="w-4 h-4 text-[#145744] rounded"
                      />
                      <label htmlFor="janazahToggle" className="font-bold text-[#26332E]">
                        Mark Sandook-e-Janazah as "Available on Premises"
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#64746B] mb-1">
                        Coordinator 24/7 Helpline Number
                      </label>
                      <input
                        type="text"
                        value={janazahContact}
                        onChange={(e) => setJanazahContact(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg font-mono text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] cursor-pointer"
                    >
                      Update Janazah Service Status
                    </button>
                  </div>
                </form>
              )}

              {/* TAB: ANNOUNCEMENTS */}
              {activeTab === 'announcements' && (
                <div className="space-y-6 text-xs">
                  {/* Create New Announcement Form */}
                  <form onSubmit={handleAddAnnouncement} className="p-4 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7] space-y-3">
                    <div className="font-bold text-[#145744]">Publish New Notice</div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Notice Title..."
                        value={newAnnTitle}
                        onChange={(e) => setNewAnnTitle(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-[#E8DCC7] rounded"
                      />
                      <select
                        value={newAnnCategory}
                        onChange={(e) => setNewAnnCategory(e.target.value as any)}
                        className="px-3 py-1.5 bg-white border border-[#E8DCC7] rounded"
                      >
                        <option value="Notice">Notice</option>
                        <option value="Friday Khutbah">Friday Khutbah</option>
                        <option value="Classes">Classes</option>
                        <option value="Welfare">Welfare</option>
                        <option value="Program">Program</option>
                      </select>
                    </div>
                    <textarea
                      required
                      rows={2}
                      placeholder="Notice details..."
                      value={newAnnContent}
                      onChange={(e) => setNewAnnContent(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#E8DCC7] rounded"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded font-bold text-white bg-[#145744] cursor-pointer"
                    >
                      Publish Notice
                    </button>
                  </form>

                  {/* List of existing announcements */}
                  <div className="space-y-2">
                    <div className="font-bold text-[#26332E]">Existing Notices</div>
                    {announcements.map((ann) => (
                      <div
                        key={ann.id}
                        className="p-3 bg-white rounded-lg border border-[#E8DCC7] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-[#145744]">{ann.title}</div>
                          <div className="text-[11px] text-[#64746B]">
                            {ann.category} · {ann.date}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteAnnouncement(ann.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                          title="Remove notice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: DONATIONS & UPI SETTINGS */}
              {activeTab === 'donations' && (
                <form onSubmit={handleSaveDonations} className="space-y-6 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DCC7]">
                    <div>
                      <h4 className="font-bold text-[#145744] text-sm">
                        Donation Accounts &amp; UPI Configuration
                      </h4>
                      <p className="text-[#64746B] text-[11px]">
                        Configure official society accounts, UPI ID, and urgent appeal campaigns.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Donation Info</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Official UPI ID (VPA)
                      </label>
                      <input
                        type="text"
                        value={donationUpi}
                        onChange={(e) => setDonationUpi(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg font-mono text-xs font-bold text-[#145744]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Beneficiary / Account Name
                      </label>
                      <input
                        type="text"
                        value={donationAccountName}
                        onChange={(e) => setDonationAccountName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={donationBankName}
                        onChange={(e) => setDonationBankName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={donationAccountNumber}
                        onChange={(e) => setDonationAccountNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        value={donationIfsc}
                        onChange={(e) => setDonationIfsc(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg font-mono text-xs uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Branch Location
                      </label>
                      <input
                        type="text"
                        value={donationBranch}
                        onChange={(e) => setDonationBranch(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Treasurer / Committee WhatsApp Helpline
                      </label>
                      <input
                        type="text"
                        value={donationPhone}
                        onChange={(e) => setDonationPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Urgent Appeal Sub-form */}
                  <div className="p-4 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7] space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="urgentToggle"
                        checked={urgentActive}
                        onChange={(e) => setUrgentActive(e.target.checked)}
                        className="w-4 h-4 text-[#145744] rounded"
                      />
                      <label htmlFor="urgentToggle" className="font-bold text-[#26332E]">
                        Display Urgent Appeal Notice on Donation Page
                      </label>
                    </div>

                    {urgentActive && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[11px] text-[#64746B] mb-1">
                            Appeal Title
                          </label>
                          <input
                            type="text"
                            value={urgentTitle}
                            onChange={(e) => setUrgentTitle(e.target.value)}
                            placeholder="e.g. Rain Protection & Terrace Shed Waterproofing"
                            className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#64746B] mb-1">
                            Target Amount (Optional)
                          </label>
                          <input
                            type="text"
                            value={urgentTarget}
                            onChange={(e) => setUrgentTarget(e.target.value)}
                            placeholder="e.g. ₹ 1,50,000"
                            className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#64746B] mb-1">
                            Appeal Description
                          </label>
                          <textarea
                            rows={2}
                            value={urgentDesc}
                            onChange={(e) => setUrgentDesc(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              )}

              {/* TAB: YOUTUBE MEDIA HUB */}
              {activeTab === 'youtube' && (
                <div className="space-y-6 text-xs">
                  {/* Channel URL Config */}
                  <form onSubmit={handleSaveYouTubeChannel} className="p-4 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="flex-1">
                      <label className="block font-bold text-[#145744] text-xs mb-1">
                        Official YouTube Channel URL
                      </label>
                      <input
                        type="url"
                        value={channelUrl}
                        onChange={(e) => setChannelUrl(e.target.value)}
                        placeholder="https://www.youtube.com/@HabibManzilMasjid"
                        className="w-full px-3 py-2 bg-white border border-[#E8DCC7] rounded-lg text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] cursor-pointer whitespace-nowrap"
                    >
                      Update Channel Link
                    </button>
                  </form>

                  {/* Add New Video */}
                  <form onSubmit={handleAddYouTubeVideo} className="p-4 bg-white rounded-xl border border-[#E8DCC7] space-y-3">
                    <h5 className="font-bold text-[#145744] text-xs flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Publish New Video / Bayan</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#64746B] mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={newYtTitle}
                          onChange={(e) => setNewYtTitle(e.target.value)}
                          placeholder="e.g. Friday Khutbah on Sincerity"
                          className="w-full px-3 py-1.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#64746B] mb-1">
                          YouTube Video ID (or 11-char code)
                        </label>
                        <input
                          type="text"
                          required
                          value={newYtId}
                          onChange={(e) => setNewYtId(e.target.value)}
                          placeholder="e.g. dQw4w9WgXcQ"
                          className="w-full px-3 py-1.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#64746B] mb-1">Category</label>
                        <select
                          value={newYtCategory}
                          onChange={(e) => setNewYtCategory(e.target.value as any)}
                          className="w-full px-3 py-1.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded text-xs"
                        >
                          <option value="Friday Khutbah">Friday Khutbah</option>
                          <option value="Weekly Dars">Weekly Dars</option>
                          <option value="Quran Recitation">Quran Recitation</option>
                          <option value="Special Lecture">Special Lecture</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#64746B] mb-1">Speaker / Khateeb</label>
                        <input
                          type="text"
                          value={newYtSpeaker}
                          onChange={(e) => setNewYtSpeaker(e.target.value)}
                          placeholder="e.g. Resident Imam"
                          className="w-full px-3 py-1.5 bg-[#FAF8F0] border border-[#E8DCC7] rounded text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] cursor-pointer"
                    >
                      Add Video Card
                    </button>
                  </form>

                  {/* Existing Videos List */}
                  <div>
                    <h5 className="font-bold text-[#26332E] text-xs mb-3">
                      Current Videos Published on Homepage ({youtubeConfig.videos.length})
                    </h5>
                    <div className="space-y-2">
                      {youtubeConfig.videos.map((vid) => (
                        <div
                          key={vid.id}
                          className="p-3 bg-white rounded-xl border border-[#E8DCC7] flex items-center justify-between gap-4"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-[10px] text-[#64746B]">
                              <span className="font-semibold text-[#145744]">{vid.category}</span>
                              <span>·</span>
                              <span>{vid.duration}</span>
                            </div>
                            <h6 className="font-bold text-sm text-[#26332E] mt-0.5">{vid.title}</h6>
                            <div className="text-[11px] text-[#64746B]">
                              Speaker: {vid.speaker || 'Habib Manzil Media'} | YouTube ID: <span className="font-mono">{vid.youtubeVideoId}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteYouTubeVideo(vid.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                            title="Remove video card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6 text-xs">
                  <div>
                    <h4 className="font-bold text-[#145744] mb-3">
                      Nikah Inquiries ({nikahInquiries.length})
                    </h4>
                    {nikahInquiries.length === 0 ? (
                      <div className="p-4 bg-[#FAF8F0] rounded-xl text-center text-[#64746B]">
                        No Nikah enquiries received yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {nikahInquiries.map((n) => (
                          <div
                            key={n.id}
                            className="p-4 bg-white rounded-xl border border-[#E8DCC7] space-y-1"
                          >
                            <div className="flex justify-between font-bold text-[#26332E]">
                              <span>{n.applicantName}</span>
                              <span className="text-[#145744] font-mono">{n.preferredDate}</span>
                            </div>
                            <div className="text-[#64746B]">
                              Contact: {n.phone} | {n.email || 'No email provided'} | Attendees: {n.expectedGuests}
                            </div>
                            {n.notes && <div className="text-[11px] text-[#445650] italic">"{n.notes}"</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#E8DCC7]">
                    <h4 className="font-bold text-[#145744] mb-3">
                      Volunteer Registrations ({volunteerApplications.length})
                    </h4>
                    {volunteerApplications.length === 0 ? (
                      <div className="p-4 bg-[#FAF8F0] rounded-xl text-center text-[#64746B]">
                        No volunteer applications submitted yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {volunteerApplications.map((v) => (
                          <div
                            key={v.id}
                            className="p-4 bg-white rounded-xl border border-[#E8DCC7] space-y-1"
                          >
                            <div className="flex justify-between font-bold text-[#26332E]">
                              <span>{v.fullName}</span>
                              <span className="text-[#C6A15B]">{v.areaOfInterest}</span>
                            </div>
                            <div className="text-[#64746B]">
                              Phone: {v.phone} | Availability: {v.availability}
                            </div>
                            {v.experience && (
                              <div className="text-[11px] text-[#445650]">
                                Experience: {v.experience}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB: FEEDBACK */}
              {activeTab === 'feedback' && (
                <div className="space-y-4 text-xs">
                  <h4 className="font-bold text-[#145744] mb-2">
                    Community Suggestions &amp; Feedback ({feedbackList.length})
                  </h4>
                  {feedbackList.length === 0 ? (
                    <div className="p-4 bg-[#FAF8F0] rounded-xl text-center text-[#64746B]">
                      No feedback submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {feedbackList.map((f) => (
                        <div
                          key={f.id}
                          className="p-4 bg-white rounded-xl border border-[#E8DCC7] space-y-1"
                        >
                          <div className="flex justify-between font-bold text-[#26332E]">
                            <span>{f.name || 'Anonymous Worshipper'}</span>
                            <span className="text-[#C6A15B] font-medium">{f.category}</span>
                          </div>
                          <p className="text-[#445650] leading-relaxed">"{f.message}"</p>
                          <div className="text-[10px] text-[#64746B] pt-1">
                            Rating: {f.rating ? `${f.rating} / 5 Stars` : 'Unrated'} · Submitted: {f.submittedAt}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dashboard Footer */}
            <div className="bg-[#FAF8F0] px-6 py-3 border-t border-[#E8DCC7] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={exportAllData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E8DCC7] text-[#145744] hover:bg-[#FAF8F0] font-semibold cursor-pointer shadow-xs transition-colors"
                  title="Download complete JSON backup of prayer times, announcements, submissions, and settings"
                >
                  <Download className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Export Backup (JSON)</span>
                </button>
                <span className="text-[#64746B] hidden sm:inline">Authorized Session Active</span>
              </div>
              <button
                onClick={logoutAdmin}
                className="text-rose-700 hover:underline font-semibold cursor-pointer"
              >
                Log Out of Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
