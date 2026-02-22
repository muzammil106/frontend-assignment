function PadlockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 8V5a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M2 14c0-2.2 1.8-4 4-4s4 1.8 4 4M10 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 10l3-3 4 4 4-4 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M4 13v2h10v-2M7 10v3M11 10v3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M2 9h14M9 2c2 2 3 5 3 7s-1 5-3 7M9 2c-2 2-3 5-3 7s1 5 3 7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="6" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8.5 10.5L12 7l4 4-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M14 9v5h-2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 12a4 4 0 014-4h.5A3.5 3.5 0 0113 14H5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M9 8a3.5 3.5 0 013 5.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

const ICONS = {
  padlock: PadlockIcon,
  users: UsersIcon,
  handshake: HandshakeIcon,
  globe: GlobeIcon,
  key: KeyIcon,
  cloud: CloudIcon,
};

export function FeatureIcon({ name }) {
  const Icon = ICONS[name] || PadlockIcon;
  return <Icon />;
}
