node-function-rate-limit
--------------

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]

Limit the execution rate of any function.

install
---------

with [npm](https://npmjs.org)

```bash
npm install function-rate-limit
```

api
----

### rateLimit(limitCount, limitInterval, function);

returns a rate limited function which should be called instead of the `function` passed to `rateLimit`

* _limitCount_ - the number of times per `limitInterval` to limit execution of `function`
* _limitInterval_ - the duration of time during which to limit execution of `function` specified in ms
* _function_ - the function which should be rate limited

`function` will be called up to `limitCount` times during `limitInterval` including bursting.

Example
-------

```javascript
var rateLimit = require('function-rate-limit');

// limit to 2 executions per 1000ms
var start = Date.now()
var fn = rateLimit(2, 1000, function (x) {
  console.log('%s ms - %s', Date.now() - start, x);
});

for (var y = 0; y < 10; y++) {
  fn(y);
}
```

results in:

```bash
10 ms - 0
11 ms - 1
1004 ms - 2
1012 ms - 3
2008 ms - 4
2013 ms - 5
3010 ms - 6
3014 ms - 7
4017 ms - 8
4017 ms - 9
```

pre 1.x behavior
-------------

Prior to version 1.x.x, this module behaved as a throttle module. `function` would be invoked only one time per `limitCount/limitInterval` with no bursting. If you need this functionality again and do not want bursting, see the `lodash.throttle` module.

License
----------

### The MIT License (MIT)


Copyright (c) 2012 Daniel L. VerWeire

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/function-rate-limit.svg?style=flat-square
[npm-url]: https://npmjs.org/package/function-rate-limit
[travis-image]: https://travis-ci.org/wankdanker/node-function-rate-limit.svg?style=flat-square
[travis-url]: https://travis-ci.org/wankdanker/node-function-rate-limit
