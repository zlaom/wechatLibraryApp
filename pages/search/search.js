Page({
  data: {
    searchResult: []
  },
  onLoad: function (query) {
    var that = this;
    var content = query.content;
    wx.request({
      url: 'http://127.0.0.1:3000/search',
      data: {
        content: content
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        var searchResult = res.data;
        that.setData({
          searchResult: searchResult
        });
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
  bookSearch: function () {
    var that = this;
    var content = that.data.searchContent;
    console.log("content:" + content);
    wx.request({
      url: 'http://127.0.0.1:3000/search',
      data: {
        content: content
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        var searchResult = res.data;
        that.setData({
          searchResult: searchResult
        });
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
  inputSearchContent: function (e) {
    var that = this;
    that.setData({
      searchContent: e.detail.value
    })
  },
  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.hi;
    console.log(bookId);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  },
})