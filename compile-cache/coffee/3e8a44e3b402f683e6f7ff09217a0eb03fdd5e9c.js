(function() {
  var ScriptRunner;

  ScriptRunner = require('../lib/script-runner');

  describe("ScriptRunner", function() {
    var activationPromise, workspaceElement;
    activationPromise = null;
    workspaceElement = null;
    beforeEach(function() {
      workspaceElement = atom.views.getVew(atom.workspace);
      return activationPromise = atom.packages.activatePackage('script-runner');
    });
    return describe("when the script-runner:toggle event is triggered", function() {
      return it("attaches and then detaches the view", function() {
        expect(workspaceElement.find('.script-runner')).not.toExist();
        atom.commands.dispatch(workspaceElement('script-runner:toggle'));
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          expect(workspaceElement.find('.script-runner')).toExist();
          atom.commands.dispatch(workspaceElement('script-runner:toggle'));
          return expect(workspaceElement.find('.script-runner')).not.toExist();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC1ydW5uZXIvc3BlYy9zY3JpcHQtcnVubmVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLHNCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUEsR0FBQTtBQUN2QixRQUFBLG1DQUFBO0FBQUEsSUFBQSxpQkFBQSxHQUFvQixJQUFwQixDQUFBO0FBQUEsSUFDQSxnQkFBQSxHQUFtQixJQURuQixDQUFBO0FBQUEsSUFHQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQVgsQ0FBa0IsSUFBSSxDQUFDLFNBQXZCLENBQW5CLENBQUE7YUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsZUFBOUIsRUFGWDtJQUFBLENBQVgsQ0FIQSxDQUFBO1dBT0EsUUFBQSxDQUFTLGtEQUFULEVBQTZELFNBQUEsR0FBQTthQUMzRCxFQUFBLENBQUcscUNBQUgsRUFBMEMsU0FBQSxHQUFBO0FBQ3hDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLElBQWpCLENBQXNCLGdCQUF0QixDQUFQLENBQStDLENBQUMsR0FBRyxDQUFDLE9BQXBELENBQUEsQ0FBQSxDQUFBO0FBQUEsUUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQUEsQ0FBaUIsc0JBQWpCLENBQXZCLENBSkEsQ0FBQTtBQUFBLFFBTUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQU5BLENBQUE7ZUFTQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsSUFBakIsQ0FBc0IsZ0JBQXRCLENBQVAsQ0FBK0MsQ0FBQyxPQUFoRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUFBLENBQWlCLHNCQUFqQixDQUF2QixDQURBLENBQUE7aUJBRUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLElBQWpCLENBQXNCLGdCQUF0QixDQUFQLENBQStDLENBQUMsR0FBRyxDQUFDLE9BQXBELENBQUEsRUFIRztRQUFBLENBQUwsRUFWd0M7TUFBQSxDQUExQyxFQUQyRDtJQUFBLENBQTdELEVBUnVCO0VBQUEsQ0FBekIsQ0FQQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/script-runner/spec/script-runner-spec.coffee
