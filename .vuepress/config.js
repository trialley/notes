const head = require('../../config/head.js');
const plugins = require('../../config/plugins.js');
themeConfig = require('../../config/themeConfig.js');
const nav =  require('./nav.js');
themeConfig.nav = nav;
module.exports = {
  theme: 'vdoing', // 使用依赖包主题
  // theme: require.resolve('../../theme-vdoing'), // 使用本地主题

  title: "TriAlley's blog",
  description: 'hhh',
  // base: '/', // 格式：'/<仓库名>/'， 默认'/'
  markdown: {
    lineNumbers: true, // 代码行号
  },
  dest:"dist",
  head,
  plugins,
  themeConfig,
}
