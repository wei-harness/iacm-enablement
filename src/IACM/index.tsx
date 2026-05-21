import { signOutApp } from '../auth';
import { useUserProfile } from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './iacm.module.scss';
import { CompetitiveSection } from './sections/CompetitiveSection';
import { CustomersSection } from './sections/CustomersSection';
import { KnowledgeSection } from './sections/KnowledgeSection';
import { MaturitySection } from './sections/MaturitySection';
import { OverviewSection } from './sections/OverviewSection';
import { PersonasSection } from './sections/PersonasSection';
import { QASection } from './sections/QASection';
import { RoadmapSection } from './sections/RoadmapSection';
import { CrossSellSection } from './sections/CrossSellSection';
import { SkusSection } from './sections/SkusSection';

type SectionId =
  | 'overview'
  | 'skus'
  | 'personas'
  | 'customers'
  | 'roadmap'
  | 'competitive'
  | 'crosssell'
  | 'maturity'
  | 'qa'
  | 'knowledge';

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'skus', label: 'SKUs' },
  { id: 'personas', label: 'Personas' },
  { id: 'customers', label: 'Customers' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'competitive', label: 'Competitive' },
  { id: 'crosssell', label: 'Cross-Sell' },
  { id: 'maturity', label: 'Maturity' },
  { id: 'qa', label: 'Q&A' },
  { id: 'knowledge', label: 'Knowledge Hub' },
];

function ActiveSection({ section }: { section: SectionId }) {
  switch (section) {
    case 'overview':
      return <OverviewSection />;
    case 'skus':
      return <SkusSection />;
    case 'personas':
      return <PersonasSection />;
    case 'customers':
      return <CustomersSection />;
    case 'roadmap':
      return <RoadmapSection />;
    case 'competitive':
      return <CompetitiveSection />;
    case 'crosssell':
      return <CrossSellSection />;
    case 'maturity':
      return <MaturitySection />;
    case 'qa':
      return <QASection />;
    case 'knowledge':
      return <KnowledgeSection />;
    default:
      return <OverviewSection />;
  }
}

const getInitials = (name: string) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return (parts[0]?.[0] ?? '').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase();
};

function UserMenu() {
  const { data: user } = useUserProfile();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const displayName = user?.name ?? '';
  const email = user?.email ?? '';
  const initials = getInitials(displayName);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={styles.avatarBtn}
        aria-label="User menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.avatarInitials}>{initials}</span>
      </button>

      {open && (
        <div className={styles.userDropdown}>
          <div className={styles.userDropdownHeader}>
            <span className={styles.userDropdownInitials}>{initials}</span>
            <div className={styles.userDropdownInfo}>
              {displayName && <span className={styles.userDropdownName}>{displayName}</span>}
              {email && <span className={styles.userDropdownEmail}>{email}</span>}
            </div>
          </div>
          <div className={styles.userDropdownDivider} />
          <button
            className={styles.userDropdownSignOut}
            onClick={() => {
              setOpen(false);
              signOutApp();
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function useReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add(styles.revealIn), i * 60);
          }
        });
      },
      { threshold: 0.06 },
    );
    const els = ref.current.querySelectorAll('.' + styles.reveal);
    els.forEach((el) => {
      el.classList.remove(styles.revealIn);
      observer.observe(el);
    });
    return () => observer.disconnect();
  });
}

export default function IACMPage() {
  const [section, setSection] = useState<SectionId>('overview');
  const wrapRef = useRef<HTMLDivElement>(null);

  useReveal(wrapRef);

  function navigate(id: SectionId) {
    setSection(id);
    if (wrapRef.current) wrapRef.current.scrollTop = 0;
  }

  return (
    <div className={styles.iacmRoot}>
      <Helmet>
        <title>IACM Sales Enablement | Harness</title>
      </Helmet>

      {/* Announcement bar */}
      <div className={styles.annBar}>
        IACM Sales Enablement — content coming soon.
      </div>

      {/* Top nav */}
      <nav className={styles.topNav}>
        <div className={styles.navBrand}>
          <img
            src={`${import.meta.env.BASE_URL}assets/icon_iacm.svg`}
            alt="IACM"
            width="22"
            height="22"
            className={styles.navBrandLogo}
          />
          <span>IACM Sales Kit</span>
        </div>

        <div className={styles.navItems}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.navBtn} ${section === item.id ? styles.navBtnActive : ''}`}
              aria-current={section === item.id ? 'page' : undefined}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <UserMenu />
      </nav>

      {/* Active section */}
      <div className={styles.sectionWrap} ref={wrapRef}>
        <ActiveSection section={section} />
      </div>
    </div>
  );
}
