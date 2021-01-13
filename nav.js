// nav
module.exports = [
  { text: '首页', link: '/' },
  {text: '内核', link: '/Kernel/'},
  {text: 'C/C++', link: '/C/'},
  {text: '云原生', link: '/CloudNative/'},
  {text: '算法', link: '/algorithm/'},
  {text: '基础', link: '/base/',
    items: [
      { text: '《概率论与数理统计》', link: '/《概率论与数理统计》/' },
      // { text: '《算法导论》', link: '/tags/' },
      // { text: '《》', link: '/archives/' },
    ],
  },
  {text: '折腾', link: '/Geek/'},


  {text: '|',link: '/' },
  {text: '关于', link: '/about/'},
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
]
