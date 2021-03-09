import EventEmitter from '../EventEmitter';

describe('EventEmitter class', () => {
  let inst;

  beforeEach(() => {
    inst = new EventEmitter();
  });

  it('should create an instance of itself', () => {
    expect(inst).toBeInstanceOf(EventEmitter);
  });

  it('should return a singleton', () => {
    const inst2 = new EventEmitter();

    expect(inst).toEqual(inst2);
  });

  it('should push a callback to event type array', () => {
    // eslint-disable-next-line no-console
    const callback = arg => console.log(arg);
    inst.on('add', callback);

    expect(inst.events).toHaveProperty('add');
  });
});
