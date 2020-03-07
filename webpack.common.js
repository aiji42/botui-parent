import path from 'path'
import { EnvironmentPlugin } from 'webpack'

export default {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'src', 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      BOTUI_CHILD_ENDPOINT: process.env.BOTUI_CHILD_ENDPOINT,
      BOTUI_ACTIVATE_RATE: process.env.BOTUI_ACTIVATE_RATE
    })
  ]
}
