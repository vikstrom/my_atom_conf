(function() {
  var $, ErrorView, InputView, OutputView, TextEditorView, View, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View, TextEditorView = _ref.TextEditorView;

  ErrorView = require('./error-view');

  OutputView = require('./output-view');

  git = require('../git');

  InputView = (function(_super) {
    __extends(InputView, _super);

    function InputView() {
      return InputView.__super__.constructor.apply(this, arguments);
    }

    InputView.content = function(_arg) {
      var message;
      message = (_arg != null ? _arg : {}).message;
      return this.div({
        "class": 'overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.subview('inputEditor', new TextEditorView({
            mini: true,
            placeholderText: message
          }));
        };
      })(this));
    };

    InputView.prototype.initialize = function(_arg) {
      var callback;
      callback = (_arg != null ? _arg : {}).callback;
      this.currentPane = atom.workspace.getActivePane();
      atom.views.getView(atom.workspace).appendChild(this.element);
      this.inputEditor.focus();
      this.on('focusout', this.detach);
      atom.commands.add(this.element, 'core:cancel', function() {
        return atom.commands.dispatch(atom.views.getView(atom.workspace), 'atomatigit:toggle');
      });
      return atom.commands.add(this.inputEditor.element, 'core:confirm', (function(_this) {
        return function() {
          return typeof callback === "function" ? callback(_this.inputEditor.getText()) : void 0;
        };
      })(this));
    };

    return InputView;

  })(View);

  module.exports = InputView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2lucHV0LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9FQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUE0QixPQUFBLENBQVEsc0JBQVIsQ0FBNUIsRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosRUFBVSxzQkFBQSxjQUFWLENBQUE7O0FBQUEsRUFDQSxTQUFBLEdBQVksT0FBQSxDQUFRLGNBQVIsQ0FEWixDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBRmIsQ0FBQTs7QUFBQSxFQUdBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUhOLENBQUE7O0FBQUEsRUFLTTtBQUNKLGdDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxJQUFELEdBQUE7QUFDUixVQUFBLE9BQUE7QUFBQSxNQURVLDBCQUFELE9BQVUsSUFBVCxPQUNWLENBQUE7YUFBQSxJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sa0JBQVA7T0FBTCxFQUFnQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUM5QixLQUFDLENBQUEsT0FBRCxDQUFTLGFBQVQsRUFBNEIsSUFBQSxjQUFBLENBQWU7QUFBQSxZQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsWUFBWSxlQUFBLEVBQWlCLE9BQTdCO1dBQWYsQ0FBNUIsRUFEOEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHdCQUlBLFVBQUEsR0FBWSxTQUFDLElBQUQsR0FBQTtBQUNWLFVBQUEsUUFBQTtBQUFBLE1BRFksMkJBQUQsT0FBVyxJQUFWLFFBQ1osQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQUFmLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FBa0MsQ0FBQyxXQUFuQyxDQUErQyxJQUFDLENBQUEsT0FBaEQsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsQ0FBQSxDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxFQUFELENBQUksVUFBSixFQUFnQixJQUFDLENBQUEsTUFBakIsQ0FIQSxDQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsSUFBQyxDQUFBLE9BQW5CLEVBQTRCLGFBQTVCLEVBQTJDLFNBQUEsR0FBQTtlQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUF2QixFQUEyRCxtQkFBM0QsRUFEeUM7TUFBQSxDQUEzQyxDQUpBLENBQUE7YUFNQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUEvQixFQUF3QyxjQUF4QyxFQUF3RCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2tEQUN0RCxTQUFVLEtBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLFlBRDRDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEQsRUFQVTtJQUFBLENBSlosQ0FBQTs7cUJBQUE7O0tBRHNCLEtBTHhCLENBQUE7O0FBQUEsRUFvQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FwQmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/input-view.coffee
