const host = require('./config.js').host2;
const websocket = require('./config.js').host1;

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.redirectTo({
      url: 'pages/personal/personal' //personal/personal signup/signup
    })
  },
  // 页面关闭时
  onUnload: function () {
    wx.closeSocket();
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    userId:null,
    dataChange:false,//数据更新标志位
    messageNum:0,//消息数量
    remindLevel: 0
  }
})
