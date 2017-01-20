# Array Autosort
Automatically sorted arrays.

Automatic ascending, descending or custom sorting of arrays. After enabling autosort, adding new entries to the array will automatically sort the array.

**Note**: the Array prototype is modified to enable the autosorting functionality. If you do not want to do this then this package is not for you.
The following methods are mutated:

* Array.prototype.copyWithin
* Array.prototype.push
* Array.prototype.splice
* Array.prototype.unshift
* Array.prototype.reverse


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

Importing the package will automatically add the autosort array prototype method and all subsequently created arrays can use it:
```javascript
// common js
require('array-autosort');

// es6 modules
import 'array-autosort';
```

## Examples
```javascript
// sort ascending
var arr = [10,5,1].autosort(); // [1,5,10]
arr.push(6); // [1,5,6,10]
arr.unshift(3); // [1,3,5,6,10]

// false is also an alias for ascending sort
[3,2,1].autosort(false); // [1,2,3]

// sort descending
var arr = [1,2,3].autosort(true); // [3,2,1]
arr.push(10); // [10,3,2,1]

// custom sorter
var sorter = function(a,b) {
  var aId = a.id;
  var bId = b.id;
  return aId === bId ? 0 : (aId < bId ? -1 : 1);
}
var arr = [{id:10},{id:4},{id:20}].autosort(sorter); // [{id:4},{id:10},{id:20}]
arr.push({id:13}); // [{id:4},{id:10},{id:13},{id:20}]

// array.reverse will also reverse the autosorter
var arr = [10,5,1].autosort(); // [1,5,10]
arr.push(3); // [1,3,5,10]
arr.reverse(); // [10,5,3,1]
arr.push(8); // [10,8,5,3,1]

// disable autosort
var arr = [10,5,1].autosort(); // [1,5,10]
arr.autosort(null);
arr.push(3); // [1,5,10,3]
```