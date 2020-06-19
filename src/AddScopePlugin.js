function addIndexScope(pluginName, fileContent) {
  return `
(function(win) {
  function CooshuScope() {
    window.cooshuHelper.cloneWindow(win, this);
  }
  CooshuScope.prototype.init = function() {
    var window = this;var module;
    ${fileContent}
    window.cooshuHelper.libraryRegisterFromJsFile(window.library, module, '${pluginName}', 'index', document.currentScript.src);
  };
  new CooshuScope().init();
})(window);`;
}

function addConfigScope(pluginName, fileContent) {
  return `
(function(window) {
  var module;
  ${fileContent}
  window.cooshuHelper.libraryRegisterFromJsFile(window.config, module, '${pluginName}','config', document.currentScript.src);
})(window);`;
}

const returnNewFileContent = (fileContent, filename) => {
  const pluginName = filename.split('/')[0];
  return /index.js$/.test(filename) ? addIndexScope(pluginName, fileContent) : addConfigScope(pluginName, fileContent);
};

class AddScopePlugin {
  apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      for (let filename in compilation.assets) {
        if (filename === 'appViewer.js') {
          callback();
        }
        else {
          const fileContent = compilation.assets[filename].source();
          const formatFileContent = returnNewFileContent(fileContent, filename);

          compilation.assets[filename] = {
            source() {
              return formatFileContent;
            },
            size() {
              return formatFileContent.length;
            },
          };
        }
      }
      callback();
    });
  }
}

module.exports = AddScopePlugin;
