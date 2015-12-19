(function() {
  var CompositeDisposable, ErrorView, Repo, RepoView;

  CompositeDisposable = require('atom').CompositeDisposable;

  Repo = RepoView = ErrorView = null;

  module.exports = {
    config: {
      debug: {
        title: 'Debug',
        description: 'Toggle debugging tools',
        type: 'boolean',
        "default": false,
        order: 1
      },
      pre_commit_hook: {
        title: 'Pre Commit Hook',
        description: 'Command to run for the pre commit hook',
        type: 'string',
        "default": '',
        order: 2
      },
      show_on_startup: {
        title: 'Show on Startup',
        description: 'Check this if you want atomatigit to show up when Atom is loaded',
        type: 'boolean',
        "default": false,
        order: 3
      },
      display_commit_comparisons: {
        title: 'Display Commit Comparisons',
        description: 'Display how many commits ahead/behind your branches are',
        type: 'boolean',
        "default": true,
        order: 4
      }
    },
    repo: null,
    repoView: null,
    activate: function(state) {
      this.subscriptions = new CompositeDisposable;
      this.insertCommands();
      this.installPackageDependencies();
      if (atom.config.get('atomatigit.show_on_startup')) {
        return this.toggle();
      }
    },
    toggle: function() {
      if (!atom.project.getRepositories()[0]) {
        return this.errorNoGitRepo();
      }
      if (!(Repo && RepoView)) {
        this.loadClasses();
      }
      if (this.repo == null) {
        this.repo = new Repo();
      }
      if (this.repoView == null) {
        this.repoView = new RepoView(this.repo);
        return this.repoView.InitPromise.then((function(_this) {
          return function() {
            return _this.repoView.toggle();
          };
        })(this));
      } else {
        return this.repoView.toggle();
      }
    },
    deactivate: function() {
      var _ref, _ref1;
      if ((_ref = this.repo) != null) {
        _ref.destroy();
      }
      if ((_ref1 = this.repoView) != null) {
        _ref1.destroy();
      }
      return this.subscriptions.dispose();
    },
    errorNoGitRepo: function() {
      return atom.notifications.addError('Project is no git repository!');
    },
    insertCommands: function() {
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'atomatigit:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
    },
    loadClasses: function() {
      Repo = require('./models/repo');
      return RepoView = require('./views/repo-view');
    },
    installPackageDependencies: function() {
      if (atom.packages.getLoadedPackage('language-diff')) {
        return;
      }
      return require('atom-package-dependencies').install(function() {
        atom.notifications.addSuccess('Atomatigit: Dependencies installed correctly.', {
          dismissable: true
        });
        return atom.packages.activatePackage('language-diff');
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL2F0b21hdGlnaXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhDQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sUUFBQSxHQUFXLFNBQUEsR0FBWSxJQUQ5QixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxPQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsd0JBRGI7QUFBQSxRQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsUUFHQSxTQUFBLEVBQVMsS0FIVDtBQUFBLFFBSUEsS0FBQSxFQUFPLENBSlA7T0FERjtBQUFBLE1BTUEsZUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8saUJBQVA7QUFBQSxRQUNBLFdBQUEsRUFBYSx3Q0FEYjtBQUFBLFFBRUEsSUFBQSxFQUFNLFFBRk47QUFBQSxRQUdBLFNBQUEsRUFBUyxFQUhUO0FBQUEsUUFJQSxLQUFBLEVBQU8sQ0FKUDtPQVBGO0FBQUEsTUFZQSxlQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxpQkFBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLGtFQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLEtBSFQ7QUFBQSxRQUlBLEtBQUEsRUFBTyxDQUpQO09BYkY7QUFBQSxNQWtCQSwwQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sNEJBQVA7QUFBQSxRQUNBLFdBQUEsRUFBYSx5REFEYjtBQUFBLFFBRUEsSUFBQSxFQUFNLFNBRk47QUFB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

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/atomatigit.coffee
