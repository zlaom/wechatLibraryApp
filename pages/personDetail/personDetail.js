//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    phone:'',
    idCard:'',
    test:[],
    recommend:true
  },
  
   onLoad: function () {
    console.log('onLoad')
    var userId='laogao';
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    console.log("????")
    wx.request({
      url: 'http://127.0.0.1:3000/personal/personDetail?userId='+userId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        var user = res.data;
        that.setData({
          phone:user.phone,
          idCard:user.idCard
        })
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {        
        // complete
      }
    })
    wx.getStorage({
      key: 'recommend',
      success: function(res){
        that.setData({
          recommend:res.data
        })
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  switchChange:function(e){
    var statu = e.detail.value;
    if(statu==false){
      wx.setStorage({
        key: 'recommend',
        data: false,
        success: function(res){
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
    else if(statu==true){
      wx.setStorage({
        key: 'recommend',
        data: true,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  }
})