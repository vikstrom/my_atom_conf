(function() {
  var ChildProcess, ConfigObserver, ScriptRunner, ScriptRunnerProcess, ScriptRunnerView, ShellEnvironment;

  ConfigObserver = require('atom').ConfigObserver;

  ScriptRunnerProcess = require('./script-runner-process');

  ScriptRunnerView = require('./script-runner-view');

  ChildProcess = require('child_process');

  ShellEnvironment = require('shell-environment');

  ScriptRunner = (function() {
    function ScriptRunner() {}

    ScriptRunner.prototype.commandMap = [
      {
        scope: '^source\\.coffee',
        command: 'coffee'
      }, {
        scope: '^source\\.js',
        command: 'node'
      }, {
        scope: '^source\\.ruby',
        command: 'ruby'
      }, {
        scope: '^source\\.python',
        command: 'python'
      }, {
        scope: '^source\\.go',
        command: 'go run'
      }, {
        scope: '^text\\.html\\.php',
        command: 'php'
      }, {
        scope: 'Shell Script (Bash)',
        command: 'bash'
      }, {
        path: 'spec\\.coffee$',
        command: 'jasmine-node --coffee'
      }, {
        path: '\\.sh$',
        command: 'bash'
      }
    ];

    ScriptRunner.prototype.destroy = function() {
      return this.killAllProcesses();
    };

    ScriptRunner.prototype.activate = function() {
      this.runners = [];
      this.runnerPane = null;
      return atom.commands.add('atom-workspace', {
        'run:script': (function(_this) {
          return function(event) {
            return _this.run();
          };
        })(this),
        'run:terminate': (function(_this) {
          return function(event) {
            return _this.stop();
          };
        })(this)
      });
    };

    ScriptRunner.prototype.killProcess = function(runner, detach) {
      if (detach == null) {
        detach = false;
      }
      if (runner != null) {
        if (runner.process != null) {
          runner.process.stop('SIGTERM');
          if (detach) {
            runner.process.detach();
            return runner.process = null;
          }
        }
      }
    };

    ScriptRunner.prototype.killAllProcesses = function(detach) {
      var runner, _i, _len, _ref, _results;
      if (detach == null) {
        detach = false;
      }
      _ref = this.runners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        runner = _ref[_i];
        if (runner.process != null) {
          runner.process.stop('SIGTERM');
          if (detach) {
            runner.process.detach();
            _results.push(runner.process = null);
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ScriptRunner.prototype.createRunnerView = function(editor) {
      var runner;
      if (this.pane == null) {
        this.pane = atom.workspace.getActivePane().splitRight();
        this.pane.onDidDestroy((function(_this) {
          return function() {
            _this.killAllProcesses(true);
            return _this.pane = null;
          };
        })(this));
        this.pane.onWillDestroyItem((function(_this) {
          return function(evt) {
            var runner;
            runner = _this.getRunnerBy(evt.item);
            return _this.killProcess(runner, true);
          };
        })(this));
      }
      runner = this.getRunnerBy(editor, 'editor');
      if (runner == null) {
        runner = {
          editor: editor,
          view: new ScriptRunnerView(editor.getTitle()),
          process: null
        };
        this.runners.push(runner);
      } else {
        runner.view.setTitle(editor.getTitle());
      }
      return runner;
    };

    ScriptRunner.prototype.run = function() {
      var cmd, editor, path, runner;
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      path = editor.getPath();
      cmd = this.commandFor(editor);
      if (cmd == null) {
        alert("Not sure how to run '" + path + "' :/");
        return false;
      }
      runner = this.createRunnerView(editor);
      this.killProcess(runner, true);
      this.pane.activateItem(runner.view);
      runner.view.clear();
      return ShellEnvironment.loginEnvironment((function(_this) {
        return function(error, environment) {
          if (environment) {
            return runner.process = ScriptRunnerProcess.run(runner.view, cmd, environment, editor);
          } else {
            throw new Error(error);
          }
        };
      })(this));
    };

    ScriptRunner.prototype.stop = function() {
      var runner;
      if (!this.pane) {
        return;
      }
      runner = this.getRunnerBy(this.pane.getActiveItem());
      return this.killProcess(runner);
    };

    ScriptRunner.prototype.commandFor = function(editor) {
      var firstLine, method, path, scope, _i, _len, _ref;
      firstLine = editor.lineTextForBufferRow(0);
      if (firstLine.match('^#!')) {
        return firstLine.substr(2);
      }
      path = editor.getPath();
      scope = editor.getRootScopeDescriptor().scopes[0];
      _ref = this.commandMap;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        method = _ref[_i];
        if (method.fileName && (path != null)) {
          if (path.match(method.path)) {
            return method.command;
          }
        } else if (method.scope) {
          if (scope.match(method.scope)) {
            return method.command;
          }
        }
      }
    };

    ScriptRunner.prototype.getRunnerBy = function(attr_obj, attr_name) {
      var runner, _i, _len, _ref;
      if (attr_name == null) {
        attr_name = 'view';
      }
      _ref = this.runners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        runner = _ref[_i];
        if (runner[attr_name] === attr_obj) {
          return runner;
        }
      }
      return null;
    };

    return ScriptRunner;

  })();

  module.exports = new ScriptRunner;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC1ydW5uZXIvbGliL3NjcmlwdC1ydW5uZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1HQUFBOztBQUFBLEVBQUMsaUJBQWtCLE9BQUEsQ0FBUSxNQUFSLEVBQWxCLGNBQUQsQ0FBQTs7QUFBQSxFQUVBLG1CQUFBLEdBQXNCLE9BQUEsQ0FBUSx5QkFBUixDQUZ0QixDQUFBOztBQUFBLEVBR0EsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLHNCQUFSLENBSG5CLENBQUE7O0FBQUEsRUFLQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGVBQVIsQ0FMZixDQUFBOztBQUFBLEVBTUEsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLG1CQUFSLENBTm5CLENBQUE7O0FBQUEsRUFRTTs4QkFDSjs7QUFBQSwyQkFBQSxVQUFBLEdBQVk7TUFDVjtBQUFBLFFBQUMsS0FBQSxFQUFPLGtCQUFSO0FBQUEsUUFBNEIsT0FBQSxFQUFTLFFBQXJDO09BRFUsRUFFVjtBQUFBLFFBQUMsS0FBQSxFQUFPLGNBQVI7QUFBQSxRQUF3QixPQUFBLEVBQVMsTUFBakM7T0FGVSxFQUdWO0FBQUEsUUFBQyxLQUFBLEVBQU8sZ0JBQVI7QUFBQSxRQUEwQixPQUFBLEVBQVMsTUFBbkM7T0FIVSxFQUlWO0FBQUEsUUFBQyxLQUFBLEVBQU8sa0JBQVI7QUFBQSxRQUE0QixPQUFBLEVBQVMsUUFBckM7T0FKVSxFQUtWO0FBQUEsUUFBQyxLQUFBLEVBQU8sY0FBUjtBQUFBLFFBQXdCLE9BQUEsRUFBUyxRQUFqQztPQUxVLEVBTVY7QUFBQSxRQUFDLEtBQUEsRUFBTyxvQkFBUjtBQUFBLFFBQThCLE9BQUEsRUFBUyxLQUF2QztPQU5VLEVBT1Y7QUFBQSxRQUFDLEtBQUEsRUFBTyxxQkFBUjtBQUFBLFFBQStCLE9B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

//# sourceURL=/home/victor/.atom/packages/script-runner/lib/script-runner.coffee
