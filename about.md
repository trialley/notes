---

title: 关于
date: 2019-12-25 14:27:01
permalink: /about
sidebar: false
article: false
---



这是一个兼具博客与知识管理双重功能的个人网站，有些杂七杂八的文章。如果你喜欢这个博客，欢迎到[GitHub](https://github.com/trialley/notes)点个Star，或者交换[友链](/friends/) 。如果您有意见或建议，欢迎在本文下方留言( •̀ ω •́ )✧。

> 文章内容仅是我个人的小总结，资历尚浅，如有误还请指正。



### 关于我



#### 技能

* 精通 C、C++、Java、Rust、Golang 的 bug 编写
* 熟悉 Linux Kernel 版本号
* 了解 Linux、windows、macOS 的开关机方式

#### 联系我

- **WeChat or QQ**: <a :href="qqUrl" class='qq'>1203732857</a>
- **Email**:  <a href="mailto:1203732857@qq.com">1203732857@qq.com</a>
- **GitHub**: <https://github.com/trialley>



## 学习





<script>
  export default {
    data(){
      return {
        qqUrl: 'tencent://message/?uin=1203732857&Site=&Menu=yes'
      }
    },
    mounted(){
      const flag =  navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      if(flag){
        this.qqUrl = 'mqqwpa://im/chat?chat_type=wpa&uin=1203732857&version=1&src_type=web&web_src=oicqzone.com'
      }
    }
  }
</script>

