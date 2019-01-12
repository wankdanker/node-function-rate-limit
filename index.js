module.exports = (limitCount, limitInterval, fn) => {
  const fifo = [];
  let count = limitCount;

  const delayOrIncreaseCounter = (next) => fifo.length ? next() : count += 1;

  const callNext = (args) => {
    setTimeout(delayOrIncreaseCounter, limitInterval, callNext);
    const [ctx, params] = fifo.length ? fifo.shift() : args;
    fn.apply(ctx, params);
  }

  return function rate_limited_function(...args) {
    const ctx = this;
    if (count <= 0) {
      fifo.push([ctx, args]);
    } else {
      count -= 1;
      callNext([ctx, args]);
    }
  };
}
