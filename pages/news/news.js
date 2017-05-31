const host = require('../../config.js').host2;

Page({
  data: {
    messagesNum: '',
    messages: [],
  },
  deleteNew: function (e) {
    console.log("delete");
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: host + '/personal/messages',
      data: {
        userId: getApp().globalData.userId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          messagesNum: res.data.messagesNum,
          messages: res.data.messages
        })
      },
      fail: function (res) {
         // fail
        console.log('fail');
      },
      complete: function (res) {
        // complete
      }
    })

  },
  deleteAllNews: function (e) {
    console.log(e);
    var that = this;

    wx.request({
      url: host + '/personal/delAllNews', // 删除对应消息
      data: {
        userId: getApp().globalData.userId, //设置发送到后台的数据
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
            title: '删除所有成功',
            icon: 'success'
          })
          that.setData({
            messages: [],
            messagesNum:0
            //ifrelated: 1
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
  },
  deleteNew: function (e) {
    var that = this;
    var param = {};
    var num = e.currentTarget.dataset.num;
    var string = "messages[" + num + "].ifShow";
    param[string] = 'changed data';
    that.setData(param);
    that.setData({
      messagesNum: this.data.messagesNum - 1
    });

    wx.request({
      url: host + '/personal/delMessage', // 删除对应消息
      data: {
        userId: getApp().globalData.userId,
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