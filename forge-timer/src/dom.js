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
        console.log(time, update_time, time / update_time);
        el.html(pad((time / update_time) % max, padding));
    }, update_time);
};

$(document).ready(() => {
    tick($("#hours"), 99, 2, 360000);
    tick($('#minutes'), 60, 2, 60000);
    tick($('#seconds'), 60, 2, 1000);
    tick($('#ms'), 1000, 4, 1);
});