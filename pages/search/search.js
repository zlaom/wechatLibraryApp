const host = require('../../config.js').host2;
const image = require('../../config.js').image;
var util = require("../../utils/util.js");

Page({
  data: {
    content: '',
    searchResult: [],
    placeholder: '书目搜索',
    history: false,//聚焦搜索栏时改变
    showHistory: true,//删除历史记录时改变
    searchHistory: [],
    skip: 0,
    havaData: true
  },
  onLoad: function (query) {
    wx.showToast({// 消息显示
      title: '搜索中',
      icon: 'loading',
      duration: 20000
    })
    var that = this;
    //console.log(query.content);
    var content = query.content;
    if (content != 'undefined') {
      that.setData({
        content: content,
      })
      wx.request({
        url: host + '/search',
        data: {
          content: content,
          skip: that.data.skip
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          wx.hideLoading();
          var searchResult = res.data;
          if (searchResult != 'not found') {// 当返回结果不为not found时更新数据，不然设置内容标志位为空用于前端界面显示判断
            that.setData({
              searchResult: util.imgChange(searchResult),
              skip: that.data.skip + searchResult.length
            });
          } else {
            that.setData({
              content: '',
            })
          }
        },
        // 失败返回
        fail: function () {
          wx.hideLoading();
          console.log('fail');
          wx.showToast({
            title: '搜索失败',
            icon: 'fail'
          })
        }
      })
    }
  },
  //触底刷新事件
  onReachBottom: function () {
    var that = this;
    if (that.data.havaData) {
      wx.showToast({// 消息显示
        title: '加载中',
        icon: 'loading',
        duration: 20000
      })
      wx.request({
        url: host + '/search',
        data: {
          content: that.data.content,
          skip: that.data.skip
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          var searchResult = res.data;
          console.log('666666')
          console.log(searchResult.length);
          if (searchResult != 'not found') {// 当返回结果不为not found时更新数据，不然设置内容标志位为空用于前端界面显示判断
            var thisBooks = that.data.searchResult;
            searchResult.forEach(function (book) {
              thisBooks.push(book);
            })
            that.setData({
              searchResult: util.imgChange(thisBooks),
              skip: that.data.skip + searchResult.length
            });
            if (searchResult.length == 1) {
              that.setData({
                havaData: false
              })
            }
          } else {
            that.setData({
              havaData: false
            })
          }
          wx.hideLoading();
        },
        // 失败返回
        fail: function () {
          wx.hideLoading();
          console.log('fail');
          wx.showToast({
            title: '搜索失败',
            icon: 'fail'
          })
        }
      })
    }
  },
  //点击索搜按钮事件
  bookSearch: function () {
    wx.showToast({// 消息显示
      title: '搜索中',
      icon: 'loading',
      duration: 20000
    })
    var that = this;
    var tempSearchHistory = [];
    var content = that.data.searchContent;
    that.setData({
      showHistory: true,
      skip: 0,
      havaData: true
    })
    //设置历史记录
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        tempSearchHistory = res.data;
        tempSearchHistory.push(content);
        var result = [];
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
    if (content != 'undefined') {
      that.setData({
        content: content,
      })
      wx.request({
        url: host + '/search',
        data: {
          content: content,
          skip: that.data.skip
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          wx.hideLoading();
          var searchResult = res.data;
          if (searchResult != 'not found') {// 当返回结果不为not found时更新数据，不然设置内容标志位为空用于前端界面显示判断
            that.setData({
              searchResult: util.imgChange(searchResult),
              skip: that.data.skip + searchResult.length
            });
          } else {
            that.setData({
              content: '',
            })
          }
        },
        // 失败返回
        fail: function () {
          wx.hideLoading();
          console.log('fail');
          wx.showToast({
            title: '搜索失败',
            icon: 'fail'
          })
        }

      })
    }
  },
  inputSearchContent: function (e) {
    var that = this;
    that.setData({
      searchContent: e.detail.value
    })
  },
  bookDetail: function (e) {//跳转书籍详情
    var bookId = e.currentTarget.dataset.bookid;
    console.log(bookId);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
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
  searchByHistory: function (e) {//按历史记录搜索
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