let start = Date.now();

/** Pad. */
const pad = (number, zeros) => {
    let string = number.toString();
    while (string.length < zeros) {
        string = '0' + string;
    }
    return string
};

/** 
 * Regularly increment the number in the given timer segment.
 * @param {Object} el - HTML element to regularly increment
 * @param {number} max - Greatest value this segment should display
 * @param {number} padding - Minimum number of digits segments should display
 * @param {number} update_time - How many milliseconds it should be between updates
 */
const tick = (el, max, padding, update_time) => {
    setInterval(() => {
        let time = Date.now() - start;
        el.html(pad(parseInt(time / update_time) % max, padding));
    }, update_time);
};

window.odometerOptions = {
    auto: false, // Don't automatically initialize everything with class 'odometer'
    numberLength: 2,
};

$(document).ready(() => {
    tick($("#hours"), 99, 2, 360000);
    tick($('#minutes'), 60, 2, 60000);
    tick($('#seconds'), 60, 2, 1000);
    tick($('#ms'), 100, 4, 10);
});