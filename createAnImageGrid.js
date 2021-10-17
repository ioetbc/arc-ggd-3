const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

class CreateImageGrid {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.draw = function () {
      const p = c.lineWidth / 2; //padding
      for (let xCell = 0; xCell < 10; xCell++) {
        for (let yCell = 0; yCell < 10; yCell++) {
          const x = xCell * 60;
          const y = yCell * 60;
          const img = new Image();
          this.x = x;
          this.y = y;
          img.onload = function () {
            c.drawImage(img, x + p, y + p, 60 - p * 2, 60 - p * 2);
          };

          img.src = `https://uploads-ssl.webflow.com/5e9fe777748507384627888f/612555bbf9d7d282dc3da570_Arc%20Cadence%20700x935.jpg`;
        }
      }
    };
  }
}

const image = new CreateImageGrid();

image.draw();
