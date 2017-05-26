//personal.js
//获取应用实例
const host = require('../../config.js').host2;

var app = getApp()
Page({
  data: {
    userInfo: {},
    borrowBook: [],
    reserveBook: [],
    recommendBook: [],
    recommend: false,
    remind: 10
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      });
      console.log(userInfo.nickName);
      wx.getStorage({
        key: 'userId',
        // 存在缓存的时候
        success: function (res) {
          console.log(res.data)
          if (userInfo.nickName != res.data) {
            wx.request({
              url: host + '/signup/ifExist', //仅为示例，并非真实的接口地址
              data: {
                userId: userInfo.nickName,
              },
              method: 'GET',
              success: function (res) {
                console.log(res.data);
                if (res.data == "notExist") {
                  console.log("跳转");
                  wx.redirectTo({
                    url: '/pages/signup/signup' //personal/personal signup/signup
                  })
                }
              }
            })
          }
          getApp().globalData.userId = userInfo.nickName;

        },
        // 没有缓存时候
        fail: function () {
          wx.request({
            url: host + '/signup/ifExist', //仅为示例，并非真实的接口地址
            data: {
              userId: userInfo.nickName,
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data);
              if (res.data == "notExist") {
                console.log("跳转");
                wx.redirectTo({
                  url: '/pages/signup/signup' //personal/personal signup/signup
                })
              }
            }
          })
          // fail
        }
      })


    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log("缓存");
        console.log(res.data);
        var userId = res.data;//这玩意儿要改的
        console.log("personalonshow");
        console.log(userId);
        wx.request({
          url: host + '/personal?userId=' + userId,//传给服务器用户ID
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log(res);
            /*设置page.data中的borrowBook、reserveBook、recommendBook数据*/
            var borrowBook = res.data.borrowBook;
            var reserveBook = res.data.reserveBook;
            var recommendBook = res.data.recommendBook;
            var temp0 = [];
            var temp1 = [];
            var temp2 = [];
            if (borrowBook) {
              for (var i = 0; i < borrowBook.length; i++) {
                temp0[i] = {
                  id: borrowBook[i].bookId,
                  title: borrowBook[i].bookTitle,
                  cover: borrowBook[i].bookCover
                }
              }
            }
            if (reserveBook) {
              for (var i = 0; i < reserveBook.length; i++) {
                temp1[i] = {
                  id: reserveBook[i].bookId,
                  title: reserveBook[i].bookTitle,
                  cover: reserveBook[i].bookCover
                }
              }
            }
            if (recommendBook) {
              for (var i = 0; i < recommendBook.length; i++) {
                temp2[i] = {
                  id: recommendBook[i].bookId,
                  title: recommendBook[i].bookTitle,
                  cover: recommendBook[i].bookCover
                }
              }
            }

            that.setData({
              borrowBook: temp0,
              reserveBook: temp1,
              recommendBook: temp2
            })
            // success0
          },
          fail: function () {
            console.log("err");
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    })
    wx.getStorage({
      key: 'recommend',
      success: function (res) {
        var recommend = res.data;
        //console.log('recommend:' + recommend);
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
        // success
      }
    })
  },
  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.hi;
    console.log(bookId);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  },
  personDetail: function (e) {
    wx.navigateTo({
      url: '/pages/personDetail/personDetail'
    })
  },
  news: function (e) {
    wx.navigateTo({
      url: '/pages/news/news'
    })
  }
})
