const test = require('ava');
require('../index');

test('it should return the sorted array instance', t => {
  const actual = [1,2,3];
  const expected = actual.autosort();
  t.is(expected, actual);
});

test('it should sort ascending when no parameter is provided', t => {
  const actual = [3,2,1].autosort();
  const expected = [1,2,3];
  t.deepEqual(expected, actual);
});

test('it should sort ascending when the sorter parameter is false', t => {
  const actual = [3,2,1].autosort(false);
  const expected = [1,2,3];
  t.deepEqual(expected, actual);
});

test('it should sort descending when the sorter parameter is true', t => {
  const actual = [1,2,3].autosort(true);
  const expected = [3,2,1];
  t.deepEqual(expected, actual);
});

test('it should use a custom sort function when the sorter parameter is a function', t => {
  const sorter = (a, b) => a.id === b.id ? 0 : a.id < b.id ? -1 : 1;
  const actual = [
    { id:1 },
    { id:20 },
    { id:8 },
    { id:15 },
  ].autosort(sorter);
  const expected = [
    { id:1 },
    { id:8 },
    { id:15 },
    { id:20 },
  ];
  t.deepEqual(expected, actual);
});

test('it should reset autosorting when the sorter parameter is null', t => {
  const actual = [10,5,1].autosort();
  t.deepEqual([1,5,10], actual);
  actual.autosort(null);
  actual.push(3);
  t.deepEqual([1,5,10,3], actual);
});

test('Array.prototype.reverse should also reverse the sorter function', t => {
  const actual = [1,10,5].autosort();
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
  const actual = [1,2,3,4,5,6].autosort();
  const expected = [1,1,2,2,3,3];
  const actualResponse = actual.copyWithin(3);
  const expectedResonse = actual;
  t.deepEqual(expected, actual);
  t.is(expectedResonse, actualResponse);
});

test('Array.prototype.push should autosort', t => {
  const actual = [1,5,10].autosort();
  const expected = [1,5,6,10];
  const actualResponse = actual.push(6);
  const expectedResponse = 4;
  t.deepEqual(expected, actual);
  t.is(expectedResponse, actualResponse);
});

test('Array.prototype.splice should autosort', t => {
  const actual = [1,2,3,4,5,6].autosort();
  const expected = [1,1,2,2,3,3];
  const actualResponse = actual.splice(3, 3, 1, 2, 3);
  const expectedResponse = [4,5,6];
  t.deepEqual(expected, actual);
  t.deepEqual(actualResponse, expectedResponse);
});

test('Array.prototype.unshift should autosort', t => {
  const actual = [1,2,3].autosort();
  const expected = [1,2,3,4];
  const actualResponse = actual.unshift(4);
  const expectedResponse = 4;
  t.deepEqual(expected, actual);
  t.is(expectedResponse, actualResponse);
});