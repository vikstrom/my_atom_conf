(function() {
  var Diff, ErrorView, File, ListItem, git, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  git = require('../../git');

  Diff = require('../diffs/diff');

  ListItem = require('../list-item');

  ErrorView = require('../../views/error-view');

  File = (function(_super) {
    __extends(File, _super);

    function File() {
      this.checkout = __bind(this.checkout, this);
      this.commitMessage = __bind(this.commitMessage, this);
      this.open = __bind(this.open, this);
      this.useSublist = __bind(this.useSublist, this);
      this.toggleDiff = __bind(this.toggleDiff, this);
      this.setDiff = __bind(this.setDiff, this);
      this.stage = __bind(this.stage, this);
      this.diff = __bind(this.diff, this);
      this.showDiffP = __bind(this.showDiffP, this);
      this.path = __bind(this.path, this);
      return File.__super__.constructor.apply(this, arguments);
    }

    File.prototype.initialize = function(file) {
      this.set(file);
      this.set({
        diff: false
      });
      this.loadDiff();
      return this.deselect();
    };

    File.prototype.path = function() {
      return this.get('path');
    };

    File.prototype.showDiffP = function() {
      return this.get('diff');
    };

    File.prototype.diff = function() {
      return this.sublist;
    };

    File.prototype.stage = function() {
      return git.add(this.path()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    File.prototype.setDiff = function(diff) {
      this.sublist = new Diff(diff);
      return this.trigger('change:diff');
    };

    File.prototype.toggleDiff = function() {
      return this.set({
        diff: !this.get('diff')
      });
    };

    File.prototype.useSublist = function() {
      return this.showDiffP();
    };

    File.prototype.open = function() {
      return atom.workspace.open(this.path());
    };

    File.prototype.commitMessage = function() {
      var switchState;
      switchState = function(type) {
        switch (type) {
          case 'M':
            return 'modified:   ';
          case 'R':
            return 'renamed:    ';
          case 'D':
            return 'deleted:    ';
          case 'A':
            return 'new file:   ';
          default:
            return '';
        }
      };
      return "#\t\t" + (switchState(this.getMode())) + (this.path()) + "\n";
    };

    File.prototype.checkout = function() {
      return git.checkoutFile(this.path()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    File.prototype.unstage = function() {};

    File.prototype.kill = function() {};

    File.prototype.loadDiff = function() {};

    File.prototype.getMode = function() {};

    File.prototype.isStaged = function() {
      return false;
    };

    File.prototype.isUnstaged = function() {
      return false;
    };

    File.prototype.isUntracked = function() {
      return false;
    };

    return File;

  })(ListItem);

  module.exports = File;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9maWxlcy9maWxlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1Q0FBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQUFKLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FGWixDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFZLE9BQUEsQ0FBUSxlQUFSLENBSFosQ0FBQTs7QUFBQSxFQUlBLFFBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQUpaLENBQUE7O0FBQUEsRUFLQSxTQUFBLEdBQVksT0FBQSxDQUFRLHdCQUFSLENBTFosQ0FBQTs7QUFBQSxFQU9NO0FBSUosMkJBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7S0FBQTs7QUFBQSxtQkFBQSxVQUFBLEdBQVksU0FBQyxJQUFELEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxHQUFELENBQUssSUFBTCxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLElBQUEsRUFBTSxLQUFOO09BQUwsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsUUFBRCxDQUFBLENBRkEsQ0FBQTthQUdBLElBQUMsQ0FBQSxRQUFELENBQUEsRUFKVTtJQUFBLENBQVosQ0FBQTs7QUFBQSxtQkFTQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osSUFBQyxDQUFBLEdBQUQsQ0FBSyxNQUFMLEVBREk7SUFBQSxDQVROLENBQUE7O0FBQUEsbUJBZUEsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQSxHQUFELENBQUssTUFBTCxFQURTO0lBQUEsQ0FmWCxDQUFBOztBQUFBLG1CQXFCQSxJ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

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/files/file.coffee
