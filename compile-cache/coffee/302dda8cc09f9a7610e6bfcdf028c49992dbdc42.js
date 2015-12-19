(function() {
  var Diff, DiffChunk, List, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  List = require('../list');

  DiffChunk = require('./diff-chunk');

  Diff = (function(_super) {
    __extends(Diff, _super);

    Diff.prototype.model = DiffChunk;

    Diff.prototype.isSublist = true;

    Diff.prototype.selectedIndex = -1;

    Diff.prototype.extractHeader = function() {
      var _ref, _ref1;
      return this.header = (_ref = this.raw) != null ? (_ref1 = _ref.match(/^(.*?\n){2}/)) != null ? _ref1[0] : void 0 : void 0;
    };

    function Diff(_arg) {
      var chunks, _ref;
      _ref = _arg != null ? _arg : {}, this.raw = _ref.raw, chunks = _ref.chunks;
      this.chunks = __bind(this.chunks, this);
      this.extractHeader = __bind(this.extractHeader, this);
      this.extractHeader();
      Diff.__super__.constructor.call(this, _.map(chunks, (function(_this) {
        return function(chunk) {
          return {
            chunk: chunk,
            header: _this.header
          };
        };
      })(this)));
      this.select(-1);
    }

    Diff.prototype.chunks = function() {
      return this.models;
    };

    return Diff;

  })(List);

  module.exports = Diff;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9kaWZmcy9kaWZmLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx3QkFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBWSxPQUFBLENBQVEsUUFBUixDQUFaLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQVksT0FBQSxDQUFRLFNBQVIsQ0FEWixDQUFBOztBQUFBLEVBRUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBRlosQ0FBQTs7QUFBQSxFQVFNO0FBQ0osMkJBQUEsQ0FBQTs7QUFBQSxtQkFBQSxLQUFBLEdBQU8sU0FBUCxDQUFBOztBQUFBLG1CQUNBLFNBQUEsR0FBVyxJQURYLENBQUE7O0FBQUEsbUJBRUEsYUFBQSxHQUFlLENBQUEsQ0FGZixDQUFBOztBQUFBLG1CQU1BLGFBQUEsR0FBZSxTQUFBLEdBQUE7QUFDYixVQUFBLFdBQUE7YUFBQSxJQUFDLENBQUEsTUFBRCxrRkFBc0MsQ0FBQSxDQUFBLG9CQUR6QjtJQUFBLENBTmYsQ0FBQTs7QUFjYSxJQUFBLGNBQUMsSUFBRCxHQUFBO0FBQ1gsVUFBQSxZQUFBO0FBQUEsNEJBRFksT0FBZSxJQUFkLElBQUMsQ0FBQSxXQUFBLEtBQUssY0FBQSxNQUNuQixDQUFBO0FBQUEsNkNBQUEsQ0FBQTtBQUFBLDJEQUFBLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxzQ0FBTSxDQUFDLENBQUMsR0FBRixDQUFNLE1BQU4sRUFBYyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEdBQUE7aUJBQVc7QUFBQSxZQUFDLEtBQUEsRUFBTyxLQUFSO0FBQUEsWUFBZSxNQUFBLEVBQVEsS0FBQyxDQUFBLE1BQXhCO1lBQVg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkLENBQU4sQ0FEQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsTUFBRCxDQUFRLENBQUEsQ0FBUixDQUhBLENBRFc7SUFBQSxDQWRiOztBQUFBLG1CQXVCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO2FBQ04sSUFBQyxDQUFBLE9BREs7SUFBQSxDQXZCUixDQUFBOztnQkFBQTs7S0FEaUIsS0FSbkIsQ0FBQTs7QUFBQSxFQW1DQSxNQUFNLENBQUMsT0FBUCxHQUFpQixJQW5DakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/diffs/diff.coffee
