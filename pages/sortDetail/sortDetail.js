const host = require('../../config.js').host2;
const image = require('../../config.js').image;
Page({
  data: {
    sort: '',
    books: ''
  },

  onLoad: function (query) {
    //sort为数组sort[0] 中文 sort[1] 英文
    console.log(query);
    var esort = query.esort
    console.log(query);
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
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
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

        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  }
})
