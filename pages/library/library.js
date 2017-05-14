Page({
    data: {
        sorts: [
            { cover: './cover/book1.jpg', sortName: '英语', num: '600' },
            { cover: './cover/book3.jpg', sortName: '计算机', num: '900' },
            { cover: './cover/book1.jpg', sortName: '科学', num: '600' },
            { cover: './cover/book2.jpg', sortName: '历史', num: '800' },
            { cover: './cover/book3.jpg', sortName: '文学', num: '900' }
        ]
    },
    sortDetail: function (e) {
      console.log(e);
      var sort = e.currentTarget.dataset.sort;
      console.log(sort);
        wx.navigateTo({
            url: '/pages/sortDetail/sortDetail?sort='+sort
        })
    },
    bookSearch:function(e){
         wx.navigateTo({
            url: '/pages/search/search'
        })
    }
})
