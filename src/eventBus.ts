// eventBus.ts
import { ref } from 'vue';

const eventBus = {
  events: ref<{ [key: string]: Function[] }>({}),

  on(event: string, callback: Function) {
    if (!this.events.value[event]) {
      this.events.value[event] = [];
    }
    this.events.value[event].push(callback);
  },

  off(event: string, callback: Function) {
    if (!this.events.value[event]) return;
    this.events.value[event] = this.events.value[event].filter(cb => cb !== callback);
  },

  emit(event: string, ...args: any[]) {
    if (this.events.value[event]) {
      this.events.value[event].forEach(callback => callback(...args));
    }
  }
};

export default eventBus;
