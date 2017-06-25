const host = require('../../config.js').host2;
Page({
  data: {
    sorts: [],
    placeholder: '书目搜索',
    history: false,//聚焦搜索栏时改变
    showHistory: true,//删除历史记录时改变
    searchHistory: []
  },

  onShow: function () {
    var that = this
    wx.request({
      url: host + '/library/Sorts',

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
    var tempSearchHistory = [];
    that.setData({
      placeholder: content,
      showHistory: true
    });
    //设置历史记录
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        tempSearchHistory = res.data;
        tempSearchHistory.push(content);
        var result = [];//查重
        for (var i = 0; i < tempSearchHistory.length; i++) {
          if (result.indexOf(tempSearchHistory[i]) == -1) {
            result.push(tempSearchHistory[i])
          }
        }
        tempSearchHistory = result;
        wx.setStorage({
          key: 'searchHistory',
          data: tempSearchHistory,
        })
      },
      fail: function (res) {
        tempSearchHistory.push(content);
        wx.setStorage({
          key: 'searchHistory',
          data: tempSearchHistory,
        })
      }
    })
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
  scanCode: function (e) {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log("扫码成功");
        var bookId = res.result;
        wx.navigateTo({
          url: '/pages/bookDetail/bookDetail?bookId=' + bookId
        })
      },
      fail: function () {
        console.log("扫码失败");
        wx.showModal({
          title: '提示',
          content: '扫码失败'
        })
      }
    })
  },
  showHistory: function () {//显示历史记录
    var that = this;
    that.setData({
      history: true
    })
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        console.log("show");
        console.log(res.data);
        that.setData({
          searchHistory: res.data
        })
      },
    })
  },
  hideHistory: function () {//隐藏历史记录
    var that = this;
    that.setData({
      history: false
    })
  },
  searchByHistory: function (e) {//点击历史记录搜索
    var that = this;
    var content = e.currentTarget.dataset.content;
    that.setData({
      placeholder: content
    });
    wx.navigateTo({
      url: '/pages/search/search?content=' + content
    });
  },
  deleteSearchHistory: function () {//删除历史记录
    var that = this;
    that.setData({
      showHistory: false,
      searchHistory: []
    })
    wx.removeStorage({
      key: 'searchHistory',
      success: function (res) {
      },
    })
  }
})