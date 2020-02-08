let startTime = Date.now();
let timer = []; // Stores the current time on the stopwatch
let laps = []; // Stores the various lap times (times when user pressed 'Lap')

window.odometerOptions = {
    auto: false, // Don't automatically initialize everything with class 'odometer'
    numberLength: 2,
    duration: 100 // Doesn't work
};

/** Pad. */
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
 * @param {number} update_time - How many milliseconds it should be between updates
 * @param {number} index - What element of 'timer' should this time segment be displayed?
 */
const tick = (el, max, padding, updateTime, index) => {
    setInterval(() => {
        let currentTime = Date.now() - startTime;
        let number = pad(parseInt(currentTime / updateTime) % max, padding);
        timer[index] = number;
        el.html(number);
    }, updateTime);
};

/**
 * Start incrementing the stopwatch counters. 
 * [TODO] Called when the user presses 'Start'.
 * (Right now, it just automatically starts up.)
 */ 
const start = () => {
    startTime = Date.now();
    tick($("#hours"), 99, 2, 360000, 0);
    tick($('#minutes'), 60, 2, 60000, 1);
    tick($('#seconds'), 60, 2, 1000, 2);
    tick($('#ms'), 100, 2, 10, 3);
}

/** 
 * Reset the stopwatch - reser counters to zero and stop updating the display.
 * Called when the user presses 'Reset'.
 */ 
const reset = () => {
    //TODO Implement
}

/**
 * Adds the current time to the list of laps and the HTML text box display.
 * Triggered by clicking the 'Lap' button.
 */
const addLap = () => {
    let newLap = `${timer[0]}:${timer[1]}:${timer[2]}.${timer[3]}`; //Get current stopwatch t
    laps.push(newLap);
    $("#lap-list").append(newLap + "<br>");
}

$(document).ready(start);

