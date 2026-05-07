import { useId } from 'react';

const DEFAULT_LABEL = 'EDVIEYE';
const DEFAULT_SUBTITLE = 'AI FLOW, EDUCATION GLOW';
const NETWORK_CENTER = [156, 100];
const NETWORK_POINTS = [
  [156, 63],
  [122, 76],
  [104, 100],
  [122, 124],
  [156, 137],
  [190, 124],
  [208, 100],
  [190, 76],
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
  const eyeFillId = `${idBase}-eyeFill`;
  const eyeHighlightId = `${idBase}-eyeHighlight`;
  const innerEyeId = `${idBase}-innerEye`;
  const irisFillId = `${idBase}-irisFill`;
  const irisGlowId = `${idBase}-irisGlow`;
  const irisStrokeId = `${idBase}-irisStroke`;
  const coreFillId = `${idBase}-coreFill`;
  const wordFillId = `${idBase}-wordFill`;
  const accentFillId = `${idBase}-accentFill`;
  const tagLineId = `${idBase}-tagLine`;
  const isPrimaryWordmark = label.trim().toUpperCase() === DEFAULT_LABEL;
  const legalSuffix = isPrimaryWordmark
    ? ''
    : label.replace(/^edvieye/i, '').replace(/\s+/g, ' ').trim();
  const viewBox = showTagline ? '0 0 640 258' : '0 0 640 214';

  return (
    <div className={['relative w-[10rem] sm:w-[11rem] xl:w-[12rem]', className].filter(Boolean).join(' ')}>
      {glow ? (
        <div className="pointer-events-none absolute left-[22%] top-[36%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,232,255,0.4),rgba(15,59,170,0.14)_52%,transparent_76%)] blur-2xl" />
      ) : null}

      <svg
        viewBox={viewBox}
        className={`relative block h-auto w-full ${
          glow
            ? 'drop-shadow-[0_14px_32px_rgba(4,16,64,0.58)]'
            : 'drop-shadow-[0_10px_24px_rgba(4,16,64,0.22)]'
        }`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={frameFillId} x1="132" y1="20" x2="310" y2="200">
            <stop offset="0%" stopColor="#06134e" />
            <stop offset="42%" stopColor="#0b2f92" />
            <stop offset="75%" stopColor="#1458e4" />
            <stop offset="100%" stopColor="#46e7ff" />
          </linearGradient>
          <linearGradient id={frameStrokeId} x1="154" y1="14" x2="316" y2="198">
            <stop offset="0%" stopColor="#193b95" />
            <stop offset="100%" stopColor="#89f8ff" />
          </linearGradient>
          <linearGradient id={eyeFillId} x1="20" y1="102" x2="296" y2="102">
            <stop offset="0%" stopColor="#071858" />
            <stop offset="52%" stopColor="#0c40b0" />
            <stop offset="100%" stopColor="#29e6ff" />
          </linearGradient>
          <linearGradient id={eyeHighlightId} x1="56" y1="70" x2="212" y2="108">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={innerEyeId} x1="72" y1="70" x2="232" y2="135">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#def5ff" />
          </linearGradient>
          <radialGradient id={irisFillId} cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="#4d23ff" />
            <stop offset="45%" stopColor="#0e4bdb" />
            <stop offset="76%" stopColor="#071f66" />
            <stop offset="100%" stopColor="#020e2e" />
          </radialGradient>
          <radialGradient id={irisGlowId} cx="50%" cy="45%" r="62%">
            <stop offset="0%" stopColor="#78f7ff" stopOpacity="0.42" />
            <stop offset="58%" stopColor="#274fea" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#274fea" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={irisStrokeId} x1="112" y1="58" x2="200" y2="136">
            <stop offset="0%" stopColor="#8cf8ff" />
            <stop offset="100%" stopColor="#1856dd" />
          </linearGradient>
          <linearGradient id={coreFillId} x1="140" y1="82" x2="176" y2="118">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e7f6ff" />
          </linearGradient>
          <linearGradient id={wordFillId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8feff" />
            <stop offset="20%" stopColor="#90edff" />
            <stop offset="44%" stopColor="#20d0ff" />
            <stop offset="100%" stopColor="#081f62" />
          </linearGradient>
          <linearGradient id={accentFillId} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#47e7ff" />
            <stop offset="100%" stopColor="#1697ff" />
          </linearGradient>
          <linearGradient id={tagLineId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#102762" />
            <stop offset="45%" stopColor="#173f94" />
            <stop offset="100%" stopColor="#17a0ff" />
          </linearGradient>
        </defs>

        <g transform="translate(8 6)">
          <path
            d="M196 12h118c-6 31-29 49-59 49h-39c-12 0-22 10-22 22v16h-37V48c0-20 17-36 39-36Z"
            fill={`url(#${frameFillId})`}
            stroke={`url(#${frameStrokeId})`}
            strokeWidth="3"
          />
          <path
            d="M157 116h37v16c0 12 10 22 22 22h98c-6 31-29 49-59 49H194c-20 0-37-17-37-37Z"
            fill={`url(#${frameFillId})`}
            stroke={`url(#${frameStrokeId})`}
            strokeWidth="3"
          />

          <path
            d="M20 100c37-46 83-69 136-69s99 23 136 69c-37 46-83 69-136 69S57 146 20 100Z"
            fill={`url(#${eyeFillId})`}
            stroke="#153583"
            strokeWidth="4"
          />
          <path
            d="M70 100c23-28 52-43 86-43s63 15 86 43c-23 28-52 42-86 42s-63-14-86-42Z"
            fill={`url(#${innerEyeId})`}
          />
          <path
            d="M56 74c27-25 58-38 94-39 18 0 35 4 50 11"
            fill="none"
            stroke={`url(#${eyeHighlightId})`}
            strokeLinecap="round"
            strokeWidth="6"
          />

          <circle cx={NETWORK_CENTER[0]} cy={NETWORK_CENTER[1]} r="54" fill={`url(#${irisGlowId})`} />
          <circle
            cx={NETWORK_CENTER[0]}
            cy={NETWORK_CENTER[1]}
            r="51"
            fill={`url(#${irisFillId})`}
            stroke={`url(#${irisStrokeId})`}
            strokeWidth="3"
          />
          <path
            d="M104 79c9-13 24-21 41-21s32 8 42 21"
            fill="none"
            stroke="rgba(255,255,255,0.24)"
            strokeLinecap="round"
            strokeWidth="4"
          />

          {NETWORK_LINKS.map(([from, to]) => {
            const start = NETWORK_POINTS[from];
            const end = to === 'center' ? NETWORK_CENTER : NETWORK_POINTS[to];

            return (
              <line
                key={`${from}-${to}`}
                x1={start[0]}
                y1={start[1]}
                x2={end[0]}
                y2={end[1]}
                stroke="#effcff"
                strokeLinecap="round"
                strokeWidth={to === 'center' ? 4.4 : 4}
              />
            );
          })}

          {NETWORK_POINTS.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="6.4"
              fill="#ffffff"
              stroke="#4fe8ff"
              strokeWidth="3"
            />
          ))}

          <circle
            cx={NETWORK_CENTER[0]}
            cy={NETWORK_CENTER[1]}
            r="23"
            fill={`url(#${coreFillId})`}
            stroke="#effcff"
            strokeWidth="4"
          />
          <text
            x={NETWORK_CENTER[0]}
            y="111"
            textAnchor="middle"
            fontFamily="'Orbitron', 'Space Grotesk', sans-serif"
            fontSize="28"
            fontWeight="800"
            fill="#1b4fc9"
          >
            Ai
          </text>
        </g>

        <g transform="translate(154 108)">
          <path
            d="M0 40h54l-10 13H0Z"
            fill={`url(#${accentFillId})`}
            stroke="rgba(5,29,100,0.55)"
            strokeWidth="2"
          />
          <ellipse cx="186" cy="48" rx="24" ry="20" fill="rgba(74,231,255,0.34)" />
          <text
            x="66"
            y="60"
            fill="rgba(4,18,70,0.78)"
            fontFamily="'Orbitron', 'Space Grotesk', sans-serif"
            fontSize="78"
            fontWeight="800"
            letterSpacing="8"
            textLength="360"
          >
            EDVIEYE
          </text>
          <text
            x="62"
            y="56"
            fill={`url(#${wordFillId})`}
            stroke="rgba(6,29,101,0.86)"
            strokeWidth="1.8"
            paintOrder="stroke fill"
            fontFamily="'Orbitron', 'Space Grotesk', sans-serif"
            fontSize="78"
            fontWeight="800"
            letterSpacing="8"
            textLength="360"
          >
            EDVIEYE
          </text>
          <path
            d="M438 40h54l-10 13h-44Z"
            fill={`url(#${accentFillId})`}
            stroke="rgba(5,29,100,0.55)"
            strokeWidth="2"
          />
        </g>

        {showTagline ? (
          <g transform="translate(156 198)">
            <circle cx="4" cy="22" r="4.8" fill="#f4ffff" stroke="#47e7ff" strokeWidth="3" />
            <circle cx="480" cy="22" r="4.8" fill="#f4ffff" stroke="#47e7ff" strokeWidth="3" />
            <path d="M12 22H90" fill="none" stroke="#183a8f" strokeWidth="4" strokeLinecap="round" />
            <path d="M392 22h80" fill="none" stroke="#183a8f" strokeWidth="4" strokeLinecap="round" />
            <text
              x="240"
              y="29"
              textAnchor="middle"
              fill={`url(#${tagLineId})`}
              fontFamily="'Orbitron', 'Space Grotesk', sans-serif"
              fontSize="18"
              fontWeight="700"
              letterSpacing="5.6"
            >
              {subtitle}
            </text>
          </g>
        ) : null}
      </svg>

      {legalSuffix ? (
        <span className="mt-2 block text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-cyan-50/62">
          {legalSuffix}
        </span>
      ) : null}
    </div>
  );
}

export default LogoMark;
