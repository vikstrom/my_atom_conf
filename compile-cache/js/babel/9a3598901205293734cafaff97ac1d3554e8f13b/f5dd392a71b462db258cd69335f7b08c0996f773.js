"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  config: {
    execPath: {
      title: "GCC Executable Path",
      description: "Note for Windows/Mac OSX users: please ensure that GCC is in your ```$PATH``` otherwise the linter might not work. If your path contains spaces, it needs to be enclosed in double quotes.",
      type: "string",
      "default": "/usr/bin/g++"
    },
    gccIncludePaths: {
      title: "GCC Include Paths",
      description: "Enter your include paths as a comma-separated list. Paths starting with ```.``` or ```..``` are expanded relative to the project root/file path. If any of your paths contain spaces, they need to be enclosed in double quotes.",
      type: "string",
      "default": " "
    },
    gccSuppressWarnings: {
      title: "Suppress GCC Warnings",
      type: "boolean",
      "default": false
    },
    gccDefaultCFlags: {
      title: "C Flags",
      type: "string",
      "default": "-Wall"
    },
    gccDefaultCppFlags: {
      title: "C++ Flags",
      type: "string",
      "default": "-Wall -std=c++11"
    },
    gccErrorLimit: {
      title: "GCC Error Limit",
      type: "integer",
      "default": 0
    }
  },

  activate: function activate() {
    if (!atom.packages.getLoadedPackages("linter")) {
      atom.notifications.addError("Linter package not found.", {
        detail: "Please install the `linter` package in your Settings view."
      });
    }
    require("atom-package-deps").install("linter-gcc");
  },

  provideLinter: function provideLinter() {
    var helpers = require("atom-linter");
    var regex = "(?<file>.+):(?<line>\\d+):(?<col>\\d+):\\s*\\w*\\s*(?<type>(error|warning|note)):\\s*(?<message>.*)";

    // Read configuration data from JSON file .gcc-config.json
    // in project root
    return {
      grammarScopes: ["source.c", "source.cpp"],
      scope: "file",
      lintOnFly: false,
      lint: function lint(activeEditor) {
        config = require("./config");
        var path = require('path');
        settings = config.settings();
        var file = activeEditor.getPath();
        var cwd = atom.project.getPaths()[0];
        if (!cwd) {
          editor = atom.workspace.getActivePaneItem();
          if (editor) {
            file = editor.buffer.file;
            if (file) {
              cwd = file.getParent().getPath();
            }
          }
        }
        command = settings.execPath;

        // Expand path if necessary
        if (command.substring(0, 1) == ".") {
          command = path.join(cwd, command);
        }

        args = [];

        if (activeEditor.getGrammar().name === "C++") {
          s = settings.gccDefaultCppFlags;
          tempargs = s.split(" ");
          args = args.concat(tempargs);
        } else if (activeEditor.getGrammar().name === "C") {
          s = settings.gccDefaultCFlags;
          tempargs = s.split(" ");
          args = args.concat(tempargs);
        }

        args.push("-fmax-errors=" + settings.gccErrorLimit);
        if (settings.gccSuppressWarnings) {
          args.push("-w");
        }

        var s = settings.gccIncludePaths;
        s = s.trim();
        if (s.length != 0) {
          tempargs = s.split(",");
          tempargs.forEach(function (entry) {
            entry = entry.trim();
            if (entry.length != 0) {
              if (entry.substring(0, 1) == ".") {
                entry = path.join(cwd, entry);
              }
              item = "-I" + entry;
              args.push(item);
            }
          });
        }

        args.push(file);

        full_command = "linter-gcc: " + command;
        args.forEach(function (entry) {
          full_command = full_command + " " + entry;
        });

        console.log(full_command);
        return helpers.exec(command, args, { stream: "stderr" }).then(function (output) {
          messages = helpers.parse(output, regex);
          var searchString = "error";
          var error_pos = output.indexOf(searchString);
          if (messages.length == 0) {
            if (error_pos != -1) {
              messages.push({
                type: "GCC",
                text: output.substring(error_pos, output.length - 1)
              });
            }
          }
          return messages;
        });
      }
    };
  }
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9saW50ZXItZ2NjL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7cUJBRUc7QUFDYixRQUFNLEVBQUU7QUFDTixZQUFRLEVBQUU7QUFDUixXQUFLLEVBQUUscUJBQXFCO0FBQzVCLGlCQUFXLEVBQUUsNExBQTRMO0FBQ3pNLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsY0FBYztLQUN4QjtBQUNELG1CQUFlLEVBQUU7QUFDZixXQUFLLEVBQUUsbUJBQW1CO0FBQzFCLGlCQUFXLEVBQUUsa09BQWtPO0FBQy9PLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsR0FBRztLQUNiO0FBQ0QsdUJBQW1CLEVBQUU7QUFDbkIsV0FBSyxFQUFFLHVCQUF1QjtBQUM5QixVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFTLEtBQUs7S0FDZjtBQUNELG9CQUFnQixFQUFFO0FBQ2hCLFdBQUssRUFBRSxTQUFTO0FBQ2hCLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsT0FBTztLQUNqQjtBQUNELHNCQUFrQixFQUFFO0FBQ2xCLFdBQUssRUFBRSxXQUFXO0FBQ2xCLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsa0JBQWtCO0tBQzVCO0FBQ0QsaUJBQWEsRUFBRTtBQUNiLFdBQUssRUFBRSxpQkFBaUI7QUFDeEIsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxDQUFDO0tBQ1g7R0FDRjs7QUFFRCxVQUFRLEVBQUUsb0JBQU07QUFDZCxRQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUM3QyxVQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FDekIsMkJBQTJCLEVBQzNCO0FBQ0UsY0FBTSxFQUFFLDREQUE0RDtPQUNyRSxDQUNGLENBQUM7S0FDSDtBQUNELFdBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZ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Q0FBQyxDQUFDO2FBQ047V0FDSjtBQUNELGlCQUFPLFFBQVEsQ0FBQztTQUNuQixDQUNGLENBQUM7T0FDSDtLQUNGLENBQUM7R0FDSDtDQUNGIiwiZmlsZSI6Ii9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9saW50ZXItZ2NjL2xpYi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBleGVjUGF0aDoge1xuICAgICAgdGl0bGU6IFwiR0NDIEV4ZWN1dGFibGUgUGF0aFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiTm90ZSBmb3IgV2luZG93cy9NYWMgT1NYIHVzZXJzOiBwbGVhc2UgZW5zdXJlIHRoYXQgR0NDIGlzIGluIHlvdXIgYGBgJFBBVEhgYGAgb3RoZXJ3aXNlIHRoZSBsaW50ZXIgbWlnaHQgbm90IHdvcmsuIElmIHlvdXIgcGF0aCBjb250YWlucyBzcGFjZXMsIGl0IG5lZWRzIHRvIGJlIGVuY2xvc2VkIGluIGRvdWJsZSBxdW90ZXMuXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgZGVmYXVsdDogXCIvdXNyL2Jpbi9nKytcIlxuICAgIH0sXG4gICAgZ2NjSW5jbHVkZVBhdGhzOiB7XG4gICAgICB0aXRsZTogXCJHQ0MgSW5jbHVkZSBQYXRoc1wiLFxuICAgICAgZGVzY3JpcHRpb246IFwiRW50ZXIgeW91ciBpbmNsdWRlIHBhdGhzIGFzIGEgY29tbWEtc2VwYXJhdGVkIGxpc3QuIFBhdGhzIHN0YXJ0aW5nIHdpdGggYGBgLmBgYCBvciBgYGAuLmBgYCBhcmUgZXhwYW5kZWQgcmVsYXRpdmUgdG8gdGhlIHByb2plY3Qgcm9vdC9maWxlIHBhdGguIElmIGFueSBvZiB5b3VyIHBhdGhzIGNvbnRhaW4gc3BhY2VzLCB0aGV5IG5lZWQgdG8gYmUgZW5jbG9zZWQgaW4gZG91YmxlIHF1b3Rlcy5cIixcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZWZhdWx0OiBcIiBcIlxuICAgIH0sXG4gICAgZ2NjU3VwcHJlc3NXYXJuaW5nczoge1xuICAgICAgdGl0bGU6IFwiU3VwcHJlc3MgR0NDIFdhcm5pbmdzXCIsXG4gICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBnY2NEZWZhdWx0Q0ZsYWdzOiB7XG4gICAgICB0aXRsZTogXCJDIEZsYWdzXCIsXG4gICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgZGVmYXVsdDogXCItV2FsbFwiXG4gICAgfSxcbiAgICBnY2NEZWZhdWx0Q3BwRmxhZ3M6IHtcbiAgICAgIHRpdGxlOiBcIkMrKyBGbGFnc1wiLFxuICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgIGRlZmF1bHQ6IFwiLVdhbGwgLXN0ZD1jKysxMVwiXG4gICAgfSxcbiAgICBnY2NFcnJvckxpbWl0OiB7XG4gICAgICB0aXRsZTogXCJHQ0MgRXJyb3IgTGltaXRcIixcbiAgICAgIHR5cGU6IFwiaW50ZWdlclwiLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcblxuICBhY3RpdmF0ZTogKCkgPT4ge1xuICAgIGlmKCFhdG9tLnBhY2thZ2VzLmdldExvYWRlZFBhY2thZ2VzKFwibGludGVyXCIpKSB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXG4gICAgICAgIFwiTGludGVyIHBhY2thZ2Ugbm90IGZvdW5kLlwiLFxuICAgICAgICB7XG4gICAgICAgICAgZGV0YWlsOiBcIlBsZWFzZSBpbnN0YWxsIHRoZSBgbGludGVyYCBwYWNrYWdlIGluIHlvdXIgU2V0dGluZ3Mgdmlldy5cIlxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICByZXF1aXJlKFwiYXRvbS1wYWNrYWdlLWRlcHNcIikuaW5zdGFsbChcImxpbnRlci1nY2NcIik7XG4gIH0sXG5cbiAgcHJvdmlkZUxpbnRlcjogKCkgPT4ge1xuICAgIGNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKFwiYXRvbS1saW50ZXJcIik7XG4gICAgY29uc3QgcmVnZXggPSBcIig/PGZpbGU+LispOig/PGxpbmU+XFxcXGQrKTooPzxjb2w+XFxcXGQrKTpcXFxccypcXFxcdypcXFxccyooPzx0eXBlPihlcnJvcnx3YXJuaW5nfG5vdGUpKTpcXFxccyooPzxtZXNzYWdlPi4qKVwiO1xuXG4gICAgLy8gUmVhZCBjb25maWd1cmF0aW9uIGRhdGEgZnJvbSBKU09OIGZpbGUgLmdjYy1jb25maWcuanNvblxuICAgIC8vIGluIHByb2plY3Qgcm9vdFxuICAgIHJldHVybiB7XG4gICAgICBncmFtbWFyU2NvcGVzOiBbXCJzb3VyY2UuY1wiLCBcInNvdXJjZS5jcHBcIl0sXG4gICAgICBzY29wZTogXCJmaWxlXCIsXG4gICAgICBsaW50T25GbHk6IGZhbHNlLFxuICAgICAgbGludDogKGFjdGl2ZUVkaXRvcikgPT4ge1xuICAgICAgICBjb25maWcgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG4gICAgICAgIHZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgICAgICBzZXR0aW5ncyA9IGNvbmZpZy5zZXR0aW5ncygpO1xuICAgICAgICB2YXIgZmlsZSA9IGFjdGl2ZUVkaXRvci5nZXRQYXRoKCk7XG4gICAgICAgIHZhciBjd2QgPSBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKVswXVxuICAgICAgICBpZiAoIWN3ZCkge1xuICAgICAgICAgICAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKTtcbiAgICAgICAgICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgICAgICAgICBmaWxlID0gZWRpdG9yLmJ1ZmZlci5maWxlO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN3ZCA9IGZpbGUuZ2V0UGFyZW50KCkuZ2V0UGF0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb21tYW5kID0gc2V0dGluZ3MuZXhlY1BhdGg7XG5cbiAgICAgICAgLy8gRXhwYW5kIHBhdGggaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmIChjb21tYW5kLnN1YnN0cmluZygwLDEpID09IFwiLlwiKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gcGF0aC5qb2luKGN3ZCwgY29tbWFuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzID0gW107XG5cbiAgICAgICAgaWYoYWN0aXZlRWRpdG9yLmdldEdyYW1tYXIoKS5uYW1lID09PSBcIkMrK1wiKSB7XG4gICAgICAgICAgcyA9IHNldHRpbmdzLmdjY0RlZmF1bHRDcHBGbGFncztcbiAgICAgICAgICB0ZW1wYXJncyA9IHMuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdCh0ZW1wYXJncyk7XG4gICAgICAgICB9IGVsc2UgaWYoYWN0aXZlRWRpdG9yLmdldEdyYW1tYXIoKS5uYW1lID09PSBcIkNcIikge1xuICAgICAgICAgIHMgPSBzZXR0aW5ncy5nY2NEZWZhdWx0Q0ZsYWdzO1xuICAgICAgICAgIHRlbXBhcmdzID0gcy5zcGxpdChcIiBcIik7XG4gICAgICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KHRlbXBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucHVzaChgLWZtYXgtZXJyb3JzPSR7c2V0dGluZ3MuZ2NjRXJyb3JMaW1pdH1gKTtcbiAgICAgICAgaWYoc2V0dGluZ3MuZ2NjU3VwcHJlc3NXYXJuaW5ncykge1xuICAgICAgICAgIGFyZ3MucHVzaChcIi13XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHMgPSBzZXR0aW5ncy5nY2NJbmNsdWRlUGF0aHM7XG4gICAgICAgIHMgPSBzLnRyaW0oKTtcbiAgICAgICAgaWYgKHMubGVuZ3RoICE9ICAwKSB7XG4gICAgICAgICAgICB0ZW1wYXJncyA9IHMuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgdGVtcGFyZ3MuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gZW50cnkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuc3Vic3RyaW5nKDAsMSkgPT0gXCIuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5ID0gcGF0aC5qb2luKGN3ZCwgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBcIi1JXCIgKyBlbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncy5wdXNoKGZpbGUpO1xuXG4gICAgICAgIGZ1bGxfY29tbWFuZCA9IFwibGludGVyLWdjYzogXCIgKyBjb21tYW5kO1xuICAgICAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpe1xuICAgICAgICAgICAgZnVsbF9jb21tYW5kID0gZnVsbF9jb21tYW5kICsgXCIgXCIgKyBlbnRyeTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coZnVsbF9jb21tYW5kKTtcbiAgICAgICAgcmV0dXJuIGhlbHBlcnMuZXhlYyhjb21tYW5kLCBhcmdzLCB7c3RyZWFtOiBcInN0ZGVyclwifSkudGhlbihvdXRwdXQgPT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1lc3NhZ2VzID0gaGVscGVycy5wYXJzZShvdXRwdXQsIHJlZ2V4KTtcbiAgICAgICAgICAgICAgdmFyIHNlYXJjaFN0cmluZyA9IFwiZXJyb3JcIjtcbiAgICAgICAgICAgICAgdmFyIGVycm9yX3BvcyA9IG91dHB1dC5pbmRleE9mKHNlYXJjaFN0cmluZyk7XG4gICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGVycm9yX3BvcyAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdDQ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBvdXRwdXQuc3Vic3RyaW5nKGVycm9yX3Bvcywgb3V0cHV0Lmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuIl19
//# sourceURL=/home/victor/.atom/packages/linter-gcc/lib/main.js
