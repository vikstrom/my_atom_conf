(function() {
  var ShellEnvironment;

  ShellEnvironment = require('shell-environment');

  ShellEnvironment.loginEnvironment((function(_this) {
    return function(error, environment) {
      if (environment) {
        return console.log(environment);
      } else {
        return console.log(error);
      }
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC1ydW5uZXIvZXhhbXBsZXMvc2hlbGwtZW52aXJvbm1lbnQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBRUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLG1CQUFSLENBQW5CLENBQUE7O0FBQUEsRUFFQSxnQkFBZ0IsQ0FBQyxnQkFBakIsQ0FBa0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtXQUFBLFNBQUMsS0FBRCxFQUFRLFdBQVIsR0FBQTtBQUM5QixNQUFBLElBQUcsV0FBSDtlQUNJLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWixFQURKO09BQUEsTUFBQTtlQUdJLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixFQUhKO09BRDhCO0lBQUEsRUFBQTtFQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEMsQ0FGQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/script-runner/examples/shell-environment.coffee
