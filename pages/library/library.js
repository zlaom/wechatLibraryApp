Page({
    data: {
        sorts: [
            { cover: './cover/book1.jpg', sortName: '奇幻', num: '600' },
            { cover: './cover/book2.jpg', sortName: '数学', num: '800' },
            { cover: './cover/book3.jpg', sortName: '计算机', num: '900' },
            { cover: './cover/book1.jpg', sortName: '前端', num: '600' },
            { cover: './cover/book2.jpg', sortName: '后端', num: '800' },
            { cover: './cover/book3.jpg', sortName: '商业', num: '900' }
        ]
    },
    sortDetail: function (e) {
        wx.navigateTo({
            url: '/pages/sortDetail/sortDetail'
        })
    },
    bookSearch:function(e){
         wx.navigateTo({
            url: '/pages/search/search'
        })
    }
})
