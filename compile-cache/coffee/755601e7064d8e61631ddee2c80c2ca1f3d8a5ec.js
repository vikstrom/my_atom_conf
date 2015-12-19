(function() {
  var CommitView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  CommitView = (function(_super) {
    __extends(CommitView, _super);

    function CommitView() {
      this.showSelection = __bind(this.showSelection, this);
      this.clicked = __bind(this.clicked, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return CommitView.__super__.constructor.apply(this, arguments);
    }

    CommitView.content = function(commit) {
      return this.div({
        "class": 'commit',
        click: 'clicked'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'id'
          }, "" + (commit.shortID()));
          _this.div({
            "class": 'author-name'
          }, "(" + (commit.authorName()) + ")");
          return _this.div({
            "class": 'message text-subtle'
          }, "" + (commit.shortMessage()));
        };
      })(this));
    };

    CommitView.prototype.initialize = function(model) {
      this.model = model;
    };

    CommitView.prototype.attached = function() {
      return this.model.on('change:selected', this.showSelection);
    };

    CommitView.prototype.detached = function() {
      return this.model.off('change:selected', this.showSelection);
    };

    CommitView.prototype.clicked = function() {
      return this.model.selfSelect();
    };

    CommitView.prototype.showSelection = function() {
      this.removeClass('selected');
      if (this.model.isSelected()) {
        return this.addClass('selected');
      }
    };

    return CommitView;

  })(View);

  module.exports = CommitView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2NvbW1pdHMvY29tbWl0LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFHTTtBQUNKLGlDQUFBLENBQUE7Ozs7Ozs7O0tBQUE7O0FBQUEsSUFBQSxVQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsTUFBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLFFBQVA7QUFBQSxRQUFpQixLQUFBLEVBQU8sU0FBeEI7T0FBTCxFQUF3QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ3RDLFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLElBQVA7V0FBTCxFQUFrQixFQUFBLEdBQUUsQ0FBQyxNQUFNLENBQUMsT0FBUCxDQUFBLENBQUQsQ0FBcEIsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sYUFBUDtXQUFMLEVBQTRCLEdBQUEsR0FBRSxDQUFDLE1BQU0sQ0FBQyxVQUFQLENBQUEsQ0FBRCxDQUFGLEdBQXVCLEdBQW5ELENBREEsQ0FBQTtpQkFFQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8scUJBQVA7V0FBTCxFQUFtQyxFQUFBLEdBQUUsQ0FBQyxNQUFNLENBQUMsWUFBUCxDQUFBLENBQUQsQ0FBckMsRUFIc0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHlCQU9BLFVBQUEsR0FBWSxTQUFFLEtBQUYsR0FBQTtBQUFVLE1BQVQsSUFBQyxDQUFBLFFBQUEsS0FBUSxDQUFWO0lBQUEsQ0FQWixDQUFBOztBQUFBLHlCQVVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxpQkFBVixFQUE2QixJQUFDLENBQUEsYUFBOUIsRUFEUTtJQUFBLENBVlYsQ0FBQTs7QUFBQSx5QkFjQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsaUJBQVgsRUFBOEIsSUFBQyxDQUFBLGFBQS9CLEVBRFE7SUFBQSxDQWRWLENBQUE7O0FBQUEseUJBa0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBQSxFQURPO0lBQUEsQ0FsQlQsQ0FBQTs7QUFBQSx5QkFzQkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLE1BQUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBeUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLENBQUEsQ0FBekI7ZUFBQSxJQUFDLENBQUEsUUFBRCxDQUFVLFVBQVYsRUFBQTtPQUZhO0lBQUEsQ0F0QmYsQ0FBQTs7c0JBQUE7O0tBRHVCLEtBSHpCLENBQUE7O0FBQUEsRUE4QkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUE5QmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/commits/commit-view.coffee
