let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let openDoor1 = '';
let openDoor2 = '';
let openDoor3 = '';
let startButton = document.getElementById('start');
let currentlyPlaying = true;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');

const isBot = door => {
    if (door.src === botDoorPath) {
        return true;
    };
    return false;
};

const isClicked = door => {
    if (door.src === closedDoorPath) {
        return false;
    };
    return true;
};

const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    };
};

const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
        openDoor1 = spaceDoorPath;
    } else if (choreDoor === 2) {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    };
};

/* onclick functions before random generator:
doorImage1.onclick = () => {
  doorImage1.src = botDoorPath;
};

doorImage2.onclick = () => {
  doorImage2.src = beachDoorPath;
};

doorImage3.onclick = () => {
  doorImage3.src = spaceDoorPath;
};
*/

doorImage1.onclick = () => {
    if (!isClicked(doorImage1) && currentlyPlaying) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    };
};

doorImage2.onclick = () => {
    if (!isClicked(doorImage2) && currentlyPlaying) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    };
};

doorImage3.onclick = () => {
    if (!isClicked(doorImage3) && currentlyPlaying) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    };
};

startButton.onclick = () => {
    if (currentlyPlaying === false) {
        startRound();
    };
};

const streakCounter = () => {
    currentStreak.innerHTML++;
};

const resetStreakCounter = () => {
    currentStreak.innerHTML = 0;
};

const setBestToCurrent = () => {
    bestStreak.innerHTML = currentStreak.innerHTML;
};

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
};

const gameOver = status => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        streakCounter();
        if (currentStreak.innerHTML > bestStreak.innerHTML) {
            setBestToCurrent();
        };
    } else {
        startButton.innerHTML = 'Game over! Play again?';
        resetStreakCounter();
    };
    currentlyPlaying = false;
};
startRound();