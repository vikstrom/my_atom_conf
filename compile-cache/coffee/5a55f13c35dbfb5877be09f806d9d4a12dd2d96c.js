(function() {
  var $, BranchListView, CommitListView, CompositeDisposable, CurrentBranchView, ErrorView, FileListView, InputView, RepoView, View, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View;

  CompositeDisposable = require('atom').CompositeDisposable;

  FileListView = require('./files').FileListView;

  _ref1 = require('./branches'), CurrentBranchView = _ref1.CurrentBranchView, BranchListView = _ref1.BranchListView;

  CommitListView = require('./commits').CommitListView;

  ErrorView = require('./error-view');

  InputView = require('./input-view');

  RepoView = (function(_super) {
    __extends(RepoView, _super);

    function RepoView() {
      this.destroy = __bind(this.destroy, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.toggle = __bind(this.toggle, this);
      this.toggleFocus = __bind(this.toggleFocus, this);
      this.unfocus = __bind(this.unfocus, this);
      this.focus = __bind(this.focus, this);
      this.unfocusIfNotActive = __bind(this.unfocusIfNotActive, this);
      this.hasFocus = __bind(this.hasFocus, this);
      this.resize = __bind(this.resize, this);
      this.resizeStopped = __bind(this.resizeStopped, this);
      this.resizeStarted = __bind(this.resizeStarted, this);
      this.activateView = __bind(this.activateView, this);
      this.showCommits = __bind(this.showCommits, this);
      this.showFiles = __bind(this.showFiles, this);
      this.showBranches = __bind(this.showBranches, this);
      this.refresh = __bind(this.refresh, this);
      this.insertCommands = __bind(this.insertCommands, this);
      this.detached = __bind(this.detached, this);
      this.attached = __bind(this.attached, this);
      return RepoView.__super__.constructor.apply(this, arguments);
    }

    RepoView.content = function(model) {
      return this.div({
        "class": 'atomatigit'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'resize-handle',
            outlet: 'resizeHandle'
          });
          _this.subview('currentBranchView', new CurrentBranchView(model));
          _this.ul({
            "class": 'list-inline tab-bar inset-panel'
          }, function() {
            _this.li({
              outlet: 'fileTab',
              "class": 'tab active',
              click: 'showFiles'
            }, function() {
              return _this.div({
                "class": 'title'
              }, 'Files');
            });
            _this.li({
              outlet: 'branchTab',
              "class": 'tab',
              click: 'showBranches'
            }, function() {
              return _this.div({
                "class": 'title'
              }, 'Branches');
            });
            return _this.li({
              outlet: 'commitTab',
              "class": 'tab',
              click: 'showCommits'
            }, function() {
              return _this.div({
                "class": 'title'
              }, 'Log');
            });
          });
          return _this.div({
            "class": 'lists'
          }, function() {
            _this.subview('fileListView', new FileListView(model.fileList));
            _this.subview('branchListView', new BranchListView(model.branchList));
            return _this.subview('commitListView', new CommitListView(model.commitList));
          });
        };
      })(this));
    };

    RepoView.prototype.initialize = function(model) {
      this.model = model;
      return this.InitPromise = this.model.reload().then(this.showFiles);
    };

    RepoView.prototype.attached = function() {
      this.model.on('needInput', this.getInput);
      this.model.on('complete', this.focus);
      this.model.on('update', this.refresh);
      this.on('click', this.focus);
      this.resizeHandle.on('mousedown', this.resizeStarted);
      this.fileListView.on('blur', this.unfocusIfNotActive);
      this.branchListView.on('blur', this.unfocusIfNotActive);
      this.commitListView.on('blur', this.unfocusIfNotActive);
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(this.insertCommands());
    };

    RepoView.prototype.detached = function() {
      this.model.off('needInput', this.getInput);
      this.model.off('complete', this.focus);
      this.model.off('update', this.refresh);
      this.off('click', this.focus);
      this.resizeHandle.off('mousedown', this.resizeStarted);
      this.fileListView.off('blur', this.unfocusIfNotActive);
      this.branchListView.off('blur', this.unfocusIfNotActive);
      this.commitListView.off('blur', this.unfocusIfNotActive);
      return this.subscriptions.dispose();
    };

    RepoView.prototype.insertCommands = function() {
      return atom.commands.add(this.element, {
        'core:move-down': (function(_this) {
          return function() {
            return _this.model.activeList.next();
          };
        })(this),
        'core:move-up': (function(_this) {
          return function() {
            return _this.model.activeList.previous();
          };
        })(this),
        'core:cancel': this.hide,
        'atomatigit:files': this.showFiles,
        'atomatigit:branches': this.showBranches,
        'atomatigit:commit-log': this.showCommits,
        'atomatigit:commit': (function(_this) {
          return function() {
            _this.model.initiateCommit();
            return _this.unfocus();
          };
        })(this),
        'atomatigit:git-command': (function(_this) {
          return function() {
            _this.model.initiateGitCommand();
            return _this.unfocus();
          };
        })(this),
        'atomatigit:stage': (function(_this) {
          return function() {
            var _ref2;
            return (_ref2 = _this.model.leaf()) != null ? _ref2.stage() : void 0;
          };
        })(this),
        'atomatigit:stash': this.model.stash,
        'atomatigit:stash-pop': this.model.stashPop,
        'atomatigit:toggle-diff': (function(_this) {
          return function() {
            var _ref2;
            return (_ref2 = _this.model.selection()) != null ? _ref2.toggleDiff() : void 0;
          };
        })(this),
        'atomatigit:unstage': (function(_this) {
          return function() {
            var _ref2;
            return (_ref2 = _this.model.leaf()) != null ? _ref2.unstage() : void 0;
          };
        })(this),
        'atomatigit:fetch': this.model.fetch,
        'atomatigit:kill': (function(_this) {
          return function() {
            var _ref2;
            return (_ref2 = _this.model.leaf()) != null ? _ref2.kill() : void 0;
          };
        })(this),
        'atomatigit:open': (function(_this) {
          return function() {
            var _ref2;
            return (_ref2 = _this.model.selection()) != null ? _ref2.open() : void 0;
          };
        })(this),
        'atomatigit:push': this.model.push,
        'atomatigit:refresh': this.refresh,
        'atomatigit:toggle-focus': this.toggleFocus
      });
    };

    RepoView.prototype.refresh = function() {
      return this.model.reload().then((function(_this) {
        return function() {
          return _this.activeView.repaint();
        };
      })(this));
    };

    RepoView.prototype.showBranches = function() {
      this.model.activeList = this.model.branchList;
      this.activeView = this.branchListView;
      return this.activateView();
    };

    RepoView.prototype.showFiles = function() {
      this.model.activeList = this.model.fileList;
      this.activeView = this.fileListView;
      return this.activateView();
    };

    RepoView.prototype.showCommits = function() {
      this.model.activeList = this.model.commitList;
      this.activeView = this.commitListView;
      return this.activateView();
    };

    RepoView.prototype.activateView = function() {
      this.fileListView.toggleClass('hidden', this.activeView !== this.fileListView);
      this.fileTab.toggleClass('active', this.activeView === this.fileListView);
      this.branchListView.toggleClass('hidden', this.activeView !== this.branchListView);
      this.branchTab.toggleClass('active', this.activeView === this.branchListView);
      this.commitListView.toggleClass('hidden', this.activeView !== this.commitListView);
      this.commitTab.toggleClass('active', this.activeView === this.commitListView);
      return this.focus();
    };

    RepoView.prototype.resizeStarted = function() {
      $(document.body).on('mousemove', this.resize);
      return $(document.body).on('mouseup', this.resizeStopped);
    };

    RepoView.prototype.resizeStopped = function() {
      $(document.body).off('mousemove', this.resize);
      return $(document.body).off('mouseup', this.resizeStopped);
    };

    RepoView.prototype.resize = function(_arg) {
      var pageX, width;
      pageX = _arg.pageX;
      width = $(document.body).width() - pageX;
      return this.width(width);
    };

    RepoView.prototype.getInput = function(options) {
      return new InputView(options);
    };

    RepoView.prototype.hasFocus = function() {
      var _ref2;
      return ((_ref2 = this.activeView) != null ? _ref2.is(':focus') : void 0) || document.activeElement === this.activeView;
    };

    RepoView.prototype.unfocusIfNotActive = function() {
      return this.unfocusTimeoutId = setTimeout((function(_this) {
        return function() {
          if (!_this.hasFocus()) {
            return _this.unfocus();
          }
        };
      })(this), 300);
    };

    RepoView.prototype.focus = function() {
      var _ref2;
      if (this.unfocusTimeoutId != null) {
        clearTimeout(this.unfocusTimeoutId);
        this.unfocusTimeoutId = null;
      }
      return ((_ref2 = this.activeView) != null ? typeof _ref2.focus === "function" ? _ref2.focus() : void 0 : void 0) && (this.hasClass('focused') || this.refresh()) && this.addClass('focused');
    };

    RepoView.prototype.unfocus = function() {
      return this.removeClass('focused');
    };

    RepoView.prototype.toggleFocus = function() {
      if (!this.hasFocus()) {
        return this.focus();
      }
      this.unfocus();
      return atom.workspace.getActivePane().activate();
    };

    RepoView.prototype.toggle = function() {
      if (this.hasParent() && this.hasFocus()) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    RepoView.prototype.show = function() {
      if (!this.hasParent()) {
        atom.workspace.addRightPanel({
          item: this
        });
      }
      return this.focus();
    };

    RepoView.prototype.hide = function() {
      if (this.hasParent()) {
        this.detach();
      }
      return atom.workspace.getActivePane().activate();
    };

    RepoView.prototype.destroy = function() {
      var _ref2;
      if ((_ref2 = this.subscriptions) != null) {
        _ref2.dispose();
      }
      return this.detach();
    };

    return RepoView;

  })(View);

  module.exports = RepoView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL3ZpZXdzL3JlcG8tdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMElBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxPQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLENBQUE7O0FBQUEsRUFDQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBREQsQ0FBQTs7QUFBQSxFQUdDLGVBQXNDLE9BQUEsQ0FBUSxTQUFSLEVBQXRDLFlBSEQsQ0FBQTs7QUFBQSxFQUlBLFFBQXVDLE9BQUEsQ0FBUSxZQUFSLENBQXZDLEVBQUMsMEJBQUEsaUJBQUQsRUFBb0IsdUJBQUEsY0FKcEIsQ0FBQTs7QUFBQSxFQUtDLGlCQUFzQyxPQUFBLENBQVEsV0FBUixFQUF0QyxjQUxELENBQUE7O0FBQUEsRUFNQSxTQUFBLEdBQXVDLE9BQUEsQ0FBUSxjQUFSLENBTnZDLENBQUE7O0FBQUEsRUFPQSxTQUFBLEdBQXVDLE9BQUEsQ0FBUSxjQUFSLENBUHZDLENBQUE7O0FBQUEsRUFVTTtBQUNKLCtCQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQUFBOztBQUFBLElBQUEsUUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxZQUFQO09BQUwsRUFBMEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN4QixVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO0FBQUEsWUFBd0IsTUFBQSxFQUFRLGNBQWhDO1dBQUwsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsT0FBRCxDQUFTLG1CQUFULEVBQWtDLElBQUEsaUJBQUEsQ0FBa0IsS0FBbEIsQ0FBbEMsQ0FEQSxDQUFBO0FBQUEsVUFHQSxLQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsWUFBQSxPQUFBLEVBQU8saUNBQVA7V0FBSixFQUE4QyxTQUFBLEdBQUE7QUFDNUMsWUFBQSxLQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsY0FBQSxNQUFBLEVBQVEsU0FBUjtBQUFBLGNBQW1CLE9BQUEsRUFBTyxZQUExQjtBQUFBLGNBQXdDLEtBQUEsRUFBTyxXQUEvQzthQUFKLEVBQWdFLFNBQUEsR0FBQTtxQkFDOUQsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGdCQUFBLE9BQUEsRUFBTyxPQUFQO2VBQUwsRUFBcUIsT0FBckIsRUFEOEQ7WUFBQSxDQUFoRSxDQUFBLENBQUE7QUFBQSxZQUVBLEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxjQUFBLE1BQUEsRUFBUSxXQUFSO0FBQUEsY0FBcUIsT0FBQSxFQUFPLEtBQTVCO0FBQUEsY0FBbUMsS0FBQSxFQUFPLGNBQTFDO2FBQUosRUFBOEQsU0FBQSxHQUFBO3FCQUM1RCxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsZ0JBQUEsT0FBQSxFQUFPLE9BQVA7ZUFBTCxFQUFxQixVQUFyQixFQUQ0RDtZQUFBLENBQTlELENBRkEsQ0FBQTttQkFJQSxLQUFDLENBQUEsRUFBRCxDQUFJO0FBQUEsY0FBQSxNQUFBLEVBQVEsV0FBUjtBQUFBLGNBQXFCLE9BQUEsRUFBTyxLQUE1QjtBQUFBLGNBQW1DLEtBQUEsRUFBTyxhQUExQzthQUFKLEVBQTZELFNBQUEsR0FBQTtxQkFDM0QsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGdCQUFBLE9BQUEsRUFBTyxPQUFQO2VBQUwsRUFBcUIsS0FBckIsRUFEMkQ7WUFBQSxDQUE3RCxFQUw0QztVQUFBLENBQTlDLENBSEEsQ0FBQTtpQkFXQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sT0FBUDtXQUFMLEVBQXFCLFNBQUEsR0FBQTtBQUNuQixZQUFBLEtBQUMsQ0FBQSxPQUFELENBQVMsY0FBVCxFQUE2QixJQUFBLFlBQUEsQ0FBYSxLQUFLLENBQUMsUUFBbkIsQ0FBN0IsQ0FBQSxDQUFBO0FBQUEsWUFDQSxLQUFDLENBQUEsT0FBRCxDQUFTLGdCQUFULEVBQStCLElBQUEsY0FBQSxDQUFlLEtBQUssQ0FBQyxVQUFyQixDQUEvQixDQURBLENBQUE7bUJBRUEsS0FBQyxDQUFBLE9BQUQsQ0FBUyxnQkFBVCxFQUErQixJQUFBLGNBQUEsQ0FBZSxLQUFLLENBQUMsVUFBckIsQ0FBL0IsRUFIbUI7VUFBQSxDQUFyQixFQVp3QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFCLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsdUJBbUJBLFVBQUEsR0FBWSxTQUFFLEtBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFFBQUEsS0FDWixDQUFBO2FBQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsQ0FBQSxDQUFlLENBQUMsSUFBaEIsQ0FBcUIsSUFBQyxDQUFBLFNBQXRCLEVBREw7SUFBQSxDQW5CWixDQUFBOztBQUFBLHVCQXVCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxXQUFWLEVBQXVCLElBQUMsQ0FBQSxRQUF4QixDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBUCxDQUFVLFVBQVYsRUFBc0IsSUFBQyxDQUFBLEtBQXZCLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFQLENBQVUsUUFBVixFQUFvQixJQUFDLENBQUEsT0FBckIsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsRUFBRCxDQUFJLE9BQUosRUFBYSxJQUFDLENBQUEsS0FBZCxDQUhBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxZQUFZLENBQUMsRUFBZCxDQUFpQixXQUFqQixFQUE4QixJQUFDLENBQUEsYUFBL0IsQ0FKQSxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsWUFBWSxDQUFDLEVBQWQsQ0FBaUIsTUFBakIsRUFBeUIsSUFBQyxDQUFBLGtCQUExQixDQU5BLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxjQUFjLENBQUMsRUFBaEIsQ0FBbUIsTUFBbkIsRUFBMkIsSUFBQyxDQUFBLGtCQUE1QixDQVBBLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxjQUFjLENBQUMsRUFBaEIsQ0FBbUIsTUFBbkIsRUFBMkIsSUFBQyxDQUFBLGtCQUE1QixDQVJBLENBQUE7QUFBQSxNQVVBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFWakIsQ0FBQTthQVdBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFDLENBQUEsY0FBRCxDQUFBLENBQW5CLEVBWlE7SUFBQSxDQXZCVixDQUFBOztBQUFBLHVCQXNDQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxXQUFYLEVBQXdCLElBQUMsQ0FBQSxRQUF6QixDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVgsRUFBdUIsSUFBQyxDQUFBLEtBQXhCLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxFQUFxQixJQUFDLENBQUEsT0FBdEIsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsR0FBRCxDQUFLLE9BQUwsRUFBYyxJQUFDLENBQUEsS0FBZixDQUhBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxZQUFZLENBQUMsR0FBZCxDQUFrQixXQUFsQixFQUErQixJQUFDLENBQUEsYUFBaEMsQ0FKQSxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsWUFBWSxDQUFDLEdBQWQsQ0FBa0IsTUFBbEIsRUFBMEIsSUFBQyxDQUFBLGtCQUEzQixDQU5BLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsTUFBcEIsRUFBNEIsSUFBQyxDQUFBLGtCQUE3QixDQVBBLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsTUFBcEIsRUFBNEIsSUFBQyxDQUFBLGtCQUE3QixDQVJBLENBQUE7YUFVQSxJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQSxFQVhRO0lBQUEsQ0F0Q1YsQ0FBQTs7QUFBQSx1QkFvREEsY0FBQSxHQUFnQixTQUFBLEdBQUE7YUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsSUFBQyxDQUFBLE9BQW5CLEVBQ0U7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQWxCLENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxCO0FBQUEsUUFDQSxjQUFBLEVBQWdCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQWxCLENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRGhCO0FBQUEsUUFFQSxhQUFBLEVBQWUsSUFBQyxDQUFBLElBRmhCO0FBQUEsUUFHQSxrQkFBQSxFQUFvQixJQUFDLENBQUEsU0FIckI7QUFBQSxRQUlBLHFCQUFBLEVBQXVCLElBQUMsQ0FBQSxZQUp4QjtBQUFBLFFBS0EsdUJBQUEsRUFBeUIsSUFBQyxDQUFBLFdBTDFCO0FBQUEsUUFNQSxtQkFBQSxFQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNuQixZQUFBLEtBQUMsQ0FBQSxLQUFLLENBQUMsY0FBUCxDQUFBLENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsT0FBRCxDQUFBLEVBRm1CO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FOckI7QUFBQSxRQVNBLHdCQUFBLEVBQTBCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ3hCLFlBQUEsS0FBQyxDQUFBLEtBQUssQ0FBQyxrQkFBUCxDQUFBLENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsT0FBRCxDQUFBLEVBRndCO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FUMUI7QUFBQSxRQVlBLGtCQUFBLEVBQW9CLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQUcsZ0JBQUEsS0FBQTsrREFBYSxDQUFFLEtBQWYsQ0FBQSxXQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FacEI7QUFBQSxRQWFBLGtCQUFBLEVBQW9CLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FiM0I7QUFBQSxRQWNBLHNCQUFBLEVBQXdCLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFkL0I7QUFBQSxRQWVBLHdCQUFBLEVBQTBCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQUcsZ0JBQUEsS0FBQTtvRUFBa0IsQ0FBRSxVQUFwQixDQUFBLFdBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQWYxQjtBQUFBLFFBZ0JBLG9CQUFBLEVBQXNCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQUcsZ0JBQUEsS0FBQTsrREFBYSxDQUFFLE9BQWYsQ0FBQSxXQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FoQnRCO0FBQUEsUUFpQkEsa0JBQUEsRUFBb0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQWpCM0I7QUFBQSxRQWtCQSxpQkFBQSxFQUFtQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUFHLGdCQUFBLEtBQUE7K0RBQWEsQ0FBRSxJQUFmLENBQUEsV0FBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBbEJuQjtBQUFBLFFBbUJBLGlCQUFBLEVBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQUcsZ0JBQUEsS0FBQTtvRUFBa0IsQ0FBRSxJQUFwQixDQUFBLFdBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQW5CbkI7QUFBQSxRQW9CQSxpQkFBQSxFQUFtQixJQUFDLENBQUEsS0FBSyxDQUFDLElBcEIxQjtBQUFBLFFBcUJBLG9CQUFBLEVBQXNCLElBQUMsQ0FBQSxPQXJCdkI7QUFBQSxRQXNCQSx5QkFBQSxFQUEyQixJQUFDLENBQUEsV0F0QjVCO09BREYsRUFEYztJQUFBLENBcERoQixDQUFBOztBQUFBLHVCQStFQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLENBQUEsQ0FBZSxDQUFDLElBQWhCLENBQXFCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJCLEVBRE87SUFBQSxDQS9FVCxDQUFBOztBQUFBLHVCQW1GQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1osTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUEzQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxjQURmLENBQUE7YUFFQSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBSFk7SUFBQSxDQW5GZCxDQUFBOztBQUFBLHVCQXlGQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUEzQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxZQURmLENBQUE7YUFFQSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBSFM7SUFBQSxDQXpGWCxDQUFBOztBQUFBLHVCQStGQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUEzQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxjQURmLENBQUE7YUFFQSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBSFc7SUFBQSxDQS9GYixDQUFBOztBQUFBLHVCQXFHQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1osTUFBQSxJQUFDLENBQUEsWUFBWSxDQUFDLFdBQWQsQ0FBMEIsUUFBMUIsRUFBb0MsSUFBQyxDQUFBLFVBQUQsS0FBZSxJQUFDLENBQUEsWUFBcEQsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsQ0FBcUIsUUFBckIsRUFBK0IsSUFBQyxDQUFBLFVBQUQsS0FBZSxJQUFDLENBQUEsWUFBL0MsQ0FEQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsY0FBYyxDQUFDLFdBQWhCLENBQTRCLFFBQTVCLEVBQXNDLElBQUMsQ0FBQSxVQUFELEtBQWUsSUFBQyxDQUFBLGNBQXRELENBSEEsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxXQUFYLENBQXVCLFFBQXZCLEVBQWlDLElBQUMsQ0FBQSxVQUFELEtBQWUsSUFBQyxDQUFBLGNBQWpELENBSkEsQ0FBQTtBQUFBLE1BTUEsSUFBQyxDQUFBLGNBQWMsQ0FBQyxXQUFoQixDQUE0QixRQUE1QixFQUFzQyxJQUFDLENBQUEsVUFBRCxLQUFlLElBQUMsQ0FBQSxjQUF0RCxDQU5BLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxTQUFTLENBQUMsV0FBWCxDQUF1QixRQUF2QixFQUFpQyxJQUFDLENBQUEsVUFBRCxLQUFlLElBQUMsQ0FBQSxjQUFqRCxDQVBBLENBQUE7YUFTQSxJQUFDLENBQUEsS0FBRCxDQUFBLEVBVlk7SUFBQSxDQXJHZCxDQUFBOztBQUFBLHVCQWtIQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsTUFBQSxDQUFBLENBQUUsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsQ0FBQyxFQUFqQixDQUFvQixXQUFwQixFQUFpQyxJQUFDLENBQUEsTUFBbEMsQ0FBQSxDQUFBO2FBQ0EsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFYLENBQWdCLENBQUMsRUFBakIsQ0FBb0IsU0FBcEIsRUFBK0IsSUFBQyxDQUFBLGFBQWhDLEVBRmE7SUFBQSxDQWxIZixDQUFBOztBQUFBLHVCQXVIQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsTUFBQSxDQUFBLENBQUUsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsQ0FBQyxHQUFqQixDQUFxQixXQUFyQixFQUFrQyxJQUFDLENBQUEsTUFBbkMsQ0FBQSxDQUFBO2FBQ0EsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFYLENBQWdCLENBQUMsR0FBakIsQ0FBcUIsU0FBckIsRUFBZ0MsSUFBQyxDQUFBLGFBQWpDLEVBRmE7SUFBQSxDQXZIZixDQUFBOztBQUFBLHVCQTZIQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7QUFDTixVQUFBLFlBQUE7QUFBQSxNQURRLFFBQUQsS0FBQyxLQUNSLENBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsQ0FBQyxLQUFqQixDQUFBLENBQUEsR0FBMkIsS0FBbkMsQ0FBQTthQUNBLElBQUMsQ0FBQSxLQUFELENBQU8sS0FBUCxFQUZNO0lBQUEsQ0E3SFIsQ0FBQTs7QUFBQSx1QkFtSUEsUUFBQSxHQUFVLFNBQUMsT0FBRCxHQUFBO2FBQ0osSUFBQSxTQUFBLENBQVUsT0FBVixFQURJO0lBQUEsQ0FuSVYsQ0FBQTs7QUFBQSx1QkF1SUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLFVBQUEsS0FBQTt1REFBVyxDQUFFLEVBQWIsQ0FBZ0IsUUFBaEIsV0FBQSxJQUE2QixRQUFRLENBQUMsYUFBVCxLQUEwQixJQUFDLENBQUEsV0FEaEQ7SUFBQSxDQXZJVixDQUFBOztBQUFBLHVCQTJJQSxrQkFBQSxHQUFvQixTQUFBLEdBQUE7YUFFbEIsSUFBQyxDQUFBLGdCQUFELEdBQW9CLFVBQUEsQ0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQzdCLFVBQUEsSUFBQSxDQUFBLEtBQW1CLENBQUEsUUFBRCxDQUFBLENBQWxCO21CQUFBLEtBQUMsQ0FBQSxPQUFELENBQUEsRUFBQTtXQUQ2QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVgsRUFFbEIsR0FGa0IsRUFGRjtJQUFBLENBM0lwQixDQUFBOztBQUFBLHVCQWtKQSxLQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ0wsVUFBQSxLQUFBO0FBQUEsTUFBQSxJQUFHLDZCQUFIO0FBQ0UsUUFBQSxZQUFBLENBQWEsSUFBQyxDQUFBLGdCQUFkLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBRHBCLENBREY7T0FBQTsyRkFJVyxDQUFFLDBCQUFiLElBQTBCLENBQUMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxTQUFWLENBQUEsSUFBd0IsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUF6QixDQUExQixJQUFtRSxJQUFDLENBQUEsUUFBRCxDQUFVLFNBQVYsRUFMOUQ7SUFBQSxDQWxKUCxDQUFBOztBQUFBLHVCQTBKQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLFdBQUQsQ0FBYSxTQUFiLEVBRE87SUFBQSxDQTFKVCxDQUFBOztBQUFBLHVCQThKQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFBLENBQUEsSUFBd0IsQ0FBQSxRQUFELENBQUEsQ0FBdkI7QUFBQSxlQUFPLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBUCxDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQUEsQ0FBOEIsQ0FBQyxRQUEvQixDQUFBLEVBSFc7SUFBQSxDQTlKYixDQUFBOztBQUFBLHVCQW9LQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBQSxJQUFpQixJQUFDLENBQUEsUUFBRCxDQUFBLENBQXBCO2VBQ0UsSUFBQyxDQUFBLElBQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxJQUFELENBQUEsRUFIRjtPQURNO0lBQUEsQ0FwS1IsQ0FBQTs7QUFBQSx1QkEyS0EsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNKLE1BQUEsSUFBQSxDQUFBLElBQWlELENBQUEsU0FBRCxDQUFBLENBQWhEO0FBQUEsUUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBNkI7QUFBQSxVQUFBLElBQUEsRUFBTSxJQUFOO1NBQTdCLENBQUEsQ0FBQTtPQUFBO2FBQ0EsSUFBQyxDQUFBLEtBQUQsQ0FBQSxFQUZJO0lBQUEsQ0EzS04sQ0FBQTs7QUFBQSx1QkFnTEEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNKLE1BQUEsSUFBYSxJQUFDLENBQUEsU0FBRCxDQUFBLENBQWI7QUFBQSxRQUFBLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBQSxDQUFBO09BQUE7YUFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQUE4QixDQUFDLFFBQS9CLENBQUEsRUFGSTtJQUFBLENBaExOLENBQUE7O0FBQUEsdUJBcUxBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxVQUFBLEtBQUE7O2FBQWMsQ0FBRSxPQUFoQixDQUFBO09BQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRk87SUFBQSxDQXJMVCxDQUFBOztvQkFBQTs7S0FEcUIsS0FWdkIsQ0FBQTs7QUFBQSxFQW9NQSxNQUFNLENBQUMsT0FBUCxHQUFpQixRQXBNakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/views/repo-view.coffee
