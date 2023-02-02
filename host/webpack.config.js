const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require("./package.json");

const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);

module.exports = () => {
  return {
    entry: './src/index.js',
    // output: {
    //   path: getAbsolutePath('public'),
    //   filename: 'bundle.js',
    //   publicPath: '/',
    // },
    mode: 'development',
    devtool: 'hidden-source-map',
    target: "web",
    output: {
      publicPath: 'http://localhost:1000/',
      clean: true,
    },
    devServer: {
      port: 1000
    },
    module: {
      rules: [
        // js, ts react loader
        {
          test: /\.(js|jsx|ts|tsx)?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-react', {"runtime": "automatic"}],
                  "@babel/preset-env",
                  "@babel/preset-typescript"
                ],
                plugins: ["@babel/plugin-syntax-dynamic-import"]
              },
            }
          ]
        },
        // css
        {
          test: /\.css$/i,
          exclude: /\.module\.css$/i, // 모듈 파일 제외 설정
          use: ['style-loader', 'css-loader'],
        },
        // css module
        {
          test: /\.module\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', 'tsx', 'png']
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        remotes: {
          'remote1' : 'remote1@http://localhost:1001/remoteEntry.js',
          'remote2' : 'remote2@http://localhost:1002/remoteEntry.js'
        },
        filename: 'remoteEntry.js',
        shared: {
          ...dependencies,
          'react' : { requiredVersion: '^18.2.0', eager: true, singleton: true },
          'react-dom' : { requiredVersion: '^18.2.0', singleton: true },
          //'typescript' : '^4.9.5'
        }
      }),
      new HtmlWebpackPlugin({
        template: getAbsolutePath('public/index.html'),
        favicon: getAbsolutePath('public/favicon.ico')
      }),
    ],
  }
}