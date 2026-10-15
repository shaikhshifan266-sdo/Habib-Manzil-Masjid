export interface QuranVerse {
  id: string;
  arabicText: string;
  translation: string;
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  theme?: string;
}

export const QURAN_VERSES: QuranVerse[] = [
  {
    id: 'verse-94-6',
    arabicText: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Indeed, with hardship comes ease.',
    surahName: 'Surah Ash-Sharh',
    surahNumber: 94,
    ayahNumber: 6,
    theme: 'Hope & Perseverance',
  },
  {
    id: 'verse-2-152',
    arabicText: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    surahName: 'Surah Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 152,
    theme: 'Remembrance & Gratitude',
  },
  {
    id: 'verse-13-28',
    arabicText: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translation: 'Unquestionably, by the remembrance of Allah hearts are assured.',
    surahName: 'Surah Ar-Ra’d',
    surahNumber: 13,
    ayahNumber: 28,
    theme: 'Inner Peace',
  },
  {
    id: 'verse-2-186',
    arabicText: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
    translation: 'And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the caller when he calls upon Me.',
    surahName: 'Surah Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 186,
    theme: 'Proximity to Allah',
  },
  {
    id: 'verse-3-173',
    arabicText: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    translation: 'Sufficient for us is Allah, and [He is] the best Disposer of affairs.',
    surahName: 'Surah Ali ‘Imran',
    surahNumber: 3,
    ayahNumber: 173,
    theme: 'Complete Trust in Allah',
  },
  {
    id: 'verse-65-3',
    arabicText: 'وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    translation: 'And whoever relies upon Allah – then He is sufficient for him.',
    surahName: 'Surah At-Talaq',
    surahNumber: 65,
    ayahNumber: 3,
    theme: 'Tawakkul',
  },
  {
    id: 'verse-14-7',
    arabicText: 'لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    translation: 'If you are grateful, I will surely increase you [in favor].',
    surahName: 'Surah Ibrahim',
    surahNumber: 14,
    ayahNumber: 7,
    theme: 'Blessings of Gratitude',
  },
  {
    id: 'verse-8-46',
    arabicText: 'وَاصْبِرُوا ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    translation: 'And be patient. Indeed, Allah is with the patient.',
    surahName: 'Surah Al-Anfal',
    surahNumber: 8,
    ayahNumber: 46,
    theme: 'Steadfast Patience',
  },
  {
    id: 'verse-15-98',
    arabicText: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُنْ مِنَ السَّاجِدِينَ',
    translation: 'So exalt [Allah] with praise of your Lord and be of those who prostrate [to Him].',
    surahName: 'Surah Al-Hijr',
    surahNumber: 15,
    ayahNumber: 98,
    theme: 'Praise & Prostration',
  },
];

/**
 * Returns a random verse on each page reload/initialization
 */
export function getRandomQuranVerse(): QuranVerse {
  const index = Math.floor(Math.random() * QURAN_VERSES.length);
  return QURAN_VERSES[index];
}
