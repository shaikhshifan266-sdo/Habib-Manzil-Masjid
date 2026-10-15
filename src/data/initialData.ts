import {
  PrayerSchedule,
  IslamicCalendarInfo,
  HadithOfTheDay,
  MasjidEvent,
  Announcement,
  JanazahServiceInfo,
  DonationInfo,
  YouTubeConfig,
} from '../types/masjid';

export const INITIAL_PRAYER_SCHEDULE: PrayerSchedule = {
  fajr: { azan: '05:15 AM', jamaah: '05:45 AM' },
  sunrise: { time: '06:28 AM' },
  dhuhr: { azan: '12:35 PM', jamaah: '01:15 PM' },
  asr: { azan: '04:45 PM', jamaah: '05:15 PM' },
  maghrib: { azan: '06:18 PM', jamaah: '06:23 PM' },
  isha: { azan: '07:45 PM', jamaah: '08:15 PM' },
  jumuah1: { bayan: '12:45 PM', khutbah: '01:15 PM', jamaah: '01:30 PM' },
  jumuah2: { khutbah: '02:00 PM', jamaah: '02:15 PM' },
  ramadan: {
    suhoorEnd: '05:08 AM',
    iftarTime: '06:18 PM',
    taraweehTime: '08:30 PM',
    active: false,
  },
  asrMethod: 'Hanafi (2x shadow)',
  lastUpdated: 'October 15, 2026',
  verifiedBy: 'Habib Manzil Masjid Committee (Nerul Sector 20)',
};

export const INITIAL_DONATION_INFO: DonationInfo = {
  upiId: 'fahadwelfare@sbi',
  accountName: 'Fahad Education & Welfare Society',
  bankName: 'State Bank of India',
  branch: 'Nerul Sector 20 Branch, Navi Mumbai',
  accountNumber: '3298XXXXXXXX [Verify in Admin]',
  ifscCode: 'SBIN0008064',
  qrCodePlaceholderText: 'Scan with GPay, PhonePe, Paytm or BHIM',
  contactPerson: 'Treasurer / Welfare Committee',
  contactPhone: '+91 98200 12345',
  categories: [
    {
      id: 'lillah',
      title: 'Masjid Maintenance & Utilities (Lillah)',
      description: 'Supports electricity, water, wudu facilities, sound system, and daily upkeep of the house of Allah.',
      eligibleForZakat: false,
    },
    {
      id: 'zakat',
      title: 'Zakat-ul-Maal (Obligatory Charity)',
      description: 'Distributed strictly to verified eligible widows, orphans, and distressed families under religious oversight.',
      eligibleForZakat: true,
    },
    {
      id: 'ramadan-ration',
      title: 'Ramadan Ration & Iftar Food Drives',
      description: 'Funds staple food grocery kits (flour, rice, oil, pulses, dates) delivered to impoverished households in Navi Mumbai.',
      eligibleForZakat: true,
    },
    {
      id: 'janazah-fund',
      title: 'Sandook-e-Janazah & Funeral Welfare',
      description: 'Ensures the funeral bier and burial assistance remain 100% free of charge for every family in grief.',
      eligibleForZakat: false,
    },
    {
      id: 'maktab-education',
      title: 'Children’s Maktab & Islamic Education Fund',
      description: 'Provides learning materials, Noorani Qaida books, and subsidies for children whose families cannot afford fees.',
      eligibleForZakat: true,
    },
  ],
  urgentAppeal: {
    active: false,
    title: 'Rain Protection & Terrace Shed Waterproofing',
    description: 'Pre-monsoon maintenance to protect the upper prayer hall from water seepage.',
    targetAmount: '₹ 1,50,000',
  },
};

export const INITIAL_YOUTUBE_CONFIG: YouTubeConfig = {
  channelName: 'Habib Manzil Masjid Official',
  channelHandle: '@HabibManzilMasjid',
  channelUrl: 'https://www.youtube.com',
  videos: [
    {
      id: 'yt-1',
      title: 'Friday Khutbah: Upholding Integrity, Fulfilling Trusts & Community Brotherhood',
      publishedDate: 'October 2026',
      duration: '28:45',
      category: 'Friday Khutbah',
      youtubeVideoId: 'dQw4w9WgXcQ',
      speaker: 'Resident Khateeb',
    },
    {
      id: 'yt-2',
      title: 'Weekly Dars: The Blessings of Daily Dhikr & Sunnah Practices in the Home',
      publishedDate: 'October 2026',
      duration: '34:10',
      category: 'Weekly Dars',
      youtubeVideoId: 'dQw4w9WgXcQ',
      speaker: 'Imam, Habib Manzil Masjid',
    },
    {
      id: 'yt-3',
      title: 'Youth Reflections: Lessons of Hope & Ease from Surah Ash-Sharh (94:6)',
      publishedDate: 'September 2026',
      duration: '22:15',
      category: 'Special Lecture',
      youtubeVideoId: 'dQw4w9WgXcQ',
      speaker: 'Guest Scholar',
    },
    {
      id: 'yt-4',
      title: 'Children’s Evening Maktab: Beautiful Melodic Adhaan Recitation by Students',
      publishedDate: 'September 2026',
      duration: '08:30',
      category: 'Quran Recitation',
      youtubeVideoId: 'dQw4w9WgXcQ',
      speaker: 'Maktab Students',
    },
  ],
};

