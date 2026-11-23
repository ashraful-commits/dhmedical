"use client";

/**
 * DocTime-style Professional Flowing Wave Patterns & Medical Grid Lines
 * Ultra-subtle, elegant vector lines matching world-class healthcare platforms.
 */

export function DocTimeWavePattern({ className = "opacity-25" }) {
  return (
    <svg
      viewBox="0 0 700 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F52BA" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#2563EB" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF5E7E" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Harmonic Wave Flow Lines (DocTime Signature Aesthetic) */}
      <path
        d="M-50 120 C 150 40, 320 220, 500 130 C 620 70, 680 180, 750 140"
        stroke="url(#waveGrad)"
        strokeWidth="1.6"
      />
      <path
        d="M-50 140 C 150 60, 320 240, 500 150 C 620 90, 680 200, 750 160"
        stroke="url(#waveGrad)"
        strokeWidth="1.4"
      />
      <path
        d="M-50 160 C 150 80, 320 260, 500 170 C 620 110, 680 220, 750 180"
        stroke="url(#waveGrad)"
        strokeWidth="1.2"
      />
      <path
        d="M-50 180 C 150 100, 320 280, 500 190 C 620 130, 680 240, 750 200"
        stroke="url(#waveGrad)"
        strokeWidth="1"
      />
      <path
        d="M-50 200 C 150 120, 320 300, 500 210 C 620 150, 680 260, 750 220"
        stroke="url(#waveGrad)"
        strokeWidth="0.8"
      />
      <path
        d="M-50 220 C 150 140, 320 320, 500 230 C 620 170, 680 280, 750 240"
        stroke="url(#waveGrad)"
        strokeWidth="0.7"
      />
    </svg>
  );
}

export function ClinicalDotGrid({ className = "opacity-40" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none [background-image:radial-gradient(rgba(15,82,186,0.12)_1px,transparent_1px)] [background-size:24px_24px] ${className}`}
      aria-hidden="true"
    />
  );
}

export function PulseWaveLine({ className = "opacity-20" }) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 40 L160 40 L180 20 L200 65 L220 10 L240 55 L255 35 L270 45 L285 40 L600 40"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
