/**
 * Load timer from user input (stored in the query parameters)
 */
const loadTimer = () => {
    let template = window.location.search;
    let lines = template.split("=")[1].split("%0D%0A"); // %0D%0A = \n
    console.log(lines);
    
    let name = "Custom Timer";
    if (lines[0].startsWith("%23")) {
        name = lines[0].substring(3).replace("+", " ").trim();
        lines.shift();
    }
};

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
        total = amount.map((e, idx) => e * [360000, 60000, 1000, 10][idx]).reduce((a, b) => a + b);
        reset();
    })
});