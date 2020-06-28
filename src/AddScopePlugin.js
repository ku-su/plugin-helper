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

function addConfigScope(pluginName, fileContent) {
  return `
(function(window) {
  var module;
  ${fileContent}
  window.top.cooshuHelper.libraryRegisterFromJsFile(window.config, module, '${pluginName}','config', document.currentScript.src);
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
      callback();
    });
  }
}

module.exports = AddScopePlugin;
