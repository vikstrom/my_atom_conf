(function() {
  var Commit, CurrentBranch, ErrorView, LocalBranch, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../../git');

  LocalBranch = require('./local-branch');

  Commit = require('../commits').Commit;

  ErrorView = require('../../views/error-view');

  CurrentBranch = (function(_super) {
    __extends(CurrentBranch, _super);

    function CurrentBranch() {
      this.reload = __bind(this.reload, this);
      return CurrentBranch.__super__.constructor.apply(this, arguments);
    }

    CurrentBranch.prototype.initialize = function(branchExisting) {
      if (branchExisting) {
        return this.reload();
      }
    };

    CurrentBranch.prototype.reload = function(_arg) {
      var silent;
      silent = (_arg != null ? _arg : {}).silent;
      return git.revParse('HEAD', {
        'abbrev-ref': true
      }).then((function(_this) {
        return function(name) {
          _this.name = name;
          return git.getCommit('HEAD').then(function(gitCommit) {
            _this.commit = new Commit(gitCommit);
            if (!silent) {
              _this.trigger('repaint');
              if (atom.config.get('atomatigit.display_commit_comparisons')) {
                return _this.compareCommits();
              }
            }
          });
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    CurrentBranch.prototype.head = function() {
      return 'HEAD';
    };

    CurrentBranch.prototype["delete"] = function() {};

    CurrentBranch.prototype.checkout = function() {};

    return CurrentBranch;

  })(LocalBranch);

  module.exports = CurrentBranch;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9icmFuY2hlcy9jdXJyZW50LWJyYW5jaC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0RBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQWMsT0FBQSxDQUFRLFdBQVIsQ0FBZCxDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQURkLENBQUE7O0FBQUEsRUFFQyxTQUFhLE9BQUEsQ0FBUSxZQUFSLEVBQWIsTUFGRCxDQUFBOztBQUFBLEVBR0EsU0FBQSxHQUFjLE9BQUEsQ0FBUSx3QkFBUixDQUhkLENBQUE7O0FBQUEsRUFNTTtBQUlKLG9DQUFBLENBQUE7Ozs7O0tBQUE7O0FBQUEsNEJBQUEsVUFBQSxHQUFZLFNBQUMsY0FBRCxHQUFBO0FBQ1YsTUFBQSxJQUFhLGNBQWI7ZUFBQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBQUE7T0FEVTtJQUFBLENBQVosQ0FBQTs7QUFBQSw0QkFJQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7QUFDTixVQUFBLE1BQUE7QUFBQSxNQURRLHlCQUFELE9BQVMsSUFBUixNQUNSLENBQUE7YUFBQSxHQUFHLENBQUMsUUFBSixDQUFhLE1BQWIsRUFBcUI7QUFBQSxRQUFBLFlBQUEsRUFBYyxJQUFkO09BQXJCLENBQXdDLENBQUMsSUFBekMsQ0FBOEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUUsSUFBRixHQUFBO0FBQzVDLFVBRDZDLEtBQUMsQ0FBQSxPQUFBLElBQzlDLENBQUE7aUJBQUEsR0FBRyxDQUFDLFNBQUosQ0FBYyxNQUFkLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsU0FBQyxTQUFELEdBQUE7QUFDekIsWUFBQSxLQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsTUFBQSxDQUFPLFNBQVAsQ0FBZCxDQUFBO0FBQ0EsWUFBQSxJQUFHLENBQUEsTUFBSDtBQUNFLGNBQUEsS0FBQyxDQUFBLE9BQUQsQ0FBUyxTQUFULENBQUEsQ0FBQTtBQUNBLGNBQUEsSUFBcUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHVDQUFoQixDQUFyQjt1QkFBQSxLQUFDLENBQUEsY0FBRCxDQUFBLEVBQUE7ZUFGRjthQUZ5QjtVQUFBLENBQTNCLEVBRDRDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUMsQ0FNQSxDQUFDLE9BQUQsQ0FOQSxDQU1PLFNBQUMsS0FBRCxHQUFBO2VBQWUsSUFBQSxTQUFBLENBQVUsS0FBVixFQUFmO01BQUEsQ0FOUCxFQURNO0lBQUEsQ0FKUixDQUFBOztBQUFBLDRCQWdCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osT0FESTtJQUFBLENBaEJOLENBQUE7O0FBQUEsNEJBb0JBLFNBQUEsR0FBUSxTQUFBLEdBQUEsQ0FwQlIsQ0FBQTs7QUFBQSw0QkF3QkEsUUFBQSxHQUFVLFNBQUEsR0FBQSxDQXhCVixDQUFBOzt5QkFBQTs7S0FKMEIsWUFONUIsQ0FBQTs7QUFBQSxFQW9DQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQXBDakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/branches/current-branch.coffee
