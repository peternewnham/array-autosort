if (!Array.prototype.autosort) {

  // Default sorters
  var defaultAscSort = function(a, b) {
    return a === b ? 0 : (a < b) ? -1 : 1;
  };

  var defaultDescSort = function(a, b) {
    return a === b ? 0 : (a < b) ? 1 : -1;
  };

  var reverseSort = function(sorter) {
    return function(a, b) {
      return sorter(a, b) * -1;
    };
  };

  // Store original array prototype methods
  var originalMutatingMethods = {
    copyWithin: Array.prototype.copyWithin,
    push: Array.prototype.push,
    splice: Array.prototype.splice,
    unshift: Array.prototype.unshift
  };
  var originalReverse = Array.prototype.reverse;

  // Create the autosort method
  Array.prototype.autosort = function(sorter) {

    var _this = this;

    // Disable autosorting and revert original prototype methods when sorter param is null
    if (sorter === null) {

      Object.keys(originalMutatingMethods).forEach(function(method) {
        _this[method] = originalMutatingMethods[method];
      });
      this.reverse = originalReverse;

    }
    // Enable autosorting
    else {

      // Set the default sorter
      if (typeof sorter !== 'function') {
        if (sorter === true) {
          sorter = defaultDescSort;
        }
        else {
          sorter = defaultAscSort;
        }
      }
      var reverseSorter = reverseSort(sorter);

      // override mutating methods
      Object.keys(originalMutatingMethods).forEach(function (method) {

        if (_this[method]) {

          _this[method] = function () {

            var response = originalMutatingMethods[method].apply(_this, arguments);

            _this.sort(sorter);

            return response;

          };

        }

      });

      // override reverse to also reverse the sorter
      this.reverse = function () {

        var nextSorter = reverseSorter;
        reverseSorter = sorter;
        sorter = nextSorter;

        return _this.sort(sorter);

      };

      this.sort(sorter);

    }

    return this;

  }

}
