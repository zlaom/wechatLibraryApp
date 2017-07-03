//personal.js
//获取应用实例
const websocket = require('../../config.js').host1;
const host = require('../../config.js').host2;
const image = require('../../config.js').image;

var app = getApp()
Page({
  data: {
    userInfo: {},
    borrowBook: [],
    reserveBook: [],
    recommendBook: [],
    recommend: false,
    remind: 0
  },
  // 页面加载前
  onLoad: function () {
    var self = this;

    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            var userName = res.userInfo.nickName;// 获取用户名
            console.log(userName);
            // webSocket部分
            console.log("将要连接服务器。");
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
      console.log('收到服务器内容：' + res.data);
      wx.showModal({
        title: '提示',
        content: res.data,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/news/news'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    });
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      });
      // 网络请求查询用户
      wx.request({
        url: host + '/signup/ifExist',
        data: {
          userId: userInfo.nickName,
        },
        method: 'GET',
        success: function (res) {
          if (res.data == "notExist") {// 若用户不存在则跳转注册页面
            console.log("跳转");
            wx.redirectTo({
              url: '/pages/signup/signup'
            })
          } else {
            console.log("设置缓存");
            wx.setStorage({
              key: "userId",
              data: userInfo.nickName
            });
            // 设置全局变量
            getApp().globalData.userId = userInfo.nickName;
          }
        }
      })
    })
  },

  onUnload: function () {
    wx.closeSocket();
  },

  // 页面开启前
  onShow: function () {
    var that = this;
    // 获取当前缓存用户
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data;// 设置用户名
        // 网络请求个人中心数据
        wx.request({
          url: host + '/personal?userId=' + userId,//传给服务器用户ID
          data: {},
          method: 'GET',
          success: function (res) {
            /*设置page.data中的borrowBook、reserveBook、recommendBook数据*/
            var borrowBook = res.data.borrowBook;
            var reserveBook = res.data.reserveBook;
            var recommendBook = res.data.recommendBook;
            var remind = res.data.remind;
            var temp0 = [];
            var temp1 = [];
            var temp2 = [];
            if (borrowBook) {
              for (var i = 0; i < borrowBook.length; i++) {
                temp0[i] = {
                  id: borrowBook[i].bookId,
                  title: borrowBook[i].bookTitle,
                  time: borrowBook[i].returnTime+ '还',
                  cover: image + borrowBook[i].bookCover
                }
              }
            }
            if (reserveBook) {
              for (var i = 0; i < reserveBook.length; i++) {
                temp1[i] = {
                  id: reserveBook[i].bookId,
                  title: reserveBook[i].bookTitle,
                  time: '保留到' + reserveBook[i].returnTime,
                  cover: image + reserveBook[i].bookCover
                }
              }
            }
            if (recommendBook) {
              for (var i = 0; i < recommendBook.length; i++) {
                temp2[i] = {
                  id: recommendBook[i].bookId,
                  title: recommendBook[i].bookTitle,
                  cover: image + recommendBook[i].bookCover
                }
              }
            }
            that.setData({
              borrowBook: temp0,
              reserveBook: temp1,
              recommendBook: temp2,
              remind: remind
            })
          },
          fail: function () {
            console.log("err");
          }
        })
      }
    })
    // 设置推荐标志位
    wx.getStorage({
      key: 'recommend',
      success: function (res) {
        var recommend = res.data;
        if (recommend == true) {
          that.setData({
            recommend: true
          })
        }
        else if (recommend == false) {
          that.setData({
            recommend: false
          })
        }
      },
      fail: function () {
        console.log('获取标志位信息失败');
      }
    })
  },
  // 跳转书籍详情页面
  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.hi;
    console.log(bookId);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  },
  // 跳转个人资料界面
  personDetail: function (e) {
    wx.navigateTo({
      url: '/pages/personDetail/personDetail'
    })
  },
  // 跳转消息界面
  news: function (e) {
    wx.navigateTo({
      url: '/pages/news/news'
    })
  }
})
