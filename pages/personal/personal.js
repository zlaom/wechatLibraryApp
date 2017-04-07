//personal.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    borrowBook: [
      { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
      { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
      { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
      { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
      { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
      { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
    ],
    reserverBook: [
      { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
      { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
      { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
      { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
      { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
      { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
    ],
    recommendBook: [
      { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
      { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
      { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
      { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
      { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
      { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
    ],
    remind: 10
  },
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
  bookDetail: function (e) {
    console.log(e.detail);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail'
    })
  }
})
