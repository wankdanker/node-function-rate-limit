module.exports = rateLimit;

function rateLimit(limitCount, limitInterval, fn) {
  var fifo = []
    , callCount = 0
    , startTime = new Date().getTime()
    ;
  
  return executeRateLimitedFunction;
  
  function executeRateLimitedFunction () {
    var args
      , now
      , rate
      ;
    
    args = Array.prototype.slice.call(arguments);
    if (!startTime) startTime = new Date().getTime();
    now = new Date().getTime();
    
    if (now - startTime > limitInterval) {
      //if the time passed exceeds the limitInterval then reset the startTime 
      //and callCount. This allows us to recalculate the rate for each 
      //limitInterval
      
      startTime = now;
      callCount = 0;
    }
    
    rate = (callCount) / (now - startTime);
    
    if (rate > (limitCount / limitInterval)) {
      // we have exceeded the rate we need to start queuing
      if (args.length) {
        //we exceeded the rate limit when attempting to actually
        //executeRateLimitedFunction, so we need to push the fn onto the fifo
        fifo.push(args);
      }
      
      setTimeout(executeRateLimitedFunction, limitInterval/limitCount);
    }
    else if (fifo.length) {
      if (args.length) {
        //be sure to push the current call on to the queue
        //if we had the specified args.
        fifo.push(args);
      }
      
      process.nextTick(fn.bind.apply(fn, [fn].concat(fifo.shift())));
      callCount += 1;
    }
    else {
      process.nextTick(fn.bind.apply(fn, [fn].concat(args)));
      callCount += 1;
    }
  };
}
