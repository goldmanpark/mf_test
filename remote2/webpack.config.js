const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);

module.exports = () => {
  return {
    entry: getAbsolutePath('src/index.js'),
    output: {
      path: getAbsolutePath('public'),
      filename: '[name].js',
      publicPath: '/',
    },
    mode: 'development',
    devServer: {
      port: 1002
    },
    module: {
      rules: [
        // js, ts react loader
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
          'react' : { requiredVersion: '^18.2.0', eager: true },
          'react-dom' : '^18.2.0', 
          'typescript' : '^4.9.5'
        }
        //shared: { react: { singleton: true }, "react-dom": { singleton: true } }
      }),
      new HtmlWebpackPlugin({
        template: getAbsolutePath('public/index.html'),
      }),
    ],
  }
}