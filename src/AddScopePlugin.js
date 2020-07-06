function addIndexScope(pluginName, fileContent) {
  return `
(function(win) {
  function CooshuScope() {
    window.top.cooshuHelper.cloneWindow(win, this);
  }
  CooshuScope.prototype.init = function() {
    var window = this;var module;
    ${fileContent}
    window.top.cooshuHelper.libraryRegisterFromJsFile(window.library, module, '${pluginName}', 'index', document.currentScript.src);
  };
  new CooshuScope().init();
})(window);`;
}

const returnNewFileContent = (fileContent, filename) => {
  const pluginName = filename.split('/')[0];
  return addIndexScope(pluginName, fileContent);
};

class AddScopePlugin {
  constructor(config) {
    this.config = config;
  }

  // noinspection JSUnusedGlobalSymbols
  apply(compiler) {
    const _this = this;
    // noinspection JSUnresolvedFunction
    compiler.plugin('emit', function(compilation, callback) {
      const { assets } = compilation;

      Object.keys(assets).forEach(filename => {
        const fileContent = assets[filename].source();
        const formatFileContent = returnNewFileContent(fileContent, filename);

        assets[filename] = {
          source() {
            return formatFileContent;
          },
          size() {
            return formatFileContent.length;
          },
        };
      });

      if (_this.config && !_this.proceedConfig) {
        Object.keys(_this.config).forEach(key => {
          const content = JSON.stringify(_this.config[key]);
          assets[key] = {
            source() {
              return content;
            },
            size() {
              return content.length;
            },
          };
        });
        _this.proceedConfig = true;
      }

      callback();
    });
  }
}

// noinspection JSUnresolvedVariable
module.exports = AddScopePlugin;
