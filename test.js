var rateLimit = require('./');

exports["one per interval"] = function (test) {
	var startTime = new Date().getTime();
	
	//this rate limited function will be executed 6 times in total.
	//it is limited to 1 execution per 100ms therefore it should take
	//600ms in total to process.
	//however the first execution happens at 0ms and each subsequent
	//execution occurs 100ms following the previous execution.
	//
	//like this:
	//
	//execution #1 - 0ms
	//execution #2 - 100ms
	//execution #3 - 200ms
	//execution #4 - 300ms
	//execution #5 - 400ms
	//execution #6 - 500ms
	//
	//so the time that passes is 500ms and not 600ms
	
	var fn = rateLimit(1, 100, function (x) {
		if (x === 5) {
			test.equal(Math.round((new Date().getTime() - startTime) / 100), 5);
			test.done();
		}
	});
	
	for (var x = 0; x <= 5; x ++) {
		fn(x);
	}
};

exports["one per interval - wait before starting"] = function (test) {
	var startTime = new Date().getTime();
	
	var fn = rateLimit(1, 100, function (x) {
		if (x === 5) {
			test.equal(Math.round((new Date().getTime() - startTime) / 100), 10);
			test.done();
		}
	});
	
	setTimeout(function () {
		for (var x = 0; x <= 5; x ++) {
			fn(x);
		}
	}, 500);
};

exports["two per interval"] = function (test) {
	var startTime = new Date().getTime();
	
	var fn = rateLimit(2, 100, function (x) {
		if (x === 5) {
			test.equal(Math.round((new Date().getTime() - startTime) / 100), 3);
			test.done();
		}
	});
	
	for (var x = 0; x <= 5; x ++) {
		fn(x);
	}
};

exports["two per interval - wait before starting"] = function (test) {
	var startTime = new Date().getTime();
	
	var fn = rateLimit(2, 100, function (x) {
		if (x === 5) {
			test.equal(Math.round((new Date().getTime() - startTime) / 100), 8);
			test.done();
		}
	});
	
	setTimeout(function () {
		for (var x = 0; x <= 5; x ++) {
			fn(x);
		}
	}, 500);
};


exports["one per interval - random delays"] = function (test) {
	var startTime = new Date().getTime();
	var delays = [100, 1000, 500, 600, 700];
	
	var fn = rateLimit(1, 100, function (delay) {
		if (delay === 1000) {
			test.equal(Math.round((new Date().getTime() - startTime) / 100), 10);
			test.done();
		}
	});
	
	delays.forEach(function (delay) {
		setTimeout(function () {
				fn(delay);
		}, delay );
	})
};

exports["50 per interval - 1000 records"] = function (test) {
	var startTime = new Date().getTime();
	var records = [];
	var result = [];
	
	for (var x = 0; x < 1000; x++) {
		records.push(x);
	}
	
	var fn = rateLimit(50, 100, function (val) {
		result.push(val);
		
		if (val === 999) {
			test.equal(Math.round((new Date().getTime() - startTime) / 100), 20);
			test.deepEqual(records, result);
			test.done();
		}
	});
	
	records.forEach(function (val) {
		fn(val);
	})
};