var assert = require('assert');
var after = require('after');

var rateLimit = require('./');

test('should only allow one call per interval', function (done) {
    var start = Date.now();

    // time that passes is 400ms since the first call executes immediate
    var expected = [0, 100, 200, 300, 400];
    var offsets = [];

    var trigger = after(5, function() {
        fuzzy_compare(expected, offsets)
        done();
    });

    var fn = rateLimit(1, 100, function() {
        offsets.push(Date.now() - start);
        trigger();
    });

    for (var i = 0; i < 5; ++i) {
        fn(i);
    }
});

test('should allow for calls to burst', function (done) {
    var start = Date.now();
    var expected = [0, 0, 100, 100, 200];
    var offsets = [];

    // time that passes is 400ms since the first call executes immediate
    var trigger = after(5, function() {
        fuzzy_compare(expected, offsets)
        done();
    });

    var fn = rateLimit(2, 100, function() {
        offsets.push(Date.now() - start);
        trigger();
    });

    for (var i = 0; i < 5; ++i) {
        fn(i);
    }
});

test('should preserve function context', function (done) {
    var start = Date.now();

    // time that passes is 400ms since the first call executes immediate
    var expected = [0, 100, 200, 300, 400];
    var offsets = [];

    var trigger = after(5, function() {
        fuzzy_compare(expected, offsets)
        done();
    });

    var fn = rateLimit(1, 100, function() {
        assert(this.foo === 'bar');
        offsets.push(Date.now() - start);
        trigger();
    });

    for (var i = 0; i < 5; ++i) {
        fn.call({ foo: 'bar' }, i);
    }
});

function fuzzy_compare(expected, actual) {
    assert.equal(expected.length, actual.length);

    expected.forEach(function(expected_value, idx) {
        var actual_val = actual[idx];

        var diff = Math.abs(expected_value - actual_val);
        if (diff > 20) {
            throw new Error('actual and expected values differ too much: actual ' + actual_val + ' != ' + expected_value);
        }
    });
}
