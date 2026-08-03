export default function FloralDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-blush-300 sm:w-28" />
      <svg
        viewBox="0 0 48 48"
        className="h-7 w-7 text-blush-400 float-slow sm:h-9 sm:w-9"
        fill="none"
      >
        <g fill="currentColor">
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="24"
              cy="13"
              rx="6.5"
              ry="10"
              transform={`rotate(${deg} 24 24)`}
              opacity="0.85"
            />
          ))}
        </g>
        <circle cx="24" cy="24" r="4.5" className="fill-gold-400" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-blush-300 sm:w-28" />
    </div>
  );
}