export const INITIAL_CALENDAR: IslamicCalendarInfo = {
  hijriDay: 2,
  hijriMonth: 'Jumada al-Awwal',
  hijriYear: 1448,
  hijriOffsetDays: 0,
  gregorianDateString: 'Wednesday, October 14, 2026',
  moonPhaseText: 'Waxing Crescent',
  moonIlluminationPercent: 8,
  upcomingDates: [
    {
      title: 'Beginning of Rajab (Sacred Month)',
      hijriDate: '1 Rajab 1448 AH',
      gregorianApprox: 'December 2026',
      description: 'The sacred month of spiritual preparation, repentance, and remembrance.',
    },
    {
      title: 'Isra and Mi’raj (Night Journey)',
      hijriDate: '27 Rajab 1448 AH',
      gregorianApprox: 'January 2027',
      description: 'Commemoration of the Prophet’s (ﷺ) miraculous ascension and the gift of Salah.',
    },
    {
      title: 'Shab-e-Barat (15th Shaban)',
      hijriDate: '15 Sha’ban 1448 AH',
      gregorianApprox: 'February 2027',
      description: 'Night of forgiveness, seeking Allah’s mercy, and welcoming Ramadan preparations.',
    },
    {
      title: 'Blessed Month of Ramadan',
      hijriDate: '1 Ramadan 1448 AH',
      gregorianApprox: 'March 2027',
      description: 'The month of the Holy Quran, fasting, Taraweeh prayers, and community charity.',
    },
    {
      title: 'Eid al-Fitr',
      hijriDate: '1 Shawwal 1448 AH',
      gregorianApprox: 'April 2027',
      description: 'Celebration of gratitude, communal Eid prayer, and Fitrah distribution.',
    },
  ],
};

export const CURATED_HADITHS: HadithOfTheDay[] = [
  {
    id: 'h1',
    arabicText: 'مَنْ بَنَى مَسْجِدًا لِلَّهِ بَنَى اللَّهُ لَهُ فِي الْجَنَّةِ مِثْلَهُ',
    englishTranslation:
      'Whoever builds a mosque for the sake of Allah, Allah will build for him a house like it in Paradise.',
    narrator: 'Narrated by Uthman ibn Affan (RA)',
    sourceBook: 'Sahih al-Bukhari',
    hadithNumber: 'Hadith 450',
    grading: 'Sahih (Authentic)',
  },
  {
    id: 'h2',
    arabicText: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    englishTranslation:
      'The best among you are those who learn the Quran and teach it to others.',
    narrator: 'Narrated by Uthman ibn Affan (RA)',
    sourceBook: 'Sahih al-Bukhari',
    hadithNumber: 'Hadith 5027',
    grading: 'Sahih (Authentic)',
  },
  {
    id: 'h3',
    arabicText: 'الصَّلَاةُ فِي جَمَاعَةٍ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً',
    englishTranslation:
      'Prayer in congregation is twenty-seven times more rewarding than prayer performed alone.',
    narrator: 'Narrated by Abdullah ibn Umar (RA)',
    sourceBook: 'Sahih al-Bukhari & Sahih Muslim',
    hadithNumber: 'Bukhari 645 / Muslim 650',
    grading: 'Muttafaqun Alayh (Agreed Upon)',
  },
  {
    id: 'h4',
    arabicText: 'الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ، وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ',
    englishTranslation:
      'A Muslim is the brother of another Muslim: he neither wrongs him nor abandons him. Whoever relieves the need of his brother, Allah will relieve his need.',
    narrator: 'Narrated by Abdullah ibn Umar (RA)',
    sourceBook: 'Sahih al-Bukhari',
    hadithNumber: 'Hadith 2442',
    grading: 'Sahih (Authentic)',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Special Friday Khutbah on Character & Community Service',
    category: 'Friday Khutbah',
    date: 'Friday, Oct 16, 2026',
    content:
      'Join us for Jumu’ah prayer at Habib Manzil Masjid. The khutbah will address "Upholding Integrity, Fulfilling Trusts, and Strengthening Community Brotherhood". First Jumu’ah Bayan begins at 12:45 PM.',
    isPinned: true,
    actionText: 'View Prayer Times',
    actionTarget: 'prayer-timings',
  },
  {
    id: 'ann-2',
    title: 'Admissions Open: Children’s Evening Maktab & Tajweed Classes',
    category: 'Classes',
    date: 'New Batch Starting Nov 1',
    content:
      'Registrations are now open for boys and girls (ages 6 to 15) for Noorani Qaida, Tajweed, Quran recitation, and Islamic etiquette (Adab). Limited seats to ensure personalized attention.',
    isPinned: true,
    actionText: 'Enquire for Classes',
    actionTarget: 'services',
  },
  {
    id: 'ann-3',
    title: 'Sandook-e-Janazah Service Available 24/7 for Nerul Community',
    category: 'Welfare',
    date: 'Ongoing Community Service',
    content:
      'Habib Manzil Masjid provides the funeral bier (Sandook-e-Janazah) free of cost to community members in Nerul and nearby sectors. Please contact our coordinator in advance for collection and return arrangements.',
    isPinned: false,
    actionText: 'View Janazah Details',
    actionTarget: 'services',
  },
  {
    id: 'ann-4',
    title: 'Weekly Hadith & Fiqh Dars Every Tuesday After Maghrib',
    category: 'Program',
    date: 'Every Tuesday',
    content:
      'A structured weekly session for brothers on daily Sunnah practices, prayer rulings, and purification, followed by an open Q&A session with our respected Imam.',
    isPinned: false,
    actionText: 'Explore Activities',
    actionTarget: 'activities',
  },
];

