"use babel";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('atom-space-pen-views');

var $ = _require.$;
var ScrollView = _require.ScrollView;

var _require2 = require('atom');

var Point = _require2.Point;
var TextEditor = _require2.TextEditor;

var fs = require('fs-plus');
var path = require('path');
require('./../node_modules/pdfjs-dist/build/pdf.js');
var _ = require('underscore-plus');

var _require3 = require('atom');

var File = _require3.File;
var Disposable = _require3.Disposable;
var CompositeDisposable = _require3.CompositeDisposable;

PDFJS.workerSrc = "file://" + path.resolve(__dirname, "../node_modules/pdfjs-dist/build/pdf.worker.js");

var _require4 = require('child_process');

var exec = _require4.exec;
var execFile = _require4.execFile;

var PdfEditorView = (function (_ScrollView) {
  _inherits(PdfEditorView, _ScrollView);

  _createClass(PdfEditorView, null, [{
    key: 'content',
    value: function content() {
      var _this = this;

      this.div({ 'class': 'pdf-view', tabindex: -1 }, function () {
        _this.div({ outlet: 'container' });
      });
    }
  }]);

  function PdfEditorView(filePath) {
    var _this2 = this;

    _classCallCheck(this, PdfEditorView);

    _get(Object.getPrototypeOf(PdfEditorView.prototype), 'constructor', this).call(this);

    this.currentScale = 1.5;
    this.defaultScale = 1.5;
    this.scaleFactor = 10.0;

    this.filePath = filePath;
    this.file = new File(this.filePath);
    this.canvases = [];

    this.updatePdf();

    this.currentPageNumber = 0;
    this.totalPageNumber = 0;
    this.centersBetweenPages = [];
    this.pageHeights = [];
    this.scrollTopBeforeUpdate = 0;
    this.scrollLeftBeforeUpdate = 0;
    this.updating = false;

    var disposables = new CompositeDisposable();

    var onFileChangeCallback = _.debounce(function () {
      if (_this2.updating) {
        _this2.fileChanged = true;
      } else {
        _this2.updatePdf();
      }
    }, 100);

    disposables.add(this.file.onDidChange(onFileChangeCallback));

    var moveLeftCallback = function moveLeftCallback() {
      return _this2.scrollLeft(_this2.scrollLeft() - $(window).width() / 20);
    };
    var moveRightCallback = function moveRightCallback() {
      return _this2.scrollRight(_this2.scrollRight() + $(window).width() / 20);
    };
    var scrollCallback = function scrollCallback() {
      return _this2.onScroll();
    };
    var resizeHandler = function resizeHandler() {
      return _this2.setCurrentPageNumber();
    };

    var elem = this;

    atom.commands.add('.pdf-view', {
      'core:move-left': moveLeftCallback,
      'core:move-right': moveRightCallback
    });

    elem.on('scroll', scrollCallback);
    disposables.add(new Disposable(function () {
      return $(window).off('scroll', scrollCallback);
    }));

    $(window).on('resize', resizeHandler);
    disposables.add(new Disposable(function () {
      return $(window).off('resize', resizeHandler);
    }));

    atom.commands.add('atom-workspace', {
      'pdf-view:zoom-in': function pdfViewZoomIn() {
        if (atom.workspace.getActivePaneItem() === _this2) {
          _this2.zoomIn();
        }
      },
      'pdf-view:zoom-out': function pdfViewZoomOut() {
        if (atom.workspace.getActivePaneItem() === _this2) {
          _this2.zoomOut();
        }
      },
      'pdf-view:reset-zoom': function pdfViewResetZoom() {
        if (atom.workspace.getActivePaneItem() === _this2) {
          _this2.resetZoom();
        }
      }
    });

    this.dragging = null;

    this.onMouseMove = function (e) {
      if (_this2.dragging) {
        _this2.simpleClick = false;

        _this2.scrollTop(_this2.dragging.scrollTop - (e.screenY - _this2.dragging.y));
        _this2.scrollLeft(_this2.dragging.scrollLeft - (e.screenX - _this2.dragging.x));
        e.preventDefault();
      }
    };

    this.onMouseUp = function (e) {
      _this2.dragging = null;
      $(document).unbind('mousemove', _this2.onMouseMove);
      $(document).unbind('mouseup', _this2.onMouseUp);
      e.preventDefault();
    };

    this.on('mousedown', function (e) {
      _this2.simpleClick = true;
      atom.workspace.paneForItem(_this2).activate();
      _this2.dragging = { x: e.screenX, y: e.screenY, scrollTop: _this2.scrollTop(), scrollLeft: _this2.scrollLeft() };
      $(document).on('mousemove', _this2.onMouseMove);
      $(document).on('mouseup', _this2.onMouseUp);
      e.preventDefault();
    });

    this.on('mousewheel', function (e) {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.originalEvent.wheelDelta > 0) {
          _this2.zoomIn();
        } else if (e.originalEvent.wheelDelta < 0) {
          _this2.zoomOut();
        }
      }
    });
  }

  _createClass(PdfEditorView, [{
    key: 'onCanvasClick',
    value: function onCanvasClick(page, e) {
      var _this3 = this;

      if (this.simpleClick && atom.config.get('pdf-view.enableSyncTeX')) {
        e.preventDefault();
        this.pdfDocument.getPage(page).then(function (pdfPage) {
          var viewport = pdfPage.getViewport(_this3.currentScale);

          var _viewport$convertToPdfPoint = viewport.convertToPdfPoint(e.offsetX, $(_this3.canvases[page - 1]).height() - e.offsetY);

          var _viewport$convertToPdfPoint2 = _slicedToArray(_viewport$convertToPdfPoint, 2);

          x = _viewport$convertToPdfPoint2[0];
          y = _viewport$convertToPdfPoint2[1];

          var callback = function callback(error, stdout, stderr) {
            if (!error) {
              stdout = stdout.replace(/\r\n/g, '\n');
              var attrs = {};
              for (var _line of stdout.split('\n')) {
                var m = _line.match(/^([a-zA-Z]*):(.*)$/);
                if (m) {
                  attrs[m[1]] = m[2];
                }
              }

              var file = attrs.Input;
              var line = attrs.Line;

              if (file && line) {
                var editor = null;
                var pathToOpen = path.normalize(attrs.Input);
                var lineToOpen = +attrs.Line;
                var done = false;
                for (var _editor of atom.workspace.getTextEditors()) {
                  if (_editor.getPath() === pathToOpen) {
                    var position = new Point(lineToOpen - 1, -1);
                    _editor.scrollToBufferPosition(position, { center: true });
                    _editor.setCursorBufferPosition(position);
                    _editor.moveToFirstCharacterOfLine();
                    var pane = atom.workspace.paneForItem(_editor);
                    pane.activateItem(_editor);
                    pane.activate();
                    done = true;
                    break;
                  }
                }

                if (!done) {
                  atom.workspace.open(pathToOpen, { initialLine: lineToOpen, initialColumn: 0 });
                }
              }
            }
          };

          var synctexPath = atom.config.get('pdf-view.syncTeXPath');
          var clickspec = [page, x, y, _this3.filePath].join(':');

          if (synctexPath) {
            execFile(synctexPath, ["edit", "-o", clickspec], callback);
          } else {
            var cmd = 'synctex edit -o "' + clickspec + '"';
            exec(cmd, callback);
          }
        });
      }
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      if (!this.updating) {
        this.scrollTopBeforeUpdate = this.scrollTop();
        this.scrollLeftBeforeUpdate = this.scrollLeft();
      }

      this.setCurrentPageNumber();
    }
  }, {
    key: 'setCurrentPageNumber',
    value: function setCurrentPageNumber() {
      if (!this.pdfDocument) {
        return;
      }

      var center = (this.scrollBottom() + this.scrollTop()) / 2.0;
      this.currentPageNumber = 1;

      if (this.centersBetweenPages.length === 0 && this.pageHeights.length === this.pdfDocument.numPages) for (var pdfPageNumber of _.range(1, this.pdfDocument.numPages + 1)) {
        this.centersBetweenPages.push(this.pageHeights.slice(0, pdfPageNumber).reduce(function (x, y) {
          return x + y;
        }, 0) + pdfPageNumber * 20 - 10);
      }

      for (var pdfPageNumber of _.range(2, this.pdfDocument.numPages + 1)) {
        if (center >= this.centersBetweenPages[pdfPageNumber - 2] && center < this.centersBetweenPages[pdfPageNumber - 1]) {
          this.currentPageNumber = pdfPageNumber;
        }
      }

      atom.views.getView(atom.workspace).dispatchEvent(new Event('pdf-view:current-page-update'));
    }
  }, {
    key: 'finishUpdate',
    value: function finishUpdate() {
      this.updating = false;
      if (this.fileChanged) {
        this.updatePdf();
      }
    }
  }, {
    key: 'updatePdf',
    value: function updatePdf() {
      var _this4 = this;

      this.fileChanged = false;

      if (!fs.existsSync(this.filePath)) {
        return;
      }

      var pdfData = null;

      try {
        pdfData = new Uint8Array(fs.readFileSync(this.filePath));
      } catch (error) {
        if (error.code === 'ENOENT') {
          return;
        }
      }

      this.updating = true;
      this.container.find("canvas").remove();
      this.canvases = [];

      PDFJS.getDocument(pdfData).then(function (pdfDocument) {
        _this4.pdfDocument = pdfDocument;
        _this4.totalPageNumber = _this4.pdfDocument.numPages;

        var _loop = function (pdfPageNumber) {
          var canvas = $("<canvas/>", { 'class': "page-container" }).appendTo(_this4.container)[0];
          _this4.canvases.push(canvas);
          $(canvas).on('click', function (e) {
            return _this4.onCanvasClick(pdfPageNumber, e);
          });
        };

        for (var pdfPageNumber of _.range(1, _this4.pdfDocument.numPages + 1)) {
          _loop(pdfPageNumber);
        }

        _this4.renderPdf();
      }, function () {
        return _this4.finishUpdate();
      });
    }
  }, {
    key: 'renderPdf',
    value: function renderPdf() {
      var _this5 = this;

      var scrollAfterRender = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      this.centersBetweenPages = [];
      this.pageHeights = [];

      var _loop2 = function (pdfPageNumber) {
        var canvas = _this5.canvases[pdfPageNumber - 1];

        _this5.pdfDocument.getPage(pdfPageNumber).then(function (pdfPage) {
          var viewport = pdfPage.getViewport(_this5.currentScale);
          var context = canvas.getContext('2d');

          var outputScale = window.devicePixelRatio;
          canvas.height = Math.floor(viewport.height) * outputScale;
          canvas.width = Math.floor(viewport.width) * outputScale;

          if (outputScale != 1) {
            context._scaleX = outputScale;
            context._scaleY = outputScale;
            context.scale(outputScale, outputScale);
            canvas.style.width = Math.floor(viewport.width) + 'px';
            canvas.style.height = Math.floor(viewport.height) + 'px';
          }

          _this5.pageHeights.push(Math.floor(viewport.height));

          pdfPage.render({ canvasContext: context, viewport: viewport });

          if (pdfPage.pageNumber === _this5.pdfDocument.numPages && scrollAfterRender) {
            _this5.scrollTop(_this5.scrollTopBeforeUpdate);
            _this5.scrollLeft(_this5.scrollLeftBeforeUpdate);
            _this5.setCurrentPageNumber();
            _this5.finishUpdate();
          }
        }, function () {
          return _this5.finishUpdate();
        });
      };

      for (var pdfPageNumber of _.range(1, this.pdfDocument.numPages + 1)) {
        _loop2(pdfPageNumber);
      }
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      return this.adjustSize(100 / (100 + this.scaleFactor));
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      return this.adjustSize((100 + this.scaleFactor) / 100);
    }
  }, {
    key: 'resetZoom',
    value: function resetZoom() {
      return this.adjustSize(this.defaultScale / this.currentScale);
    }
  }, {
    key: 'computeZoomedScrollTop',
    value: function computeZoomedScrollTop(oldScrollTop, oldPageHeights) {
      var pixelsToZoom = 0;
      var spacesToSkip = 0;
      var zoomedPixels = 0;

      for (var pdfPageNumber of _.range(0, this.pdfDocument.numPages)) {
        if (pixelsToZoom + spacesToSkip + oldPageHeights[pdfPageNumber] > oldScrollTop) {
          zoomFactorForPage = this.pageHeights[pdfPageNumber] / oldPageHeights[pdfPageNumber];
          var partOfPageAboveUpperBorder = oldScrollTop - (pixelsToZoom + spacesToSkip);
          zoomedPixels += Math.round(partOfPageAboveUpperBorder * zoomFactorForPage);
          pixelsToZoom += partOfPageAboveUpperBorder;
          break;
        } else {
          pixelsToZoom += oldPageHeights[pdfPageNumber];
          zoomedPixels += this.pageHeights[pdfPageNumber];
        }

        if (pixelsToZoom + spacesToSkip + 20 > oldScrollTop) {
          var partOfPaddingAboveUpperBorder = oldScrollTop - (pixelsToZoom + spacesToSkip);
          spacesToSkip += partOfPaddingAboveUpperBorder;
          break;
        } else {
          spacesToSkip += 20;
        }
      }

      return zoomedPixels + spacesToSkip;
    }
  }, {
    key: 'adjustSize',
    value: function adjustSize(factor) {
      var _this6 = this;

      if (!this.pdfDocument) {
        return;
      }

      var oldScrollTop = this.scrollTop();
      var oldPageHeights = this.pageHeights.slice(0);
      this.currentScale = this.currentScale * factor;
      this.renderPdf(false);

      process.nextTick(function () {
        var newScrollTop = _this6.computeZoomedScrollTop(oldScrollTop, oldPageHeights);
        _this6.scrollTop(newScrollTop);
      });

      process.nextTick(function () {
        var newScrollLeft = _this6.scrollLeft() * factor;
        _this6.scrollLeft(newScrollLeft);
      });
    }
  }, {
    key: 'getCurrentPageNumber',
    value: function getCurrentPageNumber() {
      return this.currentPageNumber;
    }
  }, {
    key: 'getTotalPageNumber',
    value: function getTotalPageNumber() {
      return this.totalPageNumber;
    }
  }, {
    key: 'scrollToPage',
    value: function scrollToPage(pdfPageNumber) {
      if (!this.pdfDocument || isNaN(pdfPageNumber)) {
        return;
      }

      pdfPageNumber = Math.min(pdfPageNumber, this.pdfDocument.numPages);
      pageScrollPosition = this.pageHeights.slice(0, pdfPageNumber - 1).reduce(function (x, y) {
        return x + y;
      }, 0) + (pdfPageNumber - 1) * 20;

      return this.scrollTop(pageScrollPosition);
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return { filePath: this.filePath, deserializer: 'PdfEditorDeserializer' };
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      if (this.filePath) {
        return path.basename(this.filePath);
      } else {
        return 'untitled';
      }
    }
  }, {
    key: 'getURI',
    value: function getURI() {
      return this.filePath;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      return this.filePath;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      return this.detach();
    }
  }, {
    key: 'onDidChangeTitle',
    value: function onDidChangeTitle() {
      return new Disposable(function () {
        return null;
      });
    }
  }, {
    key: 'onDidChangeModified',
    value: function onDidChangeModified() {
      return new Disposable(function () {
        return null;
      });
    }
  }]);

  return PdfEditorView;
})(ScrollView);

