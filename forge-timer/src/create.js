/**
 * Load timer from user input (stored in the query parameters)
 */
const loadTimer = () => {
    let template = window.location.search;
    if (template === "") return;
    let lines = template.split("=")[1].split("%0D%0A"); // %0D%0A = \n
    console.log(lines);

    let name = "Custom Timer";
    if (lines[0].startsWith("%23")) {
        name = lines[0].substring(3).replace("+", " ").trim();
        lines.shift();
    }

    let phases = [];
    let phase = [];
    while (lines.length > 0) {
        let line = lines[0].split("+");
        if (line[0].includes(".")) { // new phase start
            if (phase.length > 0) {
                phases.push(phase);
                phase = [];
            }
            phase.push(line[1]);
            
        }
        lines.shift();
    }
};

/**
 * Reduce an array to milliseconds
 * @param arr
 * @returns {number | any | BigInt | T}
 */
const reduceToMs = (arr) => arr.map((e, idx) => e * [360000, 60000, 1000, 10][idx]).reduce((a, b) => a + b);


$(document).ready(() => {
    loadTimer();
    $("#direction-select").change((e) => {
        switch ($("#direction-select").val()) {
            case "Stopwatch": $("#amount-container").hide(); break;
            case "Timer": $("#amount-container").show(); break;
            default: break;
        }
    });

    $("#create-form").on('submit', (e) => {
        e.preventDefault();
        direction = $("#direction-select").val();
        amount = $(".amount").map(function() { // get user time input
            let v = parseInt(this.value);
            if (isNaN(v)) {
                return 0;
            }
            return v
        }).get();
        // represent amount as milliseconds
        total = reduceToMs(amount);
        reset();
    })
});