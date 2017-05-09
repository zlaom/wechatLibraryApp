Page({
  data: {
    newsNum: '10',
    news: []
  },
  deleteNew: function (e) {
    console.log("delete");
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:3000/personal/messages',
      data:{
        userId:"test"
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
        that.setData({

        })
        // success
      },
      fail: function (res) {
        console.log('fail');
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})