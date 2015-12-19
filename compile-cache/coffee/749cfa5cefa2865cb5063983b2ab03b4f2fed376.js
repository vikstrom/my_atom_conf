(function() {
  var BranchBriefView, View, branch_comparisons,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  branch_comparisons = {};

  BranchBriefView = (function(_super) {
    __extends(BranchBriefView, _super);

    function BranchBriefView() {
      this.showSelection = __bind(this.showSelection, this);
      this.repaint = __bind(this.repaint, this);
      this.updateComparison = __bind(this.updateComparison, this);
      this.clicked = __bind(this.clicked, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return BranchBriefView.__super__.constructor.apply(this, arguments);
    }

    BranchBriefView.content = function() {
      return this.div({
        "class": 'branch-brief-view',
        mousedown: 'clicked'
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

    BranchBriefView.prototype.initialize = function(model) {
      this.model = model;
      return this.repaint();
    };

    BranchBriefView.prototype.attached = function() {
      this.model.on('change:selected', this.showSelection);
      if (this.model.local) {
        return this.model.on('comparison-loaded', this.updateComparison);
      }
    };

    BranchBriefView.prototype.detached = function() {
      this.model.off('change:selected', this.showSelection);
      if (this.model.local) {
        return this.model.off('comparison-loaded', this.updateComparison);
      }
    };

    BranchBriefView.prototype.clicked = function() {
      return this.model.selfSelect();
    };

    BranchBriefView.prototype.updateComparison = function() {
      var comparison, name;
      if (!atom.config.get('atomatigit.display_commit_comparisons')) {
        return;
      }
      name = this.model.getName();
      comparison = this.model.comparison || branch_comparisons[name];
      if (comparison !== '') {
        branch_comparisons[name] = comparison;
      }
      return this.comparison.html(comparison || 'Calculating...');
    };

    BranchBriefView.prototype.repaint = function() {
      this.name.html("" + (this.model.getName()));
      this.commit.html("(" + (this.model.commit().shortID()) + ": " + (this.model.commit().shortMessage()) + ")");
      if (this.model.local) {
        this.updateComparison();
      }
      this.commit.removeClass('unpushed');
      if (this.model.unpushed()) {
        this.commit.addClass('unpushed');
      }
      return this.showSelection();
    };

    BranchBriefView.prototype.showSelection = function() {
      this.removeClass('selected');
      if (this.model.isSelected()) {
        return this.addClass('selected');
      }
    };

    return BranchBriefView;

  })(View);

  module.exports = BranchBriefView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2JyYW5jaGVzL2JyYW5jaC1icmllZi12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5Q0FBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBR0Esa0JBQUEsR0FBcUIsRUFIckIsQ0FBQTs7QUFBQSxFQU1NO0FBQ0osc0NBQUEsQ0FBQTs7Ozs7Ozs7OztLQUFBOztBQUFBLElBQUEsZUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sbUJBQVA7QUFBQSxRQUE0QixTQUFBLEVBQVcsU0FBdkM7T0FBTCxFQUF1RCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ3JELFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLE1BQVA7QUFBQSxZQUFlLE1BQUEsRUFBUSxNQUF2QjtXQUFMLENBQUEsQ0FBQTtBQUFBLFVBQ0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLFFBQVA7QUFBQSxZQUFpQixNQUFBLEVBQVEsUUFBekI7V0FBTCxDQURBLENBQUE7aUJBRUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLFlBQVA7QUFBQSxZQUFxQixNQUFBLEVBQVEsWUFBN0I7V0FBTCxFQUhxRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZELEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsOEJBT0EsVUFBQSxHQUFZLFNBQUUsS0FBRixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsUUFBQSxLQUNaLENBQUE7YUFBQSxJQUFDLENBQUEsT0FBRCxDQUFBLEVBRFU7SUFBQSxDQVBaLENBQUE7O0FBQUEsOEJBV0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFQLENBQVUsaUJBQVYsRUFBNkIsSUFBQyxDQUFBLGFBQTlCLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBb0QsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUEzRDtlQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBUCxDQUFVLG1CQUFWLEVBQStCLElBQUMsQ0FBQSxnQkFBaEMsRUFBQTtPQUZRO0lBQUEsQ0FYVixDQUFBOztBQUFBLDhCQWdCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxpQkFBWCxFQUE4QixJQUFDLENBQUEsYUFBL0IsQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUFxRCxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQTVEO2VBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsbUJBQVgsRUFBZ0MsSUFBQyxDQUFBLGdCQUFqQyxFQUFBO09BRlE7SUFBQSxDQWhCVixDQUFBOztBQUFBLDhCQXFCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLENBQUEsRUFETztJQUFBLENBckJULENBQUE7O0FBQUEsOEJBeUJBLGdCQUFBLEdBQWtCLFNBQUEsR0FBQTtBQUNoQixVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFBLENBQUEsSUFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1Q0FBaEIsQ0FBZDtBQUFBLGNBQUEsQ0FBQTtPQUFBO0FBQUEsTUFDQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUEsQ0FEUCxDQUFBO0FBQUEsTUFFQSxVQUFBLEdBQWEsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLElBQXFCLGtCQUFtQixDQUFBLElBQUEsQ0FGckQsQ0FBQTtBQUdBLE1BQUEsSUFBeUMsVUFBQSxLQUFnQixFQUF6RDtBQUFBLFFBQUEsa0JBQW1CLENBQUEsSUFBQSxDQUFuQixHQUEyQixVQUEzQixDQUFBO09BSEE7YUFJQSxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBaUIsVUFBQSxJQUFjLGdCQUEvQixFQUxnQjtJQUFBLENBekJsQixDQUFBOztBQUFBLDhCQWlDQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBVyxFQUFBLEdBQUUsQ0FBQyxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQSxDQUFELENBQWIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYyxHQUFBLEdBQUUsQ0FBQyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsQ0FBQSxDQUFlLENBQUMsT0FBaEIsQ0FBQSxDQUFELENBQUYsR0FBNkIsSUFBN0IsR0FBZ0MsQ0FBQyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsQ0FBQSxDQUFlLENBQUMsWUFBaEIsQ0FBQSxDQUFELENBQWhDLEdBQWdFLEdBQTlFLENBREEsQ0FBQTtBQUVBLE1BQUEsSUFBdUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUE5QjtBQUFBLFFBQUEsSUFBQyxDQUFBLGdCQUFELENBQUEsQ0FBQSxDQUFBO09BRkE7QUFBQSxNQUlBLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBUixDQUFvQixVQUFwQixDQUpBLENBQUE7QUFLQSxNQUFBLElBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUFQLENBQUEsQ0FBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLFVBQWpCLENBQUEsQ0FERjtPQUxBO2FBUUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxFQVRPO0lBQUEsQ0FqQ1QsQ0FBQTs7QUFBQSw4QkE2Q0EsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLE1BQUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBeUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLENBQUEsQ0FBekI7ZUFBQSxJQUFDLENBQUEsUUFBRCxDQUFVLFVBQVYsRUFBQTtPQUZhO0lBQUEsQ0E3Q2YsQ0FBQTs7MkJBQUE7O0tBRDRCLEtBTjlCLENBQUE7O0FBQUEsRUF3REEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsZUF4RGpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/branches/branch-brief-view.coffee
