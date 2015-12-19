(function() {
  var DiffChunkView, DiffLineView, View, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  View = require('atom-space-pen-views').View;

  DiffLineView = require('./diff-line-view');

  DiffChunkView = (function(_super) {
    __extends(DiffChunkView, _super);

    function DiffChunkView() {
      this.showSelection = __bind(this.showSelection, this);
      this.clicked = __bind(this.clicked, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return DiffChunkView.__super__.constructor.apply(this, arguments);
    }

    DiffChunkView.content = function() {
      return this.div({
        "class": 'diff-chunk',
        click: 'clicked'
      });
    };

    DiffChunkView.prototype.initialize = function(model) {
      this.model = model;
      return _.each(this.model.lines, (function(_this) {
        return function(line) {
          return _this.append(new DiffLineView(line));
        };
      })(this));
    };

    DiffChunkView.prototype.attached = function() {
      return this.model.on('change:selected', this.showSelection);
    };

    DiffChunkView.prototype.detached = function() {
      return this.model.off('change:selected', this.showSelection);
    };

    DiffChunkView.prototype.clicked = function() {
      return this.model.selfSelect();
    };

    DiffChunkView.prototype.showSelection = function() {
      this.removeClass('selected');
      if (this.model.isSelected()) {
        return this.addClass('selected');
      }
    };

    return DiffChunkView;

  })(View);

  module.exports = DiffChunkView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2RpZmZzL2RpZmYtY2h1bmstdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0NBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQWUsT0FBQSxDQUFRLFFBQVIsQ0FBZixDQUFBOztBQUFBLEVBQ0MsT0FBYyxPQUFBLENBQVEsc0JBQVIsRUFBZCxJQURELENBQUE7O0FBQUEsRUFFQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGtCQUFSLENBRmYsQ0FBQTs7QUFBQSxFQUtNO0FBQ0osb0NBQUEsQ0FBQTs7Ozs7Ozs7S0FBQTs7QUFBQSxJQUFBLGFBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLFlBQVA7QUFBQSxRQUFxQixLQUFBLEVBQU8sU0FBNUI7T0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDRCQUlBLFVBQUEsR0FBWSxTQUFFLEtBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFFBQUEsS0FDWixDQUFBO2FBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQWQsRUFBcUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxHQUFBO2lCQUFVLEtBQUMsQ0FBQSxNQUFELENBQVksSUFBQSxZQUFBLENBQWEsSUFBYixDQUFaLEVBQVY7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyQixFQURVO0lBQUEsQ0FKWixDQUFBOztBQUFBLDRCQVFBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxpQkFBVixFQUE2QixJQUFDLENBQUEsYUFBOUIsRUFEUTtJQUFBLENBUlYsQ0FBQTs7QUFBQSw0QkFZQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsaUJBQVgsRUFBOEIsSUFBQyxDQUFBLGFBQS9CLEVBRFE7SUFBQSxDQVpWLENBQUE7O0FBQUEsNEJBZ0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBQSxFQURPO0lBQUEsQ0FoQlQsQ0FBQTs7QUFBQSw0QkFvQkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLE1BQUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBeUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLENBQUEsQ0FBekI7ZUFBQSxJQUFDLENBQUEsUUFBRCxDQUFVLFVBQVYsRUFBQTtPQUZhO0lBQUEsQ0FwQmYsQ0FBQTs7eUJBQUE7O0tBRDBCLEtBTDVCLENBQUE7O0FBQUEsRUE4QkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsYUE5QmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/diffs/diff-chunk-view.coffee
