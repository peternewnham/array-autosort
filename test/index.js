const test = require('ava');
var autosort = require('../index');

test('it should throw an error if the target is not an array', t => {
  const error = t.throws(() => {
    autosort({});
  }, TypeError);
  t.is(error.message, 'autosort must be passed an array');
});

test('it should default to an empty array when no arguments are passed', t => {
  const actual = autosort();
  const expected = [];
  t.deepEqual(expected, actual);
});

test('it should sort ascending when no parameter is provided', t => {
  const actual = autosort([3,2,1]);
  const expected = [1,2,3];
  t.deepEqual(expected, actual);
});

test('it should sort ascending when the sorter parameter is false', t => {
  const actual = autosort([3,2,1], false);
  const expected = [1,2,3];
  t.deepEqual(expected, actual);
});

test('it should sort descending when the sorter parameter is true', t => {
  const actual = autosort([1,2,3], true);
  const expected = [3,2,1];
  t.deepEqual(expected, actual);
});

test('it should use a custom sort function when the sorter parameter is a function', t => {
  const sorter = (a, b) => a.id === b.id ? 0 : a.id < b.id ? -1 : 1;
  const actual = autosort([
    { id:1 },
    { id:20 },
    { id:8 },
    { id:15 },
  ], sorter);
  const expected = [
    { id:1 },
    { id:8 },
    { id:15 },
    { id:20 },
  ];
  t.deepEqual(expected, actual);
});

test('it should stop autosorting when the cancelAutosort method is called', t => {
  const actual = autosort([10,5,1]);
  t.deepEqual([1,5,10], actual);
  const cancelled = actual.cancelAutosort();
  cancelled.push(3);
  t.deepEqual([1,5,10,3], cancelled);
});

test('it should output a standard JSON encoded array when autosorted', t => {
  const actual = autosort([10,5,1]);
  t.is('[1,5,10]', JSON.stringify(actual));
});

test('it should be considered an array when tested for type', t => {
  const actual = autosort([3,2,1]);
  t.is(true, Array.isArray(actual));
  t.is('[object Array]', toString.call(actual));
});

test('it should autosort when array index is set directly', t => {
  const actual = autosort([10,5,1]);
  t.deepEqual([1,5,10], actual);
  actual[1] = 20;
  t.deepEqual([1,10,20], actual);
});

test('Array.prototype.reverse should also reverse the sorter function', t => {
  const actual = autosort([1,10,5]);
  t.deepEqual([1,5,10], actual);
  actual.reverse();
  actual.push(6);
  const expected = [10,6,5,1];
  t.deepEqual(expected, actual);
  actual.reverse();
  actual.push(3);
  t.deepEqual([1,3,5,6,10], actual);
});

test('Array.prototype.copyWithin should autosort', t => {
  const actual = autosort([1,2,3,4,5,6]);
  const expected = [1,1,2,2,3,3];
  const actualResponse = actual.copyWithin(3);
  const expectedResonse = actual;
  t.deepEqual(expected, actual);
  t.is(expectedResonse, actualResponse);
});

test('Array.prototype.push should autosort', t => {
  const actual = autosort([1,5,10]);
  const expected = [1,5,6,10];
  const actualResponse = actual.push(6);
  const expectedResponse = 4;
  t.deepEqual(expected, actual);
  t.is(expectedResponse, actualResponse);
});

test('Array.prototype.splice should autosort', t => {
  const actual = autosort([1,2,3,4,5,6]);
  const expected = [1,1,2,2,3,3];
  const actualResponse = actual.splice(3, 3, 1, 2, 3);
  const expectedResponse = [4,5,6];
  t.deepEqual(expected, actual);
  t.deepEqual(actualResponse, expectedResponse);
});

test('Array.prototype.unshift should autosort', t => {
  const actual = autosort([1,2,3]);
  const expected = [1,2,3,4];
  const actualResponse = actual.unshift(4);
  const expectedResponse = 4;
  t.deepEqual(expected, actual);
  t.is(expectedResponse, actualResponse);
});