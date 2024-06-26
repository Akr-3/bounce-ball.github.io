const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const balls = [];

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.floor(Math.random() * 30) + 10;
    this.color = Ball.getRandomColor();
    this.xVel = (Math.abs(Math.random()) - 0.5) * 10;
    this.yVel = (Math.abs(Math.random()) - 0.5) * 10;
  }

  static getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  draw() {
    const ball = new Path2D("2d");
    ball.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill(ball);
  }

  update() {
    this.x += this.xVel;
    this.y += this.yVel;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.xVel *= -1;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.yVel *= -1;
    }
  }
}

canvas.addEventListener("click", (evt) => {
  const ball = new Ball(evt.clientX, evt.clientY);
  balls.push(ball);
  ball.draw();
});

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const textColor = Ball.getRandomColor();
function moveBalls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (balls.length == 0) {
    ctx.font = "bold italic 50px Arial";
    ctx.fillStyle = textColor;
    ctx.fillText(
      "Click to Add Balls",
      canvas.width / 2 - 200,
      canvas.height / 2 - 15
    );
  }
  balls.map((ball) => {
    ball.update();
    ball.draw();
    return ball;
  });
  requestAnimationFrame(moveBalls);
}
moveBalls();
