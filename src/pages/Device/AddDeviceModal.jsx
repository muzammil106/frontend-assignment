import { useState, useEffect } from 'react';
import styles from './AddDeviceModal.module.scss';

export default function AddDeviceModal({ onClose, onAdd, deviceTypes, deviceStatus }) {
  const [name, setName] = useState('');
  const [type, setType] = useState(deviceTypes[0]?.value ?? 'other');
  const [status, setStatus] = useState(deviceStatus[0]?.value ?? 'active');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const focusable = document.querySelectorAll(
      '[href], button, textarea, input, select'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd({ name: trimmed, type, status });
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <h2 id="modal-title" className={styles.title}>
          Add device
        </h2>
        <p id="modal-desc" className={styles.desc}>
          Enter device details. All fields are required.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="new-device-name">Name</label>
            <input
              id="new-device-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Laptop"
              required
              autoComplete="off"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="new-device-type">Type</label>
            <select
              id="new-device-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={styles.select}
            >
              {deviceTypes.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="new-device-status">Status</label>
            <select
              id="new-device-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.select}
            >
              {deviceStatus.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.btnSecondary}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={!name.trim()}>
              Add device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
