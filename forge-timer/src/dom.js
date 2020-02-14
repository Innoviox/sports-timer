let timer = []; // Stores the current time on the stopwatch
let laps = []; // Stores the various lap times (times when user pressed 'Lap')
let lap_lengths = [];

let startTime = Date.now(), pauseTime;
let offset = 0; // Amount of time the user has paused the current stopwatch
let isPaused = true; // If the timer is paused or not; starts paused
let intervals = []; // the set of intervals

let direction = "Stopwatch"; // Direction (Stopwatch -> count up, Timer -> count down)
let amount = [0, 0, 0, 0]; // Max amount for Timer, array of hours/minutes/seconds/ms
let total = 0; // The amount array, reduced to milliseconds
let timerIndex = 0;
let currentTimer = 0;
let customTimer;

customTimers = [{
    "name": "Football",
    "phases": [
        {
            "phase-name": "1st Quarter",
            "length": [0,15,0,0],
            "direction": "down"
        },
        {
            "phase-name": "2nd Quarter",
            "length": [0,15,0,0],
            "direction": "down"
        },
        {
            "phase-name": "3rd Quarter",
            "length": [0,15,0,0],
            "direction": "down"
        },
        {
            "phase-name": "4th Quarter",
            "length": [0,15,0,0],
            "direction": "down"
        }
    ]
},
    {
        "name": "Soccer",
        "phases": [
            {
                "phase-name": "1st Half",
                "length": [0,45,0,0],
                "direction": "up"
            },
            {
                "phase-name": "2nd Half",
                "length": [0,45,0,0],
                "direction": "up"
            }
        ]
    },
    {
        "name": "Hockey",
        "phases": [
            {
                "phase-name": "1st Period",
                "length": [0,20,0,0],
                "direction": "down"
            },
            {
                "phase-name": "2nd Period",
                "length": [0,20,0,0],
                "direction": "down"
            },
            {
                "phase-name": "3rd Period",
                "length": [0,20,0,0],
                "direction": "down"
            },
        ]
    },
    {
        "name": "Basketball",
        "phases": [
            {
                "phase-name": "1st Quarter",
                "length": [0,12,0,0],
                "direction": "down"
            },
            {
                "phase-name": "2nd Quarter",
                "length": [0,12,0,0],
                "direction": "down"
            },
            {
                "phase-name": "3rd Quarter",
                "length": [0,12,0,0],
                "direction": "down"
            },
            {
                "phase-name": "4th Quarter",
                "length": [0,12,0,0],
                "direction": "down"
            },
        ]
    },
    /*{
        "name": "test",
        "phases": [
            {
                "phase-name": "Quarter 1",
                "length": [0,0,5,0],
                "direction": "down"
            },
            {
                "phase-name": "Quarter 2",
                "length": [0,0,4,0],
                "direction": "down"
            },
            {
                "phase-name": "Quarter 3",
                "length": [0,0,3,0],
                "direction": "down"
            },
            {
                "phase-name": "Quarter 4",
                "length": [0,0,2,0],
                "direction": "down"
            }
        ]
    }*/]; // A set of all the timers that have been created

/** Pad {number} to {zeros} digits */
const pad = (number, zeros) => {
    let string = number.toString();
    while (string.length < zeros) {
        string = '0' + string;
    }
    return string;
};

/**
 * Pause timer and update timer text.
 * @param {boolean} paused - is timer currently paused?
 */
const pause = (paused) => {
    isPaused = paused; // store paused state in global var
    let s = "";
    if (customTimer !== undefined) {
        s = `(${timerIndex} / ${currentTimer.phases.length}) ${currentTimer.name} > ${customTimer['phase-name']}: `;
    }
    $("#toggle-button").html(s + (paused ? "<u>S</u>tart" : "<u>P</u>ause"));
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
            number = currentTime - offset;
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
        $(el+".main").html(number);

        let lap_n = currentLapLength()[index];
        $(el+".lap").html(lap_n);
    }, 1);
};
/*
* Create an interval to run custom timers in.
*/
const userTimer = () => {
	intervals.push(setInterval(() => {
        if (customTimer !== undefined && !isPaused) {
            if ((total - (Date.now() - startTime) <= 10)) {
                if (customTimer.length !== 0) {
                    if (timerIndex < currentTimer.phases.length) {
                        goToNextPeriod();
                    } else {
                        toastr.warning(`Timer ${currentTimer.name} over!`);
                        currentTimer = undefined;
                    }
                }
            }
        }
    }, 10));
}

