(function() {
  var Collection, List,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('backbone').Collection;

  List = (function(_super) {
    __extends(List, _super);

    function List() {
      this.previous = __bind(this.previous, this);
      this.next = __bind(this.next, this);
      this.select = __bind(this.select, this);
      this.selection = __bind(this.selection, this);
      this.leaf = __bind(this.leaf, this);
      return List.__super__.constructor.apply(this, arguments);
    }

    List.prototype.selectedIndex = 0;

    List.prototype.isSublist = false;

    List.prototype.initialize = function() {
      return this.on('update', this.reload);
    };

    List.prototype.leaf = function() {
      var _ref;
      return (_ref = this.selection()) != null ? _ref.leaf() : void 0;
    };

    List.prototype.selection = function() {
      return this.at(this.selectedIndex);
    };

    List.prototype.select = function(i) {
      var oldSelection, _ref;
      oldSelection = this.selectedIndex;
      if (this.selection()) {
        this.selection().deselect();
      }
      if (this.isSublist && i < 0) {
        this.selectedIndex = -1;
        return false;
      }
      this.selectedIndex = Math.max(Math.min(i, this.length - 1), 0);
      if ((_ref = this.selection()) != null) {
        _ref.select();
      }
      return this.selectedIndex !== oldSelection;
    };

    List.prototype.next = function() {
      if (this.selection() && !this.selection().allowNext()) {
        return false;
      }
      return this.select(this.selectedIndex + 1);
    };

    List.prototype.previous = function() {
      if (this.selection() && !this.selection().allowPrevious()) {
        return false;
      }
      return this.select(this.selectedIndex - 1);
    };

    List.prototype.reload = function() {};

    return List;

  })(Collection);

  module.exports = List;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9saXN0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQkFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFDLGFBQWMsT0FBQSxDQUFRLFVBQVIsRUFBZCxVQUFELENBQUE7O0FBQUEsRUFLTTtBQUNKLDJCQUFBLENBQUE7Ozs7Ozs7OztLQUFBOztBQUFBLG1CQUFBLGFBQUEsR0FBZSxDQUFmLENBQUE7O0FBQUEsbUJBQ0EsU0FBQSxHQUFXLEtBRFgsQ0FBQTs7QUFBQSxtQkFJQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLEVBQUQsQ0FBSSxRQUFKLEVBQWMsSUFBQyxDQUFBLE1BQWYsRUFEVTtJQUFBLENBSlosQ0FBQTs7QUFBQSxtQkFVQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxJQUFBO3FEQUFZLENBQUUsSUFBZCxDQUFBLFdBREk7SUFBQSxDQVZOLENBQUE7O0FBQUEsbUJBZ0JBLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFDVCxJQUFDLENBQUEsRUFBRCxDQUFJLElBQUMsQ0FBQSxhQUFMLEVBRFM7SUFBQSxDQWhCWCxDQUFBOztBQUFBLG1CQXNCQSxNQUFBLEdBQVEsU0FBQyxDQUFELEdBQUE7QUFDTixVQUFBLGtCQUFBO0FBQUEsTUFBQSxZQUFBLEdBQWUsSUFBQyxDQUFBLGFBQWhCLENBQUE7QUFDQSxNQUFBLElBQTJCLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBM0I7QUFBQSxRQUFBLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBWSxDQUFDLFFBQWIsQ0FBQSxDQUFBLENBQUE7T0FEQTtBQUdBLE1BQUEsSUFBRyxJQUFDLENBQUEsU0FBRCxJQUFlLENBQUEsR0FBSSxDQUF0QjtBQUNFLFFBQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsQ0FBQSxDQUFqQixDQUFBO0FBQ0EsZUFBTyxLQUFQLENBRkY7T0FIQTtBQUFBLE1BT0EsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLENBQVQsRUFBWSxJQUFDLENBQUEsTUFBRCxHQUFVLENBQXRCLENBQVQsRUFBbUMsQ0FBbkMsQ0FQakIsQ0FBQTs7WUFRWSxDQUFFLE1BQWQsQ0FBQTtPQVJBO2FBVUEsSUFBQyxDQUFBLGFBQUQsS0FBb0IsYUFYZDtJQUFBLENBdEJSLENBQUE7O0FBQUEsbUJBb0NBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixNQUFBLElBQWdCLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBQSxJQUFpQixDQUFBLElBQUssQ0FBQSxTQUFELENBQUEsQ0FBWSxDQUFDLFNBQWIsQ0FBQSxDQUFyQztBQUFBLGVBQU8sS0FBUCxDQUFBO09BQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFTLElBQUMsQ0FBQSxhQUFELEdBQWlCLENBQTFCLEVBRkk7SUFBQSxDQXBDTixDQUFBOztBQUFBLG1CQXlDQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFnQixJQUFDLENBQUEsU0FBRCxDQUFBLENBQUEsSUFBaUIsQ0FBQSxJQUFLLENBQUEsU0FBRCxDQUFBLENBQVksQ0FBQyxhQUFiLENBQUEsQ0FBckM7QUFBQSxlQUFPLEtBQVAsQ0FBQTtPQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBUSxJQUFDLENBQUEsYUFBRCxHQUFpQixDQUF6QixFQUZRO0lBQUEsQ0F6Q1YsQ0FBQTs7QUFBQSxtQkE4Q0EsTUFBQSxHQUFRLFNBQUEsR0FBQSxDQTlDUixDQUFBOztnQkFBQTs7S0FEaUIsV0FMbkIsQ0FBQTs7QUFBQSxFQXNEQSxNQUFNLENBQUMsT0FBUCxHQUFpQixJQXREakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/list.coffee
