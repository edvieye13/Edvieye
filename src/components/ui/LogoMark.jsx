import { useId } from 'react';

const DEFAULT_LABEL = 'EDVIEYE';
const DEFAULT_SUBTITLE = 'AI FLOW, EDUCATION GLOW';
const CENTER_POINT = [108, 92];
const NETWORK_POINTS = [
  [108, 58],
  [80, 69],
  [66, 92],
  [80, 115],
  [108, 126],
  [136, 115],
  [150, 92],
  [136, 69],
];
const NETWORK_LINKS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [0, 'center'],
  [2, 'center'],
  [4, 'center'],
  [6, 'center'],
];

function LogoMark({
  label = DEFAULT_LABEL,
  className = '',
  glow = true,
  showTagline = false,
  subtitle = DEFAULT_SUBTITLE,
}) {
  const idBase = useId().replace(/:/g, '');
  const frameFillId = `${idBase}-frameFill`;
  const frameStrokeId = `${idBase}-frameStroke`;
  const eyeShellId = `${idBase}-eyeShell`;
  const eyeCoreId = `${idBase}-eyeCore`;
  const eyeHighlightId = `${idBase}-eyeHighlight`;
  const irisFillId = `${idBase}-irisFill`;
  const irisGlowId = `${idBase}-irisGlow`;
  const irisStrokeId = `${idBase}-irisStroke`;
  const centerFillId = `${idBase}-centerFill`;
  const wordmarkFillId = `${idBase}-wordmarkFill`;
  const isPrimaryWordmark = label.trim().toUpperCase() === DEFAULT_LABEL;
  const secondaryLabel = isPrimaryWordmark ? null : label;

  return (
    <div className={['inline-flex items-center gap-3.5', className].filter(Boolean).join(' ')}>
      <div className="relative shrink-0">
        {glow ? (
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(73,223,255,0.48),rgba(16,61,171,0.22)_44%,transparent_76%)] blur-xl" />
        ) : null}

        <svg
          viewBox="0 0 216 184"
          className={`relative h-[3rem] w-[3.65rem] sm:h-[3.2rem] sm:w-[3.9rem] ${
            glow
              ? 'drop-shadow-[0_12px_28px_rgba(4,16,64,0.82)]'
              : 'drop-shadow-[0_8px_18px_rgba(4,16,64,0.42)]'
          }`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={frameFillId} x1="78" y1="18" x2="188" y2="154">
              <stop offset="0%" stopColor="#07134f" />
              <stop offset="40%" stopColor="#0d2f94" />
              <stop offset="72%" stopColor="#1355df" />
              <stop offset="100%" stopColor="#46e5ff" />
            </linearGradient>
            <linearGradient id={frameStrokeId} x1="85" y1="14" x2="190" y2="164">
              <stop offset="0%" stopColor="#0f2d8b" />
              <stop offset="100%" stopColor="#9af9ff" />
            </linearGradient>
            <linearGradient id={eyeShellId} x1="24" y1="92" x2="192" y2="92">
              <stop offset="0%" stopColor="#06165a" />
              <stop offset="49%" stopColor="#0c3cae" />
              <stop offset="100%" stopColor="#2ce9ff" />
            </linearGradient>
            <linearGradient id={eyeCoreId} x1="58" y1="58" x2="160" y2="121">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#dff6ff" />
            </linearGradient>
            <linearGradient id={eyeHighlightId} x1="51" y1="56" x2="147" y2="98">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={irisFillId} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#5229ff" />
              <stop offset="45%" stopColor="#1349d8" />
              <stop offset="78%" stopColor="#07256e" />
              <stop offset="100%" stopColor="#020d2e" />
            </radialGradient>
            <radialGradient id={irisGlowId} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#5ff4ff" stopOpacity="0.46" />
              <stop offset="52%" stopColor="#214de7" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#214de7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={irisStrokeId} x1="72" y1="59" x2="142" y2="124">
              <stop offset="0%" stopColor="#8ff8ff" />
              <stop offset="100%" stopColor="#225ee6" />
            </linearGradient>
            <linearGradient id={centerFillId} x1="90" y1="72" x2="124" y2="108">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e8f6ff" />
            </linearGradient>
          </defs>

          <path
            d="M103 16h77c-3 21-19 34-39 34h-26c-8 0-14 6-14 14v16H80V39c0-13 10-23 23-23Z"
            fill={`url(#${frameFillId})`}
            stroke={`url(#${frameStrokeId})`}
            strokeWidth="3"
          />
          <path
            d="M80 103h21v16c0 8 6 14 14 14h65c-3 21-19 34-39 34h-38c-13 0-23-10-23-23v-41Z"
            fill={`url(#${frameFillId})`}
            stroke={`url(#${frameStrokeId})`}
            strokeWidth="3"
          />

          <path
            d="M24 92c23-30 52-45 84-45 33 0 61 15 84 45-23 30-51 45-84 45-32 0-61-15-84-45Z"
            fill={`url(#${eyeShellId})`}
            stroke="#173486"
            strokeWidth="4"
          />
          <path
            d="M55 92c15-19 33-29 53-29s38 10 53 29c-15 19-33 29-53 29S70 111 55 92Z"
            fill={`url(#${eyeCoreId})`}
          />
          <path
            d="M50 74c17-17 37-27 59-29 13-1 26 2 37 8"
            fill="none"
            stroke={`url(#${eyeHighlightId})`}
            strokeLinecap="round"
            strokeWidth="6"
          />
          <circle cx={CENTER_POINT[0]} cy={CENTER_POINT[1]} r="37" fill={`url(#${irisGlowId})`} />
          <circle
            cx={CENTER_POINT[0]}
            cy={CENTER_POINT[1]}
            r="35"
            fill={`url(#${irisFillId})`}
            stroke={`url(#${irisStrokeId})`}
            strokeWidth="3"
          />
          <path
            d="M76 76c6-11 18-18 32-18 14 0 26 7 33 18"
            fill="none"
            stroke="rgba(255,255,255,0.24)"
            strokeLinecap="round"
            strokeWidth="4"
          />

          {NETWORK_LINKS.map(([from, to]) => {
            const start = NETWORK_POINTS[from];
            const end = to === 'center' ? CENTER_POINT : NETWORK_POINTS[to];

            return (
              <line
                key={`${from}-${to}`}
                x1={start[0]}
                y1={start[1]}
                x2={end[0]}
                y2={end[1]}
                stroke="#effcff"
                strokeLinecap="round"
                strokeWidth={to === 'center' ? 4.2 : 3.8}
              />
            );
          })}

          {NETWORK_POINTS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5.8" fill="#ffffff" stroke="#51e7ff" strokeWidth="3" />
          ))}

          <circle
            cx={CENTER_POINT[0]}
            cy={CENTER_POINT[1]}
            r="19"
            fill={`url(#${centerFillId})`}
            stroke="#effcff"
            strokeWidth="4"
          />
          <text
            x={CENTER_POINT[0]}
            y="101"
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

      <div className="flex min-w-0 flex-col justify-center">
        <div className="flex items-center gap-2.5">
          {isPrimaryWordmark ? (
            <span className="hidden h-[0.44rem] w-7 bg-[linear-gradient(90deg,#4de9ff,#1b9bff)] shadow-[0_0_14px_rgba(77,233,255,0.24)] lg:block [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]" />
          ) : null}

          <svg
            viewBox="0 0 260 34"
            className={`block overflow-visible ${
              isPrimaryWordmark ? 'h-5 w-[10.6rem] sm:h-[1.35rem] sm:w-[11.7rem]' : 'h-5 w-[10.6rem] sm:h-[1.25rem] sm:w-[11rem]'
            } ${glow ? 'drop-shadow-[0_0_10px_rgba(57,210,255,0.18)]' : ''}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={wordmarkFillId} x1="0" y1="0" x2="260" y2="34">
                <stop offset="0%" stopColor="#f9feff" />
                <stop offset="20%" stopColor="#89eeff" />
                <stop offset="45%" stopColor="#1fc8ff" />
                <stop offset="100%" stopColor="#092168" />
              </linearGradient>
            </defs>
            <text
              x="4"
              y="27"
              fill="rgba(4,20,74,0.72)"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="26"
              fontWeight="700"
              letterSpacing="5.8"
            >
              EDVIEYE
            </text>
            <text
              x="2"
              y="25"
              fill={`url(#${wordmarkFillId})`}
              stroke="rgba(6,29,101,0.86)"
              strokeWidth="1.15"
              paintOrder="stroke fill"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="26"
              fontWeight="700"
              letterSpacing="5.8"
            >
              EDVIEYE
            </text>
          </svg>

          {isPrimaryWordmark ? (
            <span className="hidden h-[0.44rem] w-7 bg-[linear-gradient(90deg,#1b9bff,#4de9ff)] shadow-[0_0_14px_rgba(77,233,255,0.24)] lg:block [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]" />
          ) : null}
        </div>

        {showTagline && isPrimaryWordmark ? (
          <div className="mt-1 hidden items-center gap-2 xl:flex">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-neon-cyan/85 to-neon-blue/35" />
            <span className="text-[0.52rem] font-semibold uppercase tracking-[0.34em] text-cyan-100/76">
              {subtitle}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent via-neon-cyan/85 to-neon-blue/35" />
          </div>
        ) : secondaryLabel ? (
          <span className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.28em] text-cyan-50/60 sm:text-[0.62rem]">
            {secondaryLabel}
          </span>
        ) : (
          <span className="mt-1 h-px w-20 bg-gradient-to-r from-neon-cyan/90 via-neon-blue/60 to-transparent" />
        )}
      </div>
    </div>
  );
}

export default LogoMark;
