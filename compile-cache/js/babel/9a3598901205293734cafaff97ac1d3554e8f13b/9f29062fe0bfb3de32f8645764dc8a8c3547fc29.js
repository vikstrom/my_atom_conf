"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitStatusView = (function () {
  function GitStatusView(project) {
    _classCallCheck(this, GitStatusView);

    this.element = document.createElement("div");
    this.element.classList.add("git-status");
    this.element.tabIndex = -1;
  }

  _createClass(GitStatusView, [{
    key: "serialize",
    value: function serialize() {}
  }, {
    key: "destroy",
    value: function destroy() {
      this.element.remove();
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
  }, {
    key: "empty",
    value: function empty() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  }, {
    key: "renderRepoNotFound",
    value: function renderRepoNotFound() {
      this.empty();

      var notFoundNode = document.createElement("div");
      notFoundNode.classList.add("git-status-empty");
      notFoundNode.textContent = "couldn't found any repository in current project";
      this.element.appendChild(notFoundNode);
    }
  }, {
    key: "renderEmpty",
    value: function renderEmpty() {
      this.empty();

      var emptyNode = document.createElement("div");
      emptyNode.classList.add("git-status-empty");
      emptyNode.textContent = "nothing to commit, working directory clean";
      this.element.appendChild(emptyNode);
    }
  }, {
    key: "renderList",
    value: function renderList(list) {
      var _this = this;

      this.empty();

      list.forEach(function (item) {
        var path = item.path;
        var status = item.status;
        var rootDir = item.rootDir;

        var itemNode = document.createElement("div");
        var modifierClass = undefined;

        switch (status) {
          case "??":
            modifierClass = "untracked";
            break;
          case "A ":
            modifierClass = "added";
            break;
          case "AD":
          case "MD":
          case " D":
          case "D ":
            modifierClass = "deleted";
            break;
          case "AM":
          case "MM":
          case "M ":
          case " M":
            modifierClass = "modified";
            break;
          default:
            modifierClass = "unknown";
        }

        itemNode.classList.add("git-status-item");
        itemNode.classList.add(modifierClass);
        if (modifierClass !== "deleted") {
          itemNode.addEventListener("click", function () {
            atom.workspace.open(rootDir + "/" + path, {});
          });
        }
        itemNode.textContent = "[" + status + "] " + rootDir + "/" + path;
        _this.element.appendChild(itemNode);
      });
    }
  }]);

  return GitStatusView;
})();

