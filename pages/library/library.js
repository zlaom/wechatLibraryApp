const host = require('../../config.js').host2;
Page({
  data: {
    sorts: []
  },

  onShow: function () {
    var that = this
    wx.request({
      url: host+'/library/Sorts',

      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        //获取将json对象赋值给books

        var sorts = res.data;
        that.setData({
          sorts: sorts
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
  sortDetail: function (e) {
    var sort = e.currentTarget.dataset.sort;
    var esort = e.currentTarget.dataset.esort;
    wx.navigateTo({
      url: '/pages/sortDetail/sortDetail?sort=' + sort + "&esort=" + esort
    })
  },
  bookSearch: function () {
    var that = this;
    var content = that.data.searchContent
    console.log(content);
    wx.navigateTo({
      url: '/pages/search/search?content=' + content
    })
  },
  inputSearchContent: function (e) {
    var that = this;
    that.setData({
      searchContent: e.detail.value
    })
  }
})
