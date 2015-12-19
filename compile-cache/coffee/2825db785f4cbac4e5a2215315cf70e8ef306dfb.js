(function() {
  var DiffChunk, DiffLine, ErrorView, ListItem, fs, git, path, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  fs = require('fs');

  path = require('path');

  git = require('../../git');

  DiffLine = require('./diff-line');

  ListItem = require('../list-item');

  ErrorView = require('../../views/error-view');

  DiffChunk = (function(_super) {
    __extends(DiffChunk, _super);

    function DiffChunk() {
      this.unstage = __bind(this.unstage, this);
      this.stage = __bind(this.stage, this);
      this.kill = __bind(this.kill, this);
      this.patch = __bind(this.patch, this);
      return DiffChunk.__super__.constructor.apply(this, arguments);
    }

    DiffChunk.prototype.initialize = function(_arg) {
      var chunk, _ref;
      _ref = _arg != null ? _arg : {}, this.header = _ref.header, chunk = _ref.chunk;
      return this.lines = _.map(this.splitIntoLines(chunk.trim()), function(line) {
        return new DiffLine({
          line: line
        });
      });
    };

    DiffChunk.prototype.splitIntoLines = function(chunk) {
      return chunk.split(/\n/g);
    };

    DiffChunk.prototype.patch = function() {
      return this.get('header') + this.get('chunk') + '\n';
    };

    DiffChunk.prototype.kill = function() {
      fs.writeFileSync(this.patchPath(), this.patch());
      return git.cmd("apply --reverse '" + (this.patchPath()) + "'").then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    DiffChunk.prototype.stage = function() {
      fs.writeFileSync(this.patchPath(), this.patch());
      return git.cmd("apply --cached '" + (this.patchPath()) + "'").then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    DiffChunk.prototype.unstage = function() {
      fs.writeFileSync(this.patchPath(), this.patch());
      return git.cmd("apply --cached --reverse '" + (this.patchPath()) + "'").then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    DiffChunk.prototype.patchPath = function() {
      var _ref;
      return path.join((_ref = atom.project.getRepositories()[0]) != null ? _ref.getWorkingDirectory() : void 0, '.git/atomatigit_diff_patch');
    };

    return DiffChunk;

  })(ListItem);

  module.exports = DiffChunk;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9kaWZmcy9kaWZmLWNodW5rLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwREFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQU8sT0FBQSxDQUFRLElBQVIsQ0FEUCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLEdBQUEsR0FBWSxPQUFBLENBQVEsV0FBUixDQUpaLENBQUE7O0FBQUEsRUFLQSxRQUFBLEdBQVksT0FBQSxDQUFRLGFBQVIsQ0FMWixDQUFBOztBQUFBLEVBTUEsUUFBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBTlosQ0FBQTs7QUFBQSxFQU9BLFNBQUEsR0FBWSxPQUFBLENBQVEsd0JBQVIsQ0FQWixDQUFBOztBQUFBLEVBYU07QUFNSixnQ0FBQSxDQUFBOzs7Ozs7OztLQUFBOztBQUFBLHdCQUFBLFVBQUEsR0FBWSxTQUFDLElBQUQsR0FBQTtBQUNWLFVBQUEsV0FBQTtBQUFBLDRCQURXLE9BQWlCLElBQWhCLElBQUMsQ0FBQSxjQUFBLFFBQVEsYUFBQSxLQUNyQixDQUFBO2FBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFDLENBQUMsR0FBRixDQUFNLElBQUMsQ0FBQSxjQUFELENBQWdCLEtBQUssQ0FBQyxJQUFOLENBQUEsQ0FBaEIsQ0FBTixFQUFxQyxTQUFDLElBQUQsR0FBQTtlQUN4QyxJQUFBLFFBQUEsQ0FBUztBQUFBLFVBQUEsSUFBQSxFQUFNLElBQU47U0FBVCxFQUR3QztNQUFBLENBQXJDLEVBREM7SUFBQSxDQUFaLENBQUE7O0FBQUEs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

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/diffs/diff-chunk.coffee
