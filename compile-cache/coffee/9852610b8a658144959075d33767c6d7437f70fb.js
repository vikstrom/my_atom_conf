(function() {
  var CommitListView, CommitView, CompositeDisposable, View, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  View = require('atom-space-pen-views').View;

  CompositeDisposable = require('atom').CompositeDisposable;

  CommitView = require('./commit-view');

  CommitListView = (function(_super) {
    __extends(CommitListView, _super);

    function CommitListView() {
      this.repaint = __bind(this.repaint, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return CommitListView.__super__.constructor.apply(this, arguments);
    }

    CommitListView.content = function() {
      return this.div({
        "class": 'commit-list-view list-view',
        tabindex: -1
      });
    };

    CommitListView.prototype.initialize = function(model) {
      this.model = model;
    };

    CommitListView.prototype.attached = function() {
      this.model.on('repaint', this.repaint);
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add(this.element, {
        'atomatigit:showCommit': (function(_this) {
          return function() {
            var _ref;
            return (_ref = _this.model.selection()) != null ? typeof _ref.showCommit === "function" ? _ref.showCommit() : void 0 : void 0;
          };
        })(this),
        'atomatigit:hard-reset-to-commit': (function(_this) {
          return function() {
            var _ref;
            return (_ref = _this.model.selection()) != null ? _ref.confirmHardReset() : void 0;
          };
        })(this)
      }));
    };

    CommitListView.prototype.detached = function() {
      this.model.off('repaint', this.repaint);
      return this.subscriptions.dispose();
    };

    CommitListView.prototype.repaint = function() {
      this.empty();
      return _.each(this.model.models, (function(_this) {
        return function(commit) {
          return _this.append(new CommitView(commit));
        };
      })(this));
    };

    return CommitListView;

  })(View);

  module.exports = CommitListView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2NvbW1pdHMvY29tbWl0LWxpc3Qtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0RBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FBVCxDQUFBOztBQUFBLEVBQ0MsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQURELENBQUE7O0FBQUEsRUFFQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBRkQsQ0FBQTs7QUFBQSxFQUlBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUpiLENBQUE7O0FBQUEsRUFPTTtBQUNKLHFDQUFBLENBQUE7Ozs7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDRCQUFQO0FBQUEsUUFBcUMsUUFBQSxFQUFVLENBQUEsQ0FBL0M7T0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDZCQUlBLFVBQUEsR0FBWSxTQUFFLEtBQUYsR0FBQTtBQUFVLE1BQVQsSUFBQyxDQUFBLFFBQUEsS0FBUSxDQUFWO0lBQUEsQ0FKWixDQUFBOztBQUFBLDZCQU9BLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsSUFBQyxDQUFBLE9BQXRCLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQURqQixDQUFBO2FBRUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixJQUFDLENBQUEsT0FBbkIsRUFDakI7QUFBQSxRQUFBLHVCQUFBLEVBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQUcsZ0JBQUEsSUFBQTswR0FBa0IsQ0FBRSwrQkFBdkI7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QjtBQUFBLFFBQ0EsaUNBQUEsRUFBbUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDakMsZ0JBQUEsSUFBQTtrRUFBa0IsQ0FBRSxnQkFBcEIsQ0FBQSxXQURpQztVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRG5DO09BRGlCLENBQW5CLEVBSFE7SUFBQSxDQVBWLENBQUE7O0FBQUEsNkJBZ0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFNBQVgsRUFBc0IsSUFBQyxDQUFBLE9BQXZCLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLEVBRlE7SUFBQSxDQWhCVixDQUFBOztBQUFBLDZCQXFCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsS0FBRCxDQUFBLENBQUEsQ0FBQTthQUNBLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFkLEVBQXNCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE1BQUQsR0FBQTtpQkFBWSxLQUFDLENBQUEsTUFBRCxDQUFZLElBQUEsVUFBQSxDQUFXLE1BQVgsQ0FBWixFQUFaO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdEIsRUFGTztJQUFBLENBckJULENBQUE7OzBCQUFBOztLQUQyQixLQVA3QixDQUFBOztBQUFBLEVBaUNBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGNBakNqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/commits/commit-list-view.coffee
