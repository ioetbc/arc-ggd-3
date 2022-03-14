let bubbles = [];
let unicorn;
let vx = 0;
let vy = 0;

let kittens = [
  {
    id: 1,
    // src: "./images/image_files/5/montag.png?dwd=23",
    src: "https://picsum.photos/200/300",
    width: 100,
    height: 400,
    parallex: 2.2,
    x: 100,
    y: 200,
  },
  {
    id: 2,
    src: "https://picsum.photos/200/300?hell=eki",
    width: 100,
    height: 400,
    parallex: 1.5,
    x: 100,
    y: 100,
  },
];

function preload() {
  for (let i = 0; i < 2; i++) {
    kittens[i].src = loadImage(kittens[i].src, (img) =>
      console.log("img loaded", img)
    );
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let i = 0; i < kittens.length; i++) {
    const { x, y, width, height, src, parallex, id } = kittens[i];
    // let x = kittens[i].x;
    // let y = kittens[i].y;
    // let width = kittens[i].width;
    // let height = kittens[i].height;
    // let kitten = kittens[i].src;
    // let parallex = kittens[i].parallex;
    let bubble = new Bubble(x, y, width, height, src, parallex, id);
    bubbles.push(bubble);
  }
  let unicornKitten = random(kittens);

  unicorn = new Bubble(
    400,
    200,
    100,
    100,
    unicornKitten.src,
    unicornKitten.parallex,
    unicornKitten.id
  );
}

window.addEventListener("wheel", (e) => {
  for (let b of bubbles) {
    b.x += (e.deltaX / 10) * b.parallex;
    b.y += (e.deltaY / 10) * b.parallex;
  }
});

// document.body registers gestures anywhere on the page
const hammer = new Hammer(document.body, { preventDefault: true });
hammer.get("pan").set({
  direction: Hammer.DIRECTION_ALL,
});

hammer.on("pan", (event) => {
  for (let b of bubbles) {
    b.swiped(event);
  }
});

function draw() {
  background(0);

  unicorn.x = mouseX;
  unicorn.y = mouseY;
  unicorn.show();
  unicorn.move();

  for (let b of bubbles) {
    // b.move();
    b.show();
    // b.x *= 0.95;
    // b.y *= 0.95;
    //   let overlapping = false;
    //   // if (b.contains(mouseX, mouseY)) {
    //   //   b.changeColor();
    //   // }
    //   for (let c of bubbles) {
    //     if (b !== c && b.intersects(c)) {
    //       overlapping = true;
    //     }
    //     // } else {
    //     //   b.changeColor(0);
    //     // }
    //   }
    //   if (overlapping) {
    //     b.changeColor(255);
    //   } else {
    //     b.changeColor(0);
    //   }
  }
}

function mousePressed() {
  for (let b of bubbles) {
    b.clicked(mouseX, mouseY);
  }
}

class Bubble {
  constructor(x, y, width, height, img, parallex, id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.brightness = 0;
    this.kitten = img;
    this.parallex = parallex;
    this.id = id;
  }

  move() {
    // vx *= 0.95;
    // vy *= 0.95;
  }

  show() {
    // stroke(255);
    // strokeWeight(4);
    // fill(this.brightness, 125);
    // ellipse(this.x, this.y, this.radius * 2);
    image(this.kitten, this.x, this.y, this.width, this.height);

    this.x += vx;
    this.y += vy;

    vx *= 0.95;
    vy *= 0.95;
  }

  contains(mouseX, mouseY) {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    return distance < this.width;
  }

  changeColor(color) {
    this.brightness = color;
  }

  intersects(otherBubble) {
    let distance = dist(this.x, this.y, otherBubble.x, otherBubble.y);
    return distance < this.width + otherBubble.width;
  }

  clicked(mouseX, mouseY) {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      console.log("image clickwed", this.id);
      // this.kitten = random(kittens);
    }
  }
  swiped(event) {
    // Apply the velocity of the swipe as a force
    vx += event.velocityX * 10 * this.parallex;
    vy += event.velocityY * 10 * this.parallex;
  }
}
