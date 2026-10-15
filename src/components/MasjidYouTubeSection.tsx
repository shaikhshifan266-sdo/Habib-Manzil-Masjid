import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import { YouTubeVideoItem } from '../types/masjid';
import {
  Video,
  Play,
  ExternalLink,
  Calendar,
  Clock,
  User,
  X,
  Sparkles,
} from 'lucide-react';

export const MasjidYouTubeSection: React.FC = () => {
  const { youtubeConfig } = useMasjid();
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeVideoItem | null>(null);

  return (
    <section aria-label="Official YouTube Channel Media" className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C6A15B] font-bold mb-1">
            <Video className="w-4 h-4 text-[#C6A15B]" />
            <span>Digital Islamic Reminders</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#145744]">
            From Our Masjid
          </h2>
          <p className="text-xs sm:text-sm text-[#445650] mt-1">
            Lectures, Islamic reminders, and community programmes
          </p>
        </div>

        {/* Channel Link Action */}
        <a
          href={youtubeConfig.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#145744] hover:text-[#0e3b2e] cursor-pointer group whitespace-nowrap shrink-0"
        >
          <span>Visit Official YouTube Channel</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Responsive Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {youtubeConfig.videos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideoModal(vid)}
            className="group bg-white rounded-2xl border border-[#E8DCC7] overflow-hidden shadow-xs hover:shadow-md hover:border-[#145744]/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Thumbnail Box with Play Hover Overlay */}
            <div className="relative h-44 bg-gradient-to-br from-[#0e3b2e] to-[#145744] overflow-hidden flex items-center justify-center text-white">
              {/* Subtle Mosque Dome Watermark / Background Texture */}
              <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-20 pointer-events-none" />

              {/* Play Badge Icon */}
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#C6A15B] group-hover:text-[#0e3b2e] transition-all duration-300 shadow-md">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>

              {/* Category Pill Tag */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                {vid.category}
              </div>

              {/* Duration Tag */}
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C6A15B]" />
                <span>{vid.duration}</span>
              </div>
            </div>

            {/* Video Meta Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#64746B] mb-1.5">
                  <Calendar className="w-3 h-3 text-[#C6A15B]" />
                  <span>{vid.publishedDate}</span>
                </div>

                <h3 className="font-display text-sm font-bold text-[#26332E] group-hover:text-[#145744] transition-colors leading-snug line-clamp-2">
                  {vid.title}
                </h3>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E8DCC7]/60 flex items-center justify-between text-[11px] text-[#64746B]">
                {vid.speaker ? (
                  <span className="truncate font-medium text-[#145744]">{vid.speaker}</span>
                ) : (
                  <span>Habib Manzil Media</span>
                )}
                <span className="text-[#C6A15B] font-bold group-hover:underline">
                  Watch &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Playback Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DCC7] relative">
            <div className="bg-[#0e3b2e] text-white p-4 flex items-center justify-between border-b border-[#145744]">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#C6A15B] font-semibold">{activeVideoModal.category}</span>
                <span className="opacity-40">·</span>
                <span className="text-[#A8BFA8]">{activeVideoModal.publishedDate}</span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg text-white hover:bg-white/10 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive 16:9 Video Embed Player */}
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                title={activeVideoModal.title}
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeVideoId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-[#145744] mb-2">
                {activeVideoModal.title}
              </h3>
              {activeVideoModal.speaker && (
                <div className="text-xs text-[#64746B] mb-4">
                  Delivered by: <strong className="text-[#26332E]">{activeVideoModal.speaker}</strong>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8DCC7] text-xs">
                <a
                  href={`${youtubeConfig.channelUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#145744] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open on YouTube Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-4 py-1.5 rounded-lg font-medium text-[#64746B] hover:bg-[#FAF8F0] cursor-pointer"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
