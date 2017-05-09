//personal.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    borrowBook: [],
    reserveBook: [],
    recommendBook: [],
    recommend:true,
    remind: 10
  },
  onLoad: function () {
    console.log('onLoad personal page.');
    var userId = 'laogao';//这玩意儿要改的
    var that = this;
    wx.request({
      url: 'http://localhost:3000/personal?userId='+userId,//传给服务器用户ID
      data: {      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){   
        console.log(res);  
        /*设置page.data中的borrowBook、reserveBook、recommendBook数据*/
        var borrowBook=res.data.borrowBook;
        var reserveBook=res.data.reserveBook;
        var recommendBook=res.data.recommendBook;
        var temp0=[];
        var temp1=[];
        var temp2=[];
        for(var i=0;i<borrowBook.length;i++){
          temp0[i]={
            id:borrowBook[i].bookId,
            title:borrowBook[i].bookTitle,
            cover:borrowBook[i].bookCover
          }
        }
        for(var i=0;i<reserveBook.length;i++){
          temp1[i]={
            id:reserveBook[i].bookId,
            title:reserveBook[i].bookTitle,
            cover:reserveBook[i].bookCover
          }
        }
        for(var i=0;i<recommendBook.length;i++){
          temp2[i]={
            id:recommendBook[i].bookId,
            title:recommendBook[i].bookTitle,
            cover:recommendBook[i].bookCover
          }
        }
        that.setData({
          borrowBook: temp0,
          reserveBook: temp1,
          recommendBook: temp2
        })
        // success0
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    })
    wx.getStorage({
      key: 'recommend',
      success: function(res){
        var recommend = res.data;
        console.log('recommend:'+recommend);
        if(recommend==true){
          that.setData({
            recommend:true
          })
        }
        else if(recommend==false){
          that.setData({
            recommend:false
          })
        }
        // success
      }
    })
  },
  bookDetail: function (e) {
    var bookId=e.currentTarget.dataset.hi;
    console.log(bookId);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId='+bookId
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
