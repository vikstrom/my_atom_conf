(function() {
  var Commit, ErrorView, ListItem, fs, git, path, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('lodash');

  fs = require('fs-plus');

  path = require('path');

  git = require('../../git');

  ListItem = require('../list-item');

  ErrorView = require('../../views/error-view');

  Commit = (function(_super) {
    __extends(Commit, _super);

    function Commit() {
      this.showCommit = __bind(this.showCommit, this);
      this.hardReset = __bind(this.hardReset, this);
      this.reset = __bind(this.reset, this);
      this.confirmHardReset = __bind(this.confirmHardReset, this);
      this.confirmReset = __bind(this.confirmReset, this);
      this.open = __bind(this.open, this);
      this.shortMessage = __bind(this.shortMessage, this);
      this.message = __bind(this.message, this);
      this.authorName = __bind(this.authorName, this);
      this.shortID = __bind(this.shortID, this);
      this.commitID = __bind(this.commitID, this);
      return Commit.__super__.constructor.apply(this, arguments);
    }

    Commit.prototype.defaults = {
      showMessage: null,
      author: null,
      id: null,
      message: null
    };

    Commit.prototype.initialize = function(gitCommit) {
      Commit.__super__.initialize.call(this);
      if (!_.isString(gitCommit) && _.isObject(gitCommit)) {
        this.set('author', gitCommit.author);
        this.set('id', gitCommit.ref);
        return this.set('message', gitCommit.message);
      }
    };

    Commit.prototype.unicodify = function(str) {
      try {
        str = decodeURIComponent(escape(str));
      } catch (_error) {}
      return str;
    };

    Commit.prototype.commitID = function() {
      return this.get('id');
    };

    Commit.prototype.shortID = function() {
      var _ref;
      return (_ref = this.commitID()) != null ? _ref.substr(0, 6) : void 0;
    };

    Commit.prototype.authorName = function() {
      var _ref;
      return this.unicodify((_ref = this.get('author')) != null ? _ref.name : void 0);
    };

    Commit.prototype.message = function() {
      return this.unicodify(this.get('message') || '\n');
    };

    Commit.prototype.shortMessage = function() {
      return this.message().split('\n')[0];
    };

    Commit.prototype.open = function() {
      return this.confirmReset();
    };

    Commit.prototype.confirmReset = function() {
      return atom.confirm({
        message: "Soft-reset head to " + (this.shortID()) + "?",
        detailedMessage: this.message(),
        buttons: {
          'Reset': this.reset,
          'Cancel': null
        }
      });
    };

    Commit.prototype.confirmHardReset = function() {
      return atom.confirm({
        message: "Do you REALLY want to HARD-reset head to " + (this.shortID()) + "?",
        detailedMessage: this.message(),
        buttons: {
          'Cancel': null,
          'Reset': this.hardReset
        }
      });
    };

    Commit.prototype.reset = function() {
      return git.reset(this.commitID()).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    Commit.prototype.hardReset = function() {
      return git.reset(this.commitID(), {
        hard: true
      }).then((function(_this) {
        return function() {
          return _this.trigger('update');
        };
      })(this))["catch"](function(error) {
        return new ErrorView(error);
      });
    };

    Commit.prototype.showCommit = function() {
      var diffPath, gitPath, _ref, _ref1, _ref2;
      if (!this.has('showMessage')) {
        return git.show(this.commitID(), {
          format: 'full'
        }).then((function(_this) {
          return function(data) {
            _this.set('showMessage', _this.unicodify(data));
            return _this.showCommit();
          };
        })(this))["catch"](function(error) {
          return new ErrorView(error);
        });
      } else {
        gitPath = ((_ref = atom.project) != null ? (_ref1 = _ref.getRepositories()[0]) != null ? _ref1.getPath() : void 0 : void 0) || ((_ref2 = atom.project) != null ? _ref2.getPath() : void 0);
        diffPath = path.join(gitPath, ".git/" + (this.commitID()));
        fs.writeFileSync(diffPath, this.get('showMessage'));
        return atom.workspace.open(diffPath).then(function(editor) {
          var grammar;
          grammar = atom.grammars.grammarForScopeName('source.diff');
          if (grammar) {
            editor.setGrammar(grammar);
          }
          return editor.buffer.onDidDestroy(function() {
            return fs.removeSync(diffPath);
          });
        });
      }
    };

    return Commit;

  })(ListItem);

  module.exports = Commit;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9jb21taXRzL2NvbW1pdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkNBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFPLE9BQUEsQ0FBUSxTQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFJQSxHQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FKWixDQUFBOztBQUFBLEVBS0EsUUFBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBTFosQ0FBQTs7QUFBQSxFQU1BLFNBQUEsR0FBWSxPQUFBLENBQVEsd0JBQVIsQ0FOWixDQUFBOztBQUFBLEVBUU07QUFDSiw2QkFBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7S0FBQTs7QUFBQSxxQkFBQSxRQUFBLEdBQ0U7QUFBQSxNQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsTUFDQSxNQUFBLEVBQVEsSUFEUjtBQUFBLE1BRUEsRUFBQSxFQUFJLElBRko7QUFBQSxNQUdBLE9BQUEsRUFBUyxJQUhUO0tBREYsQ0FBQTs7QUFBQSxxQkFTQSxVQUFBLEdBQVksU0FBQyxTQUFELEdBQUE7QUFDVixNQUFBLHFDQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBRyxDQUFBLENBQUssQ0FBQyxRQUFGLENBQVcsU0FBWCxDQUFKLElBQThCLENBQUMsQ0FBQyxRQUFGLENBQVcsU0FBWCxDQUFqQztBQUNFLFFBQUEsSUFBQyxDQUFBLEdBQUQsQ0FBSyxRQUFMLEVBQWUsU0FBUyxDQUFDLE1BQXpCLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxD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

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/commits/commit.coffee
