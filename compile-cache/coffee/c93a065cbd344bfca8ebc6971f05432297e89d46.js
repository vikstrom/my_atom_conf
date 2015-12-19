(function() {
  var Branch, ErrorView, LocalBranch, OutputView, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../../git');

  Branch = require('./branch');

  ErrorView = require('../../views/error-view');

  OutputView = require('../../views/output-view');

  LocalBranch = (function(_super) {
    __extends(LocalBranch, _super);

    function LocalBranch() {
      this.push = __bind(this.push, this);
      this.checkout = __bind(this.checkout, this);
      this["delete"] = __bind(this["delete"], this);
      this.unpushed = __bind(this.unpushed, this);
      this.getTrackingBranch = __bind(this.getTrackingBranch, this);
      this.compareCommits = __bind(this.compareCommits, this);
      return LocalBranch.__super__.constructor.apply(this, arguments);
    }

    LocalBranch.prototype.remote = false;

    LocalBranch.prototype.local = true;

    LocalBranch.prototype.initialize = function() {
      if (atom.config.get('atomatigit.display_commit_comparisons')) {
        return this.compareCommits();
      }
    };

    LocalBranch.prototype.compareCommits = function() {
      var comparison, name;
      this.comparison = comparison = '';
      name = this.localName().trim();
      return this.getTrackingBranch(name).then((function(_this) {
        return function() {
          var tracking_branch;
          if (_this.tracking_branch === '') {
            _this.comparison = 'No upstream configured';
            return _this.trigger('comparison-loaded');
          }
          tracking_branch = _this.tracking_branch;
          return git.cmd("rev-list --count " + name + "@{u}.." + name).then(function(output) {
            var number;
            number = +output.trim();
            if (number !== 0) {
              comparison = _this.getComparisonString(number, 'ahead of', tracking_branch);
            }
            return git.cmd("rev-list --count " + name + ".." + name + "@{u}").then(function(output) {
              number = +output.trim();
              if (number !== 0) {
                if (comparison !== '') {
                  comparison += '<br>';
                }
                comparison += _this.getComparisonString(number, 'behind', tracking_branch);
              } else if (comparison === '') {
                comparison = "Up-to-date with " + tracking_branch;
              }
              _this.comparison = comparison;
              return _this.trigger('comparison-loaded');
            });
          });
        };
      })(this));
    };

    LocalBranch.prototype.getTrackingBranch = function(name) {
      this.tracking_branch = '';
      return git.cmd("config branch." + name + ".remote").then((function(_this) {
        return function(output) {
          var remote;
          output = output.trim();
          remote = "" + output + "/";
          return git.cmd("config branch." + name + ".merge").then(function(output) {
            return _this.tracking_branch = remote + output.trim().replace('refs/heads/', '');
          });
        };
      })(this))["catch"](function() {
        return '';
      });
    };

    LocalBranch.prototype.getComparisonString = function(number, ahead_of_or_behind, tracking_branch) {
      var str;
      str = "" + number + " commit";
      if (number !== 1) {
        str += "s";
      }
      str += " " + ahead_of_or_behind + " ";
      return str += tracking_branch;
    };

    LocalBranch.prototype.unpushed = function() {
      return this.get('unpushed');
    };

    LocalBranch.prototype["delete"] = function() {
      return git.cmd('branch', {
        D: true
      }, this.getName()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    LocalBranch.prototype.remoteName = function() {
      return '';
    };

    LocalBranch.prototype.checkout = function(callback) {
      return git.checkout(this.localName()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    LocalBranch.prototype.push = function(remote) {
      if (remote == null) {
        remote = 'origin';
      }
      return git.cmd('push', [remote, this.getName()]).then((function(_this) {
        return function() {
          _this.trigger('update');
          return new OutputView('Pushing to remote repository successful');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    return LocalBranch;

  })(Branch);

  module.exports = LocalBranch;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9icmFuY2hlcy9sb2NhbC1icmFuY2guY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtDQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFhLE9BQUEsQ0FBUSxXQUFSLENBQWIsQ0FBQTs7QUFBQSxFQUNBLE1BQUEsR0FBYSxPQUFBLENBQVEsVUFBUixDQURiLENBQUE7O0FBQUEsRUFFQSxTQUFBLEdBQWEsT0FBQSxDQUFRLHdCQUFSLENBRmIsQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxPQUFBLENBQVEseUJBQVIsQ0FIYixDQUFBOztBQUFBLEVBTU07QUFFSixrQ0FBQSxDQUFBOzs7Ozs7Ozs7O0tBQUE7O0FBQUEsMEJBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFBQSwwQkFDQSxLQUFBLEdBQU8sSUFEUCxDQUFBOztBQUFBLDBCQUlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQXFCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1Q0FBaEIsQ0FBckI7ZUFBQSxJQUFDLENBQUEsY0FBRCxDQUFBLEVBQUE7T0FEVTtJQUFBLENBSlosQ0FBQTs7QUFBQSwwQkFVQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNkLFVBQUEsZ0JBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxVQUFELEdBQWMsVUFBQSxHQUFhLEVBQTNCLENBQUE7QUFBQSxNQUNBLElBQUEsR0FBTyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQVksQ0FBQyxJQUFiLENBQUEsQ0FEUCxDQUFBO2FBRUEsSUFBQyxDQUFBLGlCQUFELENBQW1CLElBQW5CLENBQXdCLENBQUMsSUFBekIsQ0FBOEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtl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

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/branches/local-branch.coffee
