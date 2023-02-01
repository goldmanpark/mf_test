const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  return {
    entry: getAbsolutePath('src/index.js'),
    output: {
      path: getAbsolutePath('public'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    mode: 'development',
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
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProd ? 'production' : 'development',
                presets:[['@babel/preset-react', {"runtime": "automatic"}], '@babel/preset-env']
              }
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
        // {
        //   test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        //   exclude: /node_modules/,
        //   use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
        // }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', 'tsx']
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        remotes: {
          remote1: 'remote1',
        },
        shared: {
          'react' : { requiredVersion: '^18.2.0', eager: true },
          'react-dom' : '^18.2.0', 
          'typescript' : '^4.9.5'
        }
      }),
      new HtmlWebpackPlugin({
        template: getAbsolutePath('public/index.html'),
        favicon: getAbsolutePath('public/favicon.ico')
      }),
    ],
  }
}