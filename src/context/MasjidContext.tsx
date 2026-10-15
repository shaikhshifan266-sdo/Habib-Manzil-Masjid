import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageView,
  PrayerSchedule,
  IslamicCalendarInfo,
  HadithOfTheDay,
  MasjidEvent,
  Announcement,
  JanazahServiceInfo,
  NikahInquiry,
  VolunteerApplication,
  ProgrammeRequest,
  GeneralContactMessage,
  FeedbackSubmission,
  DonationInfo,
  YouTubeConfig,
} from '../types/masjid';
import {
  INITIAL_PRAYER_SCHEDULE,
  INITIAL_CALENDAR,
  CURATED_HADITHS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_JANAZAH_INFO,
  INITIAL_DONATION_INFO,
  INITIAL_YOUTUBE_CONFIG,
} from '../data/initialData';
import { getLiveIslamicCalendarInfo } from '../utils/islamicDate';

interface MasjidContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  prayerSchedule: PrayerSchedule;
  updatePrayerSchedule: (schedule: Partial<PrayerSchedule>) => void;
  calendarInfo: IslamicCalendarInfo;
  updateHijriOffset: (offset: number) => void;
  hadiths: HadithOfTheDay[];
  currentHadith: HadithOfTheDay;
  nextHadith: () => void;
  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;
  events: MasjidEvent[];
  addEvent: (ev: Omit<MasjidEvent, 'id'>) => void;
  janazahInfo: JanazahServiceInfo;
  updateJanazahInfo: (info: Partial<JanazahServiceInfo>) => void;
  
  // Forms & Inquiries
  nikahInquiries: NikahInquiry[];
  submitNikahInquiry: (inquiry: Omit<NikahInquiry, 'id' | 'submittedAt' | 'status'>) => Promise<boolean>;
  volunteerApplications: VolunteerApplication[];
  submitVolunteerApplication: (app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>) => Promise<boolean>;
  programmeRequests: ProgrammeRequest[];
  submitProgrammeRequest: (req: Omit<ProgrammeRequest, 'id' | 'submittedAt' | 'status'>) => Promise<boolean>;
  contactMessages: GeneralContactMessage[];
  submitContactMessage: (msg: Omit<GeneralContactMessage, 'id' | 'submittedAt' | 'status'>) => Promise<boolean>;
  feedbackList: FeedbackSubmission[];
  submitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'submittedAt'>) => Promise<boolean>;

  // Donation & Welfare
  donationInfo: DonationInfo;
  updateDonationInfo: (info: Partial<DonationInfo>) => void;

  // YouTube Media Hub
  youtubeConfig: YouTubeConfig;
  updateYouTubeConfig: (config: Partial<YouTubeConfig>) => void;

  // Admin Modal & State
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  exportAllData: () => void;

  // Search filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MasjidContext = createContext<MasjidContextType | undefined>(undefined);

