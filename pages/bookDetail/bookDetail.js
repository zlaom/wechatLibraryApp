const host = require('../../config.js').host2;
const image = require('../../config.js').image;
Page({
  data: {
    book: {},
    relatedBooks: [],
    bookStatus: ""
  },

  // 开启页面前
  onLoad: function (option) {
    var that = this;

    // 向服务器请求书籍详情页面数据
    wx.request({
      url: host + '/library/bookDetail',
      data: {
        bookId: option.bookId,
        userId: getApp().globalData.userId
      },
      method: 'GET',

      // 成功返回
      success: function (res) {
        console.log(res.data);
        if (res.data) {
          res.data.book.bookCover = image + res.data.book.bookCover;
          for (var i = 0; i < res.data.relatedBooks.length; i++) {
            res.data.relatedBooks[i].bookCover = image + res.data.relatedBooks[i].bookCover;
          }
          that.setData({
            book: res.data.book,
            relatedBooks: res.data.relatedBooks,
            bookStatus: res.data.bookStatus
          })
        }
      },

      fail: function (res) {
        console.log('fail');
        // fail
      },
      complete: function (res) {
        // complete
      }
    });

  },

  // 页面呈现前
  onShow: function () {

  },

  // 获得书籍详情并更新数据
  bookDetail: function (e) {
    console.log("even")
    console.log(e);
    var bookId = e.currentTarget.dataset.bookid
    wx.redirectTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  },

  // 书籍预约
  reserve: function (e) {
    var that = this;
    wx.showToast({
      title: '预约中',
      icon: 'loading',
      duration: 20000
    })
    wx.request({
      url: host + '/library/bookReserve', //仅为示例，并非真实的接口地址
      data: {
        bookId: e.target.dataset.bookid, //设置发送到后台的bookid
        userId: getApp().globalData.userId
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log(res.data)
        if (res.data.message == 'success') {
          wx.hideLoading();
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          that.setData({
            bookStatus: "reserve",
          })

          //给了才减一
          if (res.data.resources == 1) {
            // 使数据中bookCan减一
            var param = {};
            var bookCan = "book.bookCan";
            param[bookCan] = that.data.book.bookCan - 1;
            that.setData(param);
          }
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data
          })
        }
      }
    })
  },

  // 取消预约
  cancelReserve: function (e) {
    var that = this;
    console.log(e);
    var that = this
    wx.showToast({
      title: '预约中',
      icon: 'loading',
      duration: 20000
    })
    wx.request({
      url: host + '/library/cancelReserve', // 仅为示例，并非真实的接口地址
      data: {
        bookId: e.target.dataset.bookid, // 设置发送到后台的bookid
        userId: getApp().globalData.userId // 用户名
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log(res.data)
        if (res.data.message == 'success') {
          wx.hideLoading();
          wx.showToast({
            title: '取消成功',
            icon: 'success'
          })
          that.setData({
            bookStatus: "none",
          })

          // 持有才加一
          if (res.data.resources == 1) {
            // 使数据中bookCan加一
            var param = {};
            var bookCan = "book.bookCan";
            param[bookCan] = that.data.book.bookCan + 1;
            that.setData(param);
          }
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data
          })
        }
      }
    })
  },

  // 反回个人中心
  returnPersonal: function (e) {
    wx.switchTab({
      url: '/pages/personal/personal'
    })
  }
})
