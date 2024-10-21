const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML Webpack Plugin to generate the main HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E',
      }),

      // Inject the custom service worker (defined in src-sw.js)
      new InjectManifest({
        swSrc: './src-sw.js', // Source of the custom service worker
        swDest: 'service-worker.js', // Destination in the 'dist' folder
      }),

      // WebpackPwaManifest plugin to generate the manifest.json file
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'An offline-capable text editor',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the logo
            sizes: [96, 128, 192, 256, 384, 512], // Different icon sizes
            destination: path.join('assets', 'icons'), // Destination folder
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loaders for importing CSS files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader to transpile modern JavaScript
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
