const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    library: 'wlan-cloud-ui-library',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: 'async',
          chunks: 'async',
          minChunks: 4,
        },
      },
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  externals: [
    {
      react: {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
      },
    },
    '@ant-design/icons',
    'antd',
    'highcharts',
    'highcharts-react-official',
    'history',
    'lodash',
    'moment',
    'prop-types',
    'react-dom',
    'react-jsx-highcharts',
    'react-jsx-highstock',
    'react-router-dom',
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
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
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
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
      chunkFilename: `css/[name].css`,
    }),
  ],
};
