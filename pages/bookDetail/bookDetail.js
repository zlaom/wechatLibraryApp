Page({
    data: {
        book: {},
        relatedBooks: [
            { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
            { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
            { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
            { id: 'book3', title: 'hello3', cover: './cover/book3.jpg' },
            { id: 'book1', title: 'hello1', cover: './cover/book1.jpg' },
            { id: 'book2', title: 'hello2', cover: './cover/book2.jpg' },
        ]
    },
    onLoad: function (option) {
        var that=this;
        console.log(option.bookId);
        wx.request({
            url: 'http://localhost:3000/library/bookDetail',
            data: {
                bookId: '123456'
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                console.log(res.data);
                that.setData({
                    book:res.data
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
    bookDetail: function (e) {
        wx.redirectTo({
            url: '/pages/bookDetail/bookDetail'
        })
    },
    returnPersonal: function (e) {
        wx.switchTab({
            url: '/pages/personal/personal'
        })
    }
})