export const MasjidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageView>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // LocalStorage backed persistent states
  const [prayerSchedule, setPrayerSchedule] = useState<PrayerSchedule>(() => {
    const saved = localStorage.getItem('hmm_prayer_schedule');
    return saved ? JSON.parse(saved) : INITIAL_PRAYER_SCHEDULE;
  });

  const [hijriOffset, setHijriOffset] = useState<number>(() => {
    const saved = localStorage.getItem('hmm_hijri_offset');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [calendarInfo, setCalendarInfo] = useState<IslamicCalendarInfo>(() => {
    const savedOffset = localStorage.getItem('hmm_hijri_offset');
    const offset = savedOffset ? parseInt(savedOffset, 10) : 0;
    return getLiveIslamicCalendarInfo(offset);
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('hmm_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [events, setEvents] = useState<MasjidEvent[]>(() => {
    const saved = localStorage.getItem('hmm_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [janazahInfo, setJanazahInfo] = useState<JanazahServiceInfo>(() => {
    const saved = localStorage.getItem('hmm_janazah_info');
    return saved ? JSON.parse(saved) : INITIAL_JANAZAH_INFO;
  });

  const [donationInfo, setDonationInfo] = useState<DonationInfo>(() => {
    const saved = localStorage.getItem('hmm_donation_info');
    return saved ? JSON.parse(saved) : INITIAL_DONATION_INFO;
  });

  const [youtubeConfig, setYouTubeConfig] = useState<YouTubeConfig>(() => {
    const saved = localStorage.getItem('hmm_youtube_config');
    return saved ? JSON.parse(saved) : INITIAL_YOUTUBE_CONFIG;
  });

  const [hadiths] = useState<HadithOfTheDay[]>(CURATED_HADITHS);
  const [hadithIndex, setHadithIndex] = useState(0);

  // Inquiries & Submissions
  const [nikahInquiries, setNikahInquiries] = useState<NikahInquiry[]>(() => {
    const saved = localStorage.getItem('hmm_nikah');
    return saved ? JSON.parse(saved) : [];
  });

  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplication[]>(() => {
    const saved = localStorage.getItem('hmm_volunteers');
    return saved ? JSON.parse(saved) : [];
  });

  const [programmeRequests, setProgrammeRequests] = useState<ProgrammeRequest[]>(() => {
    const saved = localStorage.getItem('hmm_programmes');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactMessages, setContactMessages] = useState<GeneralContactMessage[]>(() => {
    const saved = localStorage.getItem('hmm_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>(() => {
    const saved = localStorage.getItem('hmm_feedback');
    return saved ? JSON.parse(saved) : [];
  });

  // Admin state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('hmm_admin_auth') === 'true';
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('hmm_prayer_schedule', JSON.stringify(prayerSchedule));
  }, [prayerSchedule]);

  useEffect(() => {
    localStorage.setItem('hmm_calendar_info', JSON.stringify(calendarInfo));
  }, [calendarInfo]);

  useEffect(() => {
    localStorage.setItem('hmm_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('hmm_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('hmm_janazah_info', JSON.stringify(janazahInfo));
  }, [janazahInfo]);

  useEffect(() => {
    localStorage.setItem('hmm_nikah', JSON.stringify(nikahInquiries));
  }, [nikahInquiries]);

  useEffect(() => {
    localStorage.setItem('hmm_volunteers', JSON.stringify(volunteerApplications));
  }, [volunteerApplications]);

  useEffect(() => {
    localStorage.setItem('hmm_programmes', JSON.stringify(programmeRequests));
  }, [programmeRequests]);

  useEffect(() => {
    localStorage.setItem('hmm_contacts', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('hmm_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem('hmm_donation_info', JSON.stringify(donationInfo));
  }, [donationInfo]);

  useEffect(() => {
    localStorage.setItem('hmm_youtube_config', JSON.stringify(youtubeConfig));
  }, [youtubeConfig]);

  const setCurrentPage = (page: PageView) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updatePrayerSchedule = (updated: Partial<PrayerSchedule>) => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setPrayerSchedule((prev) => ({
      ...prev,
      ...updated,
      lastUpdated: dateFormatted,
    }));
  };

  const updateHijriOffset = (offset: number) => {
    setHijriOffset(offset);
    localStorage.setItem('hmm_hijri_offset', offset.toString());
    setCalendarInfo(getLiveIslamicCalendarInfo(offset));
  };

  // Keep live Hijri & Gregorian date in sync in real time
  useEffect(() => {
    const refreshDate = () => {
      setCalendarInfo(getLiveIslamicCalendarInfo(hijriOffset));
    };
    refreshDate();
    const interval = setInterval(refreshDate, 60000); // check every minute
    return () => clearInterval(interval);
  }, [hijriOffset]);

  const nextHadith = () => {
    setHadithIndex((prev) => (prev + 1) % hadiths.length);
  };

  const addAnnouncement = (ann: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const addEvent = (ev: Omit<MasjidEvent, 'id'>) => {
    const newEv: MasjidEvent = {
      ...ev,
      id: `ev-${Date.now()}`,
    };
    setEvents((prev) => [newEv, ...prev]);
  };

  const updateJanazahInfo = (info: Partial<JanazahServiceInfo>) => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setJanazahInfo((prev) => ({
      ...prev,
      ...info,
      lastCheckedDate: dateFormatted,
    }));
  };

  const submitNikahInquiry = async (
    inquiry: Omit<NikahInquiry, 'id' | 'submittedAt' | 'status'>
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600)); // simulated latency
    const newRecord: NikahInquiry = {
      ...inquiry,
      id: `nikah-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending Review',
    };
    setNikahInquiries((prev) => [newRecord, ...prev]);
    return true;
  };

  const submitVolunteerApplication = async (
    app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    const newRecord: VolunteerApplication = {
      ...app,
      id: `vol-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending',
    };
    setVolunteerApplications((prev) => [newRecord, ...prev]);
    return true;
  };

  const submitProgrammeRequest = async (
    req: Omit<ProgrammeRequest, 'id' | 'submittedAt' | 'status'>
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    const newRecord: ProgrammeRequest = {
      ...req,
      id: `prog-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending',
    };
    setProgrammeRequests((prev) => [newRecord, ...prev]);
    return true;
  };

  const submitContactMessage = async (
    msg: Omit<GeneralContactMessage, 'id' | 'submittedAt' | 'status'>
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    const newRecord: GeneralContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      status: 'Unread',
    };
    setContactMessages((prev) => [newRecord, ...prev]);
    return true;
  };

  const submitFeedback = async (
    feedback: Omit<FeedbackSubmission, 'id' | 'submittedAt'>
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    const newRecord: FeedbackSubmission = {
      ...feedback,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
    };
    setFeedbackList((prev) => [newRecord, ...prev]);
    return true;
  };

  const loginAdmin = (pin: string): boolean => {
    // Admin PIN for Habib Manzil Masjid committee: 7860 or 2012 (ESTD year)
    if (pin.trim() === '7860' || pin.trim() === '2012') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('hmm_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('hmm_admin_auth');
  };

  const updateDonationInfo = (info: Partial<DonationInfo>) => {
    setDonationInfo((prev) => ({ ...prev, ...info }));
  };

  const updateYouTubeConfig = (config: Partial<YouTubeConfig>) => {
    setYouTubeConfig((prev) => ({ ...prev, ...config }));
  };

  const exportAllData = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      masjid: 'Habib Manzil Masjid, Nerul Sector 20, Navi Mumbai',
      prayerSchedule,
      calendarOffset: hijriOffset,
      announcements,
      events,
      janazahInfo,
      donationInfo,
      youtubeConfig,
      submissions: {
        nikahInquiries,
        volunteerApplications,
        programmeRequests,
        contactMessages,
        feedbackList,
      },
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habib_manzil_masjid_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MasjidContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        prayerSchedule,
        updatePrayerSchedule,
        calendarInfo,
        updateHijriOffset,
        hadiths,
        currentHadith: hadiths[hadithIndex],
        nextHadith,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        events,
        addEvent,
        janazahInfo,
        updateJanazahInfo,
        donationInfo,
        updateDonationInfo,
        youtubeConfig,
        updateYouTubeConfig,
        nikahInquiries,
        submitNikahInquiry,
        volunteerApplications,
        submitVolunteerApplication,
        programmeRequests,
        submitProgrammeRequest,
        contactMessages,
        submitContactMessage,
        feedbackList,
        submitFeedback,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        exportAllData,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MasjidContext.Provider>
  );
};

export const useMasjid = () => {
  const context = useContext(MasjidContext);
  if (!context) {
    throw new Error('useMasjid must be used within a MasjidProvider');
  }
  return context;
};
