import { one } from "./images/1.js";
import { two } from "./images/2.js";
import { three } from "./images/3.js";
import { four } from "./images/4.js";
import { five } from "./images/5.js";
import { six } from "./images/6.js";
import { seven } from "./images/7.js";
import { eight } from "./images/8.js";
import { nine } from "./images/9.js";

const mapGridPosition = (image) => {
  let position = { x: 0, y: 0 };
  switch (image.grid) {
    case 1:
      position.x = -window.innerWidth + image.offsetX;
      position.y = -window.innerHeight + image.offsetY;
      break;
    case 2:
      position.x = image.offsetX;
      position.y = -window.innerHeight + image.offsetY;
      break;
    case 3:
      position.x = window.innerWidth + image.offsetX;
      position.y = -window.innerHeight + image.offsetY;
      break;
    case 4:
      position.x = -window.innerWidth + image.offsetX;
      position.y = image.offsetY;
      break;
    case 5:
      position.x = image.offsetX;
      position.y = image.offsetY;
      break;
    case 6:
      position.x = window.innerWidth + image.offsetX;
      position.y = image.offsetY;
      break;
    case 7:
      position.x = -window.innerWidth + image.offsetX;
      position.y = window.innerHeight + image.offsetY;
      break;
    case 8:
      position.x = image.offsetX;
      position.y = window.innerHeight + image.offsetY;
      break;
    case 9:
      position.x = window.innerWidth + image.offsetX;
      position.y = window.innerHeight + image.offsetY;
      break;
  }
  return position;
};

function NewCanvas() {
  const c = document.querySelector("canvas");
  var ctx = c.getContext("2d");

  c.ctx = ctx;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  return c;
}

function ClearCvs(cvs) {
  cvs.ctx.fillRect(0, 0, cvs.width, cvs.height);
  cvs.ctx.fillStyle = "red";
}

const canvas = NewCanvas();

let User = { x: 0, y: 0 };

const images = [
  ...one,
  ...two,
  ...three,
  ...four,
  ...five,
  ...six,
  ...seven,
  ...eight,
  ...nine,
];

var imagesOK = 0;
var imgs = [];
loadAllImages(start);
window.addEventListener(
  "wheel",
  (e) => {
    const isScrollingUp = e.wheelDeltaY < 0;
    const isScrollingDown = e.wheelDeltaY > 0;
    const isScrollingRight = e.wheelDeltaX < 0;
    const isScrollingLeft = e.wheelDeltaX > 0;
    const canvasPaddingY = window.innerHeight / 4;
    const canvasPaddingX = 200;

    const hasReachedTopOfCanvas =
      User.y > window.innerHeight + canvasPaddingY && isScrollingUp;
    const hasReachedBottomOfCanvas =
      User.y < -window.innerHeight + -canvasPaddingY && isScrollingDown;
    const hasReachedRightEdgeOfCanvas =
      User.x > window.innerWidth + canvasPaddingX && isScrollingRight;
    const hasReachedLeftEdgeOfCanvas =
      User.x < -window.innerWidth + -canvasPaddingX && isScrollingLeft;

    if (
      hasReachedTopOfCanvas ||
      hasReachedBottomOfCanvas ||
      hasReachedRightEdgeOfCanvas ||
      hasReachedLeftEdgeOfCanvas
    ) {
      if (hasReachedRightEdgeOfCanvas || hasReachedLeftEdgeOfCanvas) {
        User.x -= parseInt(e.deltaX, 10);
      }
      if (hasReachedTopOfCanvas || hasReachedBottomOfCanvas) {
        User.y -= parseInt(e.deltaY, 10);
      }
    } else {
      User.x += parseInt(e.deltaX, 10);
      User.y += parseInt(e.deltaY, 10);
    }

    ClearCvs(canvas);
    start();
  },
  false
);

function loadAllImages(callback) {
  for (var i = 0; i < images.length; i++) {
    var img = new Image();
    imgs.push(img);
    img.onload = function () {
      imagesOK++;
      if (imagesOK >= images.length) {
        callback();
      }
    };
    img.onerror = function () {
      alert("image load failed");
    };
    img.src = images[i].url;
  }
}

function start() {
  for (var i = 0; i < images.length; i++) {
    const { x, y } = mapGridPosition(images[i]);

    canvas.ctx.drawImage(
      imgs[i],
      ((User.x + x) * images[i].parallex) / 2,
      ((User.y + y) * images[i].parallex) / 2,
      200,
      250
    );
  }
}

// TODO
// Add in map
// Use websocket to show other user cursors
// Make the edges not sticky
