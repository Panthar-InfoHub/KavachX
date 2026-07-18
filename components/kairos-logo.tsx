export function KairosLogo({
  className = "h-8",
  showTagline = true,
  inverted = false,
}: {
  className?: string;
  showTagline?: boolean;
  inverted?: boolean;
}) {
  const color = inverted ? "#ffffff" : "#000000";

  return (
    <svg
      viewBox={`0 0 500 ${showTagline ? 110 : 70}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KAIROS"
    >
      {/* Main KAIROS wordmark using SVG text for perfect letter spacing */}
      <text
        x="0"
        y="58"
        fill={color}
        fontFamily="'Helvetica Neue', 'Arial', sans-serif"
        fontSize="68"
        fontWeight="700"
        letterSpacing="8"
        style={{ fontStretch: "normal" }}
      >
        KAIROS
      </text>

      {/* A dot — placed precisely inside the A triangle */}
      <circle cx="108" cy="38" r="4.5" fill={inverted ? "#09090b" : "#ffffff"} />

      {showTagline && (
        <g>
          <line x1="0" y1="87" x2="32" y2="87" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <text
            x="250"
            y="90"
            fill={color}
            fontFamily="'Helvetica Neue', 'Arial', sans-serif"
            fontSize="8.5"
            fontWeight="500"
            letterSpacing="3.5"
            textAnchor="middle"
          >
            SECURE TODAY, SAFE TOMORROW
          </text>
          <line x1="468" y1="87" x2="500" y2="87" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
