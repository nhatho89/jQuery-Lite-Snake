var path = require('path');
module.exports = {
  entry: {
    app: ["./main.js"]
  },
  output: {
    path: path.join(__dirname, 'js'),
    publicPath: '/',
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps',
};
