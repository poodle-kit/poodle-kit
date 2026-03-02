import type { SVGProps } from 'react';

// ─── Base ─────────────────────────────────────────────────────────────────────

type IconProps = SVGProps<SVGSVGElement>;

function createIcon(paths: React.ReactNode, defaultSize = 24) {
  return function Icon({
    width = defaultSize,
    height = defaultSize,
    ...props
  }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

// ─── Icons ────────────────────────────────────────────────────────────────────

export const PlusIcon = createIcon(
  <>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </>,
);

export const XIcon = createIcon(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>,
  12,
);
