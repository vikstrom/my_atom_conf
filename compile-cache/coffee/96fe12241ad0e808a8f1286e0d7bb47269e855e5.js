(function() {
  var Branch, ErrorView, RemoteBranch, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../../git');

  Branch = require('./branch');

  ErrorView = require('../../views/error-view');

  RemoteBranch = (function(_super) {
    __extends(RemoteBranch, _super);

    function RemoteBranch() {
      this["delete"] = __bind(this["delete"], this);
      return RemoteBranch.__super__.constructor.apply(this, arguments);
    }

    RemoteBranch.prototype.remote = true;

    RemoteBranch.prototype.local = false;

    RemoteBranch.prototype["delete"] = function() {
      return git.cmd("push -f " + (this.remoteName()) + " :" + (this.localName())).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    RemoteBranch.prototype.localName = function() {
      return this.getName().replace(/.*?\//, '');
    };

    RemoteBranch.prototype.remoteName = function() {
      return this.getName().replace(/\/.*/, '');
    };

    return RemoteBranch;

  })(Branch);

  module.exports = RemoteBranch;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9icmFuY2hlcy9yZW1vdGUtYnJhbmNoLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvQ0FBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLEdBQUEsR0FBWSxPQUFBLENBQVEsV0FBUixDQUFaLENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVksT0FBQSxDQUFRLFVBQVIsQ0FEWixDQUFBOztBQUFBLEVBRUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSx3QkFBUixDQUZaLENBQUE7O0FBQUEsRUFJTTtBQUVKLG1DQUFBLENBQUE7Ozs7O0tBQUE7O0FBQUEsMkJBQUEsTUFBQSxHQUFRLElBQVIsQ0FBQTs7QUFBQSwyQkFDQSxLQUFBLEdBQU8sS0FEUCxDQUFBOztBQUFBLDJCQU1BLFNBQUEsR0FBUSxTQUFBLEdBQUE7YUFDTixHQUFHLENBQUMsR0FBSixDQUFTLFVBQUEsR0FBUyxDQUFDLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBRCxDQUFULEdBQXdCLElBQXhCLEdBQTJCLENBQUMsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFELENBQXBDLENBQ0EsQ0FBQyxJQURELENBQ00sQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRE4sQ0FFQSxDQUFDLE9BQUQsQ0FGQSxDQUVPLFNBQUMsS0FBRCxHQUFBO2VBQWUsSUFBQSxTQUFBLENBQVUsS0FBVixFQUFmO01BQUEsQ0FGUCxFQURNO0lBQUEsQ0FOUixDQUFBOztBQUFBLDJCQWNBLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFDVCxJQUFDLENBQUEsT0FBRCxDQUFBLENBQVUsQ0FBQyxPQUFYLENBQW1CLE9BQW5CLEVBQTRCLEVBQTVCLEVBRFM7SUFBQSxDQWRYLENBQUE7O0FBQUEsMkJBb0JBLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsT0FBRCxDQUFBLENBQVUsQ0FBQyxPQUFYLENBQW1CLE1BQW5CLEVBQTJCLEVBQTNCLEVBRFU7SUFBQSxDQXBCWixDQUFBOzt3QkFBQTs7S0FGeUIsT0FKM0IsQ0FBQTs7QUFBQSxFQTZCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixZQTdCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/branches/remote-branch.coffee
