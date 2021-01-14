// nav
module.exports = [
  { text: '首页', link: '/' },
  {text: '内核与虚拟化', link: '/Kernel/'},
  {text: '云原生', link: '/CloudNative/'},
  {text: '算法', link: '/algorithm/'},
  {text: '语言特性', link: '/language/'},
  {text: '折腾', link: '/Geek/'},
  {text: '基础',link:"",
    items: [
      { text: '《概率论与数理统计》', link: '/《概率论与数理统计》/' },
      // { text: '《算法导论》', link: '/tags/' },
      // { text: '《》', link: '/archives/' },
    ],
  },


  {text: '|' ,link:"./"},
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
