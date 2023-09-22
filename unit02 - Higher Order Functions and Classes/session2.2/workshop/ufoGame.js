let ufoImageUrl = "https://images2.imgbox.com/90/61/bP8foIzS_o.png";
const bullitImageUrl = "https://images2.imgbox.com/6b/32/GELVjZiO_o.png";
const rocketImageUrl = "https://images2.imgbox.com/a9/ee/3de7UGDe_o.png";

class Ufo extends BouncingSprite {
  constructor(x, y, xSpeed, ySpeed) {
    super(ufoImageUrl, x, y, xSpeed, ySpeed);

    // met een CSS-filter kunnen we deze versie een andere kleur geven
    this.element.style.filter = `hue-rotate( ${Math.random() * 360}deg )`;
  }
  getUfo(){
    return this;
  }
  isCollision(otherSprite) {
    if (
      this.x < otherSprite.x + otherSprite.width &&
      this.x + this.width > otherSprite.x &&
      this.y < otherSprite.y + otherSprite.height &&
      this.y + this.height > otherSprite.y &&
      Object.getPrototypeOf(otherSprite) == Player.prototype
    ) {
      return true;
    }
    return false;
  }
  handleCollisionWith(otherSprite) {
    this.element.src = "https://th.bing.com/th/id/R.4be58f133c4ae2ff7a2b9ad6803ccc73?rik=fFXn%2fWAJwnEd6A&pid=ImgRaw&r=0";
    this.element.src.height= 10;
    this.element.src.width= 40;
  }
  
}
class Player extends BouncingSprite {
  constructor(x, y, xSpeed, ySpeed){
    super(rocketImageUrl, x, y, xSpeed, ySpeed);
  }
  getX() {
    return this.x;    
  }
  getY(){
    return this.y;
  }
  isCollision(otherSprite) {
    if (
      this.x < otherSprite.x + otherSprite.width &&
      this.x + this.width > otherSprite.x &&
      this.y < otherSprite.y + otherSprite.height &&
      this.y + this.height > otherSprite.y &&
      Object.getPrototypeOf(otherSprite) == Ufo.prototype
    ) {
      return true;
    }
    return false;
  }
  handleCollisionWith(otherSprite) {
    this.remove(); 
    ufoImageUrl = "https://th.bing.com/th/id/R.35f22bfa326e8632e66d7dc1ed68407a?rik=gHfYWD%2fZ1dx66Q&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f9%2f17%2fP7Ykax.jpg";
  }
}
class Bullit extends BouncingSprite {
  constructor(x, y, xSpeed, ySpeed){
    super(bullitImageUrl, x, y, xSpeed, ySpeed);
  }
  isCollision(otherSprite) {
    if (
      this.x < otherSprite.x + otherSprite.width &&
      this.x + this.width > otherSprite.x &&
      this.y < otherSprite.y + otherSprite.height &&
      this.y + this.height > otherSprite.y &&
      Object.getPrototypeOf(otherSprite) == Ufo.prototype
    ) {
      return true;
    }
    return false;
  }

  handleCollisionWith(otherSprite) {
    
    otherSprite.remove();
    this.remove(); 
  }
}

let player; // Deze variabele moet globaal zijn. Waarom? omdat iedereen erbij moet kunnen


function createGameSprites() {
  const allUfos = [
    [350, 225, 1, 2],
    [350, 225, -2, 1],
    [350, 225, 2, -1],
    [350, 225, -1, -2],
    [350, 225, 2, 1],
    [350, 225, -1, 2],
    [350, 225, 1, -2],
    [350, 225, -2, -1]
  ].map(ufoData => new Ufo(...ufoData));
  // de variabele "allUfos" bevat nu een lijst met instanties
  // van de Ufo-klasse, maar met die lijsten hoeven we niets
  // te doen, want de Sprite-klasse houdt nu ook zelf een lijst
  // bij, en gebruikt die lijst om alle Sprites periodiek een
  // update() te laten doen.

  player = new Player(10,400,2,0);
}

function installKeyboardHandler() {
  // Het "keydown" event kan je gebruiken om alle toetsaanslagen
  // te detecteren, ook van pijltjestoetsen, functietoetsen, shift, ctrl
  // etc.
  // `event.code` zal dan een string bevatten die de ingedrukte toets
  // beschijft. Gebruik http://keycode.info/ om achter de codenamen van
  // toetsen te komen.
  document.addEventListener("keydown", event => {
    if (event.code == "Space") {
      // normaal zal een browser de pagina scrollen als je op de spatiebalk
      // drukt. preventDefault() voorkomt dat.
      event.preventDefault();
      const playerX = player.getX();
      const playerY = player.getY();
      new Bullit( playerX,playerY+5,0,-5);
    }
  });
}

const startButton = document.getElementById("startButton");
const titleImg = document.getElementById("titleImage");
const animationDiv = document.getElementById("animationDiv");

startButton.addEventListener("click", () => {
  animationDiv.removeChild(startButton);
  animationDiv.removeChild(titleImage);

  createGameSprites();
  Sprite.startEngine();
  installKeyboardHandler();
});
