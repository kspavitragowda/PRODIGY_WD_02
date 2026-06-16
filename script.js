const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

function updateDisplay() {
    const currentTime = Date.now() - startTime + elapsedTime;

    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(2, "0");
}

startPauseBtn.addEventListener("click", () => {

    if (!isRunning) {

        startTime = Date.now();

        timerInterval = setInterval(updateDisplay, 10);

        isRunning = true;

        startPauseBtn.textContent = "Pause";

    } else {

        clearInterval(timerInterval);

        elapsedTime += Date.now() - startTime;

        isRunning = false;

        startPauseBtn.textContent = "Resume";
    }
});

resetBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    display.textContent = "00:00:00:00";
    startPauseBtn.textContent = "Start";

    lapList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {

    if (!isRunning) return;

    const lap = document.createElement("div");
    lap.classList.add("lap-item");

    lap.textContent =
        `Lap ${lapList.children.length + 1} - ${display.textContent}`;

    lapList.prepend(lap);
});
