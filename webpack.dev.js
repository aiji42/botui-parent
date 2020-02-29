import merge from 'webpack-merge'
import common from './webpack.common.js'
import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    disableHostCheck: true,
    public: 'localhost:8080',
    hot: false,
    inline: false,
    liveReload: false
  }
})
