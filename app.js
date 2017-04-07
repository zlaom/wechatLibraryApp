//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    /*wx.login({
      success: function (res) {
        var that = this
        console.log(res)
        if (res.code) {
          //发起网络请求
          console.log("data:" + res.code)
          wx.request({
            url: 'http://localhost:3000/onLogin',
            data: {
              code: res.code,
              appid: "wxc2af330fd4b939c3",
              secret: "f9796c79274066b11bc4f87b1f205fd8"
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
            }
          })
          console.log("OK")
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });*/
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail'
    })
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
    userInfo: null
  }
})
