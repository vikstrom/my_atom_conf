(function() {
  var File, UntrackedFile, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../../git');

  File = require('./file');

  module.exports = UntrackedFile = (function(_super) {
    __extends(UntrackedFile, _super);

    function UntrackedFile() {
      this.moveToTrash = __bind(this.moveToTrash, this);
      this.kill = __bind(this.kill, this);
      return UntrackedFile.__super__.constructor.apply(this, arguments);
    }

    UntrackedFile.prototype.sortValue = 0;

    UntrackedFile.prototype.kill = function() {
      return atom.confirm({
        message: "Move \"" + (this.path()) + "\" to trash?",
        buttons: {
          'Trash': this.moveToTrash,
          'Cancel': null
        }
      });
    };

    UntrackedFile.prototype.moveToTrash = function() {
      return this.trigger('update');
    };

    UntrackedFile.prototype.isUntracked = function() {
      return true;
    };

    UntrackedFile.prototype.toggleDiff = function() {};

    return UntrackedFile;

  })(File);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL2F0b21hdGlnaXQvbGliL21vZGVscy9maWxlcy91bnRyYWNrZWQtZmlsZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0JBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU8sT0FBQSxDQUFRLFdBQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFHSixvQ0FBQSxDQUFBOzs7Ozs7S0FBQTs7QUFBQSw0QkFBQSxTQUFBLEdBQVcsQ0FBWCxDQUFBOztBQUFBLDRCQUVBLElBQUEsR0FBTSxTQUFBLEdBQUE7YUFDSixJQUFJLENBQUMsT0FBTCxDQUNFO0FBQUEsUUFBQSxPQUFBLEVBQVUsU0FBQSxHQUFRLENBQUMsSUFBQyxDQUFBLElBQUQsQ0FBQSxDQUFELENBQVIsR0FBaUIsY0FBM0I7QUFBQSxRQUNBLE9BQUEsRUFDRTtBQUFBLFVBQUEsT0FBQSxFQUFTLElBQUMsQ0FBQSxXQUFWO0FBQUEsVUFDQSxRQUFBLEVBQVUsSUFEVjtTQUZGO09BREYsRUFESTtJQUFBLENBRk4sQ0FBQTs7QUFBQSw0QkFTQSxXQUFBLEdBQWEsU0FBQSxHQUFBO2FBRVgsSUFBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBRlc7SUFBQSxDQVRiLENBQUE7O0FBQUEsNEJBYUEsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQWJiLENBQUE7O0FBQUEsNEJBZUEsVUFBQSxHQUFZLFNBQUEsR0FBQSxDQWZaLENBQUE7O3lCQUFBOztLQUgwQixLQUo1QixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/victor/.atom/packages/atomatigit/lib/models/files/untracked-file.coffee
