const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids(this.NUM_ASTEROIDS);
}

Game.prototype.randomPosition = function() {
  let randX = Math.random() * this.DIM_X;
  let randY = Math.random() * this.DIM_Y;
  return [randX, randY];
};

Game.prototype.addAsteroids = function(num) {
  while (this.asteroids.length < num) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach( (asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( (asteroid) => {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  if (pos[0] < -20) {
    pos[0] = this.DIM_X + 20;
  } else if (pos[0] > this.DIM_X + 20) {
    pos[0] = -20;
  }
  if (pos[1] < -20) {
    pos[1] = this.DIM_Y + 20;
  } else if (pos[1] > this.DIM_Y + 20) {
    pos[1] = -20;
  }
  return pos;
};

Game.prototype.checkCollisions = function() {
  let i = 0;
  while (i < this.asteroids.length - 1) {
    let j = i + 1;
    while (j < this.asteroids.length) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        alert("COLLISION");
      }
      j++;
    }
    i++;
  }
};

module.exports = Game;
