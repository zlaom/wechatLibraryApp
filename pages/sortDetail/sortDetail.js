const host = require('../../config.js').host2;
const image = require('../../config.js').image;
var util = require("../../utils/util.js");

Page({
  data: {
    sort: '',
    books: '',
    skip:0,
    havaData:true
  },
// 页面开启前
  onLoad: function (query) {
    wx.showToast({// 消息显示
      title: '加载中',
      icon: 'loading',
      duration: 20000
    })
    var sort = query.sort
    this.setData({
      sort: sort
    })
    var sort = this.data.sort;
    var that = this;
    wx.request({
      url: host + '/library/sortDetail',
      data: {
        bookSort: sort,
        skip: that.data.skip
      },
      method: 'GET', 
      success: function (res) {
        //获取将json对象赋值给books
        var books = res.data;
        if (res.data) {
          that.setData({
            books: util.imgChange(books),
            skip: that.data.skip+books.length
          });
        }
        wx.hideLoading();
      },
      // 失败返回
      fail: function () {
        console.log('fail');
        wx.showToast({
          title: '加载失败',
          icon: 'fail'
        })
      }
    })
  },
  onReachBottom:function(){
    var that = this;
    if(that.data.havaData){
      wx.showToast({// 消息显示
        title: '加载中',
        icon: 'loading',
        duration: 20000
      })
    }
    wx.request({
      url: host + '/library/sortDetail',
      data: {
        bookSort: that.data.sort,
        skip: that.data.skip
      },
      method: 'GET',
      success: function (res) {
        //获取将json对象赋值给books
        var books = res.data;
        var thisBooks=that.data.books;
        books.forEach(function(book){
          thisBooks.push(book);
        })
        if (res.data) {
          that.setData({
            books: util.imgChange(thisBooks),
            skip: that.data.skip + books.length
          });
        }
        if(books.length==0){
          that.setData({
            havaData:false
          })
        }
        wx.hideLoading();
      },
      // 失败返回
      fail: function () {
        console.log('fail');
        wx.showToast({
          title: '加载失败',
          icon: 'fail'
        })
      }
    })
  },
  // 跳转书籍详情
  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId=' + bookId
    })
  }
})
