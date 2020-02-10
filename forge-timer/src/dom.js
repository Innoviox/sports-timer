let startTime = Date.now();
let offset = 0; // Amount of time the user has paused the current stopwatch
let pauseTime; // Time that the user paused
let timer = []; // Stores the current time on the stopwatch
let laps = []; // Stores the various lap times (times when user pressed 'Lap')
let isPaused = true; // If the timer is paused or not; starts paused
let intervals = []; // the set of intervals
let direction = "Stopwatch"; // direction (Stopwatch -> count up, Timer -> count down)
let amount = [0, 0, 0, 0]; // max amount for Timer, array of hours/minutes/seconds/ms
let total = 0; // the amount array, reduced to milliseconds

window.odometerOptions = {
    auto: false, // Don't automatically initialize everything with class 'odometer'
    numberLength: 2,
    duration: 100 // Doesn't work
};

/** Pad {number} to {zeros} digits */
const pad = (number, zeros) => {
    let string = number.toString();
    while (string.length < zeros) {
        string = '0' + string;
    }
    return string;
};

/**
 * Pause timer and update timer text
 */
const pause = (paused) => {
    isPaused = paused;
    $("#toggle-button").html(paused ? "<u>S</u>tart" : "<u>P</u>ause");
};

/** 
 * Regularly increment the number in the given timer segment.
 * @param {Object} el - HTML element to regularly increment
 * @param {number} max - Greatest value this segment should display
 * @param {number} padding - Minimum number of digits segments should display
 * @param {number} updateTime - How many milliseconds it should be between updates
 * @param {number} index - What element of 'timer' should this time segment be displayed?
 */
const tick = (el, max, padding, updateTime, index) => {
    intervals[index] = setInterval(() => {
        if (isPaused) return; // don't update the timer if paused
        let currentTime = Date.now() - startTime;
        let number;
        if (direction === "Stopwatch") {
            number = currentTime - offset
        } else {
            number = total - currentTime - offset;
        }
        
        if (direction === "Timer" && number <= 0) {
            // pause time if timer finishes
            pause(true);
            number = 0;
        }

        number = pad(Math.trunc(number / updateTime) % max, padding);
        timer[index] = number;
        el.html(number);
    }, 10);
};

/**
 * Start incrementing the stopwatch counters. 
 * (Right now, it just automatically starts up.)
 * @param {boolean} resetFirst - if start should reset the startTime
 */
const start = (resetFirst) => {
    if (resetFirst) {
        reset();
        startTime = Date.now();
    }

    pause(false);
};

/** 
 * Reset the stopwatch - reser counters to zero and stop updating the display.
 * Also clear lap-list
 * Called when the user presses 'Reset'.
 */ 
const reset = () => {
    timer = amount.slice(); // ['00', '00', '00', '00'];
    laps = [];
    offset = 0;

    $("#lap-list").html("");
    $("#hours").html(timer[0]);
    $("#minutes").html(timer[1]);
    $("#seconds").html(timer[2]);
    $("#ms").html(timer[3]);

    pause(true);

    pauseTime = undefined;
};

/**
 * Adds the current time to the list of laps and the HTML text box display.
 * Triggered by clicking the 'Lap' button.
 */
const addLap = () => {
    if (isPaused) return; // don't lap if timer is not running (todo: is this correct?)
    let newLap = `Lap ${laps.length + 1}: ${timer[0]}:${timer[1]}:${timer[2]}.${timer[3]}`; //Get current stopwatch time
    laps.push(newLap);
    $("#lap-list").append(newLap + "<br>");
};

/**
 * Toggle the timer. If it's paused, start it.
 * If it's running, pause it.
 */
const toggleTimer = () => {
    if (isPaused) {
        if (pauseTime !== undefined) {
            let diff = Date.now() - pauseTime;
            if (direction === "Stopwatch") {
                offset += diff;
            } else {
                offset -= diff;
            }
        }
        start(offset===0);
    } else {
        pause(true);
        pauseTime = Date.now();
    }
};

/**
 * Handle when the user presses a key.
 * This is tied to document so that it
 * triggers on every press.
 */
$(document).keypress(e => {
    if (e.key === "l") { addLap(); }
    else if (e.key === "r") { reset(); }
    else if (e.key === "s" && isPaused ||
        e.key === "p" && !isPaused ||
        e.key === " ") {
        toggleTimer();
    }
});

// Set up timers when document loads
$(document).ready(() => {
    tick($("#hours"), 99, 2, 3600000, 0);
    tick($('#minutes'), 60, 2, 60000, 1);
    tick($('#seconds'), 60, 2, 1000, 2);
    tick($('#ms'), 100, 2, 10, 3);
});