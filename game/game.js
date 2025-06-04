const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//simple game: move block with arrow keys
let x = 50;
let y = 50;
const size = 50;
const speed = 5;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, size, size);
}

function update(e) {
    switch (e.key) {
        case 'ArrowUp':
            y = Math.max(0, y - speed);
            break;
        case 'ArrowDown':
            y = Math.min(canvas.height - size, y + speed);
            break;
        case 'ArrowLeft':
            x = Math.max(0, x - speed);
            break;
        case 'ArrowRight':
            x = Math.min(canvas.width - size, x + speed);
            break;
    }
    draw();
}

document.addEventListener('keydown', update);
draw();