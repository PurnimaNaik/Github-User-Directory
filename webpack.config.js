var path= require("path");

var DIST_DIR=path.resolve(__dirname, "dist");
var SRC_DIR=path.resolve(__dirname, "src");

var config={
  entry: SRC_DIR + "/app/root.js",
  mode: 'development',
  output: {
    path:DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },

  module:{
  rules: [
    {
      test: /\.js?/,
      include: SRC_DIR,
      loader:"babel-loader",
      query: {
        presets:["react","es2015","stage-2"]
      }
    },
    {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' }
    ]
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  }
  ]
  }

};

module.exports=config;
