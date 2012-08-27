node-function-rate-limit
--------------

Limit the execution rate of any function. 

install
---------

with npm...

```bash
npm install function-rate-limit
```

or with git...

```bash
git clone git://github.com/wankdanker/node-function-rate-limit.git
```

api
----

###rateLimit(limitCount, limitInterval, function);

returns a rate limited function which should be called instead of the the `function` passed to `rateLimit`

* _limitCount_ - the number of times per `limitInterval` to limit execution of `function`
* _limitInterval_ - the duration of time during which to limit execution of `function` specified in ms
* _function_ - the function which should be rate limited

example
-------

```javascript
var rateLimit = require('funciton-rate-limit');

//limit to 1 execution per 1000ms
var fn = rateLimit(1, 1000, function (x) {
  console.log('%s - %s', new Date(), x);
});

for (var y = 0; y < 10; y++) {
  fn(y);
}
```

results in:

```bash
Mon Aug 27 2012 15:21:41 GMT-0400 (EDT) - 0
Mon Aug 27 2012 15:21:42 GMT-0400 (EDT) - 1
Mon Aug 27 2012 15:21:43 GMT-0400 (EDT) - 2
Mon Aug 27 2012 15:21:44 GMT-0400 (EDT) - 3
Mon Aug 27 2012 15:21:45 GMT-0400 (EDT) - 4
Mon Aug 27 2012 15:21:46 GMT-0400 (EDT) - 5
Mon Aug 27 2012 15:21:47 GMT-0400 (EDT) - 6
Mon Aug 27 2012 15:21:48 GMT-0400 (EDT) - 7
Mon Aug 27 2012 15:21:49 GMT-0400 (EDT) - 8
Mon Aug 27 2012 15:21:50 GMT-0400 (EDT) - 9
```

license
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
