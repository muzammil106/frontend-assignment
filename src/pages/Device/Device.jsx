import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../store/AppStore';
import DeviceBlock from './DeviceBlock';
import styles from './Device.module.scss';

export default function Device() {
  const navigate = useNavigate();
  const { devices, updateDevice } = useContext(AppContext);

  const handleNext = () => {
    navigate('/easy-access');
  };

  const device1 = devices[0];
  const device2 = devices[1];
  const device3 = devices[2];
  const device4 = devices[3];

  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
      <h2 className={styles.title}>Device management</h2>
      <p className={styles.subtitle}>
        Add details of the device, if any already installed on your car. If none, then continue to next step.
      </p>
      <hr className={styles.divider} />

      {device1 && (
        <DeviceBlock
          label="Device 1"
          device={device1}
          onUpdate={(updates) => updateDevice(device1.id, updates)}
        />
      )}
      <hr className={styles.divider} />
      {device2 && (
        <DeviceBlock
          label="Device 2"
          device={device2}
          onUpdate={(updates) => updateDevice(device2.id, updates)}
        />
      )}
      <hr className={styles.divider} />
      {device3 && (
        <DeviceBlock
          label="Device 3"
          device={device3}
          onUpdate={(updates) => updateDevice(device3.id, updates)}
        />
      )}
      <hr className={styles.divider} />
      {device4 && (
        <DeviceBlock
          label="Device 4"
          device={device4}
          onUpdate={(updates) => updateDevice(device4.id, updates)}
        />
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
