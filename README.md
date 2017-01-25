# Array Autosort
Automatically sorted arrays.

Automatic ascending, descending or custom sorting of arrays. After enabling autosort, adding new entries to the array will automatically sort the array.

Supported Environments: Chrome, Firefox, Edge and NodeJS 6+

**Note**: this feature relies on the [Proxy](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object so is not suitable for any environment that does not have it implemented.


## Installation
npm
```bash
npm install array-autosort
```
yarn
```bash
yarn add array-autosort
```

## Usage

```javascript
// common js
const autosort = require('array-autosort');
const arr = autosort([1,2,3]);

// es6 modules
import autosort from 'array-autosort';
const arr = autosort([1,2,3]);
```

## API

### autosort(arr, [sorter])

Returns an array.

#### arr

Type: `Array`

Array to autosort.

#### sorter

Type: `Function` or `Boolean`

If `undefined` or `false` the sorter will be an ascending sort (default behaviour)
If `true` the sorter will be a descending sort
If `Function` it will be used as a custom sort function

### arr.cancelAutosort()

Stops autosorting the array and returns it.


## Examples
```javascript
// sort ascending
var arr = autosort([10,5,1]); // [1,5,10]
arr.push(6); // [1,5,6,10]
arr.unshift(3); // [1,3,5,6,10]

// false is also an alias for ascending sort
autosort([3,2,1], false); // [1,2,3]

// sort descending
var arr = autosort([1,2,3], true); // [3,2,1]
arr.push(10); // [10,3,2,1]

// custom sorter
var sorter = function(a,b) {
  var aId = a.id;
  var bId = b.id;
  return aId === bId ? 0 : (aId < bId ? -1 : 1);
}
var arr = autosort([{id:10},{id:4},{id:20}], sorter); // [{id:4},{id:10},{id:20}]
arr.push({id:13}); // [{id:4},{id:10},{id:13},{id:20}]

// array.reverse will also reverse the autosorter
var arr = autosort([10,5,1]); // [1,5,10]
arr.push(3); // [1,3,5,10]
arr.reverse(); // [10,5,3,1]
arr.push(8); // [10,8,5,3,1]

// cancel autosort
var arr = autosort([10,5,1]); // [1,5,10]
arr = arr.cancelAutosort();
arr.push(3); // [1,5,10,3]
```