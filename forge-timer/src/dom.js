let startTime = Date.now();
let offset = 0; // Amount of time the user has paused the current stopwatch
let timer = []; // Stores the current time on the stopwatch
let intervalIDs = []; //Stores the IDs of the intervals updating the timer segments, required for stopping increment
let laps = []; // Stores the various lap times (times when user pressed 'Lap')
let isTimerPaused = true; // Is the stopwatch not incrementing?
let timePaused = 0; //When the timer was last paused

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
 * Regularly increment the number in the given timer segment.
 * @param {Object} el - HTML element to regularly increment
 * @param {number} max - Greatest value this segment should display
 * @param {number} padding - Minimum number of digits segments should display
 * @param {number} updateTime - How many milliseconds it should be between updates
 * @param {number} index - What element of 'timer' should this time segment be displayed?
 */
const tick = (el, max, padding, updateTime, index) => {
    intervalIDs[index] = setInterval(() => {
        let currentTime = Date.now() - startTime;
        let number = pad(parseInt((currentTime - offset) / updateTime) % max, padding);
        timer[index] = number;
        el.html(number);
    }, 10);
};

/**
 * Start incrementing the stopwatch counters. 
 */ 
const start = () => {
    //let offset = Date.now() - timePaused;
    //startTime += offset;
    tick($("#hours"), 99, 2, 360000, 0);
    tick($('#minutes'), 60, 2, 60000, 1);
    tick($('#seconds'), 60, 2, 1000, 2);
    tick($('#ms'), 100, 2, 10, 3);
    isTimerPaused = false;
};

/**
 * Stop incrementing the timers.
 */
const stop = () => {
    // Remove incrementers
    for (const id of intervalIDs) {
        clearInterval(id);
    }
    // If the timer wasn't already paused, store the time
    // to calculate the offset later
    if(!isTimerPaused) {
        timePaused = Date.now();
    }
    isTimerPaused = true;      
}

/**
 * Toggle whether the stopwatch is incrementing or not.
 * Called when user presses start/stop button.
 */ 
const toggleStartStop = () => {
    if(isTimerPaused) {
        start();
    } else {
        stop();
    }
}

/** 
 * Reset the stopwatch - reset counters to zero.
 * Called when the user presses 'Reset'.
 */ 
const reset = () => {
    timer = ['00', '00', '00', '00'];
    startTime = Date.now();
    //TODO This triggers the odometer animation, which is a bit annoying
};

/**
 * Adds the current time to the list of laps and the HTML text box display.
 * Triggered by clicking the 'Lap' button.
 */
const addLap = () => {
    let newLap = `Lap ${laps.length + 1}: ${timer[0]}:${timer[1]}:${timer[2]}.${timer[3]}`; //Get current stopwatch time
    laps.push(newLap);
    $('#lap-list').append(newLap + '<br>');
};

/**
 * Handle when the user presses a key.
 * This is tied to document so that it
 * triggers on every press.
 */
$(document).keypress(e => {
    if (e.key === "l") { addLap(); }
    else if (e.key === "r") { reset(); }
    else if (e.key === "s") { start(); }
    else if (e.key === "p") { stop(); }
    else if (e.key == " ") {toggleStartStop(); }
});

$(document).ready(reset)