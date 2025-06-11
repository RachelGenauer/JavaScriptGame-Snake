var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var viewScore = document.getElementById("score");
const startGameButton = document.getElementById("startGame");
const quitGameButton = document.getElementById("quitGame");
const timer = document.getElementById("timer");
const highScore = localStorage.getItem("savedHighScore");
const showHighScore = document.getElementById("highScore");
const replay = document.getElementById("replay");
showHighScore.innerHTML = `HIGH SCORE: ${highScore}`;

let i;
let view;
var check = 1;
var currentPlace = 1;
var currentPlaceApple = 1;


// the canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
// (e.g. 16 * 25 = 400)
var grid = 16;
var count = 0;
var score = 0;
viewScore.innerHTML = score;
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

var goldApple = {
  x: 'none',
  y: 'none'
};

// get random whole numbers in a specific range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



// game loop
function loop() {
  requestAnimationFrame(loop);

  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw apple
  context.fillStyle = 'green';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  context.fillStyle = 'red';
  context.fillRect(goldApple.x, goldApple.y, grid - 1, grid - 1);
  // draw snake one cell at a time
  context.fillStyle = 'white';
  snake.cells.forEach(function fillCell(cell, index) {

    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);


    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score += 2;
      viewScore.innerHTML = score;
      do {
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        currentPlaceApple = 1;
        for (var i = index + 1; i < snake.cells.length; i++) {
          if (apple.x === snake.cells[i].x && apple.y === snake.cells[i].y) {
            currentPlaceApple = 0
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;

          }
        }
      }
      while (currentPlaceApple = 0);
      gold();
    }
//snake ate goldApple and timer for goldApple
    function gold() {
      if ((snake.maxCells - 4) % 5 == 0) {
        currentPlace = 1;
        placeGoldApple();
        functionTimer()
      }
    }

    function placeGoldApple() {
      do {
        goldApple.x = getRandomInt(0, 25) * grid;
        goldApple.y = getRandomInt(0, 25) * grid;
        currentPlace = 1;
        if (goldApple.x === apple.x && goldApple.y === apple.y) {
          currentPlace = 0;
          goldApple.x = getRandomInt(0, 25) * grid;
          goldApple.y = getRandomInt(0, 25) * grid;
        }
        for (var i = index + 1; i < snake.cells.length; i++) {
          if (goldApple.x === snake.cells[i].x && goldApple.y === snake.cells[i].y) {
            currentPlace = 0;
            goldApple.x = getRandomInt(0, 25) * grid;
            goldApple.y = getRandomInt(0, 25) * grid;

          }
        }
      }
      while (currentPlace = 0);
    }


    if (goldApple.x == cell.x && goldApple.y == cell.y) {
      goldApple.x = 'none';
      goldApple.y = 'none';
      check = 0;
      if (view > 0)
        score += view * 4;
      viewScore.innerHTML = score;
    }

    function functionTimer() {
      view = 4;
      const viewTimer = document.createElement("h1");
      viewTimer.innerHTML = `${view} seconds left`;
      timer.appendChild(viewTimer);

      let x = setInterval(function () {
        viewTimer.innerHTML = `${--view} seconds left`;
        if (view === 0 || check === 0) {
          clearInterval(x);
          viewTimer.innerHTML = " ";
          goldApple.x = 'none';
          goldApple.y = 'none';
          check = 1;
          timer.removeChild(viewTimer);
        }
      }, 1000)
    }
    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        //saved the highScore in the localStorage
        if (score > highScore) {
          localStorage.setItem("savedHighScore", score)
          window.location.href = "win.html";
        }
        else window.location.href = "gameOver.html";
      }
    }
  });
  
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function (e) {

  // left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
// restart the game
replay.addEventListener("click", function () {
  window.location.href = "game.html";
})
//start the game
requestAnimationFrame(loop);




