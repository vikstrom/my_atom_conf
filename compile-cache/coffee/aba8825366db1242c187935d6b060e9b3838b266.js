(function() {
  var DiffChunkView, DiffView, View, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  View = require('atom-space-pen-views').View;

  DiffChunkView = require('./diff-chunk-view');

  DiffView = (function(_super) {
    __extends(DiffView, _super);

    function DiffView() {
      return DiffView.__super__.constructor.apply(this, arguments);
    }

    DiffView.content = function(diff) {
      return this.div({
        "class": 'diff'
      });
    };

    DiffView.prototype.initialize = function(model) {
      var _ref;
      this.model = model;
      return _.each((_ref = this.model) != null ? _ref.chunks() : void 0, (function(_this) {
        return function(chunk) {
          return _this.append(new DiffChunkView(chunk));
        };
      })(this));
    };

    return DiffView;

  })(View);

  module.exports = DiffView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2RpZmZzL2RpZmYtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0NBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBZ0IsT0FBQSxDQUFRLFFBQVIsQ0FBaEIsQ0FBQTs7QUFBQSxFQUNDLE9BQWUsT0FBQSxDQUFRLHNCQUFSLEVBQWYsSUFERCxDQUFBOztBQUFBLEVBRUEsYUFBQSxHQUFnQixPQUFBLENBQVEsbUJBQVIsQ0FGaEIsQ0FBQTs7QUFBQSxFQUtNO0FBQ0osK0JBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsUUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLElBQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxNQUFQO09BQUwsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSx1QkFJQSxVQUFBLEdBQVksU0FBRSxLQUFGLEdBQUE7QUFDVixVQUFBLElBQUE7QUFBQSxNQURXLElBQUMsQ0FBQSxRQUFBLEtBQ1osQ0FBQTthQUFBLENBQUMsQ0FBQyxJQUFGLG1DQUFhLENBQUUsTUFBUixDQUFBLFVBQVAsRUFBeUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsS0FBRCxHQUFBO2lCQUFXLEtBQUMsQ0FBQSxNQUFELENBQVksSUFBQSxhQUFBLENBQWMsS0FBZCxDQUFaLEVBQVg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QixFQURVO0lBQUEsQ0FKWixDQUFBOztvQkFBQTs7S0FEcUIsS0FMdkIsQ0FBQTs7QUFBQSxFQWFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBYmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/diffs/diff-view.coffee
