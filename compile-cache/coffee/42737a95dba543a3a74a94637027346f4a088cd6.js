(function() {
  var Repo, RepoView, UnstagedFile, fs, path, temp;

  path = require('path');

  fs = require('fs-plus');

  temp = require('temp');

  Repo = require('../lib/models/repo');

  UnstagedFile = require('../lib/models/files').UnstagedFile;

  RepoView = require('../lib/views/repo-view');

  describe("Atomatigit", function() {
    var activationPromise, repo, repoView, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1], repo = _ref[2], repoView = _ref[3];
    beforeEach(function() {
      var projectPath;
      workspaceElement = atom.views.getView(atom.workspace);
      jasmine.attachToDOM(workspaceElement);
      projectPath = temp.mkdirSync('atomatigit-spec-');
      fs.copySync(path.join(__dirname, 'fixtures', 'working-dir'), projectPath);
      fs.moveSync(path.join(projectPath, 'git.git'), path.join(projectPath, '.git'));
      atom.project.setPaths([projectPath]);
      spyOn(UnstagedFile.prototype, 'loadDiff').andCallFake(function() {});
      activationPromise = atom.packages.activatePackage('atomatigit').then(function(_arg) {
        var mainModule;
        mainModule = _arg.mainModule;
        repo = new Repo;
        spyOn(repo, 'reload').andCallFake(function() {
          return new Promise(function(resolve, reject) {
            return resolve();
          });
        });
        repoView = new RepoView(repo);
        mainModule.repo = repo;
        return mainModule.repoView = repoView;
      });
      return waitsForPromise(function() {
        return activationPromise;
      });
    });
    describe('atomatigit:toggle', function() {
      return it('hides and shows the view', function() {
        return runs(function() {
          var atomatigitElement;
          expect(workspaceElement.querySelector('.atomatigit')).not.toExist();
          atom.commands.dispatch(workspaceElement, 'atomatigit:toggle');
          expect(workspaceElement.querySelector('.atomatigit')).toExist();
          atomatigitElement = workspaceElement.querySelector('.atomatigit');
          expect(atomatigitElement).toExist();
          expect(atomatigitElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'atomatigit:toggle');
          expect(workspaceElement.querySelector('.atomatigit')).not.toExist();
          return expect(atomatigitElement).not.toBeVisible();
        });
      });
    });
    describe('atomatigit:branches', function() {
      return it('switch active view', function() {
        return runs(function() {
          var atomatigitElement, branchListElement;
          atom.commands.dispatch(workspaceElement, 'atomatigit:toggle');
          expect(workspaceElement.querySelector('.atomatigit')).toExist();
          atomatigitElement = workspaceElement.querySelector('.atomatigit');
          branchListElement = workspaceElement.querySelector('.branch-list-view');
          expect(branchListElement).toExist();
          expect(branchListElement).not.toBeVisible();
          atom.commands.dispatch(atomatigitElement, 'atomatigit:branches');
          return expect(branchListElement).toBeVisible();
        });
      });
    });
    return describe('atomatigit:commit-log', function() {
      return it('switch active view', function() {
        return runs(function() {
          var atomatigitElement, commitListElement;
          atom.commands.dispatch(workspaceElement, 'atomatigit:toggle');
          expect(workspaceElement.querySelector('.atomatigit')).toExist();
          atomatigitElement = workspaceElement.querySelector('.atomatigit');
          commitListElement = workspaceElement.querySelector('.commit-list-view');
          expect(commitListElement).toExist();
          expect(commitListElement).not.toBeVisible();
          atom.commands.dispatch(atomatigitElement, 'atomatigit:commit-log');
          return expect(commitListElement).toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvc3BlYy9hdG9tYXRpZ2l0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRDQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQURMLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxvQkFBUixDQUhQLENBQUE7O0FBQUEsRUFJQyxlQUFnQixPQUFBLENBQVEscUJBQVIsRUFBaEIsWUFKRCxDQUFBOztBQUFBLEVBS0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSx3QkFBUixDQUxYLENBQUE7O0FBQUEsRUFZQSxRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBLEdBQUE7QUFDckIsUUFBQSx5REFBQTtBQUFBLElBQUEsT0FBd0QsRUFBeEQsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsRUFBc0MsY0FBdEMsRUFBNEMsa0JBQTVDLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLFdBQUE7QUFBQSxNQUFBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FBbkIsQ0FBQTtBQUFBLE1BQ0EsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBREEsQ0FBQTtBQUFBLE1BR0EsV0FBQSxHQUFjLElBQUksQ0FBQyxTQUFMLENBQWUsa0JBQWYsQ0FIZCxDQUFBO0FBQUEsTUFJQSxFQUFFLENBQUMsUUFBSCxDQUFZLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFx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

//# sourceURL=/home/victor/.atom/packages/atomatigit/spec/atomatigit-spec.coffee
