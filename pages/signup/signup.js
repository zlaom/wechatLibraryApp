const host = require('../../config.js').host2;

//获取应用实例
var app = getApp()
Page({
  data: {
    phone: '',
    idcard: '',
    userInfo: {}
  },
  // 不断获取输入框内容并更新到data中的phone
  bindphone: function (event) {
    this.setData({
      phone: event.detail.value
    })
  },
  // 不断获取输入框内容并更新到data中的idcard
  bindidcard: function (event) {
    this.setData({
      idcard: event.detail.value
    })
  },
  // 页面加载前
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  // 点击注册按钮
  signup: function (event) {
    var that = this
    wx.showToast({
      title: '注册中',
      icon: 'loading',
      duration: 20000
    })
    //console.log("data:" + that.data.phone + " " + that.data.idcard)
    // 进行微信登陆
    wx.login({
      success: function (res) {
        // 微信登陆后获取当前用户数据
        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;// 获取用户名
            //发起网络请求
            wx.request({
              url: host + '/signup', //登陆网址
              data: {
                userId: simpleUser.nickName,
                phone: that.data.phone,
                idCard: that.data.idcard
              },
              method: 'post',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.data == 'success') {
                  // 缓存用户名数据
                  wx.setStorage({
                    key: "userId",
                    data: simpleUser.nickName
                  })
                  // 设置用户数据全局变量
                  getApp().globalData.userId = simpleUser.nickName;
                  console.log("跳转")
                  wx.hideLoading();
                  wx.switchTab({
                    url: '/pages/personal/personal'
                  });
                } else {
                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: res.data
                  })
                }
              }
            });
          }
        });
      }
    });
  }
})
