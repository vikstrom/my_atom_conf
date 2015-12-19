(function() {
  var DiffLineView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  DiffLineView = (function(_super) {
    __extends(DiffLineView, _super);

    function DiffLineView() {
      return DiffLineView.__super__.constructor.apply(this, arguments);
    }

    DiffLineView.content = function(line) {
      return this.div({
        "class": "diff-line " + (line.type())
      }, (function(_this) {
        return function() {
          return _this.raw(line.markup());
        };
      })(this));
    };

    DiffLineView.prototype.initialize = function(model) {
      this.model = model;
    };

    return DiffLineView;

  })(View);

  module.exports = DiffLineView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2RpZmZzL2RpZmYtbGluZS12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrQkFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFHTTtBQUNKLG1DQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxJQUFELEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQVEsWUFBQSxHQUFXLENBQUMsSUFBSSxDQUFDLElBQUwsQ0FBQSxDQUFELENBQW5CO09BQUwsRUFBd0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDdEMsS0FBQyxDQUFBLEdBQUQsQ0FBSyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUwsRUFEc0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDJCQUtBLFVBQUEsR0FBWSxTQUFFLEtBQUYsR0FBQTtBQUFZLE1BQVgsSUFBQyxDQUFBLFFBQUEsS0FBVSxDQUFaO0lBQUEsQ0FMWixDQUFBOzt3QkFBQTs7S0FEeUIsS0FIM0IsQ0FBQTs7QUFBQSxFQVdBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFlBWGpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/diffs/diff-line-view.coffee
