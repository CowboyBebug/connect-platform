const core = require('../core');


class Composite extends core.Node {
  constructor(composition, config) {
    super(composition.signature);
    this._composition = composition;
    this._config = config;
  }

  get composition() { return this._composition; }

  run(inputs, output, control) {
    for (let [key, pin] of Object.entries(this.composition.outputs)) {
      if (pin instanceof core.pins.InputPin)
        pin.subscribe(core.events.io.receive, data => {
          output(key, data);
        });
      else
        pin.subscribe(core.events.pin.activate, () => {
          control(key);
        });
    }

    this.composition.start(inputs, this._config);
  }

  reset() {
    this.composition.reset();
    super.reset();
    return this;
  }
}

module.exports = {
  Composite: Composite,
}
