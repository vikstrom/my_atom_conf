Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _GitStatusView = require("./GitStatusView");

var _GitStatusView2 = _interopRequireDefault(_GitStatusView);

var _atom = require("atom");

var _GitHelper = require("./GitHelper");

var GitHelper = _interopRequireWildcard(_GitHelper);

"use babel";

exports["default"] = {
  config: {
    gitPath: {
      type: "string",
      "default": "git",
      description: "Where is your git?"
    }
  },

  view: null,
  panel: null,
  subscriptions: null,

  activate: function activate() {
    var _this = this;

    this.view = new _GitStatusView2["default"]();
    this.panel = atom.workspace.addBottomPanel({
      item: this.view.getElement(),
      visible: false
    });

    this.subscriptions = new _atom.CompositeDisposable();
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "git-status:toggle": function gitStatusToggle() {
        return _this.toggle();
      }
    }));
  },

  deactivate: function deactivate() {
    this.panel.destroy();
    this.subscriptions.dispose();
    this.view.destroy();
  },

  toggle: function toggle() {
    var _this2 = this;

    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      if (!GitHelper.hasProjectRepositories()) {
        this.view.renderRepoNotFound();
      } else {
        GitHelper.getStatusList().then(function (list) {
          if (list.length) {
            _this2.view.renderList(list);
          } else {
            _this2.view.renderEmpty();
          }
        });
      }
      this.panel.show();
    }
  }
};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9naXQtc3RhdHVzL2xpYi9HaXRTdGF0dXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7NkJBRTBCLGlCQUFpQjs7OztvQkFDUCxNQUFNOzt5QkFDZixhQUFhOztJQUE1QixTQUFTOztBQUpyQixXQUFXLENBQUM7O3FCQU1HO0FBQ2IsUUFBTSxFQUFFO0FBQ04sV0FBTyxFQUFFO0FBQ1AsVUFBSSxFQUFFLFFBQVE7QUFDZCxpQkFBUyxLQUFLO0FBQ2QsaUJBQVcsRUFBRSxvQkFBb0I7S0FDbEM7R0FDRjs7QUFFRCxNQUFJLEVBQUUsSUFBSTtBQUNWLE9BQUssRUFBRSxJQUFJO0FBQ1gsZUFBYSxFQUFFLElBQUk7O0FBRW5CLFVBQVEsRUFBQSxvQkFBRzs7O0FBQ1QsUUFBSSxDQUFDLElBQUksR0FBRyxnQ0FBbUIsQ0FBQztBQUNoQyxRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0FBQ3pDLFVBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUM1QixhQUFPLEVBQUUsS0FBSztLQUNmLENBQUMsQ0FBQzs7QUFFSCxRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFDO0FBQy9DLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO0FBQ3pELHlCQUFtQixFQUFFO2VBQU0sTUFBSyxNQUFNLEVBQUU7T0FBQTtLQUN6QyxDQUFDLENBQUMsQ0FBQztHQUNMOztBQUdELFlBQVUsRUFBQSxzQkFBRztBQUNYLFFBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckIsUUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM3QixRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3JCOztBQUVELFFBQU0sRUFBQSxrQkFBRzs7O0FBQ1AsUUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFO0FBQzFCLFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbkIsTUFBTTtBQUNMLFVBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsRUFBRTtBQUN2QyxZQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7T0FDaEMsTUFBTTtBQUNMLGlCQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3ZDLGNBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNmLG1CQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDNUIsTUFBTTtBQUNMLG1CQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUN6QjtTQUNGLENBQUMsQ0FBQztPQUNKO0FBQ0QsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjtHQUNGO0NBQ0YiLCJmaWxlIjoiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2dpdC1zdGF0dXMvbGliL0dpdFN0YXR1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmltcG9ydCBHaXRTdGF0dXNWaWV3IGZyb20gXCIuL0dpdFN0YXR1c1ZpZXdcIjtcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tIFwiYXRvbVwiO1xuaW1wb3J0ICogYXMgR2l0SGVscGVyIGZyb20gXCIuL0dpdEhlbHBlclwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGdpdFBhdGg6IHtcbiAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICBkZWZhdWx0OiBcImdpdFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiV2hlcmUgaXMgeW91ciBnaXQ/XCJcbiAgICB9XG4gIH0sXG5cbiAgdmlldzogbnVsbCxcbiAgcGFuZWw6IG51bGwsXG4gIHN1YnNjcmlwdGlvbnM6IG51bGwsXG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy52aWV3ID0gbmV3IEdpdFN0YXR1c1ZpZXcoKTtcbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkQm90dG9tUGFuZWwoe1xuICAgICAgaXRlbTogdGhpcy52aWV3LmdldEVsZW1lbnQoKSxcbiAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoXCJhdG9tLXdvcmtzcGFjZVwiLCB7XG4gICAgICBcImdpdC1zdGF0dXM6dG9nZ2xlXCI6ICgpID0+IHRoaXMudG9nZ2xlKClcbiAgICB9KSk7XG4gIH0sXG5cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMucGFuZWwuZGVzdHJveSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gICAgdGhpcy52aWV3LmRlc3Ryb3koKTtcbiAgfSxcblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMucGFuZWwuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIUdpdEhlbHBlci5oYXNQcm9qZWN0UmVwb3NpdG9yaWVzKCkpIHtcbiAgICAgICAgdGhpcy52aWV3LnJlbmRlclJlcG9Ob3RGb3VuZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgR2l0SGVscGVyLmdldFN0YXR1c0xpc3QoKS50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgaWYgKGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVuZGVyTGlzdChsaXN0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52aWV3LnJlbmRlckVtcHR5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFuZWwuc2hvdygpO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==
//# sourceURL=/home/victor/.atom/packages/git-status/lib/GitStatus.js
