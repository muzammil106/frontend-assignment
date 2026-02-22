import { createContext, useCallback, useReducer } from 'react';
import * as storage from '../services/storage';

const initialState = {
  subscription: storage.getSubscription(),
  devices: storage.getDevices(),
  error: null,
};

const actions = {
  SET_SUBSCRIPTION: 'SET_SUBSCRIPTION',
  SET_DEVICES: 'SET_DEVICES',
  ADD_DEVICE: 'ADD_DEVICE',
  REMOVE_DEVICE: 'REMOVE_DEVICE',
  UPDATE_DEVICE: 'UPDATE_DEVICE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case actions.SET_SUBSCRIPTION: {
      const next = { ...state.subscription, ...payload };
      storage.setSubscription(next);
      return { ...state, subscription: next, error: null };
    }
    case actions.SET_DEVICES: {
      const list = Array.isArray(payload) ? payload : state.devices;
      storage.setDevices(list);
      return { ...state, devices: list, error: null };
    }
    case actions.ADD_DEVICE: {
      const device = {
        id: payload.id ?? crypto.randomUUID(),
        name: payload.name ?? '',
        type: payload.type ?? 'other',
        status: payload.status ?? 'active',
        addedAt: payload.addedAt ?? new Date().toISOString(),
      };
      const list = [...state.devices, device];
      storage.setDevices(list);
      return { ...state, devices: list, error: null };
    }
    case actions.REMOVE_DEVICE: {
      const list = state.devices.filter((d) => d.id !== payload);
      storage.setDevices(list);
      return { ...state, devices: list, error: null };
    }
    case actions.UPDATE_DEVICE: {
      const list = state.devices.map((d) =>
        d.id === payload.id ? { ...d, ...payload } : d
      );
      storage.setDevices(list);
      return { ...state, devices: list, error: null };
    }
    case actions.SET_ERROR:
      return { ...state, error: payload };
    case actions.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSubscription = useCallback((data) => {
    dispatch({ type: actions.SET_SUBSCRIPTION, payload: data });
  }, []);

  const setDevices = useCallback((list) => {
    dispatch({ type: actions.SET_DEVICES, payload: list });
  }, []);

  const addDevice = useCallback((device) => {
    dispatch({ type: actions.ADD_DEVICE, payload: device });
  }, []);

  const removeDevice = useCallback((id) => {
    dispatch({ type: actions.REMOVE_DEVICE, payload: id });
  }, []);

  const updateDevice = useCallback((id, updates) => {
    dispatch({ type: actions.UPDATE_DEVICE, payload: { id, ...updates } });
  }, []);

  const setError = useCallback((message) => {
    dispatch({ type: actions.SET_ERROR, payload: message });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: actions.CLEAR_ERROR });
  }, []);

  const value = {
    ...state,
    setSubscription,
    setDevices,
    addDevice,
    removeDevice,
    updateDevice,
    setError,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
