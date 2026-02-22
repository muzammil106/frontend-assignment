import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/AppStore';
import { PLANS, ADDONS } from '../../constants/plans';
import { FeatureIcon } from '../../components/PlanIcons/PlanIcons';
import styles from './Subscription.module.scss';

function PlanCard({ plan, isSelected, onSelect }) {
  return (
    <article
      className={`${styles.planCard} ${isSelected ? styles.planCardSelected : ''}`}
      aria-pressed={isSelected}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(plan.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(plan.id);
        }
      }}
    >
      <h3 className={styles.planName}>{plan.name}</h3>
      <ul className={styles.featureList}>
        {plan.features.map((f, i) => (
          <li key={i}>
            <span className={styles.featureIcon}><FeatureIcon name={f.icon} /></span>
            {f.text}
          </li>
        ))}
      </ul>
      <p className={styles.planPrice}>{plan.price}</p>
    </article>
  );
}

export default function Subscription() {
  const navigate = useNavigate();
  const { subscription, setSubscription } = useContext(AppContext);
  const { planId, addonIds, cardNumber, cardExpiry, cardCvc } = subscription;

  const setPlan = (id) => {
    setSubscription({ ...subscription, planId: id });
  };

  const toggleAddon = (id) => {
    if (addonIds.includes(id)) {
      setSubscription({ ...subscription, addonIds: [] });
    } else {
      setSubscription({ ...subscription, addonIds: [id] });
    }
  };

  const setCard = (field, value) => {
    setSubscription({ ...subscription, [field]: value });
  };

  const handleNext = () => {
    navigate('/device');
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
      <h2 className={styles.title}>Subscription plan</h2>
      <p className={styles.subtitle}>Select the ideal subscription plan for your listing.</p>
      <hr className={styles.titleLine} aria-hidden="true" />

      <section className={styles.section} aria-labelledby="select-plan-heading">
        <h3 id="select-plan-heading" className={styles.sectionTitle}>Select your plan</h3>
        <div className={styles.planGrid}>
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={planId === plan.id}
              onSelect={setPlan}
            />
          ))}
        </div>
      </section>

      {planId === 'just-mates' && (
        <>
          <hr className={styles.sectionLine} aria-hidden="true" />
          <p className={styles.learnMore}>
            Learn more about the plans here -{' '}
            <a href="#plans" className={styles.link}>What is the right plan for me?</a>
          </p>
          <p className={styles.learnMore}>
            You will be able to switch between plans easily later as well. Speak to our host success team if you need any clarifications.
          </p>
        </>
      )}

      {planId !== 'just-mates' && (
        <>
          <hr className={styles.sectionLine} aria-hidden="true" />
          <section className={styles.section} aria-labelledby="addons-heading">
            <h3 id="addons-heading" className={styles.sectionTitle}>Select add-ons for your subscription</h3>
            <div className={styles.addonList}>
              {ADDONS.map((addon) => (
                <label
                  key={addon.id}
                  className={`${styles.addonOption} ${addon.disabled ? styles.addonDisabled : ''}`}
                >
                  <input
                    type="radio"
                    name="addon"
                    value={addon.id}
                    checked={addonIds.includes(addon.id)}
                    onChange={() => !addon.disabled && toggleAddon(addon.id)}
                    disabled={addon.disabled}
                    className={styles.radio}
                  />
                  <span className={styles.radioCustom} />
                  <span className={styles.addonLabel}>
                    {addon.label}
                    {addon.comingSoon && (
                      <span className={styles.comingSoon}>Coming soon</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <hr className={styles.sectionLine} aria-hidden="true" />
          <section className={styles.section} aria-labelledby="card-heading">
            <h3 id="card-heading" className={styles.sectionTitle}>Add card details</h3>
            <div className={styles.cardSingle}>
              <span className={styles.cardIcon} aria-hidden="true">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="1" y="3" width="22" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M1 8h22" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="4" y="11" width="4" height="2" rx="0.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="18" cy="12" r="1.5" fill="currentColor" opacity="0.5"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="1234 5678 1234 5678"
                value={cardNumber}
                onChange={(e) => setCard('cardNumber', e.target.value)}
                className={styles.cardInputMain}
                maxLength="19"
                aria-label="Card number"
              />
              <span className={styles.cardDivider} aria-hidden="true" />
              <input
                type="text"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCard('cardExpiry', e.target.value)}
                className={styles.cardInputExpiry}
                maxLength="5"
                aria-label="Expiry"
              />
              <span className={styles.cardDivider} aria-hidden="true" />
              <input
                type="text"
                placeholder="CVC"
                value={cardCvc}
                onChange={(e) => setCard('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                className={styles.cardInputCvc}
                maxLength="4"
                aria-label="CVC"
              />
            </div>
            <p className={styles.cardNote}>
              You will not be charged right now. Subscription will only start once your listing is published and live.
            </p>
          </section>

          <hr className={styles.sectionLine} aria-hidden="true" />
          <p className={styles.learnMore}>
            Learn more about the plans here -{' '}
            <a href="#plans" className={styles.link}>What is the right plan for me?</a>
          </p>
          <p className={styles.learnMore}>
            You will be able to switch between plans easily later as well. Speak to our host success team if you need any clarifications.
          </p>
        </>
      )}

      </div>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <button type="button" className={styles.nextBtn} onClick={handleNext}>
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
