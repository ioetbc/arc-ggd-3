var vx, vy;
var x, y;
var diameter;

const imagesToPreLoad = [
  {
    x: 0,
    y: 0,
    src: "https://images.unsplash.com/photo-1643952565578-a39d383f1dc9",
    width: 100,
    height: 200,
  },
  {
    x: 100,
    y: 100,
    src: "https://images.unsplash.com/photo-1646993879654-d4110acf05e5",
    width: 50,
    height: 0,
  },
];

const preLoadedImages = [];

function preload() {
  for (let i = 0; i < imagesToPreLoad.length; i++) {
    const loaded = loadImage(imagesToPreLoad[i].src);
    const hmm = { ...imagesToPreLoad[i], loaded };

    preLoadedImages.push(hmm);
    console.log("dfwdw");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  x = width / 2;
  y = height / 2;
  diameter = windowWidth * 0.1;
  vx = 0;
  vy = 0;

  // set options to prevent default behaviors for swipe, pinch, etc
  var options = {
    preventDefault: true,
  };

  // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
  hammer.get("pan").set({
    direction: Hammer.DIRECTION_ALL,
  });

  hammer.on("pan", swiped);
}

function draw() {
  background(150);
  // console.log("preLoadedImages", preLoadedImages);

  // for (let i = 0; i < preLoadedImages.length; i++) {
  //   image(
  //     preLoadedImages[i].loaded,
  //     x + preLoadedImages[i].x,
  //     y + preLoadedImages[i].y,
  //     preLoadedImages[i].width,
  //     preLoadedImages[i].height
  //   );
  //   // return console.log("loaded", preLoadedImages[i]);
  // }

  // move
  x += vx;
  y += vy;
  // make it so the image doesnt go off the screen
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);
  // decelerate
  vx *= 0.95;
  vy *= 0.95;
}

function swiped(event) {
  // Apply the velocity of the swipe as a force
  vx += event.velocityX;
  vy += event.velocityY;
}

window.addEventListener("wheel", (e) => {
  vx += e.deltaX / 10;
  vy += e.deltaY / 10;
});
