(function() {
  var Convert, ScriptRunnerView, ScrollView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ScrollView = require('atom-space-pen-views').ScrollView;

  Convert = require('ansi-to-html');

  module.exports = ScriptRunnerView = (function(_super) {
    __extends(ScriptRunnerView, _super);

    atom.deserializers.add(ScriptRunnerView);

    ScriptRunnerView.deserialize = function(_arg) {
      var footer, header, output, title, view;
      title = _arg.title, header = _arg.header, output = _arg.output, footer = _arg.footer;
      view = new ScriptRunnerView(title);
      view._header.html(header);
      view._output.html(output);
      view._footer.html(footer);
      return view;
    };

    ScriptRunnerView.content = function() {
      return this.div({
        "class": 'script-runner',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.h1('Script Runner');
          _this.div({
            "class": 'header'
          });
          _this.pre({
            "class": 'output'
          });
          return _this.div({
            "class": 'footer'
          });
        };
      })(this));
    };

    function ScriptRunnerView(title) {
      ScriptRunnerView.__super__.constructor.apply(this, arguments);
      atom.commands.add('div.script-runner', 'run:copy', (function(_this) {
        return function() {
          return _this.copyToClipboard();
        };
      })(this));
      this.convert = new Convert({
        escapeXML: true
      });
      this._header = this.find('.header');
      this._output = this.find('.output');
      this._footer = this.find('.footer');
      this.setTitle(title);
    }

    ScriptRunnerView.prototype.serialize = function() {
      return {
        deserializer: 'ScriptRunnerView',
        title: this.title,
        header: this._header.html(),
        output: this._output.html(),
        footer: this._footer.html()
      };
    };

    ScriptRunnerView.prototype.copyToClipboard = function() {
      return atom.clipboard.write(window.getSelection().toString());
    };

    ScriptRunnerView.prototype.getTitle = function() {
      return "Script Runner: " + this.title;
    };

    ScriptRunnerView.prototype.setTitle = function(title) {
      this.title = title;
      return this.find('h1').html(this.getTitle());
    };

    ScriptRunnerView.prototype.clear = function() {
      this._output.html('');
      this._header.html('');
      return this._footer.html('');
    };

    ScriptRunnerView.prototype.append = function(text, className) {
      var span;
      span = document.createElement('span');
      span.innerHTML = this.convert.toHtml([text]);
      span.className = className || 'stdout';
      return this._output.append(span);
    };

    ScriptRunnerView.prototype.header = function(text) {
      return this._header.html(text);
    };

    ScriptRunnerView.prototype.footer = function(text) {
      return this._footer.html(text);
    };

    return ScriptRunnerView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdmljdG9yLy5hdG9tL3BhY2thZ2VzL3NjcmlwdC1ydW5uZXIvbGliL3NjcmlwdC1ydW5uZXItdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscUNBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLGFBQWMsT0FBQSxDQUFRLHNCQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxjQUFSLENBRFYsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix1Q0FBQSxDQUFBOztBQUFBLElBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFuQixDQUF1QixnQkFBdkIsQ0FBQSxDQUFBOztBQUFBLElBRUEsZ0JBQUMsQ0FBQSxXQUFELEdBQWMsU0FBQyxJQUFELEdBQUE7QUFDWixVQUFBLG1DQUFBO0FBQUEsTUFEYyxhQUFBLE9BQU8sY0FBQSxRQUFRLGNBQUEsUUFBUSxjQUFBLE1BQ3JDLENBQUE7QUFBQSxNQUFBLElBQUEsR0FBVyxJQUFBLGdCQUFBLENBQWlCLEtBQWpCLENBQVgsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFiLENBQWtCLE1BQWxCLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFiLENBQWtCLE1BQWxCLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFiLENBQWtCLE1BQWxCLENBSEEsQ0FBQTtBQUlBLGFBQU8sSUFBUCxDQUxZO0lBQUEsQ0FGZCxDQUFBOztBQUFBLElBU0EsZ0JBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGVBQVA7QUFBQSxRQUF3QixRQUFBLEVB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

//# sourceURL=/home/victor/.atom/packages/script-runner/lib/script-runner-view.coffee
