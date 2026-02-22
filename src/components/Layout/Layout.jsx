import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SIDEBAR_STEPS } from '../../constants/sidebarSteps';
import styles from './Layout.module.scss';

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="36" height="20" viewBox="0 0 36 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 15 L5 12 L11 10 L21 10 L28 12 L33 15 L33 17 L4 17 Z"/>
      <circle cx="11" cy="18" r="2.5" fill="currentColor"/>
      <circle cx="26" cy="18" r="2.5" fill="currentColor"/>
    </svg>
  );
}


function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="currentColor"/>
      <path d="M5 9l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function getStepLabel(step) {
  if (step.id === 'subscription') return 'Subscription';
  if (step.id === 'device') return 'Device';
  return step.label;
}

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const stepsWithPath = SIDEBAR_STEPS.filter((s) => s.path);
  const currentStep = SIDEBAR_STEPS.find((s) => s.path === currentPath) || stepsWithPath[0];
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
        setMobileDropdownOpen(false);
      }
    }
    if (mobileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileDropdownOpen]);

  const handleStepSelect = (path) => {
    if (path) navigate(path);
    setMobileDropdownOpen(false);
  };

  const getStepStatus = (step) => {
    if (step.path === currentPath) return 'active';
    const currentIndex = SIDEBAR_STEPS.findIndex((s) => s.path === currentPath);
    const stepIndex = SIDEBAR_STEPS.findIndex((s) => s.id === step.id);
    if (currentIndex < 0) return stepIndex < 8 ? 'completed' : 'inactive';
    if (stepIndex < currentIndex) return 'completed';
    return 'inactive';
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button type="button" className={styles.hamburger} aria-label="Menu">
            <HamburgerIcon />
          </button>
          <NavLink to="/subscription" className={styles.logo} aria-label="Drive lah home">
            <CarIcon />
            <span>Drive lah</span>
          </NavLink>
          <nav className={styles.topNav} aria-label="Top navigation">
            <a href="#learn">Learn more</a>
            <a href="#list">List your car</a>
            <a href="#inbox">Inbox</a>
          </nav>
          <div className={styles.avatar} role="img" aria-label="User profile">
            <img src="/profile.png" alt="Profile" className={styles.avatarImg} />
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.bodyInner}>
        <aside className={styles.sidebar} aria-label="Steps">
          <ul className={styles.stepList}>
            {SIDEBAR_STEPS.map((step) => {
              const status = getStepStatus(step);
              const content = (
                <>
                  <span className={styles.stepLabel}>{step.label}</span>
                  {status === 'completed' && (
                    <span className={styles.check}><CheckIcon /></span>
                  )}
                </>
              );
              return (
                <li
                  key={step.id}
                  className={`${styles.step} ${styles[status]}`}
                  data-status={status}
                >
                  {step.path ? (
                    <NavLink to={step.path} className={styles.stepLink} end>
                      {content}
                    </NavLink>
                  ) : (
                    <span className={styles.stepSpan}>{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        <main className={styles.main} id="main-content">
          <div className={`${styles.mobileStepWrap} ${mobileDropdownOpen ? styles.mobileStepWrapOpen : ''}`} ref={mobileDropdownRef}>
            <label className={styles.mobileStepLabel}>Step</label>
            <button
              type="button"
              className={styles.mobileStepTrigger}
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              aria-expanded={mobileDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select step"
            >
              <span>{getStepLabel(currentStep)}</span>
              <svg className={styles.mobileStepChevron} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {mobileDropdownOpen && (
              <div
                className={styles.mobileStepPanel}
                role="listbox"
                aria-label="Step options"
              >
                {stepsWithPath.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    role="option"
                    aria-selected={currentPath === step.path}
                    className={`${styles.mobileStepOption} ${currentPath === step.path ? styles.mobileStepOptionActive : ''}`}
                    onClick={() => handleStepSelect(step.path)}
                  >
                    {getStepLabel(step)}
                  </button>
                ))}
              </div>
            )}
          </div>
          {children}
        </main>
        </div>
      </div>
    </div>
  );
}
