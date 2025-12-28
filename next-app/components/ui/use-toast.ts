"use client";

import { useState, useEffect } from 'react';

const TOAST_LIMIT = 1;
let count = 0;
function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type Toast = { id: string; dismiss: () => void; duration?: number; [key: string]: any };

const toastStore: {
  state: { toasts: Toast[] };
  listeners: Array<(s: { toasts: Toast[] }) => void>;
  getState: () => { toasts: Toast[] };
  setState: (nextState: any) => void;
  subscribe: (listener: (s: { toasts: Toast[] }) => void) => () => void;
} = {
  state: { toasts: [] },
  listeners: [],
  getState: () => toastStore.state,
  setState: (nextState: any) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state);
    } else {
      toastStore.state = { ...toastStore.state, ...nextState };
    }
    toastStore.listeners.forEach((l) => l(toastStore.state));
  },
  subscribe: (listener: (s: { toasts: Toast[] }) => void) => {
    toastStore.listeners.push(listener);
    return () => {
      toastStore.listeners = toastStore.listeners.filter((l) => l !== listener);
    };
  },
};

export const toast = ({ ...props }: any) => {
  const id = generateId();

  const update = (props: any) =>
    toastStore.setState((state: any) => ({
      ...state,
      toasts: state.toasts.map((t: any) => (t.id === id ? { ...t, ...props } : t)),
    }));

  const dismiss = () =>
    toastStore.setState((state: any) => ({
      ...state,
      toasts: state.toasts.filter((t: any) => t.id !== id),
    }));

  toastStore.setState((state: any) => ({
    ...state,
    toasts: [{ ...props, id, dismiss }, ...state.toasts].slice(0, TOAST_LIMIT),
  }));

  return { id, dismiss, update };
};

export function useToast() {
  const [state, setState] = useState(toastStore.getState());

  useEffect(() => {
    const unsub = toastStore.subscribe((s: any) => setState(s));
    return unsub;
  }, []);

  useEffect(() => {
    const timeouts: any[] = [];
    state.toasts.forEach((t: any) => {
      if (t.duration === Infinity) return;
      const timeout = setTimeout(() => t.dismiss(), t.duration || 5000);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [state.toasts]);

  return { toast, toasts: state.toasts };
}
