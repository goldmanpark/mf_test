const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require("./package.json");

const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);

module.exports = () => {
  return {
    entry: './src/index.js',
    output: {
      publicPath: 'http://localhost:1002/',
      clean: true,
    },
    mode: 'development',
    devtool: 'hidden-source-map',
    target: "web",
    devServer: {
      port: 1002
    },
    module: {
      rules: [
        // js react loader
        {
          test: /\.(js|jsx)?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-react', {"runtime": "automatic"}],
                  "@babel/preset-env"
                ],
              },
            }
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'remote2',
        exposes: {
          './test1' : './src/components/test1.js',
          './test2' : './src/components/test2.js',
        },
        filename: 'remoteEntry.js',
        shared: {
          ...dependencies, 
          'react' : { requiredVersion: '^18.2.0', eager: true, singleton: true },
          'react-dom' : { requiredVersion: '^18.2.0', singleton: true }
        }
      }),
      new HtmlWebpackPlugin({
        template: getAbsolutePath('public/index.html'),
      }),
    ],
  }
}