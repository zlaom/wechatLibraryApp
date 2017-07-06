// bookDetail.js 2017/6/3
const host = require('../../config.js').host2;
var QR = require("../../utils/qrcode.js");
var util = require("../../utils/util.js");
var app = getApp()
Page({
  data: {
    userInfo: {},
    book: {},
    relatedBooks: [],
    bookStatus: "",
    maskHidden: true,
    imagePath: '',
    statusId: 'null',//默认二维码生成文本
    reqStatus:false
  },
  // 开启页面前
  onLoad: function (option) {
    wx.showToast({// 消息显示
      title: '加载中',
      icon: 'loading',
      duration: 20000
    })
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
          console.log(res.data);
          that.setData({
            book: util.imgChange(res.data.book),
            relatedBooks: util.imgChange(res.data.relatedBooks),
            bookStatus: res.data.bookStatus,
            statusId: res.data.statusId
          })
        }
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
          }, 50)
        }
        wx.hideLoading();
        that.setData({
          reqStatus: true
        })
      },
      // 失败返回
      fail: function () {
        console.log('fail');
        wx.showToast({
          title: '加载失败',
          icon: 'fail'
        })
      }
    });
    wx.onSocketMessage(function (res) {
      console.log(res.data);
      var data = res.data;
      var dataArray = data.split("_");
      if (dataArray[0] == 'borrow') {
        that.setData({
          bookStatus: 'borrow'
        })
        getApp().globalData.dataChange = true;
        wx.showToast({
          title: '借书成功',
          icon: 'success'
        })
      } else if (dataArray[0] == 'return') {
        that.setData({
          bookStatus: 'none',
          statusId:'null'
        })
        getApp().globalData.dataChange = true;
        wx.showToast({
          title: '还书成功',
          icon: 'success'
        })
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
    var bookId = e.currentTarget.dataset.bookid
    wx.redirectTo({// 跳转相关书籍详情页面
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  },
  // 书籍预约操作
  reserve: function (e) {
    var that = this;
    if (that.data.reqStatus){
      wx.showToast({// 消息显示
        title: '预约中',
        icon: 'loading',
        duration: 20000
      })
      that.setData({
        reqStatus:false
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
            that.setData({
              bookStatus: "reserve",
            })
            getApp().globalData.dataChange = true;
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
                wx.showToast({
                  title: '预约成功',
                  icon: 'success'
                })
              }, 50)
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
          that.setData({
            reqStatus: true
          })
        },
        // 失败返回
        fail: function () {
          console.log('fail');
          wx.showToast({
            title: '连接服务器失败',
            icon: 'fail'
          })
          that.setData({
            reqStatus: true
          })
        }
      })
    }
  
  },
  // 取消预约操作
  cancelReserve: function (e) {
    var that = this;
  
    if (that.data.reqStatus) {
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
            getApp().globalData.dataChange = true;
          } else {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: res.data
            })
          }
          that.setData({
            reqStatus: true
          })
        },
        // 失败返回
        fail: function () {
          console.log('fail');
          wx.showToast({
            title: '连接服务器失败',
            icon: 'fail'
          })
          that.setData({
            reqStatus: true
          })
        }

      })
    }
   
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
      fail: function () {
        console.log(res);
      }
    });
  }
})