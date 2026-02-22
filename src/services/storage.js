const STORAGE_KEYS = {
  SUBSCRIPTION: 'drivelah_subscription',
  DEVICES: 'drivelah_devices',
};

function safeGet(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const defaultSubscription = {
  planId: null,
  addonIds: [],
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
};

export function getSubscription() {
  const stored = safeGet(STORAGE_KEYS.SUBSCRIPTION, null);
  return stored ? { ...defaultSubscription, ...stored } : defaultSubscription;
}

export function setSubscription(data) {
  return safeSet(STORAGE_KEYS.SUBSCRIPTION, { ...defaultSubscription, ...data });
}

const defaultDevices = [
  { id: 'device-1', deviceType: 'Primary GPS', serialNumber: '', bringYourOwn: true, imageDataUrl: '' },
  { id: 'device-2', deviceType: 'Secondary GPS', serialNumber: '', bringYourOwn: true, imageDataUrl: '' },
  { id: 'device-3', deviceType: 'Drive mate Go', serialNumber: '', bringYourOwn: true, imageDataUrl: '' },
  { id: 'device-4', deviceType: 'Lockbox', serialNumber: '', bringYourOwn: true, imageDataUrl: '' },
];

export function getDevices() {
  const stored = safeGet(STORAGE_KEYS.DEVICES, null);
  let list;
  if (stored && Array.isArray(stored)) {
    if (stored.length >= 4) list = [...stored];
    else {
      const pad = defaultDevices.slice(stored.length, 4);
      list = pad.length ? [...stored, ...pad] : [...stored];
    }
  } else {
    list = defaultDevices.map((d) => ({ ...d }));
  }
  if (!list) return defaultDevices;
  if (list[2] && list[2].id === 'device-3') list[2] = { ...list[2], deviceType: 'Drive mate Go' };
  if (list[3] && list[3].id === 'device-4') list[3] = { ...list[3], deviceType: 'Lockbox' };
  return list;
}

export function setDevices(devices) {
  if (!Array.isArray(devices)) return false;
  return safeSet(STORAGE_KEYS.DEVICES, devices);
}

export { STORAGE_KEYS };
