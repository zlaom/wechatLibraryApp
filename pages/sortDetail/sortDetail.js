const host = require('../../config.js').host2;
const image = require('../../config.js').image;

Page({
  data: {
    sort: '',
    books: ''
  },
// 页面开启前
  onLoad: function (query) {
    //sort为数组sort[0] 中文 sort[1] 英文
    var esort = query.esort
    this.setData({
      sort: query.sort,
    })
    var sort = this.data.sort;
    var that = this;
    //英文分类名esort
    wx.request({
      url: host + '/library/sortDetail',
      data: {
        bookSort: esort
      },
      method: 'GET', 
      success: function (res) {
        //获取将json对象赋值给books
        var books = res.data;
        if (res.data) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].cover = image + res.data[i].cover;
          }
          that.setData({
            books: books
          });
        }
      },
      fail: function () {
        console.log('sortDetail网络请求失败')
      }
    })
  },
  // 跳转书籍详情
  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  }
})
