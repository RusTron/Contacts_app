const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
// const appRoot = path.resolve(__dirname, '../');
// const appSrc = path.resolve(appRoot, 'src');
const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = !isEnvDevelopment;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient',
);
const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop',
);
const appDirectory = fs.realpathSync(process.cwd());
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.BABEL_ENV = 'development';

console.warn('alias', path.resolve(__dirname, 'src'));

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({template: './src/index.html'}),
    new CleanWebpackPlugin(),
    isEnvDevelopment &&
    new ReactRefreshWebpackPlugin({
      overlay: {
        entry: webpackDevClientEntry,
        module: reactRefreshOverlayEntry,
        sockIntegration: false,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: path.resolve(__dirname, 'node_modules'),
      }),
      async: isEnvDevelopment,
      checkSyntacticErrors: true,
      resolveModuleNameModule: process.versions.pnp
        ? `${__dirname}/pnpTs.js`
        : undefined,
      resolveTypeReferenceDirectiveModule: process.versions.pnp
        ? `${__dirname}/pnpTs.js`
        : undefined,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      reportFiles: [
        // This one is specifically to match during CI tests,
        // as micromatch doesn't match
        // '../cra-template-typescript/template/src/App.tsx'
        // otherwise.
        '../**/src/**/*.{ts,tsx}',
        '**/src/**/*.{ts,tsx}',
        '!**/src/**/__tests__/**',
        '!**/src/**/?(*.)(spec|test).*',
        '!**/src/setupProxy.*',
        '!**/src/setupTests.*',
      ],
      silent: true,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: isEnvProduction ? typescriptFormatter : undefined,
    }),
    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      formatter: require.resolve('react-dev-utils/eslintFormatter'),
      eslintPath: require.resolve('eslint'),
      failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
      context: path.resolve(__dirname, 'src'),
      cache: true,
      cacheLocation: path.resolve(
        path.resolve(__dirname, 'node_modules'),
        '.cache/.eslintcache',
      ),
      cwd: path.resolve(__dirname, '.'),
      resolvePluginsRelativeTo: __dirname,
      baseConfig: {
        extends: [require.resolve('eslint-config-react-app/base')],
        rules: {
          'react/react-in-jsx-scope': 'error',
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|svg)/,
        use: ['file-loader'],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(appDirectory, 'src'),
        exclude: path.resolve(appDirectory, 'node_modules'),
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides',
          ),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: 'automatic',
              },
            ],
          ],
          
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent:
                      '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                  },
                },
              },
            ],
            isEnvDevelopment &&
              require.resolve('react-refresh/babel'),
          ].filter(Boolean),
          cacheDirectory: true,
          cacheCompression: false,
          compact: isEnvProduction,
        },
      },
      {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [
            [
              require.resolve('babel-preset-react-app/dependencies'),
              { helpers: true },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
          sourceMaps: shouldUseSourceMap,
          inputSourceMap: shouldUseSourceMap,
        },
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isEnvDevelopment,
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isEnvDevelopment,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
};
