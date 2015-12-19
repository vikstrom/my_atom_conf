(function() {
  var BranchList, ErrorView, List, LocalBranch, RemoteBranch, git, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  git = require('../../git');

  List = require('../list');

  LocalBranch = require('./local-branch');

  RemoteBranch = require('./remote-branch');

  ErrorView = require('../../views/error-view');

  BranchList = (function(_super) {
    __extends(BranchList, _super);

    function BranchList() {
      this.remote = __bind(this.remote, this);
      this.local = __bind(this.local, this);
      this.reload = __bind(this.reload, this);
      return BranchList.__super__.constructor.apply(this, arguments);
    }

    BranchList.prototype.reload = function(_arg) {
      var silent;
      silent = (_arg != null ? _arg : {}).silent;
      return git.branches().then((function(_this) {
        return function(branches) {
          _this.reset();
          _.each(branches, function(branch) {
            return _this.add(new LocalBranch(branch));
          });
          return git.remoteBranches().then(function(branches) {
            _.each(branches, function(branch) {
              return _this.add(new RemoteBranch(branch));
            });
            _this.select(_this.selectedIndex);
            if (!silent) {
              return _this.trigger('repaint');
            }
          });
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    BranchList.prototype.local = function() {
      return this.filter(function(branch) {
        return branch.local;
      });
    };

    BranchList.prototype.remote = function() {
      return this.filter(function(branch) {
        return branch.remote;
      });
    };

    return BranchList;

  })(List);

  module.exports = BranchList;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9icmFuY2hlcy9icmFuY2gtbGlzdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOERBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FBSixDQUFBOztBQUFBLEVBRUEsR0FBQSxHQUFlLE9BQUEsQ0FBUSxXQUFSLENBRmYsQ0FBQTs7QUFBQSxFQUdBLElBQUEsR0FBZSxPQUFBLENBQVEsU0FBUixDQUhmLENBQUE7O0FBQUEsRUFJQSxXQUFBLEdBQWUsT0FBQSxDQUFRLGdCQUFSLENBSmYsQ0FBQTs7QUFBQSxFQUtBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FMZixDQUFBOztBQUFBLEVBTUEsU0FBQSxHQUFlLE9BQUEsQ0FBUSx3QkFBUixDQU5mLENBQUE7O0FBQUEsRUFTTTtBQUVKLGlDQUFBLENBQUE7Ozs7Ozs7S0FBQTs7QUFBQSx5QkFBQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7QUFDTixVQUFBLE1BQUE7QUFBQSxNQURRLHlCQUFELE9BQVMsSUFBUixNQUNSLENBQUE7YUFBQSxHQUFHLENBQUMsUUFBSixDQUFBLENBQWMsQ0FBQyxJQUFmLENBQW9CLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLFFBQUQsR0FBQTtBQUNsQixVQUFBLEtBQUMsQ0FBQSxLQUFELENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFDQSxDQUFDLENBQUMsSUFBRixDQUFPLFFBQVAsRUFBaUIsU0FBQyxNQUFELEdBQUE7bUJBQVksS0FBQyxDQUFBLEdBQUQsQ0FBUyxJQUFBLFdBQUEsQ0FBWSxNQUFaLENBQVQsRUFBWjtVQUFBLENBQWpCLENBREEsQ0FBQTtpQkFFQSxHQUFHLENBQUMsY0FBSixDQUFBLENBQW9CLENBQUMsSUFBckIsQ0FBMEIsU0FBQyxRQUFELEdBQUE7QUFDeEIsWUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLFFBQVAsRUFBaUIsU0FBQyxNQUFELEdBQUE7cUJBQVksS0FBQyxDQUFBLEdBQUQsQ0FBUyxJQUFBLFlBQUEsQ0FBYSxNQUFiLENBQVQsRUFBWjtZQUFBLENBQWpCLENBQUEsQ0FBQTtBQUFBLFlBQ0EsS0FBQyxDQUFBLE1BQUQsQ0FBUSxLQUFDLENBQUEsYUFBVCxDQURBLENBQUE7QUFFQSxZQUFBLElBQUEsQ0FBQSxNQUFBO3FCQUFBLEtBQUMsQ0FBQSxPQUFELENBQVMsU0FBVCxFQUFBO2FBSHdCO1VBQUEsQ0FBMUIsRUFIa0I7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwQixDQU9BLENBQUMsT0FBRCxDQVBBLENBT08sU0FBQyxLQUFELEdBQUE7ZUFBZSxJQUFBLFNBQUEsQ0FBVSxLQUFWLEVBQWY7TUFBQSxDQVBQLEVBRE07SUFBQSxDQUFSLENBQUE7O0FBQUEseUJBYUEsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUNMLElBQUMsQ0FBQSxNQUFELENBQVEsU0FBQyxNQUFELEdBQUE7ZUFBWSxNQUFNLENBQUMsTUFBbkI7TUFBQSxDQUFSLEVBREs7SUFBQSxDQWJQLENBQUE7O0FBQUEseUJBbUJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7YUFDTixJQUFDLENBQUEsTUFBRCxDQUFRLFNBQUMsTUFBRCxHQUFBO2VBQVksTUFBTSxDQUFDLE9BQW5CO01BQUEsQ0FBUixFQURNO0lBQUEsQ0FuQlIsQ0FBQTs7c0JBQUE7O0tBRnVCLEtBVHpCLENBQUE7O0FBQUEsRUFpQ0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUFqQ2pCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/branches/branch-list.coffee
