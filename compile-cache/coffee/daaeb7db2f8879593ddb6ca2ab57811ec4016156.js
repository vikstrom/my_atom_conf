(function() {
  var BranchList, CommitList, CompositeDisposable, CurrentBranch, ErrorView, FileList, Model, OutputView, Promise, Repo, fs, git, path, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  fs = require('fs');

  path = require('path');

  Model = require('backbone').Model;

  CompositeDisposable = require('atom').CompositeDisposable;

  ErrorView = require('../views/error-view');

  OutputView = require('../views/output-view');

  Promise = (git = require('../git')).Promise;

  FileList = require('./files').FileList;

  _ref = require('./branches'), CurrentBranch = _ref.CurrentBranch, BranchList = _ref.BranchList;

  CommitList = require('./commits').CommitList;

  Repo = (function(_super) {
    __extends(Repo, _super);

    function Repo() {
      this.push = __bind(this.push, this);
      this.initiateGitCommand = __bind(this.initiateGitCommand, this);
      this.initiateCreateBranch = __bind(this.initiateCreateBranch, this);
      this.completeCommit = __bind(this.completeCommit, this);
      this.cleanupCommitMessageFile = __bind(this.cleanupCommitMessageFile, this);
      this.commitMessage = __bind(this.commitMessage, this);
      this.initiateCommit = __bind(this.initiateCommit, this);
      this.leaf = __bind(this.leaf, this);
      this.selection = __bind(this.selection, this);
      this.reload = __bind(this.reload, this);
      this.destroy = __bind(this.destroy, this);
      return Repo.__super__.constructor.apply(this, arguments);
    }

    Repo.prototype.initialize = function() {
      var atomGit;
      this.fileList = new FileList([]);
      this.branchList = new BranchList([]);
      this.commitList = new CommitList([]);
      this.currentBranch = new CurrentBranch(this.headRefsCount() > 0);
      this.subscriptions = new CompositeDisposable;
      this.listenTo(this.branchList, 'repaint', (function(_this) {
        return function() {
          _this.commitList.reload();
          return _this.currentBranch.reload();
        };
      })(this));
      atomGit = atom.project.getRepositories()[0];
      if (atomGit != null) {
        return this.subscriptions.add(atomGit.onDidChangeStatus(this.reload));
      }
    };

    Repo.prototype.destroy = function() {
      this.stopListening();
      return this.subscriptions.dispose();
    };

    Repo.prototype.reload = function() {
      var promises;
      promises = [this.fileList.reload()];
      if (this.headRefsCount() > 0) {
        promises.push(this.branchList.reload());
        promises.push(this.commitList.reload());
        promises.push(this.currentBranch.reload());
      }
      return Promise.all(promises);
    };

    Repo.prototype.selection = function() {
      return this.activeList.selection();
    };

    Repo.prototype.leaf = function() {
      return this.activeList.leaf();
    };

    Repo.prototype.commitMessagePath = function() {
      var _ref1;
      return path.join((_ref1 = atom.project.getRepositories()[0]) != null ? _ref1.getWorkingDirectory() : void 0, '/.git/COMMIT_EDITMSG_ATOMATIGIT');
    };

    Repo.prototype.headRefsCount = function() {
      var _ref1, _ref2, _ref3, _ref4;
      return (_ref1 = (_ref2 = atom.project.getRepositories()[0]) != null ? (_ref3 = _ref2.getReferences()) != null ? (_ref4 = _ref3.heads) != null ? _ref4.length : void 0 : void 0 : void 0) != null ? _ref1 : 0;
    };

    Repo.prototype.fetch = function() {
      return git.cmd('fetch')["catch"](function(error) {
        return new ErrorView(error);
      }).done((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this));
    };

    Repo.prototype.stash = function() {
      return git.cmd('stash')["catch"](function(error) {
        return new ErrorView(error);
      }).done((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this));
    };

    Repo.prototype.stashPop = function() {
      return git.cmd('stash pop')["catch"](function(error) {
        return new ErrorView(error);
      }).done((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this));
    };

    Repo.prototype.initiateCommit = function() {
      var editorPromise, preCommitHook;
      preCommitHook = atom.config.get('atomatigit.pre_commit_hook');
      if ((preCommitHook != null ? preCommitHook.length : void 0) > 0) {
        atom.commands.dispatch(atom.views.getView(atom.workspace), preCommitHook);
      }
      fs.writeFileSync(this.commitMessagePath(), this.commitMessage());
      editorPromise = atom.workspace.open(this.commitMessagePath(), {
        activatePane: true
      });
      return editorPromise.then((function(_this) {
        return function(editor) {
          editor.setGrammar(atom.grammars.grammarForScopeName('text.git-commit'));
          editor.setCursorBufferPosition([0, 0]);
          return editor.onDidSave(_this.completeCommit);
        };
      })(this));
    };

    Repo.prototype.commitMessage = function() {
      var filesStaged, filesUnstaged, filesUntracked, message;
      message = '\n' + ("# Please enter the commit message for your changes. Lines starting\n# with '#' will be ignored, and an empty message aborts the commit.\n# On branch " + (this.currentBranch.localName()) + "\n");
      filesStaged = this.fileList.staged();
      filesUnstaged = this.fileList.unstaged();
      filesUntracked = this.fileList.untracked();
      if (filesStaged.length >= 1) {
        message += '#\n# Changes to be committed:\n';
      }
      _.each(filesStaged, function(file) {
        return message += file.commitMessage();
      });
      if (filesUnstaged.length >= 1) {
        message += '#\n# Changes not staged for commit:\n';
      }
      _.each(filesUnstaged, function(file) {
        return message += file.commitMessage();
      });
      if (filesUntracked.length >= 1) {
        message += '#\n# Untracked files:\n';
      }
      _.each(filesUntracked, function(file) {
        return message += file.commitMessage();
      });
      return message;
    };

    Repo.prototype.cleanupCommitMessageFile = function() {
      var _ref1;
      if (atom.workspace.getActivePane().getItems().length > 1) {
        atom.workspace.destroyActivePaneItem();
      } else {
        atom.workspace.destroyActivePane();
      }
      try {
        fs.unlinkSync(this.commitMessagePath());
      } catch (_error) {}
      return (_ref1 = atom.project.getRepositories()[0]) != null ? typeof _ref1.refreshStatus === "function" ? _ref1.refreshStatus() : void 0 : void 0;
    };

    Repo.prototype.completeCommit = function() {
      return git.commit(this.commitMessagePath()).then(this.reload).then((function(_this) {
        return function() {
          return _this.trigger('complete');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      })["finally"](this.cleanupCommitMessageFile);
    };

    Repo.prototype.initiateCreateBranch = function() {
      return this.trigger('needInput', {
        message: 'Branch name',
        callback: function(name) {
          return git.cmd("checkout -b " + name)["catch"](function(error) {
            return new ErrorView(error);
          }).done((function(_this) {
            return function() {
              return _this.trigger('complete');
            };
          })(this));
        }
      });
    };

    Repo.prototype.initiateGitCommand = function() {
      return this.trigger('needInput', {
        message: 'Git command',
        callback: (function(_this) {
          return function(command) {
            return git.cmd(command).then(function(output) {
              return new OutputView(output);
            })["catch"](function(error) {
              return new ErrorView(error);
            }).done(function() {
              return _this.trigger('complete');
            });
          };
        })(this)
      });
    };

    Repo.prototype.push = function() {
      return this.currentBranch.push();
    };

    return Repo;

  })(Model);

  module.exports = Repo;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9yZXBvLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5SUFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBVSxPQUFBLENBQVEsUUFBUixDQUFWLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQVUsT0FBQSxDQUFRLElBQVIsQ0FEVixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFVLE9BQUEsQ0FBUSxNQUFSLENBRlYsQ0FBQTs7QUFBQSxFQUdDLFFBQVMsT0FBQSxDQUFRLFVBQVIsRUFBVCxLQUhELENBQUE7O0FBQUEsRUFJQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBSkQsQ0FBQTs7QUFBQSxFQU1BLFNBQUEsR0FBOEIsT0FBQSxDQUFRLHFCQUFSLENBTjlCLENBQUE7O0FBQUEsRUFPQSxVQUFBLEdBQThCLE9BQUEsQ0FBUSxzQkFBUixDQVA5QixDQUFBOztBQUFBLEVBUUMsVUFBVyxDQUFBLEdBQUEsR0FBa0IsT0FBQSxDQUFRLFFBQVIsQ0FBbEIsRUFBWCxPQVJELENBQUE7O0FBQUEsRUFTQyxXQUE2QixPQUFBLENBQVEsU0FBUixFQUE3QixRQVRELENBQUE7O0FBQUEsRUFVQSxPQUE4QixPQUFBLENBQVEsWUFBUixDQUE5QixFQUFDLHFCQUFBLGFBQUQsRUFBZ0Isa0JBQUEsVUFWaEIsQ0FBQTs7QUFBQSxFQVdDLGFBQTZCLE9BQUEsQ0FBUSxXQUFSLEVBQTdCLFVBWEQsQ0FBQTs7QUFBQSxFQWNNO0FBRUosMkJBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O0tBQUE7O0FBQUEsbUJBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsT0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFFBQUQsR0FBcUIsSUFBQSxRQUFBLENBQVMsRUFBVCxDQUFyQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBRCxHQUFxQixJQUFBLFVBQUEsQ0FBVyxFQUFYLENBRHJCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxVQUFELEdBQXFCLElBQUEsVUFBQSxDQUFXLEVBQVgsQ0FGckIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxhQUFBLENBQWMsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFBLEdBQW1CLENBQWpDLENBSHJCLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFMakIsQ0FBQTtBQUFBLE1BTUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsVUFBWCxFQUF1QixTQUF2QixFQUFrQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ2hDLFVBQUEsS0FBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLENBQUEsQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxhQUFhLENBQUMsTUFBZixDQUFBLEVBRmdDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEMsQ0FOQSxDQUFBO0FBQUEsTUFVQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFiLENBQUEsQ0FBK0IsQ0FBQSxDQUFBLENBVnpDLENBQUE7QUFXQSxNQUFBLElBQTBELGVBQTFEO2VBQUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLE9BQU8sQ0FBQyxpQkFBUixDQUEwQixJQUFDLENBQUEsTUFBM0IsQ0FBbkIsRUFBQTtPQVpVO0lBQUEsQ0FBWixDQUFBOztBQUFBLG1CQWNBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUEsRUFGTztJQUFBLENBZFQsQ0FBQTs7QUFBQSxtQkFtQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLFVBQUEsUUFBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLENBQUMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQUEsQ0FBRCxDQUFYLENBQUE7QUFDQSxNQUFBLElBQUcsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFBLEdBQW1CLENBQXRCO0FBQ0UsUUFBQSxRQUFRLENBQUMsSUFBVCxDQUFjLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixDQUFBLENBQWQsQ0FBQSxDQUFBO0FBQUEsUUFDQSxRQUFRLENBQUMsSUFBVCxDQUFjLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixDQUFBLENBQWQsQ0FEQSxDQUFBO0FBQUEsUUFFQSxRQUFRLENBQUMsSUFBVCxDQUFjLElBQUMsQ0FBQSxhQUFhLENBQUMsTUFBZixDQUFBLENBQWQsQ0FGQSxDQURGO09BREE7YUFLQSxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVosRUFOTTtJQUFBLENBbkJSLENBQUE7O0FBQUEsbUJBOEJBLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFDVCxJQUFDLENBQUEsVUFBVSxDQUFDLFNBQVosQ0FBQSxFQURTO0lBQUEsQ0E5QlgsQ0FBQTs7QUFBQSxtQkFpQ0EsSUFBQSxHQUFNLFNBQUEsR0FBQTthQUNKLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFBLEVBREk7SUFBQSxDQWpDTixDQUFBOztBQUFBLG1CQXVDQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7QUFDakIsVUFBQSxLQUFBO2FBQUEsSUFBSSxDQUFDLElBQUwsNERBQ21DLENBQUUsbUJBQW5DLENBQUEsVUFERixFQUVFLGlDQUZGLEVBRGlCO0lBQUEsQ0F2Q25CLENBQUE7O0FBQUEsbUJBNkNBLGFBQUEsR0FBZSxTQUFBLEdBQUE7QUFDYixVQUFBLDBCQUFBO2lOQUFvRSxFQUR2RDtJQUFBLENBN0NmLENBQUE7O0FBQUEsbUJBZ0RBLEtBQUEsR0FBTyxTQUFBLEdBQUE7YUFDTCxHQUFHLENBQUMsR0FBSixDQUFRLE9BQVIsQ0FDQSxDQUFDLE9BQUQsQ0FEQSxDQUNPLFNBQUMsS0FBRCxHQUFBO2VBQWUsSUFBQSxTQUFBLENBQVUsS0FBVixFQUFmO01BQUEsQ0FEUCxDQUVBLENBQUMsSUFGRCxDQUVNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ0osS0FBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBREk7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZOLEVBREs7SUFBQSxDQWhEUCxDQUFBOztBQUFBLG1CQXlEQSxLQUFBLEdBQU8sU0FBQSxHQUFBO2FBQ0wsR0FBRyxDQUFDLEdBQUosQ0FBUSxPQUFSLENBQ0EsQ0FBQyxPQUFELENBREEsQ0FDTyxTQUFDLEtBQUQsR0FBQTtlQUFlLElBQUEsU0FBQSxDQUFVLEtBQVYsRUFBZjtNQUFBLENBRFAsQ0FFQSxDQUFDLElBRkQsQ0FFTSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNKLEtBQUMsQ0FBQSxPQUFELENBQVMsUUFBVCxFQURJO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FGTixFQURLO0lBQUEsQ0F6RFAsQ0FBQTs7QUFBQSxtQkErREEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUNSLEdBQUcsQ0FBQyxHQUFKLENBQVEsV0FBUixDQUNBLENBQUMsT0FBRCxDQURBLENBQ08sU0FBQyxLQUFELEdBQUE7ZUFBZSxJQUFBLFNBQUEsQ0FBVSxLQUFWLEVBQWY7TUFBQSxDQURQLENBRUEsQ0FBQyxJQUZELENBRU0sQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDSixLQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQsRUFESTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRk4sRUFEUTtJQUFBLENBL0RWLENBQUE7O0FBQUEsbUJBc0VBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO0FBQ2QsVUFBQSw0QkFBQTtBQUFBLE1BQUEsYUFBQSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNEJBQWhCLENBQWhCLENBQUE7QUFDQSxNQUFBLDZCQUFHLGFBQWEsQ0FBRSxnQkFBZixHQUF3QixDQUEzQjtBQUNFLFFBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FBdkIsRUFBMkQsYUFBM0QsQ0FBQSxDQURGO09BREE7QUFBQSxNQUlBLEVBQUUsQ0FBQyxhQUFILENBQWlCLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBQWpCLEVBQXVDLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBdkMsQ0FKQSxDQUFBO0FBQUEsTUFNQSxhQUFBLEdBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixJQUFDLENBQUEsaUJBQUQsQ0FBQSxDQUFwQixFQUEwQztBQUFBLFFBQUMsWUFBQSxFQUFjLElBQWY7T0FBMUMsQ0FOaEIsQ0FBQTthQU9BLGFBQWEsQ0FBQyxJQUFkLENBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE1BQUQsR0FBQTtBQUNqQixVQUFBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLENBQWxCLENBQUEsQ0FBQTtBQUFBLFVBQ0EsTUFBTSxDQUFDLHVCQUFQLENBQStCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBL0IsQ0FEQSxDQUFBO2lCQUVBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLEtBQUMsQ0FBQSxjQUFsQixFQUhpQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLEVBUmM7SUFBQSxDQXRFaEIsQ0FBQTs7QUFBQSxtQkFzRkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLFVBQUEsbURBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxJQUFBLEdBQU8sQ0FDckIsdUpBQUEsR0FFQyxDQUFDLElBQUMsQ0FBQSxhQUFhLENBQUMsU0FBZixDQUFBLENBQUQsQ0FGRCxHQUU2QixJQUhSLENBQWpCLENBQUE7QUFBQSxNQU1BLFdBQUEsR0FBYyxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBQSxDQU5kLENBQUE7QUFBQSxNQU9BLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQUEsQ0FQaEIsQ0FBQTtBQUFBLE1BUUEsY0FBQSxHQUFpQixJQUFDLENBQUEsUUFBUSxDQUFDLFNBQVYsQ0FBQSxDQVJqQixDQUFBO0FBVUEsTUFBQSxJQUFnRCxXQUFXLENBQUMsTUFBWixJQUFzQixDQUF0RTtBQUFBLFFBQUEsT0FBQSxJQUFXLGlDQUFYLENBQUE7T0FWQTtBQUFBLE1BV0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxXQUFQLEVBQW9CLFNBQUMsSUFBRCxHQUFBO2VBQVUsT0FBQSxJQUFXLElBQUksQ0FBQyxhQUFMLENBQUEsRUFBckI7TUFBQSxDQUFwQixDQVhBLENBQUE7QUFhQSxNQUFBLElBQXNELGFBQWEsQ0FBQyxNQUFkLElBQXdCLENBQTlFO0FBQUEsUUFBQSxPQUFBLElBQVcsdUNBQVgsQ0FBQTtPQWJBO0FBQUEsTUFjQSxDQUFDLENBQUMsSUFBRixDQUFPLGFBQVAsRUFBc0IsU0FBQyxJQUFELEdBQUE7ZUFBVSxPQUFBLElBQVcsSUFBSSxDQUFDLGFBQUwsQ0FBQSxFQUFyQjtNQUFBLENBQXRCLENBZEEsQ0FBQTtBQWdCQSxNQUFBLElBQXdDLGNBQWMsQ0FBQyxNQUFmLElBQXlCLENBQWpFO0FBQUEsUUFBQSxPQUFBLElBQVcseUJBQVgsQ0FBQTtPQWhCQTtBQUFBLE1BaUJBLENBQUMsQ0FBQyxJQUFGLENBQU8sY0FBUCxFQUF1QixTQUFDLElBQUQsR0FBQTtlQUFVLE9BQUEsSUFBVyxJQUFJLENBQUMsYUFBTCxDQUFBLEVBQXJCO01BQUEsQ0FBdkIsQ0FqQkEsQ0FBQTtBQW1CQSxhQUFPLE9BQVAsQ0FwQmE7SUFBQSxDQXRGZixDQUFBOztBQUFBLG1CQThHQSx3QkFBQSxHQUEwQixTQUFBLEdBQUE7QUFDeEIsVUFBQSxLQUFBO0FBQUEsTUFBQSxJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUFBLENBQThCLENBQUMsUUFBL0IsQ0FBQSxDQUF5QyxDQUFDLE1BQTFDLEdBQW1ELENBQXREO0FBQ0UsUUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFmLENBQUEsQ0FBQSxDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBZixDQUFBLENBQUEsQ0FIRjtPQUFBO0FBSUE7QUFBSSxRQUFBLEVBQUUsQ0FBQyxVQUFILENBQWMsSUFBQyxDQUFBLGlCQUFELENBQUEsQ0FBZCxDQUFBLENBQUo7T0FBQSxrQkFKQTtvSEFLaUMsQ0FBRSxrQ0FOWDtJQUFBLENBOUcxQixDQUFBOztBQUFBLG1CQXVIQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTthQUNkLEdBQUcsQ0FBQyxNQUFKLENBQVcsSUFBQyxDQUFBLGlCQUFELENBQUEsQ0FBWCxDQUNBLENBQUMsSUFERCxDQUNNLElBQUMsQ0FBQSxNQURQLENBRUEsQ0FBQyxJQUZELENBRU0sQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDSixLQUFDLENBQUEsT0FBRCxDQUFTLFVBQVQsRUFESTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRk4sQ0FJQSxDQUFDLE9BQUQsQ0FKQSxDQUlPLFNBQUMsS0FBRCxHQUFBO2VBQWUsSUFBQSxTQUFBLENBQVUsS0FBVixFQUFmO01BQUEsQ0FKUCxDQUtBLENBQUMsU0FBRCxDQUxBLENBS1MsSUFBQyxDQUFBLHdCQUxWLEVBRGM7SUFBQSxDQXZIaEIsQ0FBQTs7QUFBQSxtQkFnSUEsb0JBQUEsR0FBc0IsU0FBQSxHQUFBO2FBQ3BCLElBQUMsQ0FBQSxPQUFELENBQVMsV0FBVCxFQUNFO0FBQUEsUUFBQSxPQUFBLEVBQVMsYUFBVDtBQUFBLFFBQ0EsUUFBQSxFQUFVLFNBQUMsSUFBRCxHQUFBO2lCQUNSLEdBQUcsQ0FBQyxHQUFKLENBQVMsY0FBQSxHQUFjLElBQXZCLENBQ0EsQ0FBQyxPQUFELENBREEsQ0FDTyxTQUFDLEtBQUQsR0FBQTttQkFBZSxJQUFBLFNBQUEsQ0FBVSxLQUFWLEVBQWY7VUFBQSxDQURQLENBRUEsQ0FBQyxJQUZELENBRU0sQ0FBQSxTQUFBLEtBQUEsR0FBQTttQkFBQSxTQUFBLEdBQUE7cUJBQ0osS0FBQyxDQUFBLE9BQUQsQ0FBUyxVQUFULEVBREk7WUFBQSxFQUFBO1VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZOLEVBRFE7UUFBQSxDQURWO09BREYsRUFEb0I7SUFBQSxDQWhJdEIsQ0FBQTs7QUFBQSxtQkEwSUEsa0JBQUEsR0FBb0IsU0FBQSxHQUFBO2FBQ2xCLElBQUMsQ0FBQSxPQUFELENBQVMsV0FBVCxFQUNFO0FBQUEsUUFBQSxPQUFBLEVBQVMsYUFBVDtBQUFBLFFBQ0EsUUFBQSxFQUFVLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxPQUFELEdBQUE7bUJBQ1IsR0FBRyxDQUFDLEdBQUosQ0FBUSxPQUFSLENBQ0EsQ0FBQyxJQURELENBQ00sU0FBQyxNQUFELEdBQUE7cUJBQWdCLElBQUEsVUFBQSxDQUFXLE1BQVgsRUFBaEI7WUFBQSxDQUROLENBRUEsQ0FBQyxPQUFELENBRkEsQ0FFTyxTQUFDLEtBQUQsR0FBQTtxQkFBZSxJQUFBLFNBQUEsQ0FBVSxLQUFWLEVBQWY7WUFBQSxDQUZQLENBR0EsQ0FBQyxJQUhELENBR00sU0FBQSxHQUFBO3FCQUNKLEtBQUMsQ0FBQSxPQUFELENBQVMsVUFBVCxFQURJO1lBQUEsQ0FITixFQURRO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEVjtPQURGLEVBRGtCO0lBQUEsQ0ExSXBCLENBQUE7O0FBQUEsbUJBcUpBLElBQUEsR0FBTSxTQUFBLEdBQUE7YUFDSixJQUFDLENBQUEsYUFBYSxDQUFDLElBQWYsQ0FBQSxFQURJO0lBQUEsQ0FySk4sQ0FBQTs7Z0JBQUE7O0tBRmlCLE1BZG5CLENBQUE7O0FBQUEsRUF3S0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUF4S2pCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/repo.coffee
