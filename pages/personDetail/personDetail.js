const host = require('../../config.js').host2;

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    phone: '',
    idCard: '',
    test: [],
    setting: false,
    recommend: true // 推荐显示标志位
  },

  onLoad: function () {
    var userId = getApp().globalData.userId;
    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    wx.request({
      url: host+'/personal/personDetail?userId=' + userId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        var user = res.data;
        that.setData({
          phone: user.phone,
          idCard: user.idCard
        })
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    wx.getStorage({
      key: 'recommend',
      success: function (res) {
        that.setData({
          setting: true,
          recommend: res.data
        })
        // success
      },
      fail: function () {
        that.setData({
          setting: true,
        })
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  switchChange: function (e) {
    var statu = e.detail.value;
    if (statu == false) {
      wx.setStorage({
        key: 'recommend',
        data: false,
        success: function (res) {
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
    else if (statu == true) {
      wx.setStorage({
        key: 'recommend',
        data: true,
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  }
})