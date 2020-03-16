const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  baseUrl: './',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      inject: true,
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    login: {
      entry: 'src/views/login/login.ts',
      template: 'public/login.html',
      filename: 'login.html',
      inject: true,
    }
  },
  configureWebpack: config => { // 添加打包模块分析
    // if (process.env.NODE_ENV === 'production') {
    //   config.plugins.push(new BundleAnalyzerPlugin())
    // }

  }
}