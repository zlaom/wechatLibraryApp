const host = require('../../config.js').host2;

Page({
  data: {
    messagesNum: '',
    messages: [],
  },
  // 页面加载前
  onLoad: function () {
    var that = this;
    // 获取当前缓存用户
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data;// 设置用户名
        wx.request({// 网络请求消息内容
          url: host + '/personal/messages',
          data: {
            userId: getApp().globalData.userId
          },
          method: 'GET',
          // 成功返回
          success: function (res) {
            //console.log(res);
            that.setData({
              messagesNum: res.data.messagesNum,
              messages: res.data.messages
            })
          },
          // 失败返回
          fail: function (res) {
            console.log(host + '/personal/messages fail');
          }
        })
      }
    })
  },
  // 删除所有消息
  deleteAllNews: function (e) {
    var that = this;
    wx.request({// 网络请求
      url: host + '/personal/delAllNews', // 删除对应消息
      data: {
        userId: getApp().globalData.userId, //设置发送到后台的数据
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      // 成功返回
      success: function (res) {
        if (res.data == 'success') {
          wx.hideLoading();
          wx.showToast({
            title: '删除所有成功',
            icon: 'success'
          })
          that.setData({
            messages: [],
            messagesNum:0
          })
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data
          })
        }
      },
      // 失败返回
      fail: function (res) {
        console.log(host + '/personal/delAllNews fail');
      }
    })
  },
  // 删除单条消息
  deleteNew: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    var param = {};// 特殊方法更改微信小程序的data内联数组值-1
    var string = "messages[" + num + "].ifShow";// 特殊方法更改微信小程序的data内联数组值-2
    param[string] = 'changed data';// 特殊方法更改微信小程序的data内联数组值-3
    that.setData(param);// 特殊方法更改微信小程序的data内联数组值-4
    that.setData({
      messagesNum: this.data.messagesNum - 1
    });
    wx.request({//网络请求
      url: host + '/personal/delMessage', // 删除对应消息
      data: {
        userId: getApp().globalData.userId,
        messageId: e.currentTarget.dataset.newid, //设置发送到后台的数据
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      // 成功返回
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
      },
      // 失败返回
      fail: function (res) {
        console.log(host + '/personal/delMessage fail');
      }
    })
  }
})