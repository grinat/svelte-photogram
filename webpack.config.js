const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  entry: {
    bundle: ['./src/index.js']
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        // disable exclude for @curi/router components
        /*exclude: /node_modules/,*/
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new HtmlWebpackPlugin({
      minify: false,
      title: 'Svelte 3 App'
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // browser-image-manipulation cant work with evaluate = true
            evaluate: false,
          }
        }
      })
    ]
  },
  devtool: prod ? false: 'source-map'
}
