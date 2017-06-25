//personal.js
//获取应用实例
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
    remind:0
  },
  // 页面加载前
  onLoad: function () {
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
          }else{
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
      // 获取当前缓存用于缓存跟新
     /*
        key: 'userId',
        // 存在缓存的时候
        success: function (res) {
          if (userInfo.nickName != res.data) {// 若当前用户昵称不等于缓存用户昵称则更新缓存
            wx.setStorage({
              key: "userId",
              data: userInfo.nickName
            })
          }
          getApp().globalData.userId = userInfo.nickName;// 设置全局变量
        },
        // 没有缓存时候
        fail: function () {// 直接网络查询用户
          wx.request({
            url: host + '/signup/ifExist', //仅为示例，并非真实的接口地址
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
              }else{
                console.log("添加缓存");
                // 用户存在缓存用户名数据
                wx.setStorage({
                  key: "userId",
                  data: userInfo.nickName
                })
              }
            }
          })
        }
      })*/
    })
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
            var remind=res.data.remind;
            var temp0 = [];
            var temp1 = [];
            var temp2 = [];
            if (borrowBook) {
              for (var i = 0; i < borrowBook.length; i++) {
                temp0[i] = {
                  id: borrowBook[i].bookId,
                  title: borrowBook[i].bookTitle,
                  cover: image+borrowBook[i].bookCover
                }
              }
            }
            if (reserveBook) {
              for (var i = 0; i < reserveBook.length; i++) {
                temp1[i] = {
                  id: reserveBook[i].bookId,
                  title: reserveBook[i].bookTitle,
                  cover: image+reserveBook[i].bookCover
                }
              }
            }
            if (recommendBook) {
              for (var i = 0; i < recommendBook.length; i++) {
                temp2[i] = {
                  id: recommendBook[i].bookId,
                  title: recommendBook[i].bookTitle,
                  cover: image+recommendBook[i].bookCover
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
      fail: function(){
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
