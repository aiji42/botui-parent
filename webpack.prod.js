import { merge } from 'webpack-merge'
import common from './webpack.common.js'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
  BugsnagBuildReporterPlugin,
  BugsnagSourceMapUploaderPlugin
} from 'webpack-bugsnag-plugins'

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new BugsnagBuildReporterPlugin({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion: process.env.COMMIT_REF,
      releaseStage: process.env.NODE_ENV
    }),
    new BugsnagSourceMapUploaderPlugin({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion: process.env.COMMIT_REF,
      uploadSource: true,
      publicPath: '*/',
      overwrite: true
    })
  ]
})
