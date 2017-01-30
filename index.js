// Default sorters
var ascSort = function(a, b) {
  return a === b ? 0 : (a < b) ? -1 : 1;
};
var descSort = function(a, b) {
  return a === b ? 0 : (a < b) ? 1 : -1;
};
var reverseSort = function(sorter) {
  return function(a, b) {
    return sorter(a, b) * -1;
  };
};
var getSorter = function(sorter) {
  if (typeof sorter !== 'function') {
    if (sorter === true) {
      return descSort;
    }
    else {
      return ascSort;
    }
  }
  return sorter;
};

module.exports = function(target, sorter) {

  target = target || [];

  // ensure the target is an array
  if (!Array.isArray(target)) {
    throw new TypeError('autosort must be passed an array');
  }

  var autoSortOnSet = true;

  // cache the sorters to use
  var currentSorter = getSorter(sorter);
  var reverseSorter = reverseSort(currentSorter);

  var proxy = Proxy.revocable(target, {
    set: function(target, index, value) {
      try {
        target[index] = value;
        // only autosort if required
        // this allows mutating methods to opt out of sorting until they have completed
        if (autoSortOnSet) {
          target.sort(currentSorter);
        }
        return true;
      }
      catch(e) {
        return false;
      }
    },
    get: function(target, key) {
      var original = target[key];
      // mutating methods should not autosort until after they have completed to prevent
      // side effects and increase efficiency
      if (['copyWithin', 'push', 'splice', 'unshift'].indexOf(key) >= 0) {
        return function() {
          autoSortOnSet = false;
          var response = original.apply(this, arguments);
          autoSortOnSet = true;
          target.sort(currentSorter);
          return response;
        };
      }
      // reversing the array should also reverse the sorter
      else if (key === 'reverse') {
        return function() {
          var nextSorter = reverseSorter;
          reverseSorter = currentSorter;
          currentSorter = nextSorter;
          return target.sort(currentSorter);
        }
      }
      else {
        return original;
      }

    }
  });

  // autosort by default
  target.sort(currentSorter);

  // cancel autosort
  proxy.proxy.cancelAutosort = function() {
    proxy.revoke();
    return target;
  };

  return proxy.proxy;

};
