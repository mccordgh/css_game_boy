const gameboy = document.querySelector('#gameboy');
const speed = 10;
const scrollSpeed = 40;
const yOffsetSpeed = 3;
const buffer = 1;

let dragging = false;
let lastMouseX = null;
let lastMouseY = null;
let yOffset = 0;

let gameboyX = 0;
let gameboyY = 0;
let gameboyZ = -2200;

const setGameboyXYZ = (x, y, z) => {
    gameboyX = x;
    gameboyY = y;
    gameboyZ = z;

    gameboy.style.transform = `translateX(75%) translateZ(${z}px) translateY(${yOffset}px) rotateY(${y}deg) rotateX(${x}deg)`;
}

setGameboyXYZ(gameboyX, gameboyY, gameboyZ);

document.onwheel = (event) => {
    if (event.deltaY < 0) {
        gameboyZ -= scrollSpeed;
        yOffset -= yOffsetSpeed;
    } else if (event.deltaY > 0) {
        gameboyZ += scrollSpeed;
        yOffset += yOffsetSpeed;
    }

    setGameboyXYZ(gameboyX, gameboyY, gameboyZ);
}

document.onmousedown = () => {
    dragging = true;
}

document.onmouseup = () => {
    dragging = false;
}

document.onmousemove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // should only happen once very first mouse movement :)
    if (!lastMouseX || !lastMouseY) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        return;
    }

    if (!dragging) {
        return;
    }

    if (Math.abs(mouseX - lastMouseX) > buffer) {
        if (mouseX > lastMouseX) {
            // moving right
            setGameboyXYZ(gameboyX, gameboyY  + speed, gameboyZ);
        } else {
            // moving left
            setGameboyXYZ(gameboyX, gameboyY - speed, gameboyZ);
        }
    }

    if (Math.abs(mouseY - lastMouseY) > buffer) {
        if (mouseY > lastMouseY) {
            // moving down
            setGameboyXYZ(gameboyX + speed, gameboyY, gameboyZ);
        } else {
            // moving up
            setGameboyXYZ(gameboyX - speed, gameboyY, gameboyZ);
        }
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;
}
