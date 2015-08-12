import EventEmitter from 'eventemitter3';

// That's all we need for hot reloadable atomic Flux.
// Thank you Samuel - https://github.com/vacuumlabs/vlux

export default class Flux extends EventEmitter {

  constructor(store, state) {
    super();
    this.store = store;
    this.state = store(state);
  }

  dispatch(action, payload, meta?) {
    if (typeof action !== 'function')
      throw new TypeError(`Dispatch expected action to be function, got '${typeof action}' instead.`);

    this.state = this.store(this.state, action, payload);
    this.emit('dispatch', this.state, action, payload, meta);
  }

  load(state) {
    this.state = this.store(state);
    this.emit('dispatch', this.state);
  }

}
