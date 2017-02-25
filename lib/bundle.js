/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Asteroid = __webpack_require__(6);
	const Game = __webpack_require__(4);
	const GameView = __webpack_require__(5);


	document.addEventListener("DOMContentLoaded", function(event) {
	  console.log("DOM fully loaded and parsed");
	  let ctx = document.getElementById('canvas').getContext('2d');
	  const gv = new GameView(ctx);
	  gv.start();

	});


	window.MovingObject = MovingObject;
	window.Asteroid = Asteroid;
	window.Game = Game;
	window.GameView = GameView;


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits (child, parent) {
	    function Surrogate() {}
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    child.prototype.constructor = child;
	  },

	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};



	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(6);

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4);

	function GameView(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  setInterval( () => {
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  }, 50);
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(3);

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


/***/ }
/******/ ]);