exports['default'] = PdfEditorView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9wZGYtdmlldy9saWIvcGRmLWVkaXRvci12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztlQUVVLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQzs7SUFBaEQsQ0FBQyxZQUFELENBQUM7SUFBRSxVQUFVLFlBQVYsVUFBVTs7Z0JBQ1EsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7SUFBcEMsS0FBSyxhQUFMLEtBQUs7SUFBRSxVQUFVLGFBQVYsVUFBVTs7QUFDdEIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixPQUFPLENBQUMsMkNBQTJDLENBQUMsQ0FBQztBQUNyRCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7Z0JBQ1csT0FBTyxDQUFDLE1BQU0sQ0FBQzs7SUFBeEQsSUFBSSxhQUFKLElBQUk7SUFBRSxVQUFVLGFBQVYsVUFBVTtJQUFFLG1CQUFtQixhQUFuQixtQkFBbUI7O0FBRTFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGdEQUFnRCxDQUFDLENBQUM7O2dCQUVqRixPQUFPLENBQUMsZUFBZSxDQUFDOztJQUExQyxJQUFJLGFBQUosSUFBSTtJQUFFLFFBQVEsYUFBUixRQUFROztJQUVFLGFBQWE7WUFBYixhQUFhOztlQUFiLGFBQWE7O1dBQ2xCLG1CQUFHOzs7QUFDZixVQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsU0FBTyxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsWUFBTTtBQUNoRCxjQUFLLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO09BQ2pDLENBQUMsQ0FBQztL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V0FFa0IsK0JBQUc7QUFDcEIsYUFBTyxJQUFJLFVBQVUsQ0FBQztlQUFNLElBQUk7T0FBQSxDQUFDLENBQUM7S0FDbkM7OztTQTdZa0IsYUFBYTtHQUFTLFVBQVU7O3FCQUFoQyxhQUFhIiwiZmlsZSI6Ii9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9wZGYtdmlldy9saWIvcGRmLWVkaXRvci12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIjtcblxubGV0IHskLCBTY3JvbGxWaWV3fSA9IHJlcXVpcmUoJ2F0b20tc3BhY2UtcGVuLXZpZXdzJyk7XG5sZXQge1BvaW50LCBUZXh0RWRpdG9yfSA9IHJlcXVpcmUoJ2F0b20nKTtcbmxldCBmcyA9IHJlcXVpcmUoJ2ZzLXBsdXMnKTtcbmxldCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xucmVxdWlyZSgnLi8uLi9ub2RlX21vZHVsZXMvcGRmanMtZGlzdC9idWlsZC9wZGYuanMnKTtcbmxldCBfID0gcmVxdWlyZSgndW5kZXJzY29yZS1wbHVzJyk7XG5sZXQge0ZpbGUsIERpc3Bvc2FibGUsIENvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSgnYXRvbScpO1xuXG5QREZKUy53b3JrZXJTcmMgPSBcImZpbGU6Ly9cIiArIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vbm9kZV9tb2R1bGVzL3BkZmpzLWRpc3QvYnVpbGQvcGRmLndvcmtlci5qc1wiKTtcblxubGV0IHtleGVjLCBleGVjRmlsZX0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBkZkVkaXRvclZpZXcgZXh0ZW5kcyBTY3JvbGxWaWV3IHtcbiAgc3RhdGljIGNvbnRlbnQoKSB7XG4gICAgdGhpcy5kaXYoe2NsYXNzOiAncGRmLXZpZXcnLCB0YWJpbmRleDogLTF9LCAoKSA9PiB7XG4gICAgICB0aGlzLmRpdih7b3V0bGV0OiAnY29udGFpbmVyJ30pO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZmlsZVBhdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jdXJyZW50U2NhbGUgPSAxLjU7XG4gICAgdGhpcy5kZWZhdWx0U2NhbGUgPSAxLjU7XG4gICAgdGhpcy5zY2FsZUZhY3RvciA9IDEwLjA7XG5cbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG4gICAgdGhpcy5maWxlID0gbmV3IEZpbGUodGhpcy5maWxlUGF0aCk7XG4gICAgdGhpcy5jYW52YXNlcyA9IFtdO1xuXG4gICAgdGhpcy51cGRhdGVQZGYoKTtcblxuICAgIHRoaXMuY3VycmVudFBhZ2VOdW1iZXIgPSAwO1xuICAgIHRoaXMudG90YWxQYWdlTnVtYmVyID0gMDtcbiAgICB0aGlzLmNlbnRlcnNCZXR3ZWVuUGFnZXMgPSBbXTtcbiAgICB0aGlzLnBhZ2VIZWlnaHRzID0gW107XG4gICAgdGhpcy5zY3JvbGxUb3BCZWZvcmVVcGRhdGUgPSAwO1xuICAgIHRoaXMuc2Nyb2xsTGVmdEJlZm9yZVVwZGF0ZSA9IDA7XG4gICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuXG4gICAgbGV0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcblxuICAgIGxldCBvbkZpbGVDaGFuZ2VDYWxsYmFjayA9IF8uZGVib3VuY2UoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudXBkYXRpbmcpIHtcbiAgICAgICAgdGhpcy5maWxlQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZVBkZigpO1xuICAgICAgfVxuICAgIH0sIDEwMCk7XG5cbiAgICBkaXNwb3NhYmxlcy5hZGQodGhpcy5maWxlLm9uRGlkQ2hhbmdlKG9uRmlsZUNoYW5nZUNhbGxiYWNrKSk7XG5cbiAgICBsZXQgbW92ZUxlZnRDYWxsYmFjayA9ICgoKSA9PiB0aGlzLnNjcm9sbExlZnQodGhpcy5zY3JvbGxMZWZ0KCkgLSAkKHdpbmRvdykud2lkdGgoKSAvIDIwKSk7XG4gICAgbGV0IG1vdmVSaWdodENhbGxiYWNrID0gKCgpID0+IHRoaXMuc2Nyb2xsUmlnaHQodGhpcy5zY3JvbGxSaWdodCgpICsgJCh3aW5kb3cpLndpZHRoKCkgLyAyMCkpO1xuICAgIGxldCBzY3JvbGxDYWxsYmFjayA9ICgoKSA9PiB0aGlzLm9uU2Nyb2xsKCkpO1xuICAgIGxldCByZXNpemVIYW5kbGVyID0gKCgpID0+IHRoaXMuc2V0Q3VycmVudFBhZ2VOdW1iZXIoKSk7XG5cbiAgICBsZXQgZWxlbSA9IHRoaXM7XG5cbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnLnBkZi12aWV3Jywge1xuICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogbW92ZUxlZnRDYWxsYmFjayxcbiAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBtb3ZlUmlnaHRDYWxsYmFja1xuICAgIH0pO1xuXG4gICAgZWxlbS5vbignc2Nyb2xsJywgc2Nyb2xsQ2FsbGJhY2spO1xuICAgIGRpc3Bvc2FibGVzLmFkZChuZXcgRGlzcG9zYWJsZSgoKSA9PiAkKHdpbmRvdykub2ZmKCdzY3JvbGwnLCBzY3JvbGxDYWxsYmFjaykpKTtcblxuICAgICQod2luZG93KS5vbigncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG4gICAgZGlzcG9zYWJsZXMuYWRkKG5ldyBEaXNwb3NhYmxlKCgpID0+ICQod2luZG93KS5vZmYoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpKSk7XG5cbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAncGRmLXZpZXc6em9vbS1pbic6ICgpID0+IHtcbiAgICAgICAgaWYgKGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCkgPT09IHRoaXMpIHtcbiAgICAgICAgICB0aGlzLnpvb21JbigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3BkZi12aWV3Onpvb20tb3V0JzogKCkgPT4ge1xuICAgICAgICBpZiAoYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKSA9PT0gdGhpcykge1xuICAgICAgICAgIHRoaXMuem9vbU91dCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3BkZi12aWV3OnJlc2V0LXpvb20nOiAoKSA9PiB7XG4gICAgICAgIGlmIChhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpID09PSB0aGlzKSB7XG4gICAgICAgICAgdGhpcy5yZXNldFpvb20oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFnZ2luZyA9IG51bGw7XG5cbiAgICB0aGlzLm9uTW91c2VNb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc2ltcGxlQ2xpY2sgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNjcm9sbFRvcCh0aGlzLmRyYWdnaW5nLnNjcm9sbFRvcCAtIChlLnNjcmVlblkgLSB0aGlzLmRyYWdnaW5nLnkpKTtcbiAgICAgICAgdGhpcy5zY3JvbGxMZWZ0KHRoaXMuZHJhZ2dpbmcuc2Nyb2xsTGVmdCAtIChlLnNjcmVlblggLSB0aGlzLmRyYWdnaW5nLngpKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9uTW91c2VVcCA9IChlKSA9PiB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gbnVsbDtcbiAgICAgICQoZG9jdW1lbnQpLnVuYmluZCgnbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgICB0aGlzLnNpbXBsZUNsaWNrID0gdHJ1ZTtcbiAgICAgIGF0b20ud29ya3NwYWNlLnBhbmVGb3JJdGVtKHRoaXMpLmFjdGl2YXRlKCk7XG4gICAgICB0aGlzLmRyYWdnaW5nID0ge3g6IGUuc2NyZWVuWCwgeTogZS5zY3JlZW5ZLCBzY3JvbGxUb3A6IHRoaXMuc2Nyb2xsVG9wKCksIHNjcm9sbExlZnQ6IHRoaXMuc2Nyb2xsTGVmdCgpfTtcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW91c2V3aGVlbCcsIChlKSA9PiB7XG4gICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhID4gMCkge1xuICAgICAgICAgIHRoaXMuem9vbUluKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEgPCAwKSB7XG4gICAgICAgICAgdGhpcy56b29tT3V0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2FudmFzQ2xpY2socGFnZSwgZSkge1xuICAgIGlmICh0aGlzLnNpbXBsZUNsaWNrICYmIGF0b20uY29uZmlnLmdldCgncGRmLXZpZXcuZW5hYmxlU3luY1RlWCcpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnBkZkRvY3VtZW50LmdldFBhZ2UocGFnZSkudGhlbigocGRmUGFnZSkgPT4ge1xuICAgICAgICBsZXQgdmlld3BvcnQgPSBwZGZQYWdlLmdldFZpZXdwb3J0KHRoaXMuY3VycmVudFNjYWxlKTtcbiAgICAgICAgW3gseV0gPSB2aWV3cG9ydC5jb252ZXJ0VG9QZGZQb2ludChlLm9mZnNldFgsICQodGhpcy5jYW52YXNlc1twYWdlIC0gMV0pLmhlaWdodCgpIC0gZS5vZmZzZXRZKTtcblxuICAgICAgICBsZXQgY2FsbGJhY2sgPSAoKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIHN0ZG91dCA9IHN0ZG91dC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpO1xuICAgICAgICAgICAgbGV0IGF0dHJzID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdCgnXFxuJykpIHtcbiAgICAgICAgICAgICAgbGV0IG0gPSBsaW5lLm1hdGNoKC9eKFthLXpBLVpdKik6KC4qKSQvKVxuICAgICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgIGF0dHJzW21bMV1dID0gbVsyXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGF0dHJzLklucHV0O1xuICAgICAgICAgICAgbGV0IGxpbmUgPSBhdHRycy5MaW5lO1xuXG4gICAgICAgICAgICBpZiAoZmlsZSAmJiBsaW5lKSB7XG4gICAgICAgICAgICAgIGxldCBlZGl0b3IgPSBudWxsO1xuICAgICAgICAgICAgICBsZXQgcGF0aFRvT3BlbiA9IHBhdGgubm9ybWFsaXplKGF0dHJzLklucHV0KTtcbiAgICAgICAgICAgICAgbGV0IGxpbmVUb09wZW4gPSArYXR0cnMuTGluZTtcbiAgICAgICAgICAgICAgbGV0IGRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgZWRpdG9yIG9mIGF0b20ud29ya3NwYWNlLmdldFRleHRFZGl0b3JzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdG9yLmdldFBhdGgoKSA9PT0gcGF0aFRvT3Blbikge1xuICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gbmV3IFBvaW50KGxpbmVUb09wZW4tMSwgLTEpO1xuICAgICAgICAgICAgICAgICAgZWRpdG9yLnNjcm9sbFRvQnVmZmVyUG9zaXRpb24ocG9zaXRpb24sIHtjZW50ZXI6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICBlZGl0b3IubW92ZVRvRmlyc3RDaGFyYWN0ZXJPZkxpbmUoKTtcbiAgICAgICAgICAgICAgICAgIGxldCBwYW5lID0gYXRvbS53b3Jrc3BhY2UucGFuZUZvckl0ZW0oZWRpdG9yKTtcbiAgICAgICAgICAgICAgICAgIHBhbmUuYWN0aXZhdGVJdGVtKGVkaXRvcik7XG4gICAgICAgICAgICAgICAgICBwYW5lLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghZG9uZSkge1xuICAgICAgICAgICAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4ocGF0aFRvT3Blbiwge2luaXRpYWxMaW5lOiBsaW5lVG9PcGVuLCBpbml0aWFsQ29sdW1uOiAwfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHN5bmN0ZXhQYXRoID0gYXRvbS5jb25maWcuZ2V0KCdwZGYtdmlldy5zeW5jVGVYUGF0aCcpO1xuICAgICAgICBsZXQgY2xpY2tzcGVjID0gW3BhZ2UsIHgsIHksIHRoaXMuZmlsZVBhdGhdLmpvaW4oJzonKTtcblxuICAgICAgICBpZiAoc3luY3RleFBhdGgpIHtcbiAgICAgICAgICBleGVjRmlsZShzeW5jdGV4UGF0aCwgW1wiZWRpdFwiLCBcIi1vXCIsIGNsaWNrc3BlY10sIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgY21kID0gYHN5bmN0ZXggZWRpdCAtbyBcIiR7Y2xpY2tzcGVjfVwiYDtcbiAgICAgICAgICBleGVjKGNtZCwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBpZiAoIXRoaXMudXBkYXRpbmcpIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9wQmVmb3JlVXBkYXRlID0gdGhpcy5zY3JvbGxUb3AoKTtcbiAgICAgIHRoaXMuc2Nyb2xsTGVmdEJlZm9yZVVwZGF0ZSA9IHRoaXMuc2Nyb2xsTGVmdCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q3VycmVudFBhZ2VOdW1iZXIoKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRQYWdlTnVtYmVyKCkge1xuICAgIGlmICghdGhpcy5wZGZEb2N1bWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjZW50ZXIgPSAodGhpcy5zY3JvbGxCb3R0b20oKSArIHRoaXMuc2Nyb2xsVG9wKCkpLzIuMFxuICAgIHRoaXMuY3VycmVudFBhZ2VOdW1iZXIgPSAxXG5cbiAgICBpZiAodGhpcy5jZW50ZXJzQmV0d2VlblBhZ2VzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnBhZ2VIZWlnaHRzLmxlbmd0aCA9PT0gdGhpcy5wZGZEb2N1bWVudC5udW1QYWdlcylcbiAgICAgIGZvciAobGV0IHBkZlBhZ2VOdW1iZXIgb2YgXy5yYW5nZSgxLCB0aGlzLnBkZkRvY3VtZW50Lm51bVBhZ2VzKzEpKSB7XG4gICAgICAgIHRoaXMuY2VudGVyc0JldHdlZW5QYWdlcy5wdXNoKHRoaXMucGFnZUhlaWdodHMuc2xpY2UoMCwgcGRmUGFnZU51bWJlcikucmVkdWNlKCgoeCx5KSA9PiB4ICsgeSksIDApICsgcGRmUGFnZU51bWJlciAqIDIwIC0gMTApO1xuICAgICAgfVxuXG4gICAgZm9yIChsZXQgcGRmUGFnZU51bWJlciBvZiBfLnJhbmdlKDIsIHRoaXMucGRmRG9jdW1lbnQubnVtUGFnZXMrMSkpIHtcbiAgICAgIGlmIChjZW50ZXIgPj0gdGhpcy5jZW50ZXJzQmV0d2VlblBhZ2VzW3BkZlBhZ2VOdW1iZXItMl0gJiYgY2VudGVyIDwgdGhpcy5jZW50ZXJzQmV0d2VlblBhZ2VzW3BkZlBhZ2VOdW1iZXItMV0pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZU51bWJlciA9IHBkZlBhZ2VOdW1iZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncGRmLXZpZXc6Y3VycmVudC1wYWdlLXVwZGF0ZScpKTtcbiAgfVxuXG4gIGZpbmlzaFVwZGF0ZSgpIHtcbiAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuZmlsZUNoYW5nZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlUGRmKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGRmKCkge1xuICAgIHRoaXMuZmlsZUNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGlmICghZnMuZXhpc3RzU3luYyh0aGlzLmZpbGVQYXRoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwZGZEYXRhID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICBwZGZEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZnMucmVhZEZpbGVTeW5jKHRoaXMuZmlsZVBhdGgpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRhaW5lci5maW5kKFwiY2FudmFzXCIpLnJlbW92ZSgpO1xuICAgIHRoaXMuY2FudmFzZXMgPSBbXTtcblxuICAgIFBERkpTLmdldERvY3VtZW50KHBkZkRhdGEpLnRoZW4oKHBkZkRvY3VtZW50KSA9PiB7XG4gICAgICB0aGlzLnBkZkRvY3VtZW50ID0gcGRmRG9jdW1lbnQ7XG4gICAgICB0aGlzLnRvdGFsUGFnZU51bWJlciA9IHRoaXMucGRmRG9jdW1lbnQubnVtUGFnZXM7XG5cbiAgICAgIGZvciAobGV0IHBkZlBhZ2VOdW1iZXIgb2YgXy5yYW5nZSgxLCB0aGlzLnBkZkRvY3VtZW50Lm51bVBhZ2VzKzEpKSB7XG4gICAgICAgIGxldCBjYW52YXMgPSAkKFwiPGNhbnZhcy8+XCIsIHtjbGFzczogXCJwYWdlLWNvbnRhaW5lclwifSkuYXBwZW5kVG8odGhpcy5jb250YWluZXIpWzBdO1xuICAgICAgICB0aGlzLmNhbnZhc2VzLnB1c2goY2FudmFzKTtcbiAgICAgICAgJChjYW52YXMpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLm9uQ2FudmFzQ2xpY2socGRmUGFnZU51bWJlciwgZSkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlclBkZigpO1xuICAgIH0sICgpID0+IHRoaXMuZmluaXNoVXBkYXRlKCkpO1xuICB9XG5cbiAgcmVuZGVyUGRmKHNjcm9sbEFmdGVyUmVuZGVyID0gdHJ1ZSkge1xuICAgIHRoaXMuY2VudGVyc0JldHdlZW5QYWdlcyA9IFtdO1xuICAgIHRoaXMucGFnZUhlaWdodHMgPSBbXTtcblxuICAgIGZvciAobGV0IHBkZlBhZ2VOdW1iZXIgb2YgXy5yYW5nZSgxLCB0aGlzLnBkZkRvY3VtZW50Lm51bVBhZ2VzKzEpKSB7XG4gICAgICBsZXQgY2FudmFzID0gdGhpcy5jYW52YXNlc1twZGZQYWdlTnVtYmVyLTFdO1xuXG4gICAgICB0aGlzLnBkZkRvY3VtZW50LmdldFBhZ2UocGRmUGFnZU51bWJlcikudGhlbigocGRmUGFnZSkgPT4ge1xuICAgICAgICBsZXQgdmlld3BvcnQgPSBwZGZQYWdlLmdldFZpZXdwb3J0KHRoaXMuY3VycmVudFNjYWxlKTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICBsZXQgb3V0cHV0U2NhbGUgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IE1hdGguZmxvb3Iodmlld3BvcnQuaGVpZ2h0KSAqIG91dHB1dFNjYWxlO1xuICAgICAgICBjYW52YXMud2lkdGggPSBNYXRoLmZsb29yKHZpZXdwb3J0LndpZHRoKSAqIG91dHB1dFNjYWxlO1xuXG4gICAgICAgIGlmIChvdXRwdXRTY2FsZSAhPSAxKSB7XG4gICAgICAgICAgY29udGV4dC5fc2NhbGVYID0gb3V0cHV0U2NhbGU7XG4gICAgICAgICAgY29udGV4dC5fc2NhbGVZID0gb3V0cHV0U2NhbGU7XG4gICAgICAgICAgY29udGV4dC5zY2FsZShvdXRwdXRTY2FsZSwgb3V0cHV0U2NhbGUpO1xuICAgICAgICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IE1hdGguZmxvb3Iodmlld3BvcnQud2lkdGgpICsgJ3B4JztcbiAgICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gTWF0aC5mbG9vcih2aWV3cG9ydC5oZWlnaHQpICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFnZUhlaWdodHMucHVzaChNYXRoLmZsb29yKHZpZXdwb3J0LmhlaWdodCkpO1xuXG4gICAgICAgIHBkZlBhZ2UucmVuZGVyKHtjYW52YXNDb250ZXh0OiBjb250ZXh0LCB2aWV3cG9ydDogdmlld3BvcnR9KTtcblxuICAgICAgICBpZiAocGRmUGFnZS5wYWdlTnVtYmVyID09PSB0aGlzLnBkZkRvY3VtZW50Lm51bVBhZ2VzICYmIHNjcm9sbEFmdGVyUmVuZGVyKSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb3AodGhpcy5zY3JvbGxUb3BCZWZvcmVVcGRhdGUpO1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTGVmdCh0aGlzLnNjcm9sbExlZnRCZWZvcmVVcGRhdGUpO1xuICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFBhZ2VOdW1iZXIoKTtcbiAgICAgICAgICB0aGlzLmZpbmlzaFVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAoKSA9PiB0aGlzLmZpbmlzaFVwZGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICB6b29tT3V0KCkge1xuICAgIHJldHVybiB0aGlzLmFkanVzdFNpemUoMTAwIC8gKDEwMCArIHRoaXMuc2NhbGVGYWN0b3IpKTtcbiAgfVxuXG4gIHpvb21JbigpIHtcbiAgICByZXR1cm4gdGhpcy5hZGp1c3RTaXplKCgxMDAgKyB0aGlzLnNjYWxlRmFjdG9yKSAvIDEwMCk7XG4gIH1cblxuICByZXNldFpvb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRqdXN0U2l6ZSh0aGlzLmRlZmF1bHRTY2FsZSAvIHRoaXMuY3VycmVudFNjYWxlKTtcbiAgfVxuXG4gIGNvbXB1dGVab29tZWRTY3JvbGxUb3Aob2xkU2Nyb2xsVG9wLCBvbGRQYWdlSGVpZ2h0cykge1xuICAgIGxldCBwaXhlbHNUb1pvb20gPSAwO1xuICAgIGxldCBzcGFjZXNUb1NraXAgPSAwO1xuICAgIGxldCB6b29tZWRQaXhlbHMgPSAwO1xuXG4gICAgZm9yIChsZXQgcGRmUGFnZU51bWJlciBvZiBfLnJhbmdlKDAsIHRoaXMucGRmRG9jdW1lbnQubnVtUGFnZXMpKSB7XG4gICAgICBpZiAocGl4ZWxzVG9ab29tICsgc3BhY2VzVG9Ta2lwICsgb2xkUGFnZUhlaWdodHNbcGRmUGFnZU51bWJlcl0gPiBvbGRTY3JvbGxUb3ApIHtcbiAgICAgICAgem9vbUZhY3RvckZvclBhZ2UgPSB0aGlzLnBhZ2VIZWlnaHRzW3BkZlBhZ2VOdW1iZXJdIC8gb2xkUGFnZUhlaWdodHNbcGRmUGFnZU51bWJlcl07XG4gICAgICAgIGxldCBwYXJ0T2ZQYWdlQWJvdmVVcHBlckJvcmRlciA9IG9sZFNjcm9sbFRvcCAtIChwaXhlbHNUb1pvb20gKyBzcGFjZXNUb1NraXApO1xuICAgICAgICB6b29tZWRQaXhlbHMgKz0gTWF0aC5yb3VuZChwYXJ0T2ZQYWdlQWJvdmVVcHBlckJvcmRlciAqIHpvb21GYWN0b3JGb3JQYWdlKTtcbiAgICAgICAgcGl4ZWxzVG9ab29tICs9IHBhcnRPZlBhZ2VBYm92ZVVwcGVyQm9yZGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBpeGVsc1RvWm9vbSArPSBvbGRQYWdlSGVpZ2h0c1twZGZQYWdlTnVtYmVyXTtcbiAgICAgICAgem9vbWVkUGl4ZWxzICs9IHRoaXMucGFnZUhlaWdodHNbcGRmUGFnZU51bWJlcl07XG4gICAgICB9XG5cbiAgICAgIGlmIChwaXhlbHNUb1pvb20gKyBzcGFjZXNUb1NraXAgKyAyMCA+IG9sZFNjcm9sbFRvcCkge1xuICAgICAgICBsZXQgcGFydE9mUGFkZGluZ0Fib3ZlVXBwZXJCb3JkZXIgPSBvbGRTY3JvbGxUb3AgLSAocGl4ZWxzVG9ab29tICsgc3BhY2VzVG9Ta2lwKTtcbiAgICAgICAgc3BhY2VzVG9Ta2lwICs9IHBhcnRPZlBhZGRpbmdBYm92ZVVwcGVyQm9yZGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwYWNlc1RvU2tpcCArPSAyMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gem9vbWVkUGl4ZWxzICsgc3BhY2VzVG9Ta2lwO1xuICB9XG5cbiAgYWRqdXN0U2l6ZShmYWN0b3IpIHtcbiAgICBpZiAoIXRoaXMucGRmRG9jdW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgb2xkU2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3AoKTtcbiAgICBsZXQgb2xkUGFnZUhlaWdodHMgPSB0aGlzLnBhZ2VIZWlnaHRzLnNsaWNlKDApO1xuICAgIHRoaXMuY3VycmVudFNjYWxlID0gdGhpcy5jdXJyZW50U2NhbGUgKiBmYWN0b3I7XG4gICAgdGhpcy5yZW5kZXJQZGYoZmFsc2UpO1xuXG4gICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiB7XG4gICAgICBsZXQgbmV3U2Nyb2xsVG9wID0gdGhpcy5jb21wdXRlWm9vbWVkU2Nyb2xsVG9wKG9sZFNjcm9sbFRvcCwgb2xkUGFnZUhlaWdodHMpO1xuICAgICAgdGhpcy5zY3JvbGxUb3AobmV3U2Nyb2xsVG9wKTtcbiAgICB9KTtcblxuICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgbGV0IG5ld1Njcm9sbExlZnQgPSB0aGlzLnNjcm9sbExlZnQoKSAqIGZhY3RvcjtcbiAgICAgIHRoaXMuc2Nyb2xsTGVmdChuZXdTY3JvbGxMZWZ0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRQYWdlTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlTnVtYmVyO1xuICB9XG5cbiAgZ2V0VG90YWxQYWdlTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLnRvdGFsUGFnZU51bWJlcjtcbiAgfVxuXG4gIHNjcm9sbFRvUGFnZShwZGZQYWdlTnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnBkZkRvY3VtZW50IHx8IGlzTmFOKHBkZlBhZ2VOdW1iZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGRmUGFnZU51bWJlciA9IE1hdGgubWluKHBkZlBhZ2VOdW1iZXIsIHRoaXMucGRmRG9jdW1lbnQubnVtUGFnZXMpO1xuICAgIHBhZ2VTY3JvbGxQb3NpdGlvbiA9ICh0aGlzLnBhZ2VIZWlnaHRzLnNsaWNlKDAsIChwZGZQYWdlTnVtYmVyLTEpKS5yZWR1Y2UoKCh4LHkpID0+IHgreSksIDApKSArIChwZGZQYWdlTnVtYmVyIC0gMSkgKiAyMFxuXG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsVG9wKHBhZ2VTY3JvbGxQb3NpdGlvbik7XG4gIH1cblxuICBzZXJpYWxpemUoKSB7XG4gICAgcmV0dXJuIHtmaWxlUGF0aDogdGhpcy5maWxlUGF0aCwgZGVzZXJpYWxpemVyOiAnUGRmRWRpdG9yRGVzZXJpYWxpemVyJ307XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICBpZiAodGhpcy5maWxlUGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpcy5maWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAndW50aXRsZWQnO1xuICAgIH1cbiAgfVxuXG4gIGdldFVSSSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlUGF0aDtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVBhdGg7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICB9XG5cbiAgb25EaWRDaGFuZ2VUaXRsZSgpIHtcbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4gbnVsbCk7XG4gIH1cblxuICBvbkRpZENoYW5nZU1vZGlmaWVkKCkge1xuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiBudWxsKTtcbiAgfVxufVxuIl19
//# sourceURL=/home/victor/.atom/packages/pdf-view/lib/pdf-editor-view.js
