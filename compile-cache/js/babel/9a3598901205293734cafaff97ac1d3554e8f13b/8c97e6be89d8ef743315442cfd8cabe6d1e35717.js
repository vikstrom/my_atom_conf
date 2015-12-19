function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('./spec-helpers');

var _libLatex = require('../lib/latex');

var _libLatex2 = _interopRequireDefault(_libLatex);

var _stubs = require('./stubs');

'use babel';

describe('Latex', function () {
  var latex = undefined,
      globalLatex = undefined;

  beforeEach(function () {
    globalLatex = global.latex;
    delete global.latex;
    latex = new _libLatex2['default']();
  });

  afterEach(function () {
    global.latex = globalLatex;
  });

  describe('initialize', function () {
    it('initializes all properties', function () {
      spyOn(latex, 'resolveOpenerImplementation').andReturn(_stubs.NullOpener);

      expect(latex.builder).toBeDefined();
      expect(latex.logger).toBeDefined();
      expect(latex.opener).toBeDefined();
    });
  });

  describe('getDefaultBuilder', function () {
    it('returns an instance of LatexmkBuilder by default', function () {
      spyOn(latex, 'useLatexmk').andReturn(true);
      var defaultBuilder = latex.getDefaultBuilder();
      expect(defaultBuilder.constructor.name).toBe('LatexmkBuilder');
    });

    it('returns an instance of TexifyBuilder when chosen', function () {
      spyOn(latex, 'useLatexmk').andReturn(false);
      var defaultBuilder = latex.getDefaultBuilder();
      expect(defaultBuilder.constructor.name).toBe('TexifyBuilder');
    });
  });

  describe('getDefaultLogger', function () {
    it('returns an instance of ConsoleLogger', function () {
      var defaultLogger = latex.getDefaultLogger();

      expect(defaultLogger.constructor.name).toBe('ConsoleLogger');
    });
  });

  describe('getDefaultOpener', function () {
    it('returns an instance of a resolved implementation of Opener', function () {
      spyOn(latex, 'resolveOpenerImplementation').andReturn(_stubs.NullOpener);
      var defaultOpener = latex.getDefaultOpener();

      expect(defaultOpener.constructor.name).toBe(_stubs.NullOpener.name);
    });
  });

  describe('Logger proxy', function () {
    var logger = undefined;

    beforeEach(function () {
      logger = jasmine.createSpyObj('MockLogger', ['error', 'warning', 'info']);
      latex.setLogger(logger);
      latex.createLogProxy();
    });

    it('correctly proxies error to error', function () {
      var statusCode = 0;
      var result = { foo: 'bar' };
      var builder = { run: function run() {
          return '';
        } };
      latex.log.error(statusCode, result, builder);

      expect(logger.error).toHaveBeenCalledWith(statusCode, result, builder);
    });

    it('correctly proxies warning to warning', function () {
      var message = 'foo';
      latex.log.warning(message);

      expect(logger.warning).toHaveBeenCalledWith(message);
    });

    it('correctly proxies info to info', function () {
      var message = 'foo';
      latex.log.info(message);

      expect(logger.info).toHaveBeenCalledWith(message);
    });
  });

  describe('resolveOpenerImplementation', function () {
    it('returns SkimOpener when installed, and running on OS X', function () {
      spyOn(latex, 'skimExecutableExists').andReturn(true);
      var opener = latex.resolveOpenerImplementation('darwin');

      expect(opener.name).toBe('SkimOpener');
    });

    it('returns PreviewOpener when Skim is not installed, and running on OS X', function () {
      spyOn(latex, 'skimExecutableExists').andReturn(false);
      var opener = latex.resolveOpenerImplementation('darwin');

      expect(opener.name).toBe('PreviewOpener');
    });

    it('returns SumatraOpener when installed, and running on Windows', function () {
      spyOn(latex, 'sumatraExecutableExists').andReturn(true);
      var opener = latex.resolveOpenerImplementation('win32');

      expect(opener.name).toBe('SumatraOpener');
    });

    it('returns AtomPdfOpener as a fallback, if the pdf-view package is installed', function () {
      spyOn(latex, 'hasPdfViewerPackage').andReturn(true);
      var opener = latex.resolveOpenerImplementation('foo');

      expect(opener.name).toBe('AtomPdfOpener');
    });

    it('always returns AtomPdfOpener if alwaysOpenResultInAtom is enabled and pdf-view is installed', function () {
      spyOn(latex, 'hasPdfViewerPackage').andReturn(true);
      spyOn(latex, 'shouldOpenResultInAtom').andReturn(true);
      spyOn(latex, 'skimExecutableExists').andCallThrough();

      var opener = latex.resolveOpenerImplementation('darwin');

      expect(opener.name).toBe('AtomPdfOpener');
      expect(latex.skimExecutableExists).not.toHaveBeenCalled();
    });

    it('responds to changes in configuration', function () {
      spyOn(latex, 'hasPdfViewerPackage').andReturn(true);
      spyOn(latex, 'shouldOpenResultInAtom').andReturn(false);
      spyOn(latex, 'skimExecutableExists').andReturn(true);

      var opener = latex.resolveOpenerImplementation('darwin');
      expect(opener.name).toBe('SkimOpener');

      latex.shouldOpenResultInAtom.andReturn(true);
      opener = latex.resolveOpenerImplementation('darwin');
      expect(opener.name).toBe('AtomPdfOpener');

      latex.shouldOpenResultInAtom.andReturn(false);
      opener = latex.resolveOpenerImplementation('darwin');
      expect(opener.name).toBe('SkimOpener');
    });

    it('does not support GNU/Linux', function () {
      spyOn(latex, 'hasPdfViewerPackage').andReturn(false);
      var opener = latex.resolveOpenerImplementation('linux');

      expect(opener).toBeNull();
    });

    it('does not support unknown operating systems without pdf-view package', function () {
      spyOn(latex, 'hasPdfViewerPackage').andReturn(false);
      var opener = latex.resolveOpenerImplementation('foo');

      expect(opener).toBeNull();
    });

    it('returns CustomOpener when custom viewer exists and alwaysOpenResultInAtom is disabled', function () {
      spyOn(latex, 'viewerExecutableExists').andReturn(true);
      spyOn(latex, 'shouldOpenResultInAtom').andReturn(false);
      var opener = latex.resolveOpenerImplementation('foo');

      expect(opener.name).toBe('CustomOpener');
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9sYXRleC9zcGVjL2xhdGV4LXNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFFTyxnQkFBZ0I7O3dCQUNMLGNBQWM7Ozs7cUJBQ1AsU0FBUzs7QUFKbEMsV0FBVyxDQUFBOztBQU1YLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBTTtBQUN0QixNQUFJLEtBQUssWUFBQTtNQUFFLFdBQVcsWUFBQSxDQUFBOztBQUV0QixZQUFVLENBQUMsWUFBTTtBQUNmLGVBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO0FBQzFCLFdBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQTtBQUNuQixTQUFLLEdBQUcsMkJBQVcsQ0FBQTtHQUNwQixDQUFDLENBQUE7O0FBRUYsV0FBUyxDQUFDLFlBQU07QUFDZCxVQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQTtHQUMzQixDQUFDLENBQUE7O0FBRUYsVUFBUSxDQUFDLFlBQVksRUFBRSxZQUFNO0FBQzNCLE1BQUUsQ0FBQyw0QkFBNEIsRUFBRSxZQUFNO0FBQ3JDLFdBQUssQ0FBQyxLQUFLLEVBQUUsNkJBQTZCLENBQUMsQ0FBQyxTQUFTLG1CQUFZLENBQUE7O0FBRWpFLFlBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDbkMsWUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUNsQyxZQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQ25DLENBQUMsQ0FBQTtHQUNILENBQUMsQ0FBQTs7QUFFRixVQUFRLENBQUMsbUJBQW1CLEVBQUUsWUFBTTtBQUNsQyxNQUFFLENBQUMsa0RBQWtELEVBQUUsWUFBTTtBQUMzRCxXQUFLLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMxQyxVQUFN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LENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtLQUMxQixDQUFDLENBQUE7O0FBRUYsTUFBRSxDQUFDLHVGQUF1RixFQUFFLFlBQU07QUFDaEcsV0FBSyxDQUFDLEtBQUssRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN0RCxXQUFLLENBQUMsS0FBSyxFQUFFLHdCQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3ZELFVBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQTs7QUFFdkQsWUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDekMsQ0FBQyxDQUFBO0dBQ0gsQ0FBQyxDQUFBO0NBQ0gsQ0FBQyxDQUFBIiwiZmlsZSI6Ii9ob21lL3ZpY3Rvci8uYXRvbS9wYWNrYWdlcy9sYXRleC9zcGVjL2xhdGV4LXNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG5pbXBvcnQgJy4vc3BlYy1oZWxwZXJzJ1xuaW1wb3J0IExhdGV4IGZyb20gJy4uL2xpYi9sYXRleCdcbmltcG9ydCB7TnVsbE9wZW5lcn0gZnJvbSAnLi9zdHVicydcblxuZGVzY3JpYmUoJ0xhdGV4JywgKCkgPT4ge1xuICBsZXQgbGF0ZXgsIGdsb2JhbExhdGV4XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZ2xvYmFsTGF0ZXggPSBnbG9iYWwubGF0ZXhcbiAgICBkZWxldGUgZ2xvYmFsLmxhdGV4XG4gICAgbGF0ZXggPSBuZXcgTGF0ZXgoKVxuICB9KVxuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgZ2xvYmFsLmxhdGV4ID0gZ2xvYmFsTGF0ZXhcbiAgfSlcblxuICBkZXNjcmliZSgnaW5pdGlhbGl6ZScsICgpID0+IHtcbiAgICBpdCgnaW5pdGlhbGl6ZXMgYWxsIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgICBzcHlPbihsYXRleCwgJ3Jlc29sdmVPcGVuZXJJbXBsZW1lbnRhdGlvbicpLmFuZFJldHVybihOdWxsT3BlbmVyKVxuXG4gICAgICBleHBlY3QobGF0ZXguYnVpbGRlcikudG9CZURlZmluZWQoKVxuICAgICAgZXhwZWN0KGxhdGV4LmxvZ2dlcikudG9CZURlZmluZWQoKVxuICAgICAgZXhwZWN0KGxhdGV4Lm9wZW5lcikudG9CZURlZmluZWQoKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ2dldERlZmF1bHRCdWlsZGVyJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFuIGluc3RhbmNlIG9mIExhdGV4bWtCdWlsZGVyIGJ5IGRlZmF1bHQnLCAoKSA9PiB7XG4gICAgICBzcHlPbihsYXRleCwgJ3VzZUxhdGV4bWsnKS5hbmRSZXR1cm4odHJ1ZSlcbiAgICAgIGNvbnN0IGRlZmF1bHRCdWlsZGVyID0gbGF0ZXguZ2V0RGVmYXVsdEJ1aWxkZXIoKVxuICAgICAgZXhwZWN0KGRlZmF1bHRCdWlsZGVyLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0xhdGV4bWtCdWlsZGVyJylcbiAgICB9KVxuXG4gICAgaXQoJ3JldHVybnMgYW4gaW5zdGFuY2Ugb2YgVGV4aWZ5QnVpbGRlciB3aGVuIGNob3NlbicsICgpID0+IHtcbiAgICAgIHNweU9uKGxhdGV4LCAndXNlTGF0ZXhtaycpLmFuZFJldHVybihmYWxzZSlcbiAgICAgIGNvbnN0IGRlZmF1bHRCdWlsZGVyID0gbGF0ZXguZ2V0RGVmYXVsdEJ1aWxkZXIoKVxuICAgICAgZXhwZWN0KGRlZmF1bHRCdWlsZGVyLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ1RleGlmeUJ1aWxkZXInKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ2dldERlZmF1bHRMb2dnZXInLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYW4gaW5zdGFuY2Ugb2YgQ29uc29sZUxvZ2dlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRMb2dnZXIgPSBsYXRleC5nZXREZWZhdWx0TG9nZ2VyKClcblxuICAgICAgZXhwZWN0KGRlZmF1bHRMb2dnZXIuY29uc3RydWN0b3IubmFtZSkudG9CZSgnQ29uc29sZUxvZ2dlcicpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnZ2V0RGVmYXVsdE9wZW5lcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBhbiBpbnN0YW5jZSBvZiBhIHJlc29sdmVkIGltcGxlbWVudGF0aW9uIG9mIE9wZW5lcicsICgpID0+IHtcbiAgICAgIHNweU9uKGxhdGV4LCAncmVzb2x2ZU9wZW5lckltcGxlbWVudGF0aW9uJykuYW5kUmV0dXJuKE51bGxPcGVuZXIpXG4gICAgICBjb25zdCBkZWZhdWx0T3BlbmVyID0gbGF0ZXguZ2V0RGVmYXVsdE9wZW5lcigpXG5cbiAgICAgIGV4cGVjdChkZWZhdWx0T3BlbmVyLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoTnVsbE9wZW5lci5uYW1lKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ0xvZ2dlciBwcm94eScsICgpID0+IHtcbiAgICBsZXQgbG9nZ2VyXG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGxvZ2dlciA9IGphc21pbmUuY3JlYXRlU3B5T2JqKCdNb2NrTG9nZ2VyJywgWydlcnJvcicsICd3YXJuaW5nJywgJ2luZm8nXSlcbiAgICAgIGxhdGV4LnNldExvZ2dlcihsb2dnZXIpXG4gICAgICBsYXRleC5jcmVhdGVMb2dQcm94eSgpXG4gICAgfSlcblxuICAgIGl0KCdjb3JyZWN0bHkgcHJveGllcyBlcnJvciB0byBlcnJvcicsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSAwXG4gICAgICBjb25zdCByZXN1bHQgPSB7IGZvbzogJ2JhcicgfVxuICAgICAgY29uc3QgYnVpbGRlciA9IHsgcnVuICgpIHsgcmV0dXJuICcnIH0gfVxuICAgICAgbGF0ZXgubG9nLmVycm9yKHN0YXR1c0NvZGUsIHJlc3VsdCwgYnVpbGRlcilcblxuICAgICAgZXhwZWN0KGxvZ2dlci5lcnJvcikudG9IYXZlQmVlbkNhbGxlZFdpdGgoc3RhdHVzQ29kZSwgcmVzdWx0LCBidWlsZGVyKVxuICAgIH0pXG5cbiAgICBpdCgnY29ycmVjdGx5IHByb3hpZXMgd2FybmluZyB0byB3YXJuaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICdmb28nXG4gICAgICBsYXRleC5sb2cud2FybmluZyhtZXNzYWdlKVxuXG4gICAgICBleHBlY3QobG9nZ2VyLndhcm5pbmcpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1lc3NhZ2UpXG4gICAgfSlcblxuICAgIGl0KCdjb3JyZWN0bHkgcHJveGllcyBpbmZvIHRvIGluZm8nLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gJ2ZvbydcbiAgICAgIGxhdGV4LmxvZy5pbmZvKG1lc3NhZ2UpXG5cbiAgICAgIGV4cGVjdChsb2dnZXIuaW5mbykudG9IYXZlQmVlbkNhbGxlZFdpdGgobWVzc2FnZSlcbiAgICB9KVxuICB9KVxuXG4gIGRlc2NyaWJlKCdyZXNvbHZlT3BlbmVySW1wbGVtZW50YXRpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgU2tpbU9wZW5lciB3aGVuIGluc3RhbGxlZCwgYW5kIHJ1bm5pbmcgb24gT1MgWCcsICgpID0+IHtcbiAgICAgIHNweU9uKGxhdGV4LCAnc2tpbUV4ZWN1dGFibGVFeGlzdHMnKS5hbmRSZXR1cm4odHJ1ZSlcbiAgICAgIGNvbnN0IG9wZW5lciA9IGxhdGV4LnJlc29sdmVPcGVuZXJJbXBsZW1lbnRhdGlvbignZGFyd2luJylcblxuICAgICAgZXhwZWN0KG9wZW5lci5uYW1lKS50b0JlKCdTa2ltT3BlbmVyJylcbiAgICB9KVxuXG4gICAgaXQoJ3JldHVybnMgUHJldmlld09wZW5lciB3aGVuIFNraW0gaXMgbm90IGluc3RhbGxlZCwgYW5kIHJ1bm5pbmcgb24gT1MgWCcsICgpID0+IHtcbiAgICAgIHNweU9uKGxhdGV4LCAnc2tpbUV4ZWN1dGFibGVFeGlzdHMnKS5hbmRSZXR1cm4oZmFsc2UpXG4gICAgICBjb25zdCBvcGVuZXIgPSBsYXRleC5yZXNvbHZlT3BlbmVySW1wbGVtZW50YXRpb24oJ2RhcndpbicpXG5cbiAgICAgIGV4cGVjdChvcGVuZXIubmFtZSkudG9CZSgnUHJldmlld09wZW5lcicpXG4gICAgfSlcblxuICAgIGl0KCdyZXR1cm5zIFN1bWF0cmFPcGVuZXIgd2hlbiBpbnN0YWxsZWQsIGFuZCBydW5uaW5nIG9uIFdpbmRvd3MnLCAoKSA9PiB7XG4gICAgICBzcHlPbihsYXRleCwgJ3N1bWF0cmFFeGVjdXRhYmxlRXhpc3RzJykuYW5kUmV0dXJuKHRydWUpXG4gICAgICBjb25zdCBvcGVuZXIgPSBsYXRleC5yZXNvbHZlT3BlbmVySW1wbGVtZW50YXRpb24oJ3dpbjMyJylcblxuICAgICAgZXhwZWN0KG9wZW5lci5uYW1lKS50b0JlKCdTdW1hdHJhT3BlbmVyJylcbiAgICB9KVxuXG4gICAgaXQoJ3JldHVybnMgQXRvbVBkZk9wZW5lciBhcyBhIGZhbGxiYWNrLCBpZiB0aGUgcGRmLXZpZXcgcGFja2FnZSBpcyBpbnN0YWxsZWQnLCAoKSA9PiB7XG4gICAgICBzcHlPbihsYXRleCwgJ2hhc1BkZlZpZXdlclBhY2thZ2UnKS5hbmRSZXR1cm4odHJ1ZSlcbiAgICAgIGNvbnN0IG9wZW5lciA9IGxhdGV4LnJlc29sdmVPcGVuZXJJbXBsZW1lbnRhdGlvbignZm9vJylcblxuICAgICAgZXhwZWN0KG9wZW5lci5uYW1lKS50b0JlKCdBdG9tUGRmT3BlbmVyJylcbiAgICB9KVxuXG4gICAgaXQoJ2Fsd2F5cyByZXR1cm5zIEF0b21QZGZPcGVuZXIgaWYgYWx3YXlzT3BlblJlc3VsdEluQXRvbSBpcyBlbmFibGVkIGFuZCBwZGYtdmlldyBpcyBpbnN0YWxsZWQnLCAoKSA9PiB7XG4gICAgICBzcHlPbihsYXRleCwgJ2hhc1BkZlZpZXdlclBhY2thZ2UnKS5hbmRSZXR1cm4odHJ1ZSlcbiAgICAgIHNweU9uKGxhdGV4LCAnc2hvdWxkT3BlblJlc3VsdEluQXRvbScpLmFuZFJldHVybih0cnVlKVxuICAgICAgc3B5T24obGF0ZXgsICdza2ltRXhlY3V0YWJsZUV4aXN0cycpLmFuZENhbGxUaHJvdWdoKClcblxuICAgICAgY29uc3Qgb3BlbmVyID0gbGF0ZXgucmVzb2x2ZU9wZW5lckltcGxlbWVudGF0aW9uKCdkYXJ3aW4nKVxuXG4gICAgICBleHBlY3Qob3BlbmVyLm5hbWUpLnRvQmUoJ0F0b21QZGZPcGVuZXInKVxuICAgICAgZXhwZWN0KGxhdGV4LnNraW1FeGVjdXRhYmxlRXhpc3RzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpXG4gICAgfSlcblxuICAgIGl0KCdyZXNwb25kcyB0byBjaGFuZ2VzIGluIGNvbmZpZ3VyYXRpb24nLCAoKSA9PiB7XG4gICAgICBzcHlPbihsYXRleCwgJ2hhc1BkZlZpZXdlclBhY2thZ2UnKS5hbmRSZXR1cm4odHJ1ZSlcbiAgICAgIHNweU9uKGxhdGV4LCAnc2hvdWxkT3BlblJlc3VsdEluQXRvbScpLmFuZFJldHVybihmYWxzZSlcbiAgICAgIHNweU9uKGxhdGV4LCAnc2tpbUV4ZWN1dGFibGVFeGlzdHMnKS5hbmRSZXR1cm4odHJ1ZSlcblxuICAgICAgbGV0IG9wZW5lciA9IGxhdGV4LnJlc29sdmVPcGVuZXJJbXBsZW1lbnRhdGlvbignZGFyd2luJylcbiAgICAgIGV4cGVjdChvcGVuZXIubmFtZSkudG9CZSgnU2tpbU9wZW5lcicpXG5cbiAgICAgIGxhdGV4LnNob3VsZE9wZW5SZXN1bHRJbkF0b20uYW5kUmV0dXJuKHRydWUpXG4gICAgICBvcGVuZXIgPSBsYXRleC5yZXNvbHZlT3BlbmVySW1wbGVtZW50YXRpb24oJ2RhcndpbicpXG4gICAgICBleHBlY3Qob3BlbmVyLm5hbWUpLnRvQmUoJ0F0b21QZGZPcGVuZXInKVxuXG4gICAgICBsYXRleC5zaG91bGRPcGVuUmVzdWx0SW5BdG9tLmFuZFJldHVybihmYWxzZSlcbiAgICAgIG9wZW5lciA9IGxhdGV4LnJlc29sdmVPcGVuZXJJbXBsZW1lbnRhdGlvbignZGFyd2luJylcbiAgICAgIGV4cGVjdChvcGVuZXIubmFtZSkudG9CZSgnU2tpbU9wZW5lcicpXG4gICAgfSlcblxuICAgIGl0KCdkb2VzIG5vdCBzdXBwb3J0IEdOVS9MaW51eCcsICgpID0+IHtcbiAgICAgIHNweU9uKGxhdGV4LCAnaGFzUGRmVmlld2VyUGFja2FnZScpLmFuZFJldHVybihmYWxzZSlcbiAgICAgIGNvbnN0IG9wZW5lciA9IGxhdGV4LnJlc29sdmVPcGVuZXJJbXBsZW1lbnRhdGlvbignbGludXgnKVxuXG4gICAgICBleHBlY3Qob3BlbmVyKS50b0JlTnVsbCgpXG4gICAgfSlcblxuICAgIGl0KCdkb2VzIG5vdCBzdXBwb3J0IHVua25vd24gb3BlcmF0aW5nIHN5c3RlbXMgd2l0aG91dCBwZGYtdmlldyBwYWNrYWdlJywgKCkgPT4ge1xuICAgICAgc3B5T24obGF0ZXgsICdoYXNQZGZWaWV3ZXJQYWNrYWdlJykuYW5kUmV0dXJuKGZhbHNlKVxuICAgICAgY29uc3Qgb3BlbmVyID0gbGF0ZXgucmVzb2x2ZU9wZW5lckltcGxlbWVudGF0aW9uKCdmb28nKVxuXG4gICAgICBleHBlY3Qob3BlbmVyKS50b0JlTnVsbCgpXG4gICAgfSlcblxuICAgIGl0KCdyZXR1cm5zIEN1c3RvbU9wZW5lciB3aGVuIGN1c3RvbSB2aWV3ZXIgZXhpc3RzIGFuZCBhbHdheXNPcGVuUmVzdWx0SW5BdG9tIGlzIGRpc2FibGVkJywgKCkgPT4ge1xuICAgICAgc3B5T24obGF0ZXgsICd2aWV3ZXJFeGVjdXRhYmxlRXhpc3RzJykuYW5kUmV0dXJuKHRydWUpXG4gICAgICBzcHlPbihsYXRleCwgJ3Nob3VsZE9wZW5SZXN1bHRJbkF0b20nKS5hbmRSZXR1cm4oZmFsc2UpXG4gICAgICBjb25zdCBvcGVuZXIgPSBsYXRleC5yZXNvbHZlT3BlbmVySW1wbGVtZW50YXRpb24oJ2ZvbycpXG5cbiAgICAgIGV4cGVjdChvcGVuZXIubmFtZSkudG9CZSgnQ3VzdG9tT3BlbmVyJylcbiAgICB9KVxuICB9KVxufSlcbiJdfQ==
//# sourceURL=/home/victor/.atom/packages/latex/spec/latex-spec.js
