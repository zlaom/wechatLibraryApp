Page({
  data: {
    messagesNum:'',
    messages: []
  },
  deleteNew: function (e) {
    console.log("delete");
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:3000/personal/messages',
      data:{
        userId:"laogao"
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
        that.setData({
          messagesNum: res.data.messagesNum,
          messages: res.data.messages
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
  },
  deleteNews:function(e){
    console.log(e);
  },
  deleteNew: function (e) {
    var that=this;
    console.log(e);
    var param = {};

    var num = e.currentTarget.dataset.num;
    var string = "messages[" + num + "].ifShow";
    param[string] = 'changed data';
    that.setData(param);
    that.setData({
      messagesNum: this.data.messagesNum-1
    });

    wx.request({
      url: 'http://localhost:3000/personal/delMessage', //仅为示例，并非真实的接口地址
      data: {
        userId:'laogao',
        messageId: e.currentTarget.dataset.newid, //设置发送到后台的数据
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log(res.data)
        if (res.data == 'success') {
          wx.hideLoading();
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
          that.setData({
            ifrelated: 1,
          })

        } else {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data
          })
        }
      }
    })

  }
})