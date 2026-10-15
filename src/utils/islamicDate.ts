import { IslamicCalendarInfo } from '../types/masjid';

const ISLAMIC_MONTH_NAMES = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Thani',
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  'Sha’ban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qi’dah',
  'Dhu al-Hijjah',
];

/**
 * Calculates current Moon phase information
 */
export function calculateMoonPhase(date: Date = new Date()) {
  // Known reference new moon: January 11, 2024 at 11:57 UTC
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const synodicMonth = 29.53058867 * 24 * 60 * 60 * 1000;
  const diff = date.getTime() - refNewMoon;
  const cycleFraction = ((diff % synodicMonth) + synodicMonth) % synodicMonth;
  const lunarAgeDays = cycleFraction / (24 * 60 * 60 * 1000);

  // Illumination calculation (approx cosine)
  const illuminationFraction = 0.5 * (1 - Math.cos((2 * Math.PI * lunarAgeDays) / 29.53058867));
  const illuminationPercent = Math.round(illuminationFraction * 100);

  let phaseText = 'Waxing Crescent';
  if (lunarAgeDays < 1.5 || lunarAgeDays > 28.0) {
    phaseText = 'New Moon (Hilal)';
  } else if (lunarAgeDays < 7.0) {
    phaseText = 'Waxing Crescent';
  } else if (lunarAgeDays < 8.5) {
    phaseText = 'First Quarter';
  } else if (lunarAgeDays < 14.0) {
    phaseText = 'Waxing Gibbous';
  } else if (lunarAgeDays < 16.0) {
    phaseText = 'Full Moon (Badr)';
  } else if (lunarAgeDays < 22.0) {
    phaseText = 'Waning Gibbous';
  } else if (lunarAgeDays < 23.5) {
    phaseText = 'Last Quarter';
  } else {
    phaseText = 'Waning Crescent';
  }

  return {
    phaseText,
    illuminationPercent,
    lunarAgeDays: Math.round(lunarAgeDays * 10) / 10,
  };
}

/**
 * Calculates real-time Hijri date dynamically with optional moon offset (+1, 0, -1)
 */
export function getLiveIslamicCalendarInfo(offsetDays: number = 0): IslamicCalendarInfo {
  const now = new Date();
  
  // Apply local moon sighting offset if any
  const adjustedDate = new Date(now.getTime() + offsetDays * 24 * 60 * 60 * 1000);

  let hijriDay = 4;
  let hijriMonth = 'Jumada al-Awwal';
  let hijriYear = 1448;

  try {
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(adjustedDate);
    const dayPart = parts.find((p) => p.type === 'day');
    const monthPart = parts.find((p) => p.type === 'month');
    const yearPart = parts.find((p) => p.type === 'year');

    if (dayPart && monthPart && yearPart) {
      hijriDay = parseInt(dayPart.value, 10);
      const monthIdx = parseInt(monthPart.value, 10) - 1;
      if (monthIdx >= 0 && monthIdx < ISLAMIC_MONTH_NAMES.length) {
        hijriMonth = ISLAMIC_MONTH_NAMES[monthIdx];
      }
      hijriYear = parseInt(yearPart.value, 10);
    }
  } catch {
    // Fallback if umalqura locale is not supported
    const fallbackFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formatted = fallbackFormatter.format(adjustedDate);
    // Parse parts or keep safe defaults
    const match = formatted.match(/(\w+)\s+(\d+),\s+(\d+)/);
    if (match) {
      hijriMonth = match[1];
      hijriDay = parseInt(match[2], 10);
      hijriYear = parseInt(match[3], 10);
    }
  }

  const gregorianDateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const moonInfo = calculateMoonPhase(adjustedDate);

  const upcomingDates = [
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
  ];

  return {
    hijriDay,
    hijriMonth,
    hijriYear,
    hijriOffsetDays: offsetDays,
    gregorianDateString,
    moonPhaseText: moonInfo.phaseText,
    moonIlluminationPercent: moonInfo.illuminationPercent,
    upcomingDates,
  };
}
