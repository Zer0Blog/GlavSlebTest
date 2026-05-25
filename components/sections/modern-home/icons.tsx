export const CloseIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)

export const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
  </svg>
)

export const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
)

export const ChevronRight = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M20 16l12 8-12 8V16z" fill="currentColor" opacity="0.8" />
  </svg>
)

export const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
    <path d="M14 2L3 7v7c0 5.8 4.7 10.8 11 12 6.3-1.2 11-6.2 11-12V7L14 2z" />
    <path d="M9 14l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M14 3C9 3 4 7.5 4 13c0 5 4 8.5 7 10.5 1.5 1 2.5 1.5 3 1.5s1.5-.5 3-1.5c3-2 7-5.5 7-10.5 0-5.5-5-10-10-10z" />
    <path d="M14 8Q18 14 14 20" opacity="0.5" />
  </svg>
)

export const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
    <path d="M14 3l3.2 6.5 7.3 1.1-5.3 5.1 1.3 7.3L14 19.8l-6.5 3.2 1.3-7.3-5.3-5.1 7.3-1.1z" />
  </svg>
)

export const GridIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="4" y="4" width="20" height="20" rx="2" />
    <path d="M4 11h20M11 4v20" />
  </svg>
)

export const WarehouseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
    <path d="M5 23V11l9-8 9 8v12" />
    <rect x="10" y="15" width="8" height="8" />
  </svg>
)

export const PinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M14 2C9.6 2 6 5.6 6 10c0 7 8 16 8 16s8-9 8-16c0-4.4-3.6-8-8-8z" />
    <circle cx="14" cy="10" r="3" />
  </svg>
)

export const ADV_ICONS = [<ShieldIcon key="s" />, <LeafIcon key="l" />, <StarIcon key="st" />]
export const USP_ICONS = [<ShieldIcon key="s" />, <GridIcon key="g" />, <WarehouseIcon key="w" />, <PinIcon key="p" />]
