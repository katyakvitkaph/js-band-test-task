class EventEmitter {
  constructor() {
    if (typeof EventEmitter.instance === 'object') {
      return EventEmitter.instance;
    }

    this.events = {};
    EventEmitter.instance = this;
    return this;
  }

  on(type, callback) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(callback => callback(...args));
    }
  }
}

export default EventEmitter;
