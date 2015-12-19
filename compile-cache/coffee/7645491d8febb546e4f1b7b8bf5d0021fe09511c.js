(function() {
  var ChildProcess, exportsCommand;

  console.log(process.env);

  ChildProcess = require('child_process');

  exportsCommand = process.env.SHELL + " -lc export";

  ChildProcess.exec(exportsCommand, function(error, stdout, stderr) {
    var definition, key, value, _i, _len, _ref, _ref1, _results;
    _ref = stdout.trim().split('\n');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      definition = _ref[_i];
      _ref1 = definition.split('=', 2), key = _ref1[0], value = _ref1[1];
      _results.push(process.env[key] = value);
    }
    return _results;
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC1ydW5uZXIvZXhhbXBsZXMvZW52aXJvbm1lbnQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBRUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFPLENBQUMsR0FBcEIsQ0FBQSxDQUFBOztBQUFBLEVBRUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSLENBRmYsQ0FBQTs7QUFBQSxFQUtBLGNBQUEsR0FBaUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFaLEdBQW9CLGFBTHJDLENBQUE7O0FBQUEsRUFRQSxZQUFZLENBQUMsSUFBYixDQUFrQixjQUFsQixFQUFrQyxTQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLEdBQUE7QUFDakMsUUFBQSx1REFBQTtBQUFBO0FBQUE7U0FBQSwyQ0FBQTs0QkFBQTtBQUNDLE1BQUEsUUFBZSxVQUFVLENBQUMsS0FBWCxDQUFpQixHQUFqQixFQUFzQixDQUF0QixDQUFmLEVBQUMsY0FBRCxFQUFNLGdCQUFOLENBQUE7QUFBQSxvQkFDQSxPQUFPLENBQUMsR0FBSSxDQUFBLEdBQUEsQ0FBWixHQUFtQixNQURuQixDQUREO0FBQUE7b0JBRGlDO0VBQUEsQ0FBbEMsQ0FSQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/script-runner/examples/environment.coffee
