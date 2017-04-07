Page({
  data: {
    sort:'计算机',
    books: [
      {
        cover: './cover/book1.jpg',
        bookName: '奇幻',
        bookAbstract: '做PPT做得头昏脑涨？来加拉帕戈斯群岛看看憨态可掬的象龟宝宝；看报表看得昏昏欲睡？去瓜亚基尔与百岁蜥蜴一起思考人生；地铁拥塞如沙丁鱼罐头？感受一下古代玛雅人修建的足球场的辽阔；会议室烟雾弥漫？想象一下哥斯热带雾林空气的清甜。',
        bookNum: '6',
        canBorrow: '4'
      },
      {
        cover: './cover/book2.jpg',
        bookName: '物理',
        bookAbstract: '看报表看得昏昏欲睡？去瓜亚基尔与百岁蜥蜴一起思考人生；做PPT做得头昏脑涨？来加拉帕戈斯群岛看看憨态可掬的象龟宝宝；地铁拥塞如沙丁鱼罐头？感受一下古代玛雅人修建的足球场的辽阔；会议室烟雾弥漫？想象一下哥斯热带雾林空气的清甜。',
        bookNum: '5',
        canBorrow: '1'
      },
      {
        cover: './cover/book3.jpg',
        bookName: '化学',
        bookAbstract: '感受一下古代玛雅人修建的足球场的辽阔；会议室烟雾弥漫？想象一下哥斯热带雾林空气的清甜。做PPT做得头昏脑涨？来加拉帕戈斯群岛看看憨态可掬的象龟宝宝；看报表看得昏昏欲睡？去瓜亚基尔与百岁蜥蜴一起思考人生；地铁拥塞如沙丁鱼罐头？',
        bookNum: '7',
        canBorrow: '1'
      },
      {
        cover: './cover/book2.jpg',
        bookName: '数学',
        bookAbstract: '会议室烟雾弥漫？想象一下哥斯热带雾林空气的清甜。做PPT做得头昏脑涨？来加拉帕戈斯群岛看看憨态可掬的象龟宝宝；看报表看得昏昏欲睡？去瓜亚基尔与百岁蜥蜴一起思考人生；地铁拥塞如沙丁鱼罐头？感受一下古代玛雅人修建的足球场的辽阔；',
        bookNum: '9',
        canBorrow: '2'
      },
      {
        cover: './cover/book3.jpg',
        bookName: '奇幻',
        bookAbstract: '来加拉帕戈斯群岛看看憨态可掬的象龟宝宝；做PPT做得头昏脑涨？看报表看得昏昏欲睡？去瓜亚基尔与百岁蜥蜴一起思考人生；地铁拥塞如沙丁鱼罐头？感受一下古代玛雅人修建的足球场的辽阔；会议室烟雾弥漫？想象一下哥斯热带雾林空气的清甜。',
        bookNum: '16',
        canBorrow: '14'
      },
      {
        cover: './cover/book1.jpg',
        bookName: '英语',
        bookAbstract: '地铁拥塞如沙丁鱼罐头？感受一下古代玛雅人修建的足球场的辽阔；会议室烟雾弥漫？想象一下哥斯热带雾林空气的清甜。做PPT做得头昏脑涨？来加拉帕戈斯群岛看看憨态可掬的象龟宝宝；看报表看得昏昏欲睡？去瓜亚基尔与百岁蜥蜴一起思考人生；',
        bookNum: '16',
        canBorrow: '4'
      }
    ]
  },
   bookDetail: function (e) {
    console.log(e.detail);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail'
    })
  }
})