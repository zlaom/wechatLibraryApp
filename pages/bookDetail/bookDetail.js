const host = require('../../config.js').host2;
const image = require('../../config.js').image;
var QR = require("../../utils/qrcode.js");

Page({
  data: {
    book: {},
    relatedBooks: [],
    bookStatus: "",
    maskHidden: true,
    imagePath: '',
    statusId: 'null'//默认二维码生成文本
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
          console.log(res.data.statusId);
          that.setData({
            book: res.data.book,
            relatedBooks: res.data.relatedBooks,
            bookStatus: res.data.bookStatus,
            statusId: res.data.statusId
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

  // 首次渲染
  onReady: function () {
    var initUrl = this.data.statusId;
    if (initUrl != 'null') {
      var size = this.setCanvasSize();//动态设置画布大小
      this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    }
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

          // 获取状态Id
          var url = res.data.statusId;
          console.log("66666666666666666666");
          console.log(url);
          if (url != "null") {
            that.setData({
              statusId: url,
            })
            var st = setTimeout(function () {
              wx.hideToast()
              var size = that.setCanvasSize();
              //绘制二维码
              that.createQrCode(url, "mycanvas", size.w, size.h);
              clearTimeout(st);
            }, 2000)
          }
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
            statusId: 'null'
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
  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log("********" + tempFilePath);
        that.setData({
          imagePath: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  formSubmit: function (e) {
    var that = this;
    var url = e.detail.value.url;
    var st = setTimeout(function () {
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url, "mycanvas", size.w, size.h);
      that.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 2000)

  }
})