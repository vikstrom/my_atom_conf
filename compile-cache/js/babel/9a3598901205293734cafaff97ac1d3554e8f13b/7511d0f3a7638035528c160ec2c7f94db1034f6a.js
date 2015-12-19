Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _atom = require("atom");

"use babel";

var execGit = function execGit(repository, args) {
  return new Promise(function (resolve, reject) {
    var command = atom.config.get("git-status.gitPath") || "git";
    var options = {
      cwd: repository.getWorkingDirectory()
    };
    var _stdout = "";
    var _stderr = "";
    var exit = function exit(code) {
      if (code === 0) {
        resolve(_stdout);
      } else {
        atom.notifications.addError("Git Status", {
          detail: _stderr,
          dismissable: true
        });
        reject(_stderr);
      }
    };
    new _atom.BufferedProcess({
      command: command,
      args: args,
      options: options,
      exit: exit,
      stdout: function stdout(out) {
        return _stdout += out;
      },
      stderr: function stderr(out) {
        return _stderr += out;
      }
    });
  });
};

var transformStatusOutputToList = function transformStatusOutputToList(output, rootDir) {
  var list = [];
  var statusPattern = /^([ MADRCU?!]{2})\s{1}(.*)/;
  output = output.split("\0");
  for (var i = 0; i < output.length; i++) {
    var line = output[i];
    if (!statusPattern.test(line)) {
      continue;
    }

    var _line$match = line.match(statusPattern);

    var _line$match2 = _slicedToArray(_line$match, 3);

    var _status = _line$match2[1];
    var path = _line$match2[2];

    list.push({ rootDir: rootDir, path: path, status: _status });
  }

  return list;
};

var hasProjectRepositories = function hasProjectRepositories() {
  return atom.project.getRepositories().reduce(function (prev, repo) {
    return repo ? true : prev;
  }, false);
};

