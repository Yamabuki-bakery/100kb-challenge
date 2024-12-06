const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/'),
    clean: true,
  },

  resolve: {
    alias: {
      // aliases used in the template
      '@images': path.join(__dirname, 'src/images'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      // define a relative or absolute path to entry templates for
      // automatically processing templates in all subdirs
      entry: 'src/',
      // - OR - define many templates manually
      //   entry: {
      //     // output => dist/index.html
      //     index: 'src/views/home/index.html',
      //     // output => dist/pages/about.html
      //     'pages/about': 'src/views/about/index.html',
      //     // ...
      //   },
      js: {
        // output filename of compiled JavaScript, 
        // used if `inline` option is false (defaults)
        // filename: 'assets/js/[name].[contenthash:8].js',
        inline: true, // inlines JS into HTML
      },
      css: {
        // output filename of extracted CSS,
        // used if `inline` option is false (defaults)
        // filename: 'assets/css/[name].[contenthash:8].css',
        inline: true, // inlines CSS into HTML
      },
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: false, // prevents styling bug when input "type=text" is removed
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      }, // minify output HTML
    }),
  ],

  module: {
    rules: [
      // styles
      {
        test: /\.(css|sass|scss)$/,
        use: ["css-loader"],
      },
      // images
      {
        test: /\.(png|jpe?g|ico|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },

};