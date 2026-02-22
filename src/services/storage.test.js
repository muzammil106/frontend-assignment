import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSubscription,
  setSubscription,
  getDevices,
  setDevices,
} from './storage';

beforeEach(() => {
  window.localStorage.getItem.mockImplementation(() => null);
  window.localStorage.setItem.mockImplementation(() => {});
});

describe('storage', () => {
  describe('getSubscription', () => {
    it('returns default when nothing stored', () => {
      expect(getSubscription()).toEqual({
        planId: null,
        addonIds: [],
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
      });
    });
    it('returns parsed data when stored', () => {
      const data = { planId: 'best-mates', addonIds: ['byo-secondary-gps'] };
      window.localStorage.getItem.mockImplementation(() => JSON.stringify(data));
      expect(getSubscription().planId).toBe('best-mates');
      expect(getSubscription().addonIds).toEqual(['byo-secondary-gps']);
    });
  });

  describe('setSubscription', () => {
    it('persists data as JSON', () => {
      const data = { planId: 'good-mates' };
      setSubscription(data);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'drivelah_subscription',
        expect.any(String)
      );
    });
  });

  describe('getDevices', () => {
    it('returns default four devices when nothing stored', () => {
      const list = getDevices();
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBe(4);
      expect(list[0]).toHaveProperty('deviceType');
      expect(list[0]).toHaveProperty('bringYourOwn');
      expect(list[2].deviceType).toBe('Drive mate Go');
      expect(list[3].deviceType).toBe('Lockbox');
    });
    it('returns merged list when stored has fewer than 4', () => {
      const stored = [{ id: 'device-1', deviceType: 'Primary GPS', serialNumber: '123' }];
      window.localStorage.getItem.mockImplementation(() => JSON.stringify(stored));
      const list = getDevices();
      expect(list.length).toBe(4);
      expect(list[0].serialNumber).toBe('123');
    });
    it('returns stored list when length >= 4', () => {
      const stored = [
        { id: 'device-1', deviceType: 'Primary GPS' },
        { id: 'device-2', deviceType: 'Secondary GPS' },
        { id: 'device-3', deviceType: 'Drive mate Go' },
        { id: 'device-4', deviceType: 'Lockbox' },
      ];
      window.localStorage.getItem.mockImplementation(() => JSON.stringify(stored));
      expect(getDevices().length).toBe(4);
    });
  });

  describe('setDevices', () => {
    it('persists array as JSON', () => {
      const list = [{ id: 'device-1', deviceType: 'Primary GPS' }];
      expect(setDevices(list)).toBe(true);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'drivelah_devices',
        JSON.stringify(list)
      );
    });
    it('returns false for non-array', () => {
      expect(setDevices(null)).toBe(false);
      expect(setDevices({})).toBe(false);
    });
  });
});
