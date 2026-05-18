import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  function show(message: string, type: ToastType = 'info', duration = 5000) {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = { id, message, type, duration };

    update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => {
        update((toasts) => toasts.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }

  return {
    subscribe,
    show,
    success: (message: string, duration = 3000) => show(message, 'success', duration),
    error: (message: string, duration = 7000) => show(message, 'error', duration),
    warning: (message: string, duration = 5000) => show(message, 'warning', duration),
    info: (message: string, duration = 5000) => show(message, 'info', duration),
    dismiss: (id: string) => {
      update((toasts) => toasts.filter((t) => t.id !== id));
    },
    clear: () => {
      update(() => []);
    }
  };
}

export const toast = createToastStore();
