import { useId } from 'react';

const DEFAULT_LABEL = 'EDVIEYE';

function LogoMark({
  label = DEFAULT_LABEL,
  className = '',
  glow = true,
  showTagline = false,
  subtitle = 'AI FLOW, EDUCATION GLOW',
}) {
  const idBase = useId().replace(/:/g, '');
  const frameStrokeId = `${idBase}-frameStroke`;
  const eyeShellId = `${idBase}-eyeShell`;
  const eyeStrokeId = `${idBase}-eyeStroke`;
  const eyeCoreId = `${idBase}-eyeCore`;
  const irisFillId = `${idBase}-irisFill`;
  const irisStrokeId = `${idBase}-irisStroke`;
  const centerFillId = `${idBase}-centerFill`;
  const isPrimaryWordmark = label.trim().toUpperCase() === DEFAULT_LABEL;
  const wordmark = isPrimaryWordmark ? DEFAULT_LABEL : label;

  return (
    <div className={['inline-flex items-center gap-3', className].filter(Boolean).join(' ')}>
      <div className="relative shrink-0">
        {glow ? (
          <div className="absolute inset-1 rounded-full bg-[radial-gradient(circle,rgba(73,223,255,0.42),rgba(16,61,171,0.18)_48%,transparent_74%)] blur-xl" />
        ) : null}

        <svg
          viewBox="0 0 180 180"
          className={`relative h-11 w-11 sm:h-12 sm:w-12 ${
            glow
              ? 'drop-shadow-[0_12px_28px_rgba(4,16,64,0.82)]'
              : 'drop-shadow-[0_8px_18px_rgba(4,16,64,0.38)]'
          }`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={frameStrokeId} x1="58" y1="22" x2="150" y2="154">
              <stop offset="0%" stopColor="#071a60" />
              <stop offset="38%" stopColor="#0e3eaf" />
              <stop offset="75%" stopColor="#1377ee" />
              <stop offset="100%" stopColor="#46e2ff" />
            </linearGradient>
            <linearGradient id={eyeShellId} x1="18" y1="90" x2="162" y2="90">
              <stop offset="0%" stopColor="#06185c" />
              <stop offset="58%" stopColor="#0c42b8" />
              <stop offset="100%" stopColor="#2ee7ff" />
            </linearGradient>
            <linearGradient id={eyeStrokeId} x1="24" y1="52" x2="157" y2="127">
              <stop offset="0%" stopColor="#17337f" />
              <stop offset="100%" stopColor="#74f0ff" />
            </linearGradient>
            <linearGradient id={eyeCoreId} x1="49" y1="58" x2="136" y2="121">
              <stop offset="0%" stopColor="#fbfeff" />
              <stop offset="100%" stopColor="#def6ff" />
            </linearGradient>
            <radialGradient id={irisFillId} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#4a1dff" />
              <stop offset="56%" stopColor="#0c3db1" />
              <stop offset="100%" stopColor="#031340" />
            </radialGradient>
            <linearGradient id={irisStrokeId} x1="58" y1="56" x2="125" y2="124">
              <stop offset="0%" stopColor="#89f6ff" />
              <stop offset="100%" stopColor="#1956da" />
            </linearGradient>
            <linearGradient id={centerFillId} x1="74" y1="72" x2="107" y2="106">
              <stop offset="0%" stopColor="#fefeff" />
              <stop offset="100%" stopColor="#e8f7ff" />
            </linearGradient>
          </defs>

          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M90 28h54c0 15-12 28-28 28H96c-13 0-24 11-24 24v8"
              stroke={`url(#${frameStrokeId})`}
              strokeWidth="18"
            />
            <path
              d="M90 152h54c0-15-12-28-28-28H96c-13 0-24-11-24-24V92"
              stroke={`url(#${frameStrokeId})`}
              strokeWidth="18"
            />
          </g>

          <path
            d="M18 90c21-28 46-42 72-42s51 14 72 42c-21 28-46 42-72 42S39 118 18 90Z"
            fill={`url(#${eyeShellId})`}
            stroke={`url(#${eyeStrokeId})`}
            strokeWidth="4"
          />
          <path
            d="M43 90c14-18 30-27 47-27s33 9 47 27c-14 18-30 27-47 27S57 108 43 90Z"
            fill={`url(#${eyeCoreId})`}
          />
          <circle
            cx="90"
            cy="90"
            r="35"
            fill={`url(#${irisFillId})`}
            stroke={`url(#${irisStrokeId})`}
            strokeWidth="3"
          />
          <path
            d="M90 60 113 66 126 90 113 114 90 120 67 114 54 90 67 66Z"
            fill="none"
            stroke="#effcff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M90 71V61" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />
          <path d="M79 76 69 68" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />
          <path d="M71 90H58" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />
          <path d="M79 104 69 112" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />
          <path d="M90 109v12" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />
          <path d="M101 104 111 112" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />
          <path d="M109 90h13" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />
          <path d="M101 76 111 68" fill="none" stroke="#effcff" strokeWidth="4" strokeLinecap="round" />

          {[90, 62, 48, 62, 90, 118, 132, 118].map((value, index) => {
            const coordinates = [
              [90, 52],
              [62, 62],
              [48, 90],
              [62, 118],
              [90, 128],
              [118, 118],
              [132, 90],
              [118, 62],
            ][index];

            return (
              <circle
                key={`${value}-${index}`}
                cx={coordinates[0]}
                cy={coordinates[1]}
                r="5.5"
                fill="#f9feff"
                stroke="#49ddff"
                strokeWidth="3"
              />
            );
          })}

          <circle
            cx="90"
            cy="90"
            r="19"
            fill={`url(#${centerFillId})`}
            stroke="#effcff"
            strokeWidth="4"
          />
          <text
            x="90"
            y="99"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="28"
            fontWeight="700"
            fill="#1b4fc9"
          >
            Ai
          </text>
        </svg>
      </div>

      <div className="flex min-w-0 flex-col">
        <span
          className={`bg-[linear-gradient(180deg,#f7feff_0%,#98f3ff_24%,#39d2ff_52%,#0b1f66_100%)] bg-clip-text font-display font-bold leading-none text-transparent ${
            isPrimaryWordmark
              ? 'text-[0.94rem] uppercase tracking-[0.28em] sm:text-[1.12rem] sm:tracking-[0.34em]'
              : 'text-sm tracking-[0.12em] sm:text-base sm:tracking-[0.16em]'
          } ${glow ? 'drop-shadow-[0_0_14px_rgba(57,210,255,0.24)]' : ''}`}
        >
          {wordmark}
        </span>

        {showTagline ? (
          <div className="mt-1 hidden items-center gap-2 xl:flex">
            <span className="h-px w-8 bg-gradient-to-r from-neon-cyan to-neon-blue/30" />
            <span className="text-[0.52rem] font-semibold uppercase tracking-[0.32em] text-cyan-100/70">
              {subtitle}
            </span>
          </div>
        ) : (
          <span className="mt-1 h-px w-16 bg-gradient-to-r from-neon-cyan/85 via-neon-blue/55 to-transparent" />
        )}
      </div>
    </div>
  );
}

export default LogoMark;
