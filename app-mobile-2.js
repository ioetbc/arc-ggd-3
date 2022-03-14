let bubbles = [];
let unicorn;

let kittens = [
  "https://images.unsplash.com/photo-1647164926447-8eaeed1bedc1",
  "https://images.unsplash.com/photo-1643952565578-a39d383f1dc9",
];
function preload() {
  for (let i = 0; i < 2; i++) {
    kittens[i] = loadImage(kittens[i]);
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // bubble1 = new Bubble(200, 200, 50);
  // bubble2 = new Bubble(300, 200, 50);
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    let kitten = random(kittens);
    let bubble = new Bubble(x, y, 100, kitten);
    bubbles.push(bubble);
  }
  let unicornKitten = random(kittens);

  unicorn = new Bubble(400, 200, 10, unicornKitten);
}

window.addEventListener("wheel", (e) => {
  for (let b of bubbles) {
    b.x += e.deltaX / 10;
    b.y += e.deltaY / 10;
  }
});

// set options to prevent default behaviors for swipe, pinch, etc
var options = {
  preventDefault: true,
};

// document.body registers gestures anywhere on the page
var hammer = new Hammer(document.body, options);
hammer.get("pan").set({
  direction: Hammer.DIRECTION_ALL,
});

hammer.on("pan", (event) => {
  for (let b of bubbles) {
    console.log("panning");
    b.swiped(event);
  }
});

function draw() {
  background(0);

  // if (bubble1.intersects(bubble2)) {
  //   background(200, 0, 100);
  // }

  // bubble1.show();
  // bubble2.show();
  // bubble1.move();
  // bubble2.move();
  unicorn.x = mouseX;
  unicorn.y = mouseY;
  unicorn.show();
  unicorn.move();

  for (let b of bubbles) {
    b.move();
    b.show();
    let overlapping = false;
    // if (b.contains(mouseX, mouseY)) {
    //   b.changeColor();
    // }
    for (let c of bubbles) {
      if (b !== c && b.intersects(c)) {
        overlapping = true;
      }
      // } else {
      //   b.changeColor(0);
      // }
    }
    if (overlapping) {
      b.changeColor(255);
    } else {
      b.changeColor(0);
    }
  }
}

function mousePressed() {
  for (let b of bubbles) {
    b.clicked(mouseX, mouseY);
  }
}

class Bubble {
  constructor(x, y, radius = 50, img) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.brightness = 0;
    this.kitten = img;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    // stroke(255);
    // strokeWeight(4);
    // fill(this.brightness, 125);
    // ellipse(this.x, this.y, this.radius * 2);
    image(this.kitten, this.x, this.y, this.radius, this.radius);
  }

  contains(mouseX, mouseY) {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    return distance < this.radius;
  }

  changeColor(color) {
    this.brightness = color;
  }

  intersects(otherBubble) {
    let distance = dist(this.x, this.y, otherBubble.x, otherBubble.y);
    return distance < this.radius + otherBubble.radius;
  }

  clicked(mouseX, mouseY) {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.radius &&
      mouseY > this.y &&
      mouseY < this.y + this.radius
    ) {
      this.kitten = random(kittens);
    }
  }
  swiped(event) {
    console.log("event", event);
    // Apply the velocity of the swipe as a force
    this.x += event.velocityX * 4;
    this.y += event.velocityY * 4;
  }
}
