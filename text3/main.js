// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  // 生成一个在min和max之间的随机整数
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 生成随机颜色值的函数
function randomColor() {
  // 生成一个随机的rgb颜色值
  const color = 'rgb(' +
                random(0, 255) + ',' +
                random(0, 255) + ',' +
                random(0, 255) + ')';
  return color;
}

// 定义 Ball 构造器
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 定义彩球绘制函数

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 定义彩球更新函数

Ball.prototype.update = function() {
  // 如果彩球碰到右边界，则改变x方向速度
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  // 如果彩球碰到左边界，则改变x方向速度
  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  // 如果彩球碰到下边界，则改变y方向速度
  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  // 如果彩球碰到上边界，则改变y方向速度
  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数

Ball.prototype.collisionDetect = function() {
  // 遍历所有球体
  for(let j = 0; j < balls.length; j++) {
    // 如果当前球体不是遍历到的球体
    if(this !== balls[j]) {
      // 计算两个球体之间的x轴距离
      const dx = this.x - balls[j].x;
      // 计算两个球体之间的y轴距离
      const dy = this.y - balls[j].y;
      // 计算两个球体之间的距离
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 如果两个球体之间的距离小于两个球体的大小之和
      if (distance < this.size + balls[j].size) {
        // 交换两个球体的颜色
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 定义一个数组，生成并保存所有的球

let balls = [];

// 循环，直到数组长度达到
while(balls.length < 80) {
  // 生成球的半径，范围在10到15之间
  const size = random(10,15);
  // 创建一个球对象，参数为球的x坐标、y坐标、x方向速度、y方向速度、颜色、半径
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );
  // 将球对象添加到数组中
  balls.push(ball);
}


// 定义背景颜色变量
let backgroundColor = 'rgba(0,0,0,0.25)';
// 定义循环函数
function loop() {
  // 设置填充颜色为背景颜色
  ctx.fillStyle = backgroundColor;
  // 在画布上绘制一个矩形，覆盖整个画布
  ctx.fillRect(0,0,width,height);
  // 遍历balls数组，调用每个球体的draw()、update()和collisionDetect()方法
  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  // 请求下一帧动画，并调用loop()函数
  requestAnimationFrame(loop);
}
// 监听画布的点击事件
canvas.addEventListener('click', function() {
    backgroundColor = randomColor(); // 更新背景颜色变量
  });

// 调用loop()函数，开始循环
loop();
