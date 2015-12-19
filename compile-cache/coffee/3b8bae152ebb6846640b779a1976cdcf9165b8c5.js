(function() {
  var ErrorView, File, UnstagedFile, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  File = require('./file');

  git = require('../../git');

  ErrorView = require('../../views/error-view');

  module.exports = UnstagedFile = (function(_super) {
    __extends(UnstagedFile, _super);

    function UnstagedFile() {
      this.getMode = __bind(this.getMode, this);
      this.loadDiff = __bind(this.loadDiff, this);
      this.kill = __bind(this.kill, this);
      this.unstage = __bind(this.unstage, this);
      return UnstagedFile.__super__.constructor.apply(this, arguments);
    }

    UnstagedFile.prototype.sortValue = 1;

    UnstagedFile.prototype.unstage = function() {
      return git.unstage(this.path()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    UnstagedFile.prototype.kill = function() {
      return atom.confirm({
        message: "Discard unstaged changes to \"" + (this.path()) + "\"?",
        buttons: {
          'Discard': this.checkout,
          'Cancel': function() {}
        }
      });
    };

    UnstagedFile.prototype.loadDiff = function() {
      if (this.getMode() === 'D') {
        return;
      }
      return git.getDiff(this.path()).then((function(_this) {
        return function(diff) {
          return _this.setDiff(diff);
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    UnstagedFile.prototype.getMode = function() {
      return this.get('modeWorkingTree');
    };

    UnstagedFile.prototype.isUnstaged = function() {
      return true;
    };

    return UnstagedFile;

  })(File);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9maWxlcy91bnN0YWdlZC1maWxlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrQ0FBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUEsR0FBWSxPQUFBLENBQVEsUUFBUixDQUFaLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FEWixDQUFBOztBQUFBLEVBRUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSx3QkFBUixDQUZaLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBR0osbUNBQUEsQ0FBQTs7Ozs7Ozs7S0FBQTs7QUFBQSwyQkFBQSxTQUFBLEdBQVcsQ0FBWCxDQUFBOztBQUFBLDJCQUVBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxHQUFHLENBQUMsT0FBSixDQUFZLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FBWixDQUNBLENBQUMsSUFERCxDQUNNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUROLENBRUEsQ0FBQyxPQUFELENBRkEsQ0FFTyxTQUFDLEtBQUQsR0FBQTtlQUFlLElBQUEsU0FBQSxDQUFVLEtBQVYsRUFBZjtNQUFBLENBRlAsRUFETztJQUFBLENBRlQsQ0FBQTs7QUFBQSwyQkFPQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osSUFBSSxDQUFDLE9BQUwsQ0FDRTtBQUFBLFFBQUEsT0FBQSxFQUFVLGdDQUFBLEdBQStCLENBQUMsSUFBQyxDQUFBLElBQUQsQ0FBQSxDQUFELENBQS9CLEdBQXdDLEtBQWxEO0FBQUEsUUFDQSxPQUFBLEVBQ0U7QUFBQSxVQUFBLFNBQUEsRUFBVyxJQUFDLENBQUEsUUFBWjtBQUFBLFVBQ0EsUUFBQSxFQUFVLFNBQUEsR0FBQSxDQURWO1NBRkY7T0FERixFQURJO0lBQUEsQ0FQTixDQUFBOztBQUFBLDJCQWNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQVUsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFBLEtBQWMsR0FBeEI7QUFBQSxjQUFBLENBQUE7T0FBQTthQUNBLEdBQUcsQ0FBQyxPQUFKLENBQVksSUFBQyxDQUFBLElBQUQsQ0FBQSxDQUFaLENBQ0EsQ0FBQyxJQURELENBQ00sQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxHQUFBO2lCQUFVLEtBQUMsQ0FBQSxPQUFELENBQVMsSUFBVCxFQUFWO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FETixDQUVBLENBQUMsT0FBRCxDQUZBLENBRU8sU0FBQyxLQUFELEdBQUE7ZUFBZSxJQUFBLFNBQUEsQ0FBVSxLQUFWLEVBQWY7TUFBQSxDQUZQLEVBRlE7SUFBQSxDQWRWLENBQUE7O0FBQUEsMkJBb0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsR0FBRCxDQUFLLGlCQUFMLEVBRE87SUFBQSxDQXBCVCxDQUFBOztBQUFBLDJCQXVCQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQUcsS0FBSDtJQUFBLENBdkJaLENBQUE7O3dCQUFBOztLQUh5QixLQUwzQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/files/unstaged-file.coffee
