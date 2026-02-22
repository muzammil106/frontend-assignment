import { useRef } from 'react';
import styles from './DeviceBlock.module.scss';

export default function DeviceBlock({ label, device, onUpdate }) {
  const fileInputRef = useRef(null);

  const handleToggle = () => {
    onUpdate({ bringYourOwn: !device.bringYourOwn });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdate({ imageDataUrl: reader.result });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <section className={styles.block} aria-labelledby={`${label.replace(/\s/g, '-')}-heading`}>
      <h3 id={`${label.replace(/\s/g, '-')}-heading`} className={styles.blockTitle}>
        {label}
      </h3>
      <div className={styles.grid}>
        <div className={`${styles.field} ${styles.fieldDeviceType}`}>
          <label htmlFor={`type-${device.id}`}>Device type</label>
          <input
            id={`type-${device.id}`}
            type="text"
            readOnly
            value={device.deviceType || ''}
            className={styles.typeInput}
          />
        </div>
        <div className={`${styles.field} ${styles.fieldToggle}`}>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Bringing your own device?</span>
            <button
              type="button"
              role="switch"
              aria-checked={device.bringYourOwn}
              className={`${styles.toggle} ${device.bringYourOwn ? styles.toggleOn : ''}`}
              onClick={handleToggle}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
          <p className={styles.toggleNote}>
            Toggle this on if you're bringing your own device. Leave it off if Drive mate is to provide the device.
          </p>
        </div>
        {device.bringYourOwn && (
          <div className={`${styles.field} ${styles.fieldSerial}`}>
            <label htmlFor={`serial-${device.id}`}>Serial number</label>
            <input
              id={`serial-${device.id}`}
              type="text"
              placeholder="Enter the serial number of the device"
              value={device.serialNumber || ''}
              onChange={(e) => onUpdate({ serialNumber: e.target.value })}
              className={styles.input}
            />
          </div>
        )}
        {device.bringYourOwn && (
          <div className={`${styles.field} ${styles.fieldUpload}`}>
            <label htmlFor={`upload-${device.id}`}>Upload an image of the device</label>
            <div
              className={styles.uploadArea}
              onClick={handleUploadClick}
              onKeyDown={(e) => e.key === 'Enter' && handleUploadClick()}
              role="button"
              tabIndex={0}
              id={`upload-${device.id}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
                aria-hidden
              />
              {device.imageDataUrl ? (
                <img src={device.imageDataUrl} alt="Device" className={styles.preview} />
              ) : (
                <span className={styles.uploadText}>Click to upload</span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
