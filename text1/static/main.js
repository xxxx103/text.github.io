// 切换图片
let myImage = document.querySelector('img');

myImage.onclick = function() {
  let mySrc = myImage.getAttribute('src');
  if (mySrc === 'static/xiaomen.jpg') {
    myImage.setAttribute ('src','static/tushuguanye.jpg');
  } else {
    myImage.setAttribute ('src','static/xiaomen.jpg');
  }
};

