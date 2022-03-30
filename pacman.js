//let pos = 0;
const pacArray = [
  ['PacMan1.png', 'PacMan2.png'],
  ['PacMan3.png', 'PacMan4.png'],
];
// This variable defines what direction should PacMan go:
 //0 = left to right
//1 = right to left (reverse)
//let direction = 0;

const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  //Direction and focus used to adjust movement
  let direction = 0;
  let focus = 0;
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[direction][focus];
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  //add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    direction,
    focus,
    newimg,
  };
}

//Makes a new pacman on the button 'Add PacMan'
function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}



function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) {
    item.velocity.x = -item.velocity.x;
    item.direction = 1;
  }
  if (item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
    item.direction = 0;
  }
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
  return item;
}


//Starts game
function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    //Makes mouth open and close
    item.focus = (item.focus + 1) % 2;

    item.newimg.src = pacArray[item.direction][item.focus];
  });
  setTimeout(update, 60);
}

//Don't change this line, exports functions to HTML
if (typeof module !== 'undefined') {
  module.exports = { makeOne, checkCollisions, update, pacMen };
}
