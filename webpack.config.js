const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BUILD_DIR = path.resolve(__dirname, './public/dist/js');
const APP_DIR = path.resolve(__dirname, './src/client/js');

const config = {
   mode: process.env.NODE_ENV || 'development',
   entry: {
     main: APP_DIR + '/index.js',
     randomQuote: APP_DIR + '/randomquote.js',
     wikiSearch: APP_DIR + '/wikisearch.js',
     twitchTv: APP_DIR + '/twitchtv.js',
     tribute: APP_DIR + '/tribute.js',
     oldPortfolio: APP_DIR + '/oldportfolio.js',
     weatherApp: APP_DIR + '/weatherapp.js',
   },
   output: {
     filename: '[name].bundle.js',
     path: BUILD_DIR,
   },
   module: {
    rules: [
     {
       test: /\.(js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['es2015'] // Transpiles ES6
         }
       }]
     },
     {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
    },
    {
        test:/\.(s*)css$/, 
        use: extractTextPlugin.extract({ 
                fallback:'style-loader',
                use:[
                {loader: 'css-loader', options: {url: false, minimize: true}},
                'postcss-loader',
                'sass-loader',
            ],
            })
    },
    {
      test:/\.less$/, 
      use: extractTextPlugin.extract({ 
              fallback:'style-loader',
              use:[
              {loader: 'css-loader', options: {url: false, minimize: true}},
              'postcss-loader',
              'less-loader'
          ],
          })
  }
    ],

  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
}),
    new extractTextPlugin({filename:'../css/[name].bundle.css'}),
    new UglifyJsPlugin( {uglifyOptions:
      {
        comments: false, // remove comments
        compress: {
          unused: true,
          dead_code: true, // strip code that will never execute
          warnings: false,
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true, // strips console statements
          sequences: true,
          booleans: true,
        }
      }
    }),
    ]
};

module.exports = config;