/*
* Reset the timer and go to the next phase.
*/
const goToNextPeriod = () => {
    let phase = currentTimer.phases[timerIndex++];
    customTimer = phase;
	timer = phase.length.map(Number);
    direction = phase.direction === "up" ? "Stopwatch" : "Timer";
    $("#add-lap").attr('disabled', $("#direction-select").val()==="Timer");

    $(".hours").html(timer[0]);
    $(".minutes").html(timer[1]);
    $(".seconds").html(timer[2]);
    $(".ms").html(timer[3]);

    pause(true);
    pauseTime = undefined;
	toastr.info(`Starting phase ${phase['phase-name']}`);
    total = reduceToMs(timer);
};


/**
 * Start incrementing the stopwatch counters. 
 * Starts when the timer 
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
    $("#add-lap").attr('disabled', $("#direction-select").val()==="Timer");
    timer = amount.slice(); // ['00', '00', '00', '00'];
    laps = [];
    lap_lengths = [];
    offset = 0;

    $("#lap-numbers").html("");
    $("#lap-amounts").html("");

    addLapDiv();

    $(".hours").html(timer[0]);
    $(".minutes").html(timer[1]);
    $(".seconds").html(timer[2]);
    $(".ms").html(timer[3]);

    pause(true);

    pauseTime = undefined;
};

/**
 * Helper method to update el, only if el is defined,
 * so we don't get dumb errors.
 * @param {object} el - HTML element to set style of
 * @param {string} color - new color of el
 * @param {string} style - formatting to set -- either 'italic' or font weight (bold) 
 */
const setStyle = (el, color, style) => {
    if (el !== undefined) {
        el.style.color = color;
        style === 'italic' ? el.style.fontStyle = style : el.style.fontWeight = style;
    }
};

/**
 * Change color and style of best and worst lap times.
 * Best (shortest) lap time becomes italicized and green, worst (longest) becomes red and bold.
 */
const recolorLaps = () => {
    let amts = lap_lengths.map(reduceToMs);

    $(".lap-number").css('color', 'rgb(0, 0, 0)').css('font-style', '').css('font-weight', '');
    $(".lap-amount").css('color', 'rgb(0, 0, 0)').css('font-style', '').css('font-weight', '');

    setStyle($(".lap-number")[amts.length - amts.indexOf(Math.max(...amts))], 'rgb(255, 0, 0)', 'bold');
    setStyle($(".lap-amount")[amts.length - amts.indexOf(Math.max(...amts))], 'rgb(255, 0, 0)', 'bold');
    setStyle($(".lap-number")[amts.length - amts.indexOf(Math.min(...amts))], 'rgb(37, 138, 54)', 'italic');
    setStyle($(".lap-amount")[amts.length - amts.indexOf(Math.min(...amts))], 'rgb(37, 138, 54)', 'italic');
};

/** 
 * Redisplays all laps into the <div> display in the middle of the 'Timer' tab,
 * and applies appropriate styling to them (by calling recolorLaps).
 */
const addLapDiv = () => {
    if (direction !== "Stopwatch") { return } // ???
    ['hours', 'minutes', 'seconds', 'ms'].map(i => $(".lap").removeClass(i));
    $("#lap-numbers").html(`<span class="lap-number">Lap ${laps.length + 1}</span><br>` + $("#lap-numbers").html());
    $("#lap-amounts").html('<div class="time lap-amount">' +
        '<div class="hours lap">00</div>:' +
        '<div class="minutes lap">00</div>:' +
        '<div class="seconds lap">00</div>.' +
        '<div class="ms lap">00</div>' +
        '</div>' + $("#lap-amounts").html());
    recolorLaps();
};

const currentLapLength = () => {
    let last = laps.slice(-1)[0]; // get last element
    let diff = reduceToMs(timer);
    if (last !== undefined) {
        diff -= reduceToMs(last);
    }
    return totalFromMs(diff);
}

/**
 * Adds the current time to the list of laps and the HTML text box display.
 * Triggered by clicking the 'Lap' button, or by keyboard shortcut.
 */
const addLap = () => {
    if (isPaused) return; // don't lap if timer is not running (todo: is this correct?)
    lap_lengths.push(currentLapLength().slice());
    laps.push(timer.slice());
    addLapDiv();
};

/**
 * Toggle the timer. If it's paused, start it.
 * If it's running, pause it.
 * Activated by clicking on timer, or by keyboard shortcut.
 */
const toggleTimer = () => {
    if (!$("#time").is(":visible")) { return } // can't start/pause while inputting timer
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
        if (e.key === " " && e.target === document.body) {
            // prevent scroll on space press
            e.preventDefault();
        }
        toggleTimer();
    }
});

// Set up timers when document loads
$(document).ready(() => {
    window.odometerOptions = {
        auto: false, // Don't automatically initialize everything with class 'odometer'
        numberLength: 2,
        duration: 100 // Doesn't work
    };
    
    tick(".hours", 99, 2, 3600000, 0);
    tick('.minutes', 60, 2, 60000, 1);
    tick('.seconds', 60, 2, 1000, 2);
    tick('.ms', 100, 2, 10, 3);
	userTimer();
    reset();
});