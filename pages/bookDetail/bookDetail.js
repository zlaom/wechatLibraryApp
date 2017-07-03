// bookDetail.js 2017/6/3
const host = require('../../config.js').host2;
const image = require('../../config.js').image;
var QR = require("../../utils/qrcode.js");
var app = getApp()
Page({
  data: {
    userInfo: {},
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
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    // 向服务器请求书籍详情页面相关数据
    console.log('用户名'+getApp().globalData.userId);
    wx.request({
      url: host + '/library/bookDetail',
      data: {
        bookId: option.bookId,
        userId: getApp().globalData.userId
      },
      method: 'GET',
      // 成功返回
      success: function (res) {
        if (res.data) {
          res.data.book.bookCover = image + res.data.book.bookCover;
          for (var i = 0; i < res.data.relatedBooks.length; i++) {// 添加图片地址
            res.data.relatedBooks[i].bookCover = image + res.data.relatedBooks[i].bookCover;
          }
          that.setData({
            book: res.data.book,
            relatedBooks: res.data.relatedBooks,
            bookStatus: res.data.bookStatus,
            statusId: res.data.statusId
          })
        }
      },
      // 失败返回
      fail: function (res) {
        console.log('fail');
      }
    });
  },
  // 首次渲染绘制状态二维码
  onReady: function () {
    var initUrl = this.data.statusId;
    if (initUrl != 'null') {
      var size = this.setCanvasSize();//动态设置画布大小
      this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    }
  },
  // 获得书籍详情并更新数据
  bookDetail: function (e) {
    //console.log("even")
    //console.log(e);
    var bookId = e.currentTarget.dataset.bookid
    wx.redirectTo({// 跳转相关书籍详情页面
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  },
  // 书籍预约操作
  reserve: function (e) {
    var that = this;
    wx.showToast({// 消息显示
      title: '预约中',
      icon: 'loading',
      duration: 20000
    })
    wx.request({// 网络请求
      url: host + '/library/bookReserve',
      data: {
        bookId: e.target.dataset.bookid,
        userId: getApp().globalData.userId
      },
      method: 'post',
      header: {
        'content-type': 'application/json',
        'session': 'session_id'
      },
      // 成功返回
      success: function (res) {
        //console.log(res.data)
        if (res.data.message == 'success') {
          wx.hideLoading();
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          that.setData({
            bookStatus: "reserve",
          })
          var url = res.data.statusId;// 获取状态Id
          if (url != "null") {// 若statusId存在
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
          if (res.data.resources == 1) {// 若分配了书本资源则使数据中book.bookCan减一
            var param = {};
            var bookCan = "book.bookCan";
            param[bookCan] = that.data.book.bookCan - 1;
            that.setData(param);
          }
        } else {// 错误提示
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.message
          })
        }
      }
    })
  },
  // 取消预约操作
  cancelReserve: function (e) {
    var that = this;
    var that = this
    wx.showToast({// 消息提醒
      title: '取消中',
      icon: 'loading',
      duration: 20000
    })
    wx.request({
      url: host + '/library/cancelReserve',
      data: {
        bookId: e.target.dataset.bookid, 
        userId: getApp().globalData.userId
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      // 成功返回
      success: function (res) {
        //console.log(res.data)
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
          if (res.data.resources == 1) {// 若当前书本状态持有资源则使数据中book.bookCan加一
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
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH);

  },
  //暂时未使用---获取临时缓存照片路径，存入data中
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
  }
})