import { useState } from 'react';
import { DEVICE_TYPES, DEVICE_STATUS } from '../../constants/deviceTypes';
import styles from './DeviceCard.module.scss';

function getLabel(value, options) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function DeviceCard({ device, onRemove, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(device.name);
  const [type, setType] = useState(device.type);
  const [status, setStatus] = useState(device.status);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onUpdate({ name: trimmed, type, status });
    setEditing(false);
  };

  const handleCancel = () => {
    setName(device.name);
    setType(device.type);
    setStatus(device.status);
    setEditing(false);
  };

  if (editing) {
    return (
      <article className={styles.card} aria-label={`Edit ${device.name}`}>
        <div className={styles.editRow}>
          <label htmlFor={`name-${device.id}`} className="sr-only">
            Device name
          </label>
          <input
            id={`name-${device.id}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Device name"
            className={styles.input}
            autoFocus
          />
        </div>
        <div className={styles.editRow}>
          <label htmlFor={`type-${device.id}`}>Type</label>
          <select
            id={`type-${device.id}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.select}
          >
            {DEVICE_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.editRow}>
          <label htmlFor={`status-${device.id}`}>Status</label>
          <select
            id={`status-${device.id}`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.select}
          >
            {DEVICE_STATUS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={handleCancel} className={styles.btnSecondary}>
            Cancel
          </button>
          <button type="button" onClick={handleSave} className={styles.btnPrimary}>
            Save
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.card} aria-label={`Device: ${device.name}`}>
      <div className={styles.main}>
        <h3 className={styles.name}>{device.name || 'Unnamed device'}</h3>
        <p className={styles.meta}>
          {getLabel(device.type, DEVICE_TYPES)} · {getLabel(device.status, DEVICE_STATUS)}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className={styles.btnSecondary}
          aria-label={`Edit ${device.name}`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          className={styles.btnDanger}
          aria-label={`Remove ${device.name}`}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
