const host = require('./config.js').host2;
const websocket = require('./config.js').host1;

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            var userName = res.userInfo.nickName;// 获取用户名
            //console.log(userName);
            // webSocket部分
            //console.log("将要连接服务器。");
             wx.connectSocket({
               url: websocket
             });
             wx.onSocketOpen(function (res) {
               //连接成功发送当前用户名
               wx.sendSocketMessage({
                 data: userName
               });
             });
          }
        });
      }
    });
     wx.onSocketMessage(function (res) {
       console.log(res.data);
       var data = res.data;
       var dataArray = data.split("_");
       if(dataArray[0]=='dataChange'){
         getApp().globalData.dataChange = true;
       } else if (dataArray[0]=='message'){
         wx.showModal({
           title: '您有新的消息！',
           content: dataArray[1]+'\n立即跳转个人消息面？',
           success: function (res) {
             if (res.confirm) {
               //console.log('用户点击确定')
               wx.navigateTo({
                 url: '/pages/news/news'
               })
             } else if (res.cancel) {
               //console.log('用户点击取消')
             }
           }
         })
       }

    });
     wx.onSocketClose(function (res) {
       console.log('WebSocket 已关闭！')
       wx.login({
         success: function (res) {
           wx.getUserInfo({
             success: function (res) {
               var userName = res.userInfo.nickName;// 获取用户名
               //console.log(userName);
               // webSocket部分
               //console.log("将要连接服务器。");
               wx.connectSocket({
                 url: websocket
               });
               wx.onSocketOpen(function (res) {
                 //连接成功发送当前用户名
                 wx.sendSocketMessage({
                   data: userName
                 });
               });
             }
           });
         }
       });
     });
    wx.redirectTo({
      url: 'pages/personal/personal' //personal/personal signup/signup
    })
  },
  // 页面关闭时
 /* onUnload: function () {
    wx.closeSocket();
  },*/

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
    messageNum:0//消息数量
  }
})
