let startTime = Date.now();
let offset = 0; // Amount of time the user has paused the current stopwatch
let timer = []; // Stores the current time on the stopwatch
let laps = []; // Stores the various lap times (times when user pressed 'Lap')
let isPaused = true; // If the timer is paused or not; starts paused

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
 * @param {number} update_time - How many milliseconds it should be between updates
 * @param {number} index - What element of 'timer' should this time segment be displayed?
 */
const tick = (el, max, padding, updateTime, index) => {
    setInterval(() => {
        if (isPaused) return; // don't update the timer if paused
        let currentTime = Date.now() - startTime;
        let number = pad(parseInt((currentTime - offset) / updateTime) % max, padding);
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
    reset();
    isPaused = false; // start the timer
    $("#toggle-button").html("Pause"); // the toggle button now pauses

    startTime = Date.now();

    tick($("#hours"), 99, 2, 360000, 0);
    tick($('#minutes'), 60, 2, 60000, 1);
    tick($('#seconds'), 60, 2, 1000, 2);
    tick($('#ms'), 100, 2, 10, 3);
};

/** 
 * Reset the stopwatch - reser counters to zero and stop updating the display.
 * Also clear lap-list
 * Called when the user presses 'Reset'.
 */ 
const reset = () => {
    timer = ['00', '00', '00', '00'];
    laps = [];

    $("#lap-list").html("");
    $("#hours").html("")
    $("#minutes").html("");
    $("#seconds").html("");
    $("#ms").html("");

    isPaused = true;
    $("#toggle-button").html("Start"); // the toggle button now starts
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
const timer_toggle = () => {
    if (isPaused) {
        start();
    } else {

        $("#toggle-button").html("Resume");
    }
};

// $(document).ready(start);

