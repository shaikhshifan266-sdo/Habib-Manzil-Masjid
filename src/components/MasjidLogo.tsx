import React from 'react';

interface MasjidLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  inverted?: boolean;
}

export const MasjidLogo: React.FC<MasjidLogoProps> = ({
  className = '',
  size = 48,
  showText = true,
  inverted = false,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Authentic SVG recreation of Fahad Education & Welfare Society emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Habib Manzil Masjid - Fahad Education & Welfare Society Logo"
      >
        {/* Outer Circular Rings */}
        <circle cx="100" cy="100" r="96" fill="#F4F8F4" stroke="#145744" strokeWidth="4" />
        <circle cx="100" cy="100" r="88" fill="#F4F8F4" stroke="#145744" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="66" fill="#FAFDF9" stroke="#145744" strokeWidth="2" />

        {/* Text Curved Paths */}
        <defs>
          <path
            id="textPathTop"
            d="M 24 100 A 76 76 0 0 1 176 100"
            fill="none"
          />
          <path
            id="textPathBottom"
            d="M 174 105 A 76 76 0 0 1 26 105"
            fill="none"
          />
        </defs>

        {/* Top Text: Fahad Education & Welfare Society */}
        <text
          fill="#145744"
          fontSize="11.5"
          fontWeight="bold"
          letterSpacing="0.8"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            Fahad Education &amp; Welfare Society
          </textPath>
        </text>

        {/* Bottom Text: * Work for Nation * */}
        <text
          fill="#145744"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="1.2"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            ★ Work for Nation ★
          </textPath>
        </text>

        {/* Center illustration: Mound of earth */}
        <path
          d="M 72 108 Q 100 86 128 108 Z"
          fill="#8B5A2B"
        />

        {/* Growing Green Sapling Leaves */}
        {/* Stem */}
        <path
          d="M 100 100 C 100 85 101 72 103 62"
          stroke="#145744"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Left Leaf */}
        <path
          d="M 102 78 C 88 74 72 58 68 44 C 84 46 98 58 102 78 Z"
          fill="#4CAF50"
          stroke="#145744"
          strokeWidth="1.5"
        />
        {/* Right Leaf */}
        <path
          d="M 103 72 C 114 62 132 50 142 54 C 138 70 120 78 103 72 Z"
          fill="#66BB6A"
          stroke="#145744"
          strokeWidth="1.5"
        />
        {/* Center tiny budding leaf */}
        <path
          d="M 103 62 C 103 52 107 46 108 42 C 109 48 108 56 103 62 Z"
          fill="#81C784"
        />

        {/* Supporting Hands */}
        {/* Left Hand cupping from side */}
        <path
          d="M 42 70 C 44 60 54 58 62 66 C 68 74 72 88 64 104 C 58 116 48 126 58 136 C 68 144 86 142 98 134 C 86 142 70 148 54 142 C 40 136 34 116 40 98 C 42 90 38 78 42 70 Z"
          fill="#1C2826"
        />
        {/* Right Hand cupping from side */}
        <path
          d="M 158 70 C 156 60 146 58 138 66 C 132 74 128 88 136 104 C 142 116 152 126 142 136 C 132 144 114 142 102 134 C 114 142 130 148 146 142 C 160 136 166 116 160 98 C 158 90 162 78 158 70 Z"
          fill="#1C2826"
        />

        {/* Foundation Date Text */}
        <text
          x="100"
          y="152"
          textAnchor="middle"
          fill="#145744"
          fontSize="10"
          fontWeight="bold"
          letterSpacing="1"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          ESTD - 2012
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-display text-lg font-bold tracking-tight leading-tight ${
              inverted ? 'text-white' : 'text-[#145744]'
            }`}
          >
            Habib Manzil Masjid
          </span>
          <span
            className={`text-[11px] tracking-wide font-medium ${
              inverted ? 'text-[#A8BFA8]' : 'text-[#64746B]'
            }`}
          >
            Nerul, Sector 20 · Navi Mumbai
          </span>
        </div>
      )}
    </div>
  );
};
