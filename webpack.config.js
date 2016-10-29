var path = require("path");
var fs = require("fs");

module.exports = {
  entry:  {
    parse_and_answer: './lib/parse_and_answer.js'
  },
  output: {
    path:          path.join(__dirname, "dist"),
    library:       "[name]",
    libraryTarget: "commonjs2",
    filename:      "[name].js"
  },
  target: "node",
  module: {
    loaders: [
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader:  'babel',
        query:   JSON.parse(
          fs.readFileSync(path.join(__dirname, ".babelrc"), {encoding: "utf8"})
        )
      },
      {
        test:   /\.json$/,
        loader: 'json'
      }
    ]
  }
};