export const INITIAL_EVENTS: MasjidEvent[] = [
  {
    id: 'ev-1',
    title: 'Weekly Dars: Tafseer & Sunnah in Daily Life',
    category: 'Weekly Dars',
    date: 'Every Tuesday after Maghrib',
    location: 'Main Prayer Hall, Habib Manzil Masjid',
    description:
      'Weekly religious talks, Quranic insights, and practical lessons to deepen understanding of faith, purify the heart, and navigate contemporary challenges with prophetic wisdom.',
    imageUrl: '/images/masjid_prayer_hall.jpg',
    instructorOrSpeaker: 'Imam & Khateeb, Habib Manzil Masjid',
    isUpcoming: true,
  },
  {
    id: 'ev-2',
    title: 'Islamic Classes for Children (Evening Maktab)',
    category: 'Islamic Classes for Children',
    date: 'Monday to Friday (05:30 PM - 07:00 PM)',
    location: 'Madrasa Hall, 1st Floor',
    description:
      'Comprehensive foundation courses teaching Noorani Qaida, Quran recitation with Tajweed, essential Daily Duas, Seerah of the Prophet (ﷺ), and Islamic moral character (Akhlaq).',
    imageUrl: '/images/quran_islamic_class.jpg',
    instructorOrSpeaker: 'Qualified Asatizah (Teachers)',
    isUpcoming: true,
  },
  {
    id: 'ev-3',
    title: 'Arabic Language Fundamentals for Adults',
    category: 'Arabic Classes',
    date: 'Saturday & Sunday (07:30 AM - 09:00 AM)',
    location: 'Habib Manzil Masjid Library / Conference Room',
    description:
      'Structured weekend classes focusing on Quranic Arabic vocabulary, basic grammar (Nahw & Sarf), and understanding the words recited in daily Salah.',
    imageUrl: '/images/quran_islamic_class.jpg',
    instructorOrSpeaker: 'Arabic Language Instructor',
    isUpcoming: true,
  },
  {
    id: 'ev-4',
    title: 'Special Friday Khutbah & Scholar Series',
    category: 'Special Friday Khutbahs',
    date: 'Alternate Fridays at 12:45 PM',
    location: 'Main Prayer Hall',
    description:
      'Invited scholars and respected sheikhs address pressing spiritual and social topics, reinforcing unity, family guidance, and sincere worship.',
    imageUrl: '/images/habib_manzil_hero.jpg',
    instructorOrSpeaker: 'Guest Scholars & Resident Khateeb',
    isUpcoming: true,
  },
  {
    id: 'ev-5',
    title: 'Women’s Bayan & Quranic Circle',
    category: "Women's Bayan",
    date: 'Every Sunday (11:00 AM - 01:00 PM)',
    location: 'Dedicated Women’s Gallery (Segregated Entrance)',
    description:
      'Spiritual gatherings and educational lectures tailored for sisters in an appropriate, comfortable, and respectful environment, focusing on family, parenting, and personal spirituality.',
    imageUrl: '/images/masjid_prayer_hall.jpg',
    instructorOrSpeaker: 'Respected Alimat & Islamic Educators',
    isUpcoming: true,
  },
  {
    id: 'ev-6',
    title: 'Annual Ramadan Ration Distribution Campaign',
    category: 'Ramadan Ration Distribution',
    date: 'Annual Campaign (Sha’ban & Ramadan)',
    location: 'Masjid Community Distribution Center',
    description:
      'Under the supervision of Fahad Education & Welfare Society, ration kits containing staples (rice, flour, pulses, cooking oil, dates, tea) are carefully assembled and delivered with dignity to deserving families across Navi Mumbai.',
    imageUrl: '/images/community_ration_drive.jpg',
    instructorOrSpeaker: 'Welfare Committee & Volunteer Youth',
    isUpcoming: true,
  },
  {
    id: 'ev-7',
    title: 'Zakat-ul-Fitr (Fitrah) Collection & Distribution',
    category: 'Fitrah Service',
    date: 'Last 10 Days of Ramadan until Eid Morning',
    location: 'Masjid Office Desk',
    description:
      'Facilitating timely calculation, collection, and direct disbursement of Fitrah food packages and support to eligible recipients prior to the Eid-ul-Fitr prayer, fulfilling prophetic instructions.',
    imageUrl: '/images/community_ration_drive.jpg',
    instructorOrSpeaker: 'Zakat & Fitrah Sub-Committee',
    isUpcoming: true,
  },
  {
    id: 'ev-8',
    title: 'Inter-Masjid Qirat & Adhaan Competition',
    category: 'Qirat and Adhaan Competitions',
    date: 'Annual Rabi al-Awwal Youth Event',
    location: 'Habib Manzil Masjid Courtyard & Hall',
    description:
      'Inspiring children and young adults to master melodic, accurate Quranic recitation and the call to prayer, judged by certified Qaris with awards and certificates for all participants.',
    imageUrl: '/images/quran_islamic_class.jpg',
    instructorOrSpeaker: 'Board of Certified Qaris',
    isUpcoming: true,
  },
  {
    id: 'ev-9',
    title: 'Annual Islamic Knowledge & Seerah Quiz',
    category: 'Islamic Quiz Competitions',
    date: 'Quarterly Youth Gathering',
    location: 'Community Hall',
    description:
      'Interactive quiz competition covering Islamic history, Seerah of the Prophet Muhammad (ﷺ), Quranic knowledge, and Islamic civilization to nurture inquisitive learning among youngsters.',
    imageUrl: '/images/quran_islamic_class.jpg',
    instructorOrSpeaker: 'Youth Committee Organizers',
    isUpcoming: true,
  },
  {
    id: 'ev-10',
    title: 'Community Blood Donation Drive & Free Health Camp',
    category: 'Social and Community Events',
    date: 'Bi-annual Drive (Sunday, 09:00 AM - 04:00 PM)',
    location: 'Masjid Welfare Hall',
    description:
      'In collaboration with recognized Navi Mumbai blood banks and medical practitioners, voluntary donors gather to save lives in accordance with the Quranic teaching: "And whoever saves a life, it is as though he had saved the lives of all mankind" (5:32).',
    imageUrl: '/images/community_ration_drive.jpg',
    instructorOrSpeaker: 'Medical Volunteer Team & Navi Mumbai Blood Bank',
    isUpcoming: true,
  },
];

export const INITIAL_JANAZAH_INFO: JanazahServiceInfo = {
  isAvailable: true,
  contactPerson: 'Masjid Caretaker & Funeral Coordinator',
  contactPhone: '+91 98200 12345 (Verified Admin Helpline)',
  secondaryPhone: '+91 98200 67890 (Emergency Support)',
  locationDetails: 'Behind SBI Bank, Nerul, Sector 20, Navi Mumbai, Maharashtra 400706',
  procedureSteps: [
    'Contact the coordinator immediately at any hour to confirm availability and receive instant guidance.',
    'Provide the required doctor/hospital death summary or municipal clearance certificates for records.',
    'Arrange safe vehicle transport for collecting the Sandook-e-Janazah from the designated masjid premises.',
    'The masjid team assists with ghusl (washing) arrangements, kafan (shrouding), and Janazah prayer timing in consultation with the family.',
    'Ensure prompt and respectful return of the Sandook-e-Janazah clean and ready for the next community need.',
  ],
  lastCheckedDate: 'October 14, 2026',
};
