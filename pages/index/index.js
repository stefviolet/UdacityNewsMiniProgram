const tabs = ['国内','国际', '财经', '娱乐', '军事', '体育', '其他']
const types = ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other']

Page({
  data: {
    tabs: tabs,
    activeIndex: 0,
    news: []
  },
  onLoad() {
    this.getNews()
  },
  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: types[this.data.activeIndex]
      },
      success: res => {
        this.setNews(res.data.result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setNews(result) {
    let news = []
    for (let i = 0; i < result.length; i++) {
      let current = result[i]
      news.push({
        id: current.id,
        title: current.title,
        source: current.source,
        date: current.date,
        img: current.firstImage
      })
    }
    this.setData({
      news: news
    })
  },
  navTabClick(event) {
    this.setData({
      activeIndex: event.currentTarget.id
    })
    this.getNews()
  },
  //click current news and redirect to detail page
  onItemClick(event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id
    })
  }

})