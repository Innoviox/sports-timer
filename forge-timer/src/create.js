/**
 * Load timer from user input (stored in the query parameters)
 */
const loadTimer = () => {
    let template = window.location.search;
    console.log(template);
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
        amount = $(".amount").map(function() {
            let v = parseInt(this.value);
            if (isNaN(v)) {
                return 0;
            }
            return v
        }).get();
        total = amount.map((e, idx) => e * [360000, 60000, 1000, 10][idx]).reduce((a, b) => a + b);
        reset();
    })
});