import React from 'react';
import { useMasjid } from '../context/MasjidContext';
import {
  Compass,
  Heart,
  BookOpen,
  Users,
  Shield,
  Award,
  Sparkles,
  ChevronRight,
  Info,
  Building,
  CheckCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useMasjid();
  const prayerHallPhoto = '/src/assets/images/masjid_prayer_hall_1792001492556.jpg';
  const heroMosquePhoto = '/src/assets/images/habib_manzil_hero_1792001493268.jpg';

  const valuesList = [
    {
      title: 'Faith & Worship (Imaan & Salah)',
      description:
        'Centering our lives on Tawheed (the oneness of Allah), establishing sincere congregational prayer, and honoring the Sunnah of the Prophet Muhammad (ﷺ).',
      icon: Compass,
    },
    {
      title: 'Authentic Islamic Knowledge (Ilm)',
      description:
        'Nurturing correct understanding of the Quran and authentic Hadith through dedicated children’s Maktab classes, adult Arabic learning, and weekly Tafseer.',
      icon: BookOpen,
    },
    {
      title: 'Unity & Brotherhood (Ukhuwwah)',
      description:
        'Fostering a welcoming, supportive brotherhood and sisterhood across Nerul, transcending background and status through mutual respect and humility.',
      icon: Users,
    },
    {
      title: 'Compassion & Charity (Ihsan & Sadaqah)',
      description:
        'Reaching out to those facing hardship through dignified food ration distributions, Zakat facilitation, and emergency community aid.',
      icon: Heart,
    },
    {
      title: 'Integrity & Responsibility (Amanah)',
      description:
        'Upholding the highest standards of financial transparency, administrative diligence, and respect for community trust in all masjid affairs.',
      icon: Shield,
    },
    {
      title: 'Service to Humanity (Khidmat-e-Khalq)',
      description:
        'Reflecting the true character of Islam through civic engagement, blood donation drives, free Sandook-e-Janazah services, and neighborhood goodwill.',
      icon: Award,
    },
  ];

  const historicalMilestones = [
    {
      period: 'Humble Beginnings',
      yearApprox: 'Early 2000s [Archival Record]',
      title: 'Prayer in Humble Mud Conditions',
      description:
        'Before the construction of a permanent structure, local Muslim residents and workers in Sector 20 Nerul gathered under simple makeshift coverings on unpaved mud ground. Elders and youth contributed personal mats and water pots to establish the regular five daily prayers.',
      verified: true,
      tag: 'Foundation of Faith',
    },
    {
      period: 'Collective Neighborhood Effort',
      yearApprox: 'Development Phase [Est. 2005–2010]',
      title: 'Community Sacrifice & Structural Walls',
      description:
        'Driven by devotion, local families pooled modest savings, brick by brick. A permanent boundary was erected, a clean ablution (wudu) area was developed, and tin roofing was replaced with concrete flooring to protect worshippers from heavy monsoon downpours.',
      verified: true,
      tag: 'Sacrifice & Growth',
    },
    {
      period: 'Formal Establishment',
      yearApprox: '2012 [Officially Documented]',
      title: 'Registration under Fahad Education & Welfare Society',
      description:
        'To establish long-term institutional stability, transparency, and accountability, the trust Fahad Education & Welfare Society was formally established (ESTD 2012) under registration act guidelines, adopting the motto "Work for Nation".',
      verified: true,
      tag: 'Institutional Milestone',
    },
    {
      period: 'Educational Expansion',
      yearApprox: '2015 – 2020',
      title: 'Children’s Maktab & Women’s Bayan Gatherings',
      description:
        'The masjid launched structured evening Islamic education for boys and girls, appointing qualified Asatizah for Quran Tajweed and moral etiquette. Dedicated women’s weekly Bayan circles were introduced in a fully segregated gallery.',
      verified: true,
      tag: 'Nurturing Knowledge',
    },
    {
      period: 'Civic & Welfare Initiatives',
      yearApprox: '2020 – Present',
      title: 'Sandook-e-Janazah & Humanitarian Outreach',
      description:
        'Habib Manzil Masjid introduced round-the-clock free funeral bier (Sandook-e-Janazah) support for families in mourning, launched annual Ramadan grocery kit drives, and initiated bi-annual blood donation camps serving the wider Navi Mumbai populace.',
      verified: true,
      tag: 'Community Service',
    },
    {
      period: 'Continuous Flourishing',
      yearApprox: 'Current Vision',
      title: 'Modern Digital Presence & Ongoing Enhancement',
      description:
        'Continuing our journey to provide modern digital accessibility for prayer times, verified announcements, Nikah facilitation, and transparent community feedback for future generations.',
      verified: true,
      tag: 'Spiritual Sanctuary',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#145744] to-[#0e3b2e] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#C6A15B] font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Serving Nerul Sector 20 Since 2012</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            About Habib Manzil Masjid
          </h1>
          <p className="text-sm sm:text-base text-[#E8DCC7] max-w-2xl mx-auto leading-relaxed">
            A spiritual sanctuary where congregation worship meets heartfelt humanitarian service,
            nurturing generations upon the timeless teachings of the Holy Quran and Sunnah.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* 2. Mission & Vision Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#145744]/10 text-[#145744] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
                Our Solemn Purpose
              </div>
              <h2 className="font-display text-2xl font-bold text-[#145744] mb-3">
                Our Mission
              </h2>
              <blockquote className="text-sm sm:text-base text-[#26332E] italic font-serif leading-relaxed pl-4 border-l-2 border-[#145744] my-4">
                "To provide a welcoming place for worship, nurture Islamic knowledge, strengthen community bonds, and support those in need through sincere service for the sake of Allah."
              </blockquote>
            </div>
            <div className="text-xs text-[#64746B] pt-4 border-t border-[#E8DCC7]">
              Committed to worship, education, and compassion across Nerul.
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C6A15B]/15 text-[#145744] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-[#C6A15B]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
                Our Long-Term Aspiration
              </div>
              <h2 className="font-display text-2xl font-bold text-[#145744] mb-3">
                Our Vision
              </h2>
              <blockquote className="text-sm sm:text-base text-[#26332E] italic font-serif leading-relaxed pl-4 border-l-2 border-[#C6A15B] my-4">
                "To build a spiritually vibrant, knowledgeable, compassionate, and united Muslim community rooted in faith and good character."
              </blockquote>
            </div>
            <div className="text-xs text-[#64746B] pt-4 border-t border-[#E8DCC7]">
              Guiding hearts through prophetic wisdom, upright morals, and civic duty.
            </div>
          </div>
        </section>

        {/* 3. Our Story: From Mud to a Registered Masjid (Historical Timeline) */}
        <section className="bg-white rounded-2xl border border-[#E8DCC7] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
              Historical Chronicles
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#145744]">
              Our Story: From Mud to a Registered Masjid
            </h2>
            <p className="text-sm text-[#445650] mt-3 leading-relaxed">
              Every brick, every pillar, and every prayer row in Habib Manzil Masjid carries the memory of
              sacrifices made by everyday worshippers who believed in building a house for Allah in Nerul.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l-2 border-[#E8DCC7] ml-4 sm:ml-8 space-y-12">
            {historicalMilestones.map((milestone, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-10">
                {/* Node Bullet */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#145744]" />

                <div className="bg-[#FAF8F0]/70 rounded-xl border border-[#E8DCC7]/80 p-6 hover:bg-white hover:border-[#145744]/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                    <span className="font-mono text-xs text-[#145744] font-semibold bg-[#145744]/10 px-2.5 py-0.5 rounded-md">
                      {milestone.yearApprox}
                    </span>
                    <span className="text-[#C6A15B] font-medium text-[11px]">
                      {milestone.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#26332E] mb-2">
                    {milestone.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#445650] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Historical Accuracy Disclaimer Notice */}
          <div className="mt-10 p-4 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] flex items-start gap-3 text-xs text-[#64746B]">
            <Info className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#26332E]">Historical Documentation Standard:</span>{' '}
              Habib Manzil Masjid strictly upholds truthful records. Detailed founder rosters,
              architectural blueprints, and trust deeds are maintained in the administrative records
              of Fahad Education &amp; Welfare Society. Unverified folklore is excluded from this public chronicle.
            </div>
          </div>
        </section>

        {/* 4. Our Core Values Grid */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
              Guiding Principles
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#145744]">
              Our Guiding Islamic Values
            </h2>
            <p className="text-sm text-[#445650] mt-2">
              The moral foundation upon which all our prayers, classes, and community assistance rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesList.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-xl border border-[#E8DCC7] p-6 shadow-xs hover:border-[#145744]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#145744]/10 text-[#145744] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#26332E] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#445650] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. The People Behind the Masjid */}
        <section className="bg-white rounded-2xl border border-[#E8DCC7] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
              Sincere Stewards
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#145744]">
              The People Behind the Masjid
            </h2>
            <p className="text-sm sm:text-base text-[#445650] mt-3 leading-relaxed italic">
              "Every prayer arrangement, educational programme, social initiative, and community service
              requires time, effort, planning, and dedication. We are grateful to the individuals who
              work behind the scenes to keep Habib Manzil Masjid serving the community. May Allah accept
              their efforts, reward their sincerity, and place barakah in their work."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7]">
              <div className="w-10 h-10 rounded-lg bg-[#145744] text-white flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#26332E]">
                Managing Committee
              </h3>
              <p className="text-xs text-[#64746B] mt-1 mb-3">
                Fahad Education &amp; Welfare Society
              </p>
              <p className="text-xs text-[#445650] leading-relaxed">
                Trustees and elected members supervising operations, facilities maintenance, legal compliances, and utility arrangements for worshippers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7]">
              <div className="w-10 h-10 rounded-lg bg-[#145744] text-white flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#26332E]">
                Imams &amp; Asatizah
              </h3>
              <p className="text-xs text-[#64746B] mt-1 mb-3">
                Religious &amp; Educational Faculty
              </p>
              <p className="text-xs text-[#445650] leading-relaxed">
                Respected scholars leading daily prayers, Friday khutbahs, children’s Noorani Qaida, Tajweed, and youth Islamic study circles.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7]">
              <div className="w-10 h-10 rounded-lg bg-[#145744] text-white flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#26332E]">
                Volunteers &amp; Welfare Corps
              </h3>
              <p className="text-xs text-[#64746B] mt-1 mb-3">
                Community Service Youth
              </p>
              <p className="text-xs text-[#445650] leading-relaxed">
                Dedicated community members managing the 24/7 Sandook-e-Janazah service, Ramadan ration packing, blood drives, and crowd coordination.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8DCC7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64746B]">
              Want to contribute your skills and time for the sake of Allah?
            </p>
            <button
              onClick={() => setCurrentPage('services')}
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#145744] hover:bg-[#0e3b2e] cursor-pointer transition-colors"
            >
              Join Our Volunteer Team &rarr;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
