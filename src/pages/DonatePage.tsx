import React, { useState } from 'react';
import { useMasjid } from '../context/MasjidContext';
import {
  HeartHandshake,
  QrCode,
  Copy,
  Check,
  ShieldCheck,
  Building,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Phone,
  MessageCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const DonatePage: React.FC = () => {
  const { donationInfo, setCurrentPage } = useMasjid();
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const copyToClipboard = (text: string, type: 'upi' | 'account' | 'ifsc') => {
    navigator.clipboard.writeText(text);
    if (type === 'upi') {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } else if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else if (type === 'ifsc') {
      setCopiedIfsc(true);
      setTimeout(() => setCopiedIfsc(false), 2000);
    }
  };

  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(
    donationInfo.upiId
  )}&pn=${encodeURIComponent(
    donationInfo.accountName
  )}&cu=INR&tn=Habib%20Manzil%20Masjid%20Donation`;

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#145744] to-[#0e3b2e] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-emerald-pattern opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs text-[#C6A15B] font-medium mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Fahad Education &amp; Welfare Society · ESTD 2012</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Support Habib Manzil Masjid
          </h1>
          <p className="text-sm sm:text-base text-[#E8DCC7] max-w-2xl mx-auto leading-relaxed">
            "The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains."
            <span className="block text-xs text-[#A8BFA8] mt-1 font-serif italic">
              — Surah Al-Baqarah (2:261)
            </span>
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Urgent Appeal Notice if Active */}
        {donationInfo.urgentAppeal?.active && (
          <section className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-6 sm:p-8 text-[#26332E] shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider font-bold text-amber-800">
                  Current Masjid Priority Project
                </div>
                <h3 className="font-display text-xl font-bold text-[#145744] mt-0.5">
                  {donationInfo.urgentAppeal.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#445650] mt-1 leading-relaxed">
                  {donationInfo.urgentAppeal.description}
                </p>
                {donationInfo.urgentAppeal.targetAmount && (
                  <div className="mt-3 text-xs font-semibold text-amber-900 bg-amber-100/70 inline-block px-3 py-1 rounded-md">
                    Target Estimated Need: {donationInfo.urgentAppeal.targetAmount}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 2-Column Primary Donation Gateway: UPI QR on Left, Bank Details on Right */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Official UPI QR Code & Direct Apps (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DCC7] mb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold">
                    Instant Bank Transfer
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[#145744] mt-0.5">
                    Donate via UPI &amp; QR Code
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#145744] font-semibold bg-[#145744]/10 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-[#145744]" />
                  <span>Verified Society Account</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                {/* Visual SVG QR Code Graphic for Fahad Education & Welfare Society */}
                <div className="relative p-4 bg-[#FAF8F0] rounded-2xl border-2 border-[#145744]/30 shadow-md text-center shrink-0">
                  <div className="w-52 h-52 bg-white rounded-xl p-3 flex flex-col items-center justify-center border border-[#E8DCC7] relative">
                    {/* SVG Vector QR Code Layout with center emblem */}
                    <svg viewBox="0 0 160 160" className="w-full h-full text-[#145744]" fill="currentColor">
                      {/* Standard QR Corner Markers */}
                      <rect x="10" y="10" width="40" height="40" rx="4" fill="#145744" />
                      <rect x="18" y="18" width="24" height="24" fill="#FAF8F0" />
                      <rect x="22" y="22" width="16" height="16" fill="#145744" />

                      <rect x="110" y="10" width="40" height="40" rx="4" fill="#145744" />
                      <rect x="118" y="18" width="24" height="24" fill="#FAF8F0" />
                      <rect x="122" y="22" width="16" height="16" fill="#145744" />

                      <rect x="10" y="110" width="40" height="40" rx="4" fill="#145744" />
                      <rect x="18" y="118" width="24" height="24" fill="#FAF8F0" />
                      <rect x="22" y="122" width="16" height="16" fill="#145744" />

                      {/* Data Pattern Matrix Blocks */}
                      <rect x="58" y="14" width="8" height="8" />
                      <rect x="74" y="14" width="8" height="8" />
                      <rect x="90" y="14" width="8" height="8" />
                      <rect x="58" y="26" width="8" height="8" />
                      <rect x="82" y="26" width="8" height="8" />
                      <rect x="66" y="38" width="8" height="8" />
                      <rect x="90" y="38" width="8" height="8" />

                      <rect x="14" y="58" width="8" height="8" />
                      <rect x="26" y="58" width="8" height="8" />
                      <rect x="38" y="66" width="8" height="8" />
                      <rect x="14" y="74" width="8" height="8" />
                      <rect x="30" y="82" width="8" height="8" />

                      <rect x="114" y="58" width="8" height="8" />
                      <rect x="138" y="58" width="8" height="8" />
                      <rect x="126" y="74" width="8" height="8" />
                      <rect x="114" y="86" width="8" height="8" />
                      <rect x="138" y="86" width="8" height="8" />

                      <rect x="58" y="114" width="8" height="8" />
                      <rect x="74" y="114" width="8" height="8" />
                      <rect x="90" y="114" width="8" height="8" />
                      <rect x="66" y="126" width="8" height="8" />
                      <rect x="82" y="126" width="8" height="8" />
                      <rect x="58" y="138" width="8" height="8" />
                      <rect x="74" y="138" width="8" height="8" />

                      {/* Center Shield with green leaf symbol */}
                      <circle cx="80" cy="80" r="16" fill="#FAF8F0" stroke="#145744" strokeWidth="2" />
                      <path d="M 80 72 C 86 68 90 74 88 80 C 82 82 78 78 80 72 Z" fill="#145744" />
                      <path d="M 80 74 C 74 72 72 78 74 82 C 78 84 80 80 80 74 Z" fill="#66BB6A" />
                    </svg>

                    <span className="absolute bottom-1 text-[9px] font-mono text-[#64746B] font-semibold">
                      UPI QR CODE
                    </span>
                  </div>

                  <div className="mt-2 text-[10px] text-[#145744] font-bold">
                    Fahad Education &amp; Welfare Society
                  </div>
                </div>

                {/* Instructions & Copy Action */}
                <div className="flex-1 space-y-4 text-xs">
                  <div>
                    <span className="text-[#64746B] block text-[11px] mb-1 font-medium">
                      Official UPI ID (VPA):
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="px-3 py-2 bg-[#FAF8F0] border border-[#E8DCC7] rounded-lg font-mono font-bold text-sm text-[#145744] select-all flex-1">
                        {donationInfo.upiId}
                      </code>
                      <button
                        onClick={() => copyToClipboard(donationInfo.upiId, 'upi')}
                        className="px-3 py-2 rounded-lg bg-[#145744] hover:bg-[#0e3b2e] text-white flex items-center gap-1 font-semibold text-xs cursor-pointer shadow-xs transition-colors shrink-0"
                      >
                        {copiedUpi ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#C6A15B]" />
                            <span>Copy UPI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#445650] leading-relaxed">
                    <p className="font-semibold text-[#26332E]">Easy 3-Step Process:</p>
                    <ol className="list-decimal pl-4 space-y-1 text-[#64746B]">
                      <li>Open any UPI app: Google Pay, PhonePe, Paytm, or BHIM.</li>
                      <li>Scan the QR code above OR paste the UPI ID: <strong className="text-[#145744]">{donationInfo.upiId}</strong>.</li>
                      <li>Enter amount and mention category (e.g. <em>Lillah</em> or <em>Zakat</em>) in the remark.</li>
                    </ol>
                  </div>

                  {/* Mobile Deep Link */}
                  <div className="pt-2">
                    <a
                      href={upiDeepLink}
                      className="inline-flex sm:hidden items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#145744] hover:bg-[#0e3b2e] shadow-xs cursor-pointer"
                    >
                      <span>Pay Directly with Mobile UPI App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Verification Note */}
            <div className="p-4 rounded-xl bg-[#FAF8F0] border border-[#E8DCC7] text-xs text-[#64746B] flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-[#145744] shrink-0 mt-0.5" />
              <div>
                <strong>Need an Official Receipt?</strong> After completing your transfer, kindly send a screenshot with your name and purpose to our committee WhatsApp helpline at{' '}
                <strong className="text-[#145744] font-mono">{donationInfo.contactPhone}</strong>. An official printed receipt from Fahad Education &amp; Welfare Society will be issued.
              </div>
            </div>
          </div>

          {/* Right Column: Bank Account Details (NEFT/RTGS/IMPS) (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#E8DCC7] mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#145744]/10 text-[#145744] flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#145744]">
                    Direct Bank Transfer (NEFT / RTGS)
                  </h3>
                  <p className="text-[11px] text-[#64746B]">
                    For larger contributions, monthly subscriptions, and trust donations
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]/80">
                  <span className="text-[#64746B] block text-[11px]">Account Name / Beneficiary</span>
                  <span className="font-bold text-[#26332E] text-sm">
                    {donationInfo.accountName}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#64746B] block text-[11px]">Bank Name &amp; Branch</span>
                      <span className="font-bold text-[#26332E]">
                        {donationInfo.bankName}
                      </span>
                      <div className="text-[11px] text-[#64746B]">{donationInfo.branch}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[#64746B] block text-[11px]">Account Number</span>
                    <span className="font-mono font-bold text-sm text-[#145744]">
                      {donationInfo.accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(donationInfo.accountNumber, 'account')}
                    className="p-1.5 text-[#145744] hover:bg-white rounded cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedAccount ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 bg-[#FAF8F0] rounded-xl border border-[#E8DCC7]/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[#64746B] block text-[11px]">IFSC Code</span>
                    <span className="font-mono font-bold text-sm text-[#145744]">
                      {donationInfo.ifscCode}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(donationInfo.ifscCode, 'ifsc')}
                    className="p-1.5 text-[#145744] hover:bg-white rounded cursor-pointer"
                    title="Copy IFSC Code"
                  >
                    {copiedIfsc ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DCC7] text-[11px] text-[#64746B]">
              <span className="font-semibold text-[#26332E]">Note on Bank Transfers:</span> Please write "Habib Manzil Masjid Donation" in the transaction remark for accurate record reconciliation.
            </div>
          </div>
        </section>

        {/* 3. Donation Fund Categories */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-bold">
              Designated Purposes
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#145744] mt-1">
              Where Your Donations Go
            </h2>
            <p className="text-xs sm:text-sm text-[#445650] mt-2">
              Every rupee donated is managed with strict religious compliance, transparency, and accountability before Allah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationInfo.categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl border border-[#E8DCC7] p-6 shadow-xs hover:border-[#145744]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        cat.eligibleForZakat
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#145744]/10 text-[#145744]'
                      }`}
                    >
                      {cat.eligibleForZakat ? 'Zakat Eligible' : 'Lillah / Sadaqah'}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#26332E] mb-2">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-[#445650] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DCC7]/60 text-[11px] text-[#64746B]">
                  Designate in payment remarks: <em>"{cat.title.split(' ')[0]}"</em>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Transparency & Accountability Standards */}
        <section className="bg-white rounded-2xl border border-[#E8DCC7] p-8 shadow-sm">
          <div className="max-w-3xl mb-6">
            <h3 className="font-display text-xl font-bold text-[#145744]">
              Financial Integrity &amp; Transparency Statement
            </h3>
            <p className="text-xs sm:text-sm text-[#445650] mt-2 leading-relaxed">
              Habib Manzil Masjid is governed under the registered trust Fahad Education &amp; Welfare Society.
              In accordance with Islamic principles of Amanah (trusteeship), funds allocated for Zakat are segregated strictly from general operational funds (Lillah) and delivered solely to eligible recipients in Navi Mumbai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8DCC7] text-xs">
            <div className="p-4 rounded-xl bg-[#FAF8F0]">
              <div className="font-bold text-[#145744] mb-1">Strict Fund Segregation</div>
              <p className="text-[#64746B] text-[11px]">
                Zakat, Lillah, and Janazah contributions are maintained in segregated ledgers under scholarly supervision.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F0]">
              <div className="font-bold text-[#145744] mb-1">Annual Social Audits</div>
              <p className="text-[#64746B] text-[11px]">
                Regular accounting reviews and audited trust statements presented to community elders.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F0]">
              <div className="font-bold text-[#145744] mb-1">Zero Overhead on Janazah</div>
              <p className="text-[#64746B] text-[11px]">
                100% of funeral bier and bereavement support services are provided without any user fee.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Assistance Callout */}
        <div className="text-center p-8 rounded-2xl bg-[#145744]/5 border border-[#145744]/20 text-xs text-[#445650]">
          <p className="text-sm font-semibold text-[#26332E]">
            Have questions regarding donor receipts, Zakat calculation, or wire transfers?
          </p>
          <p className="mt-1 text-[#64746B]">
            Reach out to our Treasurer &amp; Committee Office at{' '}
            <strong className="text-[#145744] font-mono">{donationInfo.contactPhone}</strong> or visit during office hours in Nerul Sector 20.
          </p>
        </div>
      </div>
    </div>
  );
};
