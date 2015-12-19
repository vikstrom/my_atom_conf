(function() {
  var $, OutputView, View, prettyjson, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  prettyjson = require('prettyjson');

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View;

  OutputView = (function(_super) {
    __extends(OutputView, _super);

    function OutputView() {
      return OutputView.__super__.constructor.apply(this, arguments);
    }

    OutputView.content = function(raw) {
      var message;
      message = _.isString(raw) ? raw : raw.message;
      return this.div((function(_this) {
        return function() {
          return _this.div({
            "class": 'overlay from-bottom atomatigit-output',
            outlet: 'messagePanel'
          }, function() {
            return _this.div({
              "class": 'panel-body padded output-message'
            }, message);
          });
        };
      })(this));
    };

    OutputView.prototype.initialize = function(error) {
      if (atom.config.get('atomatigit.debug')) {
        console.trace(prettyjson.render(error, {
          noColor: true
        }));
      }
      this.messagePanel.on('click', this.detach);
      atom.views.getView(atom.workspace).appendChild(this.element);
      return setTimeout(((function(_this) {
        return function() {
          return _this.detach();
        };
      })(this)), 10000);
    };

    return OutputView;

  })(View);

  module.exports = OutputView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL291dHB1dC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx3Q0FBQTtJQUFBO21TQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFhLE9BQUEsQ0FBUSxRQUFSLENBQWIsQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsWUFBUixDQURiLENBQUE7O0FBQUEsRUFFQSxPQUFhLE9BQUEsQ0FBUSxzQkFBUixDQUFiLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUZKLENBQUE7O0FBQUEsRUFLTTtBQUNKLGlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFVBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxHQUFELEdBQUE7QUFDUixVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBYSxDQUFDLENBQUMsUUFBRixDQUFXLEdBQVgsQ0FBSCxHQUF3QixHQUF4QixHQUFpQyxHQUFHLENBQUMsT0FBL0MsQ0FBQTthQUNBLElBQUMsQ0FBQSxHQUFELENBQUssQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDSCxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sdUNBQVA7QUFBQSxZQUFnRCxNQUFBLEVBQVEsY0FBeEQ7V0FBTCxFQUE2RSxTQUFBLEdBQUE7bUJBQzNFLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxrQ0FBUDthQUFMLEVBQWdELE9BQWhELEVBRDJFO1VBQUEsQ0FBN0UsRUFERztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUwsRUFGUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSx5QkFPQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDVixNQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGtCQUFoQixDQUFIO0FBQ0UsUUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLFVBQVUsQ0FBQyxNQUFYLENBQWtCLEtBQWxCLEVBQXlCO0FBQUEsVUFBQSxPQUFBLEVBQVMsSUFBVDtTQUF6QixDQUFkLENBQUEsQ0FERjtPQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsWUFBWSxDQUFDLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsSUFBQyxDQUFBLE1BQTNCLENBSEEsQ0FBQTtBQUFBLE1BSUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFrQyxDQUFDLFdBQW5DLENBQStDLElBQUMsQ0FBQSxPQUFoRCxDQUpBLENBQUE7YUFLQSxVQUFBLENBQVcsQ0FBQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUQsQ0FBWCxFQUEyQixLQUEzQixFQU5VO0lBQUEsQ0FQWixDQUFBOztzQkFBQTs7S0FEdUIsS0FMekIsQ0FBQTs7QUFBQSxFQXFCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixVQXJCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/output-view.coffee
