//获取应用实例
var app = getApp()
Page({
    data: {
        phone: '',
        idcard: '',
        userInfo: {}
    },
    bindphone: function (event) {
        this.setData({
            phone: event.detail.value
        })
    },
    bindidcard: function (event) {
        this.setData({
            idcard: event.detail.value
        })
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


    signup: function (event) {
        var that = this
        wx.showToast({
            title: '注册中',
            icon: 'loading',
            duration: 20000
        })
        console.log("data:" + this.data.phone + " " + this.data.idcard)
        wx.request({
            url: 'http://localhost:3000/signup', //仅为示例，并非真实的接口地址
            data: {
                userId: 'none',
                phone: this.data.phone,
                idcard: this.data.idcard
            },
            method: 'post',
            header: {
                'content-type': 'application/json'
            },

            success: function (res) {
                console.log(res.data)
                if (res.data == 'success') {
                    wx.switchTab({
                        url: '/pages/community/community'
                    })
                    
                }else{
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
