/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: '/',
    filename: `[name].[chunkhash].js`,
    chunkFilename: `[name].[chunkhash].js`,
    library: 'wlan-cloud-ui-library',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

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
      highcharts: {
        root: ['Highcharts', 'highcharts', 'highchartsMore', 'solidGauge'],
        commonjs2: 'highcharts',
        commonjs: 'highcharts',
        amd: 'highcharts',
      },
    },
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
        test: /\.(png|jpe?g|svg|gif|woff|woff2|eot|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },

  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    alias: {
      src: path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      antd: path.resolve(__dirname, './node_modules/antd'),
      '@ant-design/icons': path.resolve(__dirname, './node_modules/@ant-design/icons'),
      'prop-types': path.resolve(__dirname, './node_modules/prop-types'),
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
    },
  },
};
