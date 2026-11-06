import { icons, type IconKey } from '@/lib/icons';

interface IconProps {
  name: IconKey;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({ name, className = 'size-5', strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      // Static, trusted icon markup from src/lib/icons.ts
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