exports.hasProjectRepositories = hasProjectRepositories;
var getStatusList = function getStatusList() {
  var promise = new Promise(function (resolve, reject) {
    var gitPromises = [];

    atom.project.getRepositories().forEach(function (repository) {
      if (!repository) {
        return;
      }

      var gitPromise = execGit(repository, ["status", "--porcelain", "--null"]).then(function (output) {
        return transformStatusOutputToList(output, repository.getWorkingDirectory());
      });
      gitPromises.push(gitPromise);
    });

    Promise.all(gitPromises).then(function (values) {
      var list = values.reduce(function (prev, current) {
        return prev.concat(current);
      }, []);
      resolve(list);
    });
  });

  return promise;
};
exports.getStatusList = getStatusList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9naXQtc3RhdHVzL2xpYi9HaXRIZWxwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUU4QixNQUFNOztBQUZwQyxXQUFXLENBQUM7O0FBSVosSUFBSSxPQUFPLEdBQUcsU0FBVixPQUFPLENBQUksVUFBVSxFQUFFLElBQUksRUFBSztBQUNsQyxTQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEtBQUssQ0FBQztBQUM3RCxRQUFJLE9BQU8sR0FBRztBQUNaLFNBQUcsRUFBRSxVQUFVLENBQUMsbUJBQW1CLEVBQUU7S0FDdEMsQ0FBQztBQUNGLFFBQUksT0FBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFJLE9BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsUUFBSSxJQUFJLEdBQUcsU0FBUCxJQUFJLENBQUksSUFBSSxFQUFLO0FBQ25CLFVBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtBQUNkLGVBQU8sQ0FBQyxPQUFNLENBQUMsQ0FBQztPQUNqQixNQUFNO0FBQ0wsWUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO0FBQ3hDLGdCQUFNLEVBQUUsT0FBTTtBQUNkLHFCQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsT0FBTSxDQUFDLENBQUM7T0FDaEI7S0FDRixDQUFDO0FBQ0YsOEJBQW9CO0FBQ2xCLGFBQU8sRUFBUCxPQUFPO0FBQ1AsVUFBSSxFQUFKLElBQUk7QUFDSixhQUFPLEVBQVAsT0FBTztBQUNQLFVBQUksRUFBSixJQUFJO0FBQ0osWUFBTSxFQUFFLGdCQUFDLEdBQUc7ZUFBSyxPQUFNLElBQUksR0FBRztPQUFBO0FBQzlCLFlBQU0sRUFBRSxnQkFBQyxHQUFHO2VBQUssT0FBTSxJQUFJLEdBQUc7T0FBQTtLQUMvQixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDOztBQUVGLElBQUksMkJBQTJCLEdBQUcsU0FBOUIsMkJBQTJCLENBQUksTUFBTSxFQUFFLE9BQU8sRUFBSztBQUNyRCxNQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxNQUFJLGFBQWEsR0FBRyw0QkFBNEIsQ0FBQztBQUNqRCxRQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QyxRQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsUUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDN0IsZUFBUztLQUNWOztzQkFDc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7Ozs7UUFBekMsT0FBTTtRQUFFLElBQUk7O0FBQ25CLFFBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsTUFBTSxFQUFOLE9BQU0sRUFBQyxDQUFDLENBQUM7R0FDcEM7O0FBRUQsU0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDOztBQUVLLElBQUksc0JBQXNCLEdBQUcsU0FBekIsc0JBQXNCLEdBQVM7QUFDeEMsU0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUs7QUFDM0QsV0FBTyxJQUFJLEdBQUcsSUFBSSxHQUFFLElBQUksQ0FBQztHQUMxQixFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ1gsQ0FBQzs7O0FBRUssSUFBSSxhQUFhLEdBQUcsU0FBaEIsYUFBYSxHQUFTO0FBQy9CLE1BQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUM3QyxRQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVSxFQUFLO0FBQ3JELFVBQUksQ0FBQyxVQUFVLEVBQUU7QUFDZixlQUFPO09BQ1I7O0FBRUQsVUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FDdEUsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFLO0FBQ2hCLGVBQU8sMkJBQTJCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7T0FDOUUsQ0FDRixDQUFDO0FBQ0YsaUJBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUIsQ0FBQyxDQUFDOztBQUVILFdBQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFLO0FBQ3hDLFVBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFLO0FBQzFDLGVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUM3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1AsYUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2YsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFNBQU8sT0FBTyxDQUFDO0NBQ2hCLENBQUMiLCJmaWxlIjoiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2dpdC1zdGF0dXMvbGliL0dpdEhlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmltcG9ydCB7QnVmZmVyZWRQcm9jZXNzfSBmcm9tIFwiYXRvbVwiO1xuXG5sZXQgZXhlY0dpdCA9IChyZXBvc2l0b3J5LCBhcmdzKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGNvbW1hbmQgPSBhdG9tLmNvbmZpZy5nZXQoXCJnaXQtc3RhdHVzLmdpdFBhdGhcIikgfHwgXCJnaXRcIjtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIGN3ZDogcmVwb3NpdG9yeS5nZXRXb3JraW5nRGlyZWN0b3J5KCksXG4gICAgfTtcbiAgICBsZXQgc3Rkb3V0ID0gXCJcIjtcbiAgICBsZXQgc3RkZXJyID0gXCJcIjtcbiAgICBsZXQgZXhpdCA9IChjb2RlKSA9PiB7XG4gICAgICBpZiAoY29kZSA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKHN0ZG91dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXCJHaXQgU3RhdHVzXCIsIHtcbiAgICAgICAgICBkZXRhaWw6IHN0ZGVycixcbiAgICAgICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJlamVjdChzdGRlcnIpO1xuICAgICAgfVxuICAgIH07XG4gICAgbmV3IEJ1ZmZlcmVkUHJvY2Vzcyh7XG4gICAgICBjb21tYW5kLFxuICAgICAgYXJncyxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBleGl0LFxuICAgICAgc3Rkb3V0OiAob3V0KSA9PiBzdGRvdXQgKz0gb3V0LFxuICAgICAgc3RkZXJyOiAob3V0KSA9PiBzdGRlcnIgKz0gb3V0XG4gICAgfSk7XG4gIH0pO1xufTtcblxubGV0IHRyYW5zZm9ybVN0YXR1c091dHB1dFRvTGlzdCA9IChvdXRwdXQsIHJvb3REaXIpID0+IHtcbiAgbGV0IGxpc3QgPSBbXTtcbiAgbGV0IHN0YXR1c1BhdHRlcm4gPSAvXihbIE1BRFJDVT8hXXsyfSlcXHN7MX0oLiopLztcbiAgb3V0cHV0ID0gb3V0cHV0LnNwbGl0KFwiXFwwXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkrKykge1xuICAgIGxldCBsaW5lID0gb3V0cHV0W2ldO1xuICAgIGlmICghc3RhdHVzUGF0dGVybi50ZXN0KGxpbmUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgbGV0IFssIHN0YXR1cywgcGF0aF0gPSBsaW5lLm1hdGNoKHN0YXR1c1BhdHRlcm4pO1xuICAgIGxpc3QucHVzaCh7cm9vdERpciwgcGF0aCwgc3RhdHVzfSk7XG4gIH1cblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmV4cG9ydCBsZXQgaGFzUHJvamVjdFJlcG9zaXRvcmllcyA9ICgpID0+IHtcbiAgcmV0dXJuIGF0b20ucHJvamVjdC5nZXRSZXBvc2l0b3JpZXMoKS5yZWR1Y2UoKHByZXYsIHJlcG8pID0+IHtcbiAgICByZXR1cm4gcmVwbyA/IHRydWU6IHByZXY7XG4gIH0sIGZhbHNlKTtcbn07XG5cbmV4cG9ydCBsZXQgZ2V0U3RhdHVzTGlzdCA9ICgpID0+IHtcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGdpdFByb21pc2VzID0gW107XG5cbiAgICBhdG9tLnByb2plY3QuZ2V0UmVwb3NpdG9yaWVzKCkuZm9yRWFjaCgocmVwb3NpdG9yeSkgPT4ge1xuICAgICAgaWYgKCFyZXBvc2l0b3J5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IGdpdFByb21pc2UgPSBleGVjR2l0KHJlcG9zaXRvcnksIFtcInN0YXR1c1wiLCBcIi0tcG9yY2VsYWluXCIsIFwiLS1udWxsXCJdKVxuICAgICAgICAudGhlbigob3V0cHV0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVN0YXR1c091dHB1dFRvTGlzdChvdXRwdXQsIHJlcG9zaXRvcnkuZ2V0V29ya2luZ0RpcmVjdG9yeSgpKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGdpdFByb21pc2VzLnB1c2goZ2l0UHJvbWlzZSk7XG4gICAgfSk7XG5cbiAgICBQcm9taXNlLmFsbChnaXRQcm9taXNlcykudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICBsZXQgbGlzdCA9IHZhbHVlcy5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXYuY29uY2F0KGN1cnJlbnQpO1xuICAgICAgfSwgW10pO1xuICAgICAgcmVzb2x2ZShsaXN0KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuIl19
//# sourceURL=/home/victor/.atom/packages/git-status/lib/GitHelper.js
