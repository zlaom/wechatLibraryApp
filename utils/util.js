const image = require('../config.js').image;
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  //图片连接自适应
  imgChange:function imgChange(books){
    console.log(books);
    if (books.length){
      console.log("ok");
      for (var i = 0; i < books.length; i++) {
        //console.log(i);
        if (books[i].bookCover) {
          var data = books[i].bookCover.split(':');
          //console.log(data);
          if (data[0] != 'https') {
            books[i].bookCover = image + books[i].bookCover;
          }
          continue;
        }
        if (books[i].sortCover) {
          var data = books[i].sortCover.split(':');
          if (data[0] != 'https') {
            books[i].sortCover = image + books[i].sortCover;
          }
          continue;
        }
      }
    }else{
      if (books.bookCover) {
        var data = books.bookCover.split(':');
        if (data[0] != 'https') {
          books.bookCover = image + books.bookCover;
        }
      }
      if (books.sortCover) {
        var data = books.sortCover.split(':');
        if (data[0] != 'https') {
          books.sortCover = image + books.sortCover;
        }
      }
    }
    console.log(books);
    return books;
  }
}
