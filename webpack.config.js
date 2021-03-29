/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    library: '@tip-wlan/wlan-cloud-ui-library',
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
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
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

  plugins: [
    new CleanWebpackPlugin(),

    // new BundleAnalyzerPlugin(),
  ],
};
