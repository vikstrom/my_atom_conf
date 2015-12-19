(function() {
  var Commit, CommitList, ErrorView, List, git, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  git = require('../../git');

  List = require('../list');

  Commit = require('./commit');

  ErrorView = require('../../views/error-view');

  CommitList = (function(_super) {
    __extends(CommitList, _super);

    function CommitList() {
      this.reload = __bind(this.reload, this);
      return CommitList.__super__.constructor.apply(this, arguments);
    }

    CommitList.prototype.model = Commit;

    CommitList.prototype.reload = function(branch, options) {
      var _ref, _ref1, _ref2;
      this.branch = branch;
      if (options == null) {
        options = {};
      }
      if (_.isPlainObject(this.branch)) {
        _ref = [null, this.branch], this.branch = _ref[0], options = _ref[1];
      }
      return git.log((_ref1 = (_ref2 = this.branch) != null ? _ref2.head() : void 0) != null ? _ref1 : 'HEAD').then((function(_this) {
        return function(commits) {
          _this.reset(_.map(commits, function(commit) {
            return new Commit(commit);
          }));
          if (!options.silent) {
            _this.trigger('repaint');
          }
          return _this.select(_this.selectedIndex);
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    return CommitList;

  })(List);

  module.exports = CommitList;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9jb21taXRzL2NvbW1pdC1saXN0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwyQ0FBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQUFKLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQVMsT0FBQSxDQUFRLFdBQVIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFTLE9BQUEsQ0FBUSxTQUFSLENBRlQsQ0FBQTs7QUFBQSxFQUdBLE1BQUEsR0FBUyxPQUFBLENBQVEsVUFBUixDQUhULENBQUE7O0FBQUEsRUFJQSxTQUFBLEdBQVksT0FBQSxDQUFRLHdCQUFSLENBSlosQ0FBQTs7QUFBQSxFQU1NO0FBQ0osaUNBQUEsQ0FBQTs7Ozs7S0FBQTs7QUFBQSx5QkFBQSxLQUFBLEdBQU8sTUFBUCxDQUFBOztBQUFBLHlCQUtBLE1BQUEsR0FBUSxTQUFFLE1BQUYsRUFBVSxPQUFWLEdBQUE7QUFDTixVQUFBLGtCQUFBO0FBQUEsTUFETyxJQUFDLENBQUEsU0FBQSxNQUNSLENBQUE7O1FBRGdCLFVBQVE7T0FDeEI7QUFBQSxNQUFBLElBQXdDLENBQUMsQ0FBQyxhQUFGLENBQWdCLElBQUMsQ0FBQSxNQUFqQixDQUF4QztBQUFBLFFBQUEsT0FBcUIsQ0FBQyxJQUFELEVBQU8sSUFBQyxDQUFBLE1BQVIsQ0FBckIsRUFBQyxJQUFDLENBQUEsZ0JBQUYsRUFBVSxpQkFBVixDQUFBO09BQUE7YUFDQSxHQUFHLENBQUMsR0FBSixtRkFBMEIsTUFBMUIsQ0FDQSxDQUFDLElBREQsQ0FDTSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxPQUFELEdBQUE7QUFDSixVQUFBLEtBQUMsQ0FBQSxLQUFELENBQU8sQ0FBQyxDQUFDLEdBQUYsQ0FBTSxPQUFOLEVBQWUsU0FBQyxNQUFELEdBQUE7bUJBQWdCLElBQUEsTUFBQSxDQUFPLE1BQVAsRUFBaEI7VUFBQSxDQUFmLENBQVAsQ0FBQSxDQUFBO0FBQ0EsVUFBQSxJQUFBLENBQUEsT0FBa0MsQ0FBQyxNQUFuQztBQUFBLFlBQUEsS0FBQyxDQUFBLE9BQUQsQ0FBUyxTQUFULENBQUEsQ0FBQTtXQURBO2lCQUVBLEtBQUMsQ0FBQSxNQUFELENBQVEsS0FBQyxDQUFBLGFBQVQsRUFISTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRE4sQ0FLQSxDQUFDLE9BQUQsQ0FMQSxDQUtPLFNBQUMsS0FBRCxHQUFBO2VBQWUsSUFBQSxTQUFBLENBQVUsS0FBVixFQUFmO01BQUEsQ0FMUCxFQUZNO0lBQUEsQ0FMUixDQUFBOztzQkFBQTs7S0FEdUIsS0FOekIsQ0FBQTs7QUFBQSxFQXFCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixVQXJCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/commits/commit-list.coffee
