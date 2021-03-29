/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: `index.js`,
    libraryTarget: 'umd',
    library: {
      name: '@tip-wlan/wlan-cloud-ui-library',
      type: 'umd',
    },
    umdNamedDefine: true,
  },

  target: 'node', // ingore all dependencies

  externals: [
    {
      react: {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
      },
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_', // indicates global variable
      },
      'babel-runtime': {
        commonjs: 'babel-runtime',
        commonjs2: 'babel-runtime',
      },
      'babel-polyfill': {
        commonjs: 'babel-polyfill',
        commonjs2: 'babel-polyfill',
      },
      moment: {
        root: 'moment',
        commonjs2: 'moment',
        commonjs: 'moment',
        amd: 'moment',
      },
    },
    /^highcharts\/.+$/,
    'react-dom',
    'antd',
    '@ant-design/icons',
    '@babel/core',
    'highcharts-react-official',
    'prop-types',
    'react-router-dom',
    'react-jsx-highcharts',
    'react-jsx-highstock',
    'uuid',
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: ['node_modules', 'src'],
    alias: {
      app: path.resolve(__dirname, '../', 'src'),
    },
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
      chunkFilename: `css/[hash].css`,
    }),

    // new BundleAnalyzerPlugin(),
  ],
};
