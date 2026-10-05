// Original light-background ChargeVia lockup, inlined to use its real Outfit font.
export default function ChargeViaLockup() {
  return <svg className="company-logo logo-chargevia" width="320" height="60" viewBox="0 0 320 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ChargeVia" focusable="false">
    <defs>
      <linearGradient id="cmg-cv-orange" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="100%" stopColor="#E85A24" />
      </linearGradient>
      <linearGradient id="cmg-cv-purple" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B6BB4" />
        <stop offset="100%" stopColor="#7B5BA4" />
      </linearGradient>
    </defs>
    <g transform="translate(0, 6) scale(0.6)">
      <rect x="4" y="4" width="72" height="72" rx="16" fill="#111111" />
      <path d="M22 22 L40 40 L22 58" stroke="url(#cmg-cv-orange)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M40 22 L58 40 L40 58" stroke="url(#cmg-cv-purple)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
    <g style={{ fontFamily: "var(--font-chargevia)" }} fontWeight="700" fontSize="38">
      <text x="62" y="42" fill="#111111">Charge</text>
      <text x="186" y="42" fill="#FF6B35">Via</text>
    </g>
  </svg>;
}
