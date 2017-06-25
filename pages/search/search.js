const host = require('../../config.js').host2;
const image = require('../../config.js').image;

Page({
  data: {
    content: '',
    searchResult: [],
    searchContent: '',
    placeholder: '书目搜索'
  },
  // 页面加载前
  onLoad: function (query) {
    var that = this;
    var content = query.content;
    if (content != 'undefined') {// 当搜索关键词不为空进行网络请求
      that.setData({
        content: content,
      })
      wx.request({
        url: host + '/search',
        data: {
          content: content
        },
        method: 'GET',
        success: function (res) {
          var searchResult = res.data;
          if (searchResult != 'not found') {// 当返回结果不为not found时更新数据，不然设置内容标志位为空用于前端界面显示判断
            for (var i = 0; i < searchResult.length; i++) {
              searchResult[i].cover = image + searchResult[i].cover;
            }
            that.setData({
              searchResult: searchResult
            });
          } else {
            that.setData({
              content: '',
            })
          }
        },
        fail: function () {
          console.log('搜索请求失败');
        }
      })
    }
  },
  // 搜索按钮对应方法
  bookSearch: function () {
    var that = this;
    var content = that.data.searchContent;
    if (content != 'undefined') {// 当搜索关键词不为空进行网络请求
      that.setData({
        content: content,
      })
      wx.request({
        url: host + '/search',
        data: {
          content: content
        },
        method: 'GET',
        success: function (res) {
          var searchResult = res.data;
          if (searchResult != 'not found') {// 当返回结果不为not found时更新数据，不然设置内容标志位为空用于前端界面显示判断
            //获取将json对象赋值给books
            for (var i = 0; i < searchResult.length; i++) {
              searchResult[i].cover = image + searchResult[i].cover;
            }
            that.setData({
              searchResult: searchResult
            });
          } else {
            that.setData({
              content: '',
            })
          }
        },
        fail: function () {
          console.log('搜索网络请求fail');
        }
      })
    }
  },
  // 输入时不断更新输入框数据到data的searchContent
  inputSearchContent: function (e) {
    var that = this;
    that.setData({
      searchContent: e.detail.value
    })
  },
  // 跳转书籍详情页面
  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.hi;
    console.log(bookId);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  },
  // 调起扫码
  scanCode: function (e) {
    wx.scanCode({
      onlyFromCamera: true,// 设置只能扫码试用相机
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
  }
})