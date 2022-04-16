const path = require("path");
const { mainModule } = require("process");
module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js"
  },
  target: "node",
  devServer: {
    port: "3000",
    contentBase: ["./public"],
    open: true
  },
  resolve: {
    extensions: [ ".js", ".jsx", ".json"
]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      
    ]
  }
}