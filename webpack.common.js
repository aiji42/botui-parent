import path from 'path'
import { EnvironmentPlugin } from 'webpack'

export default {
  entry: [
    path.resolve(__dirname, 'src', 'index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      SERVICE_CODE: process.env.SERVICE_CODE,
      BOTUI_CHILD_ENDPOINT: process.env.BOTUI_CHILD_ENDPOINT,
      BOTUI_ACTIVATE_RATE: process.env.BOTUI_ACTIVATE_RATE,
      BOTUI_LAUNCH_CONDITION: process.env.BOTUI_LAUNCH_CONDITION || '{}',
      BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
      COMMIT_REF: process.env.COMMIT_REF || 'xxxxx'
    })
  ]
}
