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
      port: 1001
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
                  "@babel/preset-typescript",
                ],
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
        },
        // file loader
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', 'tsx']
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'remote1',
        exposes: {
          './csharp' : './src/components/csharp.tsx',
          './python' : './src/components/python.tsx',
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
        favicon: getAbsolutePath('public/favicon.ico')
      }),
    ],
  }
}