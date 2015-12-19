(function() {
  var FileListView, FileView, View, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  View = require('atom-space-pen-views').View;

  FileView = require('./file-view');

  FileListView = (function(_super) {
    __extends(FileListView, _super);

    function FileListView() {
      this.repaint = __bind(this.repaint, this);
      this.repopulateStaged = __bind(this.repopulateStaged, this);
      this.repopulateUnstaged = __bind(this.repopulateUnstaged, this);
      this.repopulateUntracked = __bind(this.repopulateUntracked, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return FileListView.__super__.constructor.apply(this, arguments);
    }

    FileListView.content = function() {
      return this.div({
        "class": 'file-list-view list-view',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.h2({
            outlet: 'untrackedHeader'
          }, 'untracked:');
          _this.div({
            "class": 'untracked',
            outlet: 'untracked'
          });
          _this.h2({
            outlet: 'unstagedHeader'
          }, 'unstaged:');
          _this.div({
            "class": 'unstaged',
            outlet: 'unstaged'
          });
          _this.h2({
            outlet: 'stagedHeader'
          }, 'staged:');
          return _this.div({
            "class": 'staged',
            outlet: 'staged'
          });
        };
      })(this));
    };

    FileListView.prototype.initialize = function(model) {
      this.model = model;
    };

    FileListView.prototype.attached = function() {
      return this.model.on('repaint', this.repaint);
    };

    FileListView.prototype.detached = function() {
      return this.model.off('repaint', this.repaint);
    };

    FileListView.prototype.repopulateUntracked = function() {
      this.untracked.empty();
      return _.each(this.model.untracked(), (function(_this) {
        return function(file) {
          return _this.untracked.append(new FileView(file));
        };
      })(this));
    };

    FileListView.prototype.repopulateUnstaged = function() {
      this.unstaged.empty();
      return _.each(this.model.unstaged(), (function(_this) {
        return function(file) {
          return _this.unstaged.append(new FileView(file));
        };
      })(this));
    };

    FileListView.prototype.repopulateStaged = function() {
      this.staged.empty();
      return _.each(this.model.staged(), (function(_this) {
        return function(file) {
          return _this.staged.append(new FileView(file));
        };
      })(this));
    };

    FileListView.prototype.repaint = function() {
      this.repopulateUntracked();
      this.repopulateUnstaged();
      return this.repopulateStaged();
    };

    return FileListView;

  })(View);

  module.exports = FileListView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL2ZpbGVzL2ZpbGUtbGlzdC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwrQkFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUFULENBQUE7O0FBQUEsRUFDQyxPQUFRLE9BQUEsQ0FBUSxzQkFBUixFQUFSLElBREQsQ0FBQTs7QUFBQSxFQUdBLFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUixDQUhYLENBQUE7O0FBQUEsRUFPTTtBQUNKLG1DQUFBLENBQUE7Ozs7Ozs7Ozs7S0FBQTs7QUFBQSxJQUFBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDBCQUFQO0FBQUEsUUFBbUMsUUFBQSxFQUFVLENBQUEsQ0FBN0M7T0FBTCxFQUFzRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ3BELFVBQUEsS0FBQyxDQUFBLEVBQUQsQ0FBSTtBQUFBLFlBQUEsTUFBQSxFQUFRLGlCQUFSO1dBQUosRUFBK0IsWUFBL0IsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sV0FBUDtBQUFBLFlBQW9CLE1BQUEsRUFBUSxXQUE1QjtXQUFMLENBREEsQ0FBQTtBQUFBLFVBRUEsS0FBQyxDQUFBLEVBQUQsQ0FBSTtBQUFBLFlBQUEsTUFBQSxFQUFRLGdCQUFSO1dBQUosRUFBOEIsV0FBOUIsQ0FGQSxDQUFBO0FBQUEsVUFHQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sVUFBUDtBQUFBLFlBQW1CLE1B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

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/files/file-list-view.coffee