exports["default"] = GitStatusView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9naXQtc3RhdHVzL2xpYi9HaXRTdGF0dXNWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7OztJQUVTLGFBQWE7QUFDckIsV0FEUSxhQUFhLENBQ3BCLE9BQU8sRUFBRTswQkFERixhQUFhOztBQUU5QixRQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0MsUUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLFFBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQzVCOztlQUxrQixhQUFhOztXQU92QixxQkFBRyxFQUFFOzs7V0FFUCxtQkFBRztBQUNSLFVBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDdkI7OztXQUVTLHNCQUFHO0FBQ1gsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7V0FFSyxpQkFBRztBQUNQLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDOUIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztPQUNuRDtLQUNGOzs7V0FFa0IsOEJBQUc7QUFDcEIsVUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUViLFVBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakQsa0JBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDL0Msa0JBQVksQ0FBQyxXQUFXLEdBQUcsa0RBQWtELENBQUM7QUFDOUUsVUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDeEM7OztXQUVXLHVCQUFHO0FBQ2IsVUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUViLFVBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsZUFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM1QyxlQUFTLENBQUMsV0FBVyxHQUFHLDRDQUE0QyxDQUFDO0FBQ3JFLFVBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3JDOzs7V0FFUyxvQkFBQyxJQUFJLEVBQUU7OztBQUNmLFVBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFYixVQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO1lBQ2hCLElBQUksR0FBcUIsSUFBSSxDQUE3QixJQUFJO1lBQUUsTUFBTSxHQUFhLElBQUksQ0FBdkIsTUFBTTtZQUFFLE9BQU8sR0FBSSxJQUFJLENBQWYsT0FBTzs7QUFDMUIsWUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxZQUFJLGFBQWEsWUFBQSxDQUFDOztBQUVsQixnQkFBUSxNQUFNO0FBQ1osZUFBSyxJQUFJO0FBQ1AseUJBQWEsR0FBRyxXQUFXLENBQUM7QUFDNUIsa0JBQU07QUFBQSxBQUNSLGVBQUssSUFBSTtBQUNQLHlCQUFhLEdBQUcsT0FBTyxDQUFDO0FBQ3hCLGtCQUFNO0FBQUEsQUFDUixlQUFLLElBQUksQ0FBQztBQUNWLGVBQUssSUFBSSxDQUFDO0FBQ1YsZUFBSyxJQUFJLENBQUM7QUFDVixlQUFLLElBQUk7QUFDUCx5QkFBYSxHQUFHLFNBQVMsQ0FBQztBQUMxQixrQkFBTTtBQUFBLEFBQ1IsZUFBSyxJQUFJLENBQUM7QUFDVixlQUFLLElBQUksQ0FBQztBQUNWLGVBQUssSUFBSSxDQUFDO0FBQ1YsZUFBSyxJQUFJO0FBQ1AseUJBQWEsR0FBRyxVQUFVLENBQUM7QUFDM0Isa0JBQU07QUFBQSxBQUNSO0FBQ0UseUJBQWEsR0FBRyxTQUFTLENBQUM7QUFBQSxTQUM3Qjs7QUFFRCxnQkFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMxQyxnQkFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsWUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO0FBQy9CLGtCQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDdkMsZ0JBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFJLE9BQU8sU0FBSSxJQUFJLEVBQUksRUFBRSxDQUFDLENBQUM7V0FDL0MsQ0FBQyxDQUFDO1NBQ0o7QUFDRCxnQkFBUSxDQUFDLFdBQVcsU0FBTyxNQUFNLFVBQUssT0FBTyxTQUFJLElBQUksQUFBRSxDQUFDO0FBQ3hELGNBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUNwQyxDQUFDLENBQUM7S0FDSjs7O1NBbEZrQixhQUFhOzs7cUJBQWIsYUFBYSIsImZpbGUiOiIvaG9tZS92aWN0b3IvLmF0b20vcGFja2FnZXMvZ2l0LXN0YXR1cy9saWIvR2l0U3RhdHVzVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpdFN0YXR1c1ZpZXcge1xuICBjb25zdHJ1Y3Rvcihwcm9qZWN0KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdpdC1zdGF0dXNcIik7XG4gICAgdGhpcy5lbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gIH1cblxuICBzZXJpYWxpemUoKSB7fVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpO1xuICB9XG5cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9XG5cbiAgZW1wdHkgKCkge1xuICAgIHdoaWxlICh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJSZXBvTm90Rm91bmQgKCkge1xuICAgIHRoaXMuZW1wdHkoKTtcblxuICAgIGxldCBub3RGb3VuZE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG5vdEZvdW5kTm9kZS5jbGFzc0xpc3QuYWRkKFwiZ2l0LXN0YXR1cy1lbXB0eVwiKTtcbiAgICBub3RGb3VuZE5vZGUudGV4dENvbnRlbnQgPSBcImNvdWxkbid0IGZvdW5kIGFueSByZXBvc2l0b3J5IGluIGN1cnJlbnQgcHJvamVjdFwiO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChub3RGb3VuZE5vZGUpO1xuICB9XG5cbiAgcmVuZGVyRW1wdHkgKCkge1xuICAgIHRoaXMuZW1wdHkoKTtcblxuICAgIGxldCBlbXB0eU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVtcHR5Tm9kZS5jbGFzc0xpc3QuYWRkKFwiZ2l0LXN0YXR1cy1lbXB0eVwiKTtcbiAgICBlbXB0eU5vZGUudGV4dENvbnRlbnQgPSBcIm5vdGhpbmcgdG8gY29tbWl0LCB3b3JraW5nIGRpcmVjdG9yeSBjbGVhblwiO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChlbXB0eU5vZGUpO1xuICB9XG5cbiAgcmVuZGVyTGlzdChsaXN0KSB7XG4gICAgdGhpcy5lbXB0eSgpO1xuXG4gICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBsZXQge3BhdGgsIHN0YXR1cywgcm9vdERpcn0gPSBpdGVtO1xuICAgICAgbGV0IGl0ZW1Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGxldCBtb2RpZmllckNsYXNzO1xuXG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlIFwiPz9cIjpcbiAgICAgICAgICBtb2RpZmllckNsYXNzID0gXCJ1bnRyYWNrZWRcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkEgXCI6XG4gICAgICAgICAgbW9kaWZpZXJDbGFzcyA9IFwiYWRkZWRcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkFEXCI6XG4gICAgICAgIGNhc2UgXCJNRFwiOlxuICAgICAgICBjYXNlIFwiIERcIjpcbiAgICAgICAgY2FzZSBcIkQgXCI6XG4gICAgICAgICAgbW9kaWZpZXJDbGFzcyA9IFwiZGVsZXRlZFwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQU1cIjpcbiAgICAgICAgY2FzZSBcIk1NXCI6XG4gICAgICAgIGNhc2UgXCJNIFwiOlxuICAgICAgICBjYXNlIFwiIE1cIjpcbiAgICAgICAgICBtb2RpZmllckNsYXNzID0gXCJtb2RpZmllZFwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1vZGlmaWVyQ2xhc3MgPSBcInVua25vd25cIjtcbiAgICAgIH1cblxuICAgICAgaXRlbU5vZGUuY2xhc3NMaXN0LmFkZChcImdpdC1zdGF0dXMtaXRlbVwiKTtcbiAgICAgIGl0ZW1Ob2RlLmNsYXNzTGlzdC5hZGQobW9kaWZpZXJDbGFzcyk7XG4gICAgICBpZiAobW9kaWZpZXJDbGFzcyAhPT0gXCJkZWxldGVkXCIpIHtcbiAgICAgICAgaXRlbU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGAke3Jvb3REaXJ9LyR7cGF0aH1gLCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaXRlbU5vZGUudGV4dENvbnRlbnQgPSBgWyR7c3RhdHVzfV0gJHtyb290RGlyfS8ke3BhdGh9YDtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpdGVtTm9kZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
//# sourceURL=/home/victor/.atom/packages/git-status/lib/GitStatusView.js
