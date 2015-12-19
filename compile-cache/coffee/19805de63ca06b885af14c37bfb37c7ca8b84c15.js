(function() {
  var CompositeDisposable, XRegExp, fs, helpers, path, xcache;

  CompositeDisposable = require('atom').CompositeDisposable;

  fs = require('fs');

  path = require('path');

  helpers = require('atom-linter');

  XRegExp = require('xregexp').XRegExp;

  xcache = new Map;

  module.exports = {
    config: {
      executablePath: {
        type: 'string',
        "default": "chktex",
        description: 'Path to chktex executable'
      },
      chktexArgs: {
        type: 'array',
        "default": ["-wall", "-n22", "-n30", "-e16"],
        description: 'Additional chktex Command Line Arguments'
      }
    },
    activate: function(state) {
      return require("atom-package-deps").install("linter-chktex").then(function() {
        console.log('linter-chktex loaded');
        this.subscriptions = new CompositeDisposable;
        this.subscriptions.add(atom.config.observe('linter-chktex.executablePath', (function(_this) {
          return function(executablePath) {
            console.log('observe ' + executablePath);
            return _this.executablePath = executablePath;
          };
        })(this)));
        return this.subscriptions.add(atom.config.observe('linter-chktex.chktexArgs', (function(_this) {
          return function(chktexArgs) {
            console.log('observe ' + chktexArgs);
            return _this.chktexArgs = chktexArgs;
          };
        })(this)));
      });
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var provider;
      return provider = {
        name: 'chktex',
        grammarScopes: ['text.tex.latex', 'text.tex.latex.beamer', 'text.tex.latex.memoir'],
        scope: 'file',
        lintOnFly: true,
        lint: (function(_this) {
          return function(textEditor) {
            return _this.lintFile(textEditor.getPath()).then(_this.parseOutput);
          };
        })(this)
      };
    },
    lintFile: function(filePath) {
      var args, x, _i, _len;
      args = [filePath, '-q', '-I0', '-f%f:%l:%c:%d:%k:%n:%m\\n'];
      if (chktexArgs) {
        for (_i = 0, _len = chktexArgs.length; _i < _len; _i++) {
          x = chktexArgs[_i];
          args.push(x);
        }
      }
      return helpers.exec(executablePath, args, {
        options: {
          stream: 'stdout'
        }
      });
    },
    parseOutput: function(output, filePath) {
      var colEnd, colStart, line, lineEnd, lineStart, match, rawRegex, regex, toReturn, _i, _len, _ref;
      console.log(output);
      rawRegex = '^(?<file>.+):(?<line>.+):(?<colStart>.+):(?<colLength>.+):(?<type>.+):(?<message>.+:.+)$';
      toReturn = [];
      if (xcache.has(rawRegex)) {
        regex = xcache.get(rawRegex);
      } else {
        xcache.set(rawRegex, regex = XRegExp(rawRegex));
      }
      _ref = output.split('\\n');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        match = XRegExp.exec(line, regex);
        if (match) {
          console.log('file ' + match.file);
          console.log('line ' + match.line);
          console.log('colStart ' + match.colStart);
          console.log('colLength ' + match.colLength);
          console.log('type ' + match.type);
          console.log('message ' + match.message);
          lineStart = 0;
          if (match.line) {
            lineStart = parseInt(match.line, 10) - 1;
          }
          colStart = 0;
          if (match.colStart) {
            colStart = parseInt(match.colStart, 10) - 1;
          }
          lineEnd = 0;
          if (match.line) {
            lineEnd = parseInt(match.line, 10) - 1;
          }
          colEnd = 0;
          if (match.colLength) {
            colEnd = colStart + parseInt(match.colLength, 10);
          }
          toReturn.push({
            type: match.type,
            text: match.message,
            filePath: match.file,
            range: [[lineStart, colStart], [lineEnd, colEnd]]
          });
        }
        console.log(toReturn);
      }
      return toReturn;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1jaGt0ZXgvbGliL2xpbnRlci1jaGt0ZXguY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVEQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdBLE9BQUEsR0FBVSxPQUFBLENBQVEsYUFBUixDQUhWLENBQUE7O0FBQUEsRUFJQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FBa0IsQ0FBQyxPQUo3QixDQUFBOztBQUFBLEVBTUEsTUFBQSxHQUFTLEdBQUEsQ0FBQSxHQU5ULENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxRQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsMkJBRmI7T0FERjtBQUFBLE1BSUEsVUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sT0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsTUFBbEIsRUFBMEIsTUFBMUIsQ0FEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLDBDQUZiO09BTEY7S0FERjtBQUFBLElBVUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsT0FBQSxDQUFRLG1CQUFSLENBQTRCLENBQUMsT0FBN0IsQ0FBcUMsZUFBckMsQ0FDRSxDQUFDLElBREgsQ0FDUSxTQUFBLEdBQUE7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

//# sourceURL=/home/victor/.atom/packages/linter-chktex/lib/linter-chktex.coffee
