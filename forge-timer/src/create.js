/**
 * Create a timer
 * @param direction up/down
 * @param amount total minutes
 */
const createTimer = (direction, amount) => {
    console.log(direction, amount);
};

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
            case "Stopwatch": $("#amount").hide(); break;
            case "Timer": $("#amount").show(); break;
            default: break;
        }
    });

    $("#create-form").on('submit', (e) => {
        e.preventDefault();
        createTimer($("#direction-select").val(), $("#amount").val());
    })
});