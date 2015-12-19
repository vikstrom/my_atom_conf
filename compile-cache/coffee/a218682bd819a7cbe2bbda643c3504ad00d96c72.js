(function() {
  var ErrorView, File, StagedFile, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../../git');

  File = require('./file');

  ErrorView = require('../../views/error-view');

  StagedFile = (function(_super) {
    __extends(StagedFile, _super);

    function StagedFile() {
      this.getMode = __bind(this.getMode, this);
      this.loadDiff = __bind(this.loadDiff, this);
      this.discardAllChanges = __bind(this.discardAllChanges, this);
      this.kill = __bind(this.kill, this);
      this.unstage = __bind(this.unstage, this);
      return StagedFile.__super__.constructor.apply(this, arguments);
    }

    StagedFile.prototype.sortValue = 2;

    StagedFile.prototype.stage = function() {};

    StagedFile.prototype.unstage = function() {
      return git.unstage(this.path()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    StagedFile.prototype.kill = function() {
      return atom.confirm({
        message: "Discard all changes to \"" + (this.path()) + "\"?",
        buttons: {
          'Discard': this.discardAllChanges,
          'Cancel': function() {}
        }
      });
    };

    StagedFile.prototype.discardAllChanges = function() {
      this.unstage();
      return this.checkout();
    };

    StagedFile.prototype.loadDiff = function() {
      if (this.getMode() === 'D') {
        return;
      }
      return git.getDiff(this.path(), {
        staged: true
      }).then((function(_this) {
        return function(diff) {
          return _this.setDiff(diff);
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    StagedFile.prototype.getMode = function() {
      return this.get('modeIndex');
    };

    StagedFile.prototype.isStaged = function() {
      return true;
    };

    return StagedFile;

  })(File);

  module.exports = StagedFile;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9maWxlcy9zdGFnZWQtZmlsZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0NBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FBWixDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFZLE9BQUEsQ0FBUSxRQUFSLENBRFosQ0FBQTs7QUFBQSxFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsd0JBQVIsQ0FGWixDQUFBOztBQUFBLEVBSU07QUFHSixpQ0FBQSxDQUFBOzs7Ozs7Ozs7S0FBQTs7QUFBQSx5QkFBQSxTQUFBLEdBQVcsQ0FBWCxDQUFBOztBQUFBLHlCQUdBLEtBQUEsR0FBTyxTQUFBLEdBQUEsQ0FIUCxDQUFBOztBQUFBLHlCQU1BLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxHQUFHLENBQUMsT0FBSixDQUFZLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FBWixDQUNBLENBQUMsSUFERCxDQUNNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUROLENBRUEsQ0FBQyxPQUFELENBRkEsQ0FFTyxTQUFDLEtBQUQsR0FBQTtlQUFlLElBQUEsU0FBQSxDQUFVLEtBQVYsRUFBZjtNQUFBLENBRlAsRUFETztJQUFBLENBTlQsQ0FBQTs7QUFBQSx5QkFhQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osSUFBSSxDQUFDLE9BQUwsQ0FDRTtBQUFBLFFBQUEsT0FBQSxFQUFVLDJCQUFBLEdBQTBCLENBQUMsSUFBQyxDQUFBLElBQUQsQ0FBQSxDQUFELENBQTFCLEdBQW1DLEtBQTdDO0FBQUEsUUFDQSxPQUFBLEVBQ0U7QUFBQSxVQUFBLFNBQUEsRUFBVyxJQUFDLENBQUEsaUJBQVo7QUFBQSxVQUNBLFFBQUEsRUFBVSxTQUFBLEdBQUEsQ0FEVjtTQUZGO09BREYsRUFESTtJQUFBLENBYk4sQ0FBQTs7QUFBQSx5QkFxQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO0FBQ2pCLE1BQUEsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsUUFBRCxDQUFBLEVBRmlCO0lBQUEsQ0FyQm5CLENBQUE7O0FBQUEseUJBMEJBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQVUsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFBLEtBQWMsR0FBeEI7QUFBQSxjQUFBLENBQUE7T0FBQTthQUNBLEdBQUcsQ0FBQyxPQUFKLENBQVksSUFBQyxDQUFBLElBQUQsQ0FBQSxDQUFaLEVBQXFCO0FBQUEsUUFBQyxNQUFBLEVBQVEsSUFBVDtPQUFyQixDQUNBLENBQUMsSUFERCxDQUNNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtpQkFBVSxLQUFDLENBQUEsT0FBRCxDQUFTLElBQVQsRUFBVjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRE4sQ0FFQSxDQUFDLE9BQUQsQ0FGQSxDQUVPLFNBQUMsS0FBRCxHQUFBO2VBQWUsSUFBQSxTQUFBLENBQVUsS0FBVixFQUFmO01BQUEsQ0FGUCxFQUZRO0lBQUEsQ0ExQlYsQ0FBQTs7QUFBQSx5QkFnQ0EsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxHQUFELENBQUssV0FBTCxFQURPO0lBQUEsQ0FoQ1QsQ0FBQTs7QUFBQSx5QkFtQ0EsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQW5DVixDQUFBOztzQkFBQTs7S0FIdUIsS0FKekIsQ0FBQTs7QUFBQSxFQTRDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixVQTVDakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/files/staged-file.coffee
