Page({
    signup: function (e) {
        wx.navigateTo({
            url: '../signup/signup'
        })
    },
    personal: function (e) {
        wx.switchTab({
            url: '../personal/personal'
        })
    },
    library: function (e) {
        wx.switchTab({
            url: '../library/library'
        })
    },
    community: function (e) {
        wx.switchTab({
            url: '../community/community'
        })
    }
})
