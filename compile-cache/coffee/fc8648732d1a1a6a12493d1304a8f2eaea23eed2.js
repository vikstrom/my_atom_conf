(function() {
  var Git, getPath;

  Git = require('promised-git');

  getPath = function() {
    var _ref;
    if ((_ref = atom.project) != null ? _ref.getRepositories()[0] : void 0) {
      return atom.project.getRepositories()[0].getWorkingDirectory();
    } else if (atom.project) {
      return atom.project.getPath();
    } else {
      return __dirname;
    }
  };

  module.exports = new Git(getPath());

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL2dpdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsWUFBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsY0FBUixDQUFOLENBQUE7O0FBQUEsRUFFQSxPQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsUUFBQSxJQUFBO0FBQUEsSUFBQSx3Q0FBZSxDQUFFLGVBQWQsQ0FBQSxDQUFnQyxDQUFBLENBQUEsVUFBbkM7YUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWIsQ0FBQSxDQUErQixDQUFBLENBQUEsQ0FBRSxDQUFDLG1CQUFsQyxDQUFBLEVBREY7S0FBQSxNQUVLLElBQUcsSUFBSSxDQUFDLE9BQVI7YUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWIsQ0FBQSxFQURHO0tBQUEsTUFBQTthQUdILFVBSEc7S0FIRztFQUFBLENBRlYsQ0FBQTs7QUFBQSxFQVVBLE1BQU0sQ0FBQyxPQUFQLEdBQXFCLElBQUEsR0FBQSxDQUFJLE9BQUEsQ0FBQSxDQUFKLENBVnJCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/git.coffee
