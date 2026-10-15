export type PageView =
  | 'home'
  | 'about'
  | 'activities'
  | 'services'
  | 'prayer-timings'
  | 'contact'
  | 'donate';

export interface PrayerTimeItem {
  name: string;
  arabicName: string;
  azan: string;
  iqamah: string; // Jama'ah time
  isNext?: boolean;
  isCurrent?: boolean;
}

export interface PrayerSchedule {
  fajr: { azan: string; jamaah: string };
  sunrise: { time: string };
  dhuhr: { azan: string; jamaah: string };
  asr: { azan: string; jamaah: string };
  maghrib: { azan: string; jamaah: string };
  isha: { azan: string; jamaah: string };
  jumuah1: { bayan: string; khutbah: string; jamaah: string };
  jumuah2: { khutbah: string; jamaah: string };
  ramadan: {
    suhoorEnd: string;
    iftarTime: string;
    taraweehTime: string;
    active: boolean;
  };
  asrMethod: 'Hanafi (2x shadow)' | 'Shafi’i / Standard (1x shadow)';
  lastUpdated: string;
  verifiedBy: string;
}

export interface DonationFundCategory {
  id: string;
  title: string;
  description: string;
  eligibleForZakat: boolean;
}

export interface DonationInfo {
  upiId: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  qrCodePlaceholderText: string;
  contactPerson: string;
  contactPhone: string;
  categories: DonationFundCategory[];
  urgentAppeal?: {
    active: boolean;
    title: string;
    description: string;
    targetAmount?: string;
  };
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  publishedDate: string;
  duration: string;
  category: 'Friday Khutbah' | 'Weekly Dars' | 'Quran Recitation' | 'Special Lecture';
  youtubeVideoId: string; // e.g. for embed or link
  speaker?: string;
}

export interface YouTubeConfig {
  channelName: string;
  channelHandle: string;
  channelUrl: string;
  videos: YouTubeVideoItem[];
}

export interface IslamicCalendarInfo {
  hijriDay: number;
  hijriMonth: string;
  hijriYear: number;
  hijriOffsetDays: number; // for moon sighting adjustment (+1, 0, -1)
  gregorianDateString: string;
  moonPhaseText: string;
  moonIlluminationPercent: number;
  upcomingDates: {
    title: string;
    hijriDate: string;
    gregorianApprox: string;
    description: string;
  }[];
}

export interface HadithOfTheDay {
  id: string;
  arabicText: string;
  englishTranslation: string;
  narrator: string;
  sourceBook: string;
  hadithNumber: string;
  grading: string;
}

export type EventCategory =
  | 'Weekly Dars'
  | 'Islamic Classes for Children'
  | 'Arabic Classes'
  | 'Special Friday Khutbahs'
  | "Women's Bayan"
  | 'Ramadan Ration Distribution'
  | 'Fitrah Service'
  | 'Qirat and Adhaan Competitions'
  | 'Islamic Quiz Competitions'
  | 'Social and Community Events';

export interface MasjidEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time?: string;
  location: string;
  description: string;
  imageUrl: string;
  galleryUrls?: string[];
  instructorOrSpeaker?: string;
  isUpcoming: boolean;
  badge?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Program' | 'Friday Khutbah' | 'Ramadan' | 'Classes' | 'Welfare' | 'Notice';
  date: string;
  content: string;
  isPinned: boolean;
  actionText?: string;
  actionTarget?: PageView;
}

export interface JanazahServiceInfo {
  isAvailable: boolean;
  contactPerson: string;
  contactPhone: string;
  secondaryPhone: string;
  locationDetails: string;
  procedureSteps: string[];
  lastCheckedDate: string;
}

export interface NikahInquiry {
  id: string;
  submittedAt: string;
  applicantName: string;
  phone: string;
  email: string;
  preferredDate: string;
  expectedGuests: number;
  notes: string;
  status: 'Pending Review' | 'Approved' | 'Contacted';
}

export interface VolunteerApplication {
  id: string;
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  areaOfInterest: string;
  availability: string;
  experience?: string;
  status: 'Pending' | 'Contacted';
}

export interface ProgrammeRequest {
  id: string;
  submittedAt: string;
  organizerName: string;
  phone: string;
  email: string;
  programmeType: string;
  proposedDate: string;
  purpose: string;
  status: 'Pending' | 'Approved';
}

export interface GeneralContactMessage {
  id: string;
  submittedAt: string;
  fullName: string;
  contact: string;
  category: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Responded';
}

export interface FeedbackSubmission {
  id: string;
  submittedAt: string;
  name?: string;
  contact?: string;
  category: string;
  rating?: number;
  message: string;
}
