const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player block
let x = 150;
let y = canvas.height - 60;
const playerSize = 50;
const speed = 15;

// Obstacles
let obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 50;
const obstacleSpeed = 5;
const spawnInterval = 500; // Spawn every 10 seconds

let gameOver = false;

// Draw the player
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, playerSize, playerSize);
}

// Draw obstacles
function drawObstacles() {
    ctx.fillStyle = 'blue';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
}

// Update obstacles
function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;

        // Check for collision
        if (
            x < obstacle.x + obstacleWidth &&
            x + playerSize > obstacle.x &&
            y < obstacle.y + obstacleHeight &&
            y + playerSize > obstacle.y
        ) {
            gameOver = true;
        }
    });

    // Remove obstacles that go off-screen
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

// Spawn new obstacles
function spawnObstacle() {
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({ x: obstacleX, y: 0 });
}

// Update player position
function updatePlayer(e) {
    if (gameOver) return;

    switch (e.key) {
        case 'ArrowUp':
            y = Math.max(0, y - speed);
            break;
        case 'ArrowDown':
            y = Math.min(canvas.height - playerSize, y + speed);
            break;
        case 'ArrowLeft':
            x = Math.max(0, x - speed);
            break;
        case 'ArrowRight':
            x = Math.min(canvas.width - playerSize, x + speed);
            break;
    }
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    if (gameOver) {
        ctx.fillStyle = 'gray';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center'; // Center the text
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        return; // Stop the game loop
    }

    drawPlayer(); // Redraw the player
    drawObstacles(); // Redraw obstacles
    updateObstacles(); // Update obstacle positions
    requestAnimationFrame(gameLoop); // Continue the game loop
}

// Start the game
document.addEventListener('keydown', updatePlayer); // Listen for key presses
setInterval(spawnObstacle, spawnInterval); // Spawn obstacles periodically
gameLoop(); // Start the game loop