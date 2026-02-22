import { useContext } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, AppContext } from './AppStore';
import * as storage from '../services/storage';

const defaultSubscription = {
  planId: null,
  addonIds: [],
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
};
const defaultDevices = [
  {
    id: 'device-1',
    deviceType: 'Primary GPS',
    serialNumber: '',
    bringYourOwn: true,
    imageDataUrl: '',
  },
  {
    id: 'device-2',
    deviceType: 'Secondary GPS',
    serialNumber: '',
    bringYourOwn: true,
    imageDataUrl: '',
  },
  {
    id: 'device-3',
    deviceType: 'Drive mate Go',
    serialNumber: '',
    bringYourOwn: true,
    imageDataUrl: '',
  },
  {
    id: 'device-4',
    deviceType: 'Lockbox',
    serialNumber: '',
    bringYourOwn: true,
    imageDataUrl: '',
  },
];

vi.mock('../services/storage', () => ({
  getSubscription: vi.fn(() => ({
    planId: null,
    addonIds: [],
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })),
  setSubscription: vi.fn(() => true),
  getDevices: vi.fn(() => [
    {
      id: 'device-1',
      deviceType: 'Primary GPS',
      serialNumber: '',
      bringYourOwn: true,
      imageDataUrl: '',
    },
    {
      id: 'device-2',
      deviceType: 'Secondary GPS',
      serialNumber: '',
      bringYourOwn: true,
      imageDataUrl: '',
    },

    {
      id: 'device-3',
      deviceType: 'Drive mate Go',
      serialNumber: '',
      bringYourOwn: true,
      imageDataUrl: '',
    },
    {
      id: 'device-4',
      deviceType: 'Lockbox',
      serialNumber: '',
      bringYourOwn: true,
      imageDataUrl: '',
    },
  ]),
  setDevices: vi.fn(() => true),
}));

describe('AppStore', () => {
  beforeEach(() => {
    vi.mocked(storage.getSubscription).mockReturnValue({ ...defaultSubscription });
    vi.mocked(storage.getDevices).mockReturnValue([...defaultDevices]);
  });

  it('provides initial subscription and devices', () => {
    const { result } = renderHook(() => useContext(AppContext), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    });
    expect(result.current.subscription.planId).toBeNull();
    expect(result.current.devices).toHaveLength(2);
  });

  it('setSubscription updates state and persists', () => {
    const { result } = renderHook(() => useContext(AppContext), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    });
    act(() => {
      result.current.setSubscription({ planId: 'best-mates' });
    });
    expect(result.current.subscription.planId).toBe('best-mates');
    expect(storage.setSubscription).toHaveBeenCalled();
  });

  it('updateDevice updates device and persists', () => {
    const { result } = renderHook(() => useContext(AppContext), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    });
    act(() => {
      result.current.updateDevice('device-1', {
        deviceType: 'Secondary GPS',
        bringYourOwn: false,
      });
    });
    expect(result.current.devices[0].deviceType).toBe('Secondary GPS');
    expect(result.current.devices[0].bringYourOwn).toBe(false);
    expect(storage.setDevices).toHaveBeenCalled();
  });
});
