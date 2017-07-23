const path = require('path');

module.exports = {
  target: 'node',
  externals: [
    'aws-sdk'
  ],
  entry: {
    'app': './app.js',
    'restart-service': './restart-service.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname)
    ],
    extensions: [".js", ".jsx"],
    alias: {
      "restart-service": path.resolve(__dirname, "restart-service.js"),
      "options": path.resolve(__dirname, "options.js"),
    },
  },
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].dist.js',
    library: '[name].dist.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'stage-0',
            'es2015',
            'es2017'
          ],
          plugins: [
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime',
            'babel-plugin-transform-object-rest-spread'
            ]
        }
      }
    ]
  }
};
