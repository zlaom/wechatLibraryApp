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
  //页面开启前
  onLoad: function () {
    wx.showToast({// 消息显示
      title: '加载中',
      icon: 'loading',
      duration: 20000
    })
    var userId = getApp().globalData.userId;
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    // 网络请求
    wx.request({
      url: host+'/personal/personDetail?userId=' + userId,
      data: {},
      method: 'GET',
      // 成功返回
      success: function (res) {
        wx.hideLoading();
        var user = res.data;
        that.setData({
          phone: user.phone,
          idCard: user.idCard
        })
      },
      fail: function () {
        console.log('fail');
      }
    })
    // 获取标志位recommend缓存
    wx.getStorage({
      key: 'recommend',
      success: function (res) {
        that.setData({
          setting: true,
          recommend: res.data
        })
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
  // 设置是否显示推荐书籍
  switchChange: function (e) {
    var statu = e.detail.value;
    if (statu == false) {
      wx.setStorage({
        key: 'recommend',
        data: false,
        success: function (res) {
          console.log('设置recommend success');
        },
        fail: function () {
          console.log('设置recommend fail');
        }
      })
    }
    else if (statu == true) {
      wx.setStorage({
        key: 'recommend',
        data: true,
        success: function (res) {
          console.log('设置recommend success');
        },
        fail: function () {
          console.log('设置recommend fail');
        }
      })
    }
  }
})