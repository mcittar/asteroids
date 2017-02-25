const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

function Asteroid(pos, game) {
  this.COLOR = 'red';
  this.RADIUS = 20;

  let options = {
    pos: pos,
    vel: Util.randomVec(5),
    color: this.COLOR,
    radius: this.RADIUS,
    game: game
  };

  MovingObject.call(this, options);
}
Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
