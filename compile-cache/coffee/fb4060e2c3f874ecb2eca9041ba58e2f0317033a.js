(function() {
  var BranchBriefView, BranchListView, CompositeDisposable, View, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  View = require('atom-space-pen-views').View;

  CompositeDisposable = require('atom').CompositeDisposable;

  BranchBriefView = require('./branch-brief-view');

  BranchListView = (function(_super) {
    __extends(BranchListView, _super);

    function BranchListView() {
      this.repaint = __bind(this.repaint, this);
      this.emptyLists = __bind(this.emptyLists, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return BranchListView.__super__.constructor.apply(this, arguments);
    }

    BranchListView.content = function() {
      return this.div({
        "class": 'branch-list-view list-view',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.h2('local:');
          _this.div({
            outlet: 'localDom'
          });
          _this.h2('remote:');
          return _this.div({
            outlet: 'remoteDom'
          });
        };
      })(this));
    };

    BranchListView.prototype.initialize = function(model) {
      this.model = model;
    };

    BranchListView.prototype.attached = function() {
      return this.model.on('repaint', this.repaint);
    };

    BranchListView.prototype.detached = function() {
      return this.model.off('repaint', this.repaint);
    };

    BranchListView.prototype.emptyLists = function() {
      this.localDom.empty();
      return this.remoteDom.empty();
    };

    BranchListView.prototype.repaint = function() {
      this.emptyLists();
      _.each(this.model.local(), (function(_this) {
        return function(branch) {
          return _this.localDom.append(new BranchBriefView(branch));
        };
      })(this));
      return _.each(this.model.remote(), (function(_this) {
        return function(branch) {
          return _this.remoteDom.append(new BranchBriefView(branch));
        };
      })(this));
    };

    return BranchListView;

  })(View);

  module.exports = BranchListView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2JyYW5jaGVzL2JyYW5jaC1saXN0LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZEQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBQVQsQ0FBQTs7QUFBQSxFQUNDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFERCxDQUFBOztBQUFBLEVBRUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUZELENBQUE7O0FBQUEsRUFJQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxxQkFBUixDQUpsQixDQUFBOztBQUFBLEVBT007QUFDSixxQ0FBQSxDQUFBOzs7Ozs7OztLQUFBOztBQUFBLElBQUEsY0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sNEJBQVA7QUFBQSxRQUFxQyxRQUFBLEVBQVUsQ0FBQSxDQUEvQztPQUFMLEVBQXdELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDdEQsVUFBQSxLQUFDLENBQUEsRUFBRCxDQUFJLFFBQUosQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxNQUFBLEVBQVEsVUFBUjtXQUFMLENBREEsQ0FBQTtBQUFBLFVBRUEsS0FBQyxDQUFBLEVBQUQsQ0FBSSxTQUFKLENBRkEsQ0FBQTtpQkFHQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxNQUFBLEVBQVEsV0FBUjtXQUFMLEVBSnNEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEQsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSw2QkFRQSxVQUFBLEdBQVksU0FBRSxLQUFGLEdBQUE7QUFBVSxNQUFULElBQUMsQ0FBQSxRQUFBLEtBQVEsQ0FBVjtJQUFBLENBUlosQ0FBQTs7QUFBQSw2QkFXQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFQLENBQVUsU0FBVixFQUFxQixJQUFDLENBQUEsT0FBdEIsRUFEUTtJQUFBLENBWFYsQ0FBQTs7QUFBQSw2QkFlQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsU0FBWCxFQUFzQixJQUFDLENBQUEsT0FBdkIsRUFEUTtJQUFBLENBZlYsQ0FBQTs7QUFBQSw2QkFtQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxLQUFWLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLENBQUEsRUFGVTtJQUFBLENBbkJaLENBQUE7O0FBQUEsNkJBd0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBUCxDQUFBLENBQVAsRUFBdUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsTUFBRCxHQUFBO2lCQUFZLEtBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixDQUFxQixJQUFBLGVBQUEsQ0FBZ0IsTUFBaEIsQ0FBckIsRUFBWjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZCLENBREEsQ0FBQTthQUVBLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLENBQUEsQ0FBUCxFQUF3QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7aUJBQVksS0FBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLENBQXNCLElBQUEsZUFBQSxDQUFnQixNQUFoQixDQUF0QixFQUFaO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEIsRUFITztJQUFBLENBeEJULENBQUE7OzBCQUFBOztLQUQyQixLQVA3QixDQUFBOztBQUFBLEVBcUNBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGNBckNqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/branches/branch-list-view.coffee
