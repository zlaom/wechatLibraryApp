Page({
    data: {
        book: {
            cover: './cover/book1.jpg',
            bookName: '美洲小宇宙',
            bookAuthor: 'pancake',
            bookPress: '大连理工大学出版社',
            sort: '奇幻',
            bookAbstract: '做PPT做得头昏脑涨？来加拉帕戈斯群岛看看憨态可掬的象龟宝宝；看报表看得昏昏欲睡？去瓜亚基尔与百岁蜥蜴一起思考人生；地铁拥塞如沙丁鱼罐头？感受一下古代玛雅人修建的足球场的辽阔；人修建的足球场的辽阔人修建的足球场的辽阔人修建的足球场的辽阔人修建的足球场的辽阔人修建的足球场的辽阔人修建的足球场的辽阔人修建的足球场的辽阔人修建的足球场的辽阔会议室烟雾弥漫？想象一下哥斯热带雾林空气的清甜fkiajdfkjnafjkdfkjafafyuwiyr8wbfhvbhs',
            bookNum: '6',
            canBorrow: '4'
        },
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
        console.log(option.bookId)
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
