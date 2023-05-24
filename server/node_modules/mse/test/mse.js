var mse = require('../');
var test = require('tap').test;

var original_1x1 = [128];
var noisy_1x1    = [136];
var original_2x2 = [0, 128, 192, 255];
var noisy_2x2    = [0, 128, 179, 255];

test('1x1 identical', function (t) {
    t.plan(1);

    var result = mse(original_1x1, original_1x1);
    t.equal(result, 0);
});

test('1x1 different', function (t) {
    t.plan(1);

    var result = mse(original_1x1, noisy_1x1);
    t.equal(result, 64);
});

test('2x2 identical', function (t) {
    t.plan(1);

    var result = mse(original_2x2, original_2x2);
    t.equal(result, 0);
});

test('2x2 different', function (t) {
    t.plan(1);

    var result = mse(original_2x2, noisy_2x2);
    t.equal(result, 42.25);
});