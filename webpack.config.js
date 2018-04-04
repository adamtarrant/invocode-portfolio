const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, './public/dist');
const APP_DIR = path.resolve(__dirname, './src/client/js');

const config = {
   entry: {
     main: APP_DIR + '/script.js'
   },
   output: {
     filename: 'bundle.js',
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
                {loader: 'css-loader', options: {url: false}},
                'postcss-loader',
                'sass-loader'
            ],
            })
    }
    ],

  },
  plugins: [
    new extractTextPlugin({filename:'bundle.css'}),
    ]
};

module.exports = config;