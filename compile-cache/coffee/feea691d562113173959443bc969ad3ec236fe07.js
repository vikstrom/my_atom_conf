(function() {
  var $$, DiffView, FileView, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $$ = _ref.$$, View = _ref.View;

  DiffView = require('../diffs/diff-view');

  FileView = (function(_super) {
    __extends(FileView, _super);

    function FileView() {
      this.showDiff = __bind(this.showDiff, this);
      this.showSelection = __bind(this.showSelection, this);
      this.clicked = __bind(this.clicked, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return FileView.__super__.constructor.apply(this, arguments);
    }

    FileView.content = function(file) {
      return this.div({
        "class": 'file',
        mousedown: 'clicked'
      }, (function(_this) {
        return function() {
          _this.span({
            "class": 'mode'
          }, file.getMode());
          return _this.span({
            "class": 'path'
          }, file.path());
        };
      })(this));
    };

    FileView.prototype.initialize = function(model) {
      this.model = model;
      this.showSelection();
      return this.showDiff();
    };

    FileView.prototype.attached = function() {
      this.model.on('change:selected', this.showSelection);
      return this.model.on('change:diff', this.showDiff);
    };

    FileView.prototype.detached = function() {
      this.model.off('change:selected', this.showSelection);
      return this.model.off('change:diff', this.showDiff);
    };

    FileView.prototype.clicked = function() {
      return this.model.selfSelect();
    };

    FileView.prototype.showSelection = function() {
      return this.toggleClass('selected', this.model.isSelected());
    };

    FileView.prototype.showDiff = function() {
      this.find('.diff').remove();
      if (this.model.showDiffP()) {
        return this.append(new DiffView(this.model.diff()));
      }
    };

    return FileView;

  })(View);

  module.exports = FileView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2ZpbGVzL2ZpbGUtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0NBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxPQUFhLE9BQUEsQ0FBUSxzQkFBUixDQUFiLEVBQUMsVUFBQSxFQUFELEVBQUssWUFBQSxJQUFMLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLG9CQUFSLENBRFgsQ0FBQTs7QUFBQSxFQUlNO0FBQ0osK0JBQUEsQ0FBQTs7Ozs7Ozs7O0tBQUE7O0FBQUEsSUFBQSxRQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsSUFBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLE1BQVA7QUFBQSxRQUFlLFNBQUEsRUFBVyxTQUExQjtPQUFMLEVBQTBDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDeEMsVUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsWUFBQSxPQUFBLEVBQU8sTUFBUDtXQUFOLEVBQXFCLElBQUksQ0FBQyxPQUFMLENBQUEsQ0FBckIsQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxZQUFBLE9BQUEsRUFBTyxNQUFQO1dBQU4sRUFBcUIsSUFBSSxDQUFDLElBQUwsQ0FBQSxDQUFyQixFQUZ3QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsdUJBTUEsVUFBQSxHQUFZLFNBQUUsS0FBRixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsUUFBQSxLQUNaLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUZVO0lBQUEsQ0FOWixDQUFBOztBQUFBLHVCQVdBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBUCxDQUFVLGlCQUFWLEVBQTZCLElBQUMsQ0FBQSxhQUE5QixDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxhQUFWLEVBQXlCLElBQUMsQ0FBQSxRQUExQixFQUZRO0lBQUEsQ0FYVixDQUFBOztBQUFBLHVCQWdCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxpQkFBWCxFQUE4QixJQUFDLENBQUEsYUFBL0IsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsYUFBWCxFQUEwQixJQUFDLENBQUEsUUFBM0IsRUFGUTtJQUFBLENBaEJWLENBQUE7O0FBQUEsdUJBcUJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBQSxFQURPO0lBQUEsQ0FyQlQsQ0FBQTs7QUFBQSx1QkF5QkEsYUFBQSxHQUFlLFNBQUEsR0FBQTthQUNiLElBQUMsQ0FBQSxXQUFELENBQWEsVUFBYixFQUF5QixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBQSxDQUF6QixFQURhO0lBQUEsQ0F6QmYsQ0FBQTs7QUFBQSx1QkE2QkEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxPQUFOLENBQWMsQ0FBQyxNQUFmLENBQUEsQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUF1QyxJQUFDLENBQUEsS0FBSyxDQUFDLFNBQVAsQ0FBQSxDQUF2QztlQUFBLElBQUMsQ0FBQSxNQUFELENBQVksSUFBQSxRQUFBLENBQVMsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUEsQ0FBVCxDQUFaLEVBQUE7T0FGUTtJQUFBLENBN0JWLENBQUE7O29CQUFBOztLQURxQixLQUp2QixDQUFBOztBQUFBLEVBc0NBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBdENqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/files/file-view.coffee
