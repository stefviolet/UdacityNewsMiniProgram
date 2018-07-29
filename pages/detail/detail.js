// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    content: [],
    title: '',
    date: '',
    source: '',
    readcount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getDetail()
  },
  getDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        console.log(res.data.result)
        this.setCurrentNews(res.data.result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setCurrentNews(result) {
    let contentResult = result.content
    let content = []
    for (let i = 1; i < contentResult.length; i++) {
      if (contentResult[i].type === 'image') {
        content.push({
          type: contentResult[i].type,
          text: contentResult[i].src
        })
      } else {
        content.push({
          type: contentResult[i].type,
          text: contentResult[i].text
      })
      }
    }
    this.setData({
      id: result.id,
      title: result.title,
      date: result.date,
      source: result.source,
      content: content,
      readcount: result.readCount
    })
  }
})