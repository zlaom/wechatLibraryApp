const host = require('../../config.js').host2;
Page({
  data: {
    sorts: [],
    placeholder:'书目搜索'
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
  // 调起搜索
  bookSearch: function () {
    var that = this;
    var content = that.data.searchContent
    that.setData({
      placeholder: content
    });
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
  },
  // 调起扫码
  scanCode:function(e){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log("扫码成功");
        var bookId = res.result;
        wx.navigateTo({
          url: '/pages/bookDetail/bookDetail?bookId=' + bookId
        })
      },
      fail:function(){
        console.log("扫码失败");
        wx.showModal({
          title: '提示',
          content: '扫码失败'
        })
      }
    })
  }
})
