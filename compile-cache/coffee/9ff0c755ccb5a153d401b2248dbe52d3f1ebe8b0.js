(function() {
  var Branch, Commit, ErrorView, ListItem, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../../git');

  ListItem = require('../list-item');

  Commit = require('../commits/commit');

  ErrorView = require('../../views/error-view');

  Branch = (function(_super) {
    __extends(Branch, _super);

    function Branch() {
      this.checkout = __bind(this.checkout, this);
      this.open = __bind(this.open, this);
      this.kill = __bind(this.kill, this);
      return Branch.__super__.constructor.apply(this, arguments);
    }

    Branch.prototype.getName = function() {
      return decodeURIComponent(escape(this.get('name') || this.name));
    };

    Branch.prototype.localName = function() {
      return this.getName();
    };

    Branch.prototype.head = function() {
      return this.get('commit').ref;
    };

    Branch.prototype.commit = function() {
      return new Commit(this.get('commit'));
    };

    Branch.prototype.remoteName = function() {
      return '';
    };

    Branch.prototype.unpushed = function() {
      return false;
    };

    Branch.prototype.kill = function() {
      return atom.confirm({
        message: "Delete branch " + (this.getName()) + "?",
        buttons: {
          'Delete': this["delete"],
          'Cancel': null
        }
      });
    };

    Branch.prototype.open = function() {
      return this.checkout();
    };

    Branch.prototype.checkout = function(callback) {
      return git.checkout(this.localName()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    Branch.prototype.push = function() {};

    Branch.prototype["delete"] = function() {};

    return Branch;

  })(ListItem);

  module.exports = Branch;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9icmFuY2hlcy9icmFuY2guY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBQVosQ0FBQTs7QUFBQSxFQUNBLFFBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQURaLENBQUE7O0FBQUEsRUFFQSxNQUFBLEdBQVksT0FBQSxDQUFRLG1CQUFSLENBRlosQ0FBQTs7QUFBQSxFQUdBLFNBQUEsR0FBWSxPQUFBLENBQVEsd0JBQVIsQ0FIWixDQUFBOztBQUFBLEVBS007QUFJSiw2QkFBQSxDQUFBOzs7Ozs7O0tBQUE7O0FBQUEscUJBQUEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUdQLGtCQUFBLENBQW1CLE1BQUEsQ0FBTyxJQUFDLENBQUEsR0FBRCxDQUFLLE1BQUwsQ0FBQSxJQUFnQixJQUFDLENBQUEsSUFBeEIsQ0FBbkIsRUFITztJQUFBLENBQVQsQ0FBQTs7QUFBQSxxQkFRQSxTQUFBLEdBQVcsU0FBQSxHQUFBO2FBQ1QsSUFBQyxDQUFBLE9BQUQsQ0FBQSxFQURTO0lBQUEsQ0FSWCxDQUFBOztBQUFBLHFCQWNBLElBQUEsR0FBTSxTQUFBLEdBQUE7YUFDSixJQUFDLENBQUEsR0FBRCxDQUFLLFFBQUwsQ0FBYyxDQUFDLElBRFg7SUFBQSxDQWROLENBQUE7O0FBQUEscUJBb0JBLE1BQUEsR0FBUSxTQUFBLEdBQUE7YUFDRixJQUFBLE1BQUEsQ0FBTyxJQUFDLENBQUEsR0FBRCxDQUFLLFFBQUwsQ0FBUCxFQURFO0lBQUEsQ0FwQlIsQ0FBQTs7QUFBQSxxQkEwQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTthQUFHLEdBQUg7SUFBQSxDQTFCWixDQUFBOztBQUFBLHFCQStCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsTUFBSDtJQUFBLENBL0JWLENBQUE7O0FBQUEscUJBa0NBLElBQUEsR0FBTSxTQUFBLEdBQUE7YUFDSixJQUFJLENBQUMsT0FBTCxDQUNFO0FBQUEsUUFBQSxPQUFBLEVBQVUsZ0JBQUEsR0FBZSxDQUFDLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBRCxDQUFmLEdBQTJCLEdBQXJDO0FBQUEsUUFDQSxPQUFBLEVBQ0U7QUFBQSxVQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsUUFBQSxDQUFYO0FBQUEsVUFDQSxRQUFBLEVBQVUsSUFEVjtTQUZGO09BREYsRUFESTtJQUFBLENBbENOLENBQUE7O0FBQUEscUJBMENBLElBQUEsR0FBTSxTQUFBLEdBQUE7YUFDSixJQUFDLENBQUEsUUFBRCxDQUFBLEVBREk7SUFBQSxDQTFDTixDQUFBOztBQUFBLHFCQWdEQSxRQUFBLEdBQVUsU0FBQyxRQUFELEdBQUE7YUFDUixHQUFHLENBQUMsUUFBSixDQUFhLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBYixDQUNBLENBQUMsSUFERCxDQUNNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUROLENBRUEsQ0FBQyxPQUFELENBRkEsQ0FFTyxTQUFDLEtBQUQsR0FBQTtlQUFlLElBQUEsU0FBQSxDQUFVLEtBQVYsRUFBZjtNQUFBLENBRlAsRUFEUTtJQUFBLENBaERWLENBQUE7O0FBQUEscUJBc0RBLElBQUEsR0FBTSxTQUFBLEdBQUEsQ0F0RE4sQ0FBQTs7QUFBQSxxQkF5REEsU0FBQSxHQUFRLFNBQUEsR0FBQSxDQXpEUixDQUFBOztrQkFBQTs7S0FKbUIsU0FMckIsQ0FBQTs7QUFBQSxFQW9FQSxNQUFNLENBQUMsT0FBUCxHQUFpQixNQXBFakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/branches/branch.coffee
