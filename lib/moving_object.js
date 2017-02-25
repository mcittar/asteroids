const MovingObject = function(options) {
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
  this.game = options['game'];
};

MovingObject.prototype.draw = function(ctx) {

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] = this.pos[0] + this.vel[0];
  this.pos[1] = this.pos[1] + this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let xDiff = Math.abs(this.pos[0] - otherObject.pos[0]);
  let yDiff = Math.abs(this.pos[1] - otherObject.pos[1]);
  let touching = this.radius + otherObject.radius;
  if (xDiff <= touching || yDiff <= touching) {
    return true;
  }
  return false;
};

module.exports = MovingObject;
