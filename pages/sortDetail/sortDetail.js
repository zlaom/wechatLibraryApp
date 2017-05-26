const host = require('../../config.js').host2;
const image = require('../../config.js').image;

Page({
  data: {
    sort: '',
    books: ''
  },

  onLoad: function (query) {
    console.log(query);
    this.setData({
      sort: query.sort,
    })
    var sort = this.data.sort;
    var that = this;
    //英文分类名esort
    var esort;
    switch (sort) {
      case '英语':
        esort = 'e';
        break;
      case '计算机':
        esort = 'c';
        break;
      case '科学':
        esort = 's';
        break;
      case '历史':
        esort = 'h';
        break;
      case '文学':
        esort = 'l';
        break;
    }
    wx.request({
      url: host+'/library/sortDetail',
      data: {
        bookSort: esort
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        //获取将json对象赋值给books
        var books = res.data;
        if (res.data){
          for(var i=0;i<res.data.length;i++){
            res.data[i].cover=image+res.data[i].cover;
          }
          that.setData({
            books: books
          });
        }


        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  bookDetail: function (e) {
    var bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?bookId='+bookId
    })
  }
})
