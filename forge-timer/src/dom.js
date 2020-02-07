let start = Date.now();

const pad = (number, zeros) => {
    let string = number.toString();
    while (string.length < zeros) {
        string = '0' + string;
    }
    return string
};

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