(function() {
  var CurrentBranchView, View, branch_comparisons,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  branch_comparisons = {};

  CurrentBranchView = (function(_super) {
    __extends(CurrentBranchView, _super);

    function CurrentBranchView() {
      this.repaint = __bind(this.repaint, this);
      this.refresh = __bind(this.refresh, this);
      this.updateComparison = __bind(this.updateComparison, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return CurrentBranchView.__super__.constructor.apply(this, arguments);
    }

    CurrentBranchView.content = function() {
      return this.div({
        "class": 'current-branch-view'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'name',
            outlet: 'name'
          });
          _this.div({
            "class": 'commit',
            outlet: 'commit'
          });
          return _this.div({
            "class": 'comparison',
            outlet: 'comparison'
          });
        };
      })(this));
    };

    CurrentBranchView.prototype.initialize = function(repo) {
      this.repo = repo;
      this.model = this.repo.currentBranch;
      return this.repaint();
    };

    CurrentBranchView.prototype.attached = function() {
      this.model.on('repaint', this.repaint);
      return this.model.on('comparison-loaded', this.updateComparison);
    };

    CurrentBranchView.prototype.detached = function() {
      this.model.off('repaint', this.repaint);
      return this.model.off('comparison-loaded', this.updateComparison);
    };

    CurrentBranchView.prototype.updateComparison = function() {
      var comparison, name;
      if (!atom.config.get('atomatigit.display_commit_comparisons')) {
        return this.comparison.html('');
      }
      name = this.model.getName();
      comparison = this.model.comparison || branch_comparisons[name];
      if (comparison !== '') {
        branch_comparisons[name] = comparison;
      }
      return this.comparison.html(comparison || 'Calculating...');
    };

    CurrentBranchView.prototype.refresh = function() {
      return this.repaint();
    };

    CurrentBranchView.prototype.repaint = function() {
      var _base, _base1;
      this.name.html("" + this.model.name);
      this.commit.html("(" + (typeof (_base = this.model.commit).shortID === "function" ? _base.shortID() : void 0) + ": " + (typeof (_base1 = this.model.commit).shortMessage === "function" ? _base1.shortMessage() : void 0) + ")");
      this.updateComparison();
      this.commit.removeClass('unpushed');
      if (this.model.unpushed()) {
        return this.commit.addClass('unpushed');
      }
    };

    return CurrentBranchView;

  })(View);

  module.exports = CurrentBranchView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2JyYW5jaGVzL2N1cnJlbnQtYnJhbmNoLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFHQSxrQkFBQSxHQUFxQixFQUhyQixDQUFBOztBQUFBLEVBTU07QUFDSix3Q0FBQSxDQUFBOzs7Ozs7Ozs7S0FBQTs7QUFBQSxJQUFBLGlCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxxQkFBUDtPQUFMLEVBQW1DLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDakMsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sTUFBUDtBQUFBLFlBQWUsTUFBQSxFQUFRLE1BQXZCO1dBQUwsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sUUFBUDtBQUFBLFlBQWlCLE1BQUEsRUFBUSxRQUF6QjtXQUFMLENBREEsQ0FBQTtpQkFFQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sWUFBUDtBQUFBLFlBQXFCLE1BQUEsRUFBUSxZQUE3QjtXQUFMLEVBSGlDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkMsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSxnQ0FPQSxVQUFBLEdBQVksU0FBRSxJQUFGLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxPQUFBLElBQ1osQ0FB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

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/branches/current-branch-view.coffee
