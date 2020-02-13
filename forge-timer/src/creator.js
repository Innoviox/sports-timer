let newRow = 
`<tr class="row">
    <td><input type="text" class="phase-name"></input></td>
    <td><input class="direction"></input></td>
    <td><input type="text" class="length"></input></td>
</tr>`;

/** 
 * Append a new row onto 'rows'. 
 * @param {boolean} animate - whether the row should animate height when added
 */ 
const addNewRow = (animate) => {
 	$("#rows").append(newRow);
 	if (animate) {	
	 	$("#rows").children().last().css('height', '0px');
 		$("#rows").children().last().animate({height: '30px'});
 	}
};

/**
 * Shrink height of last element in 'rows' to zero, then remove it. 
 */
const deleteLastRow = () => {
    $("#rows").children().last().animate({height: '0px'}, () => {
		$("#rows").children().last().remove();
    });
};

/**
 * Based on customTimers (see dom.js), change the items displayed in the timer lists
 * in the 'Timer' and 'Create' tab. 
 */
const updateTimerLists = () => {
	let timerSelect = $("#direction-select");
	let customTimerSelect = $("#type-select");

	// Delete current options in selectors
	timerSelect.empty();
	customTimerSelect.empty();
	
	// Add 'Stopwatch' and 'Timer' to #direction-select
	addOption(timerSelect, "Stopwatch");
	addOption(timerSelect, "Timer");

	// Add custom timer names to selectors
	names = customTimerNames();
	for (var name of names) {
		addOption(timerSelect, name);
		addOption(customTimerSelect, name);	
	}
};

/**
 * Add a new option to the HTML object by the given jQuery selector
 * @param {Object} select - the jQuery selector to append new option to
 * @param {string} value - the string to add to the list 
 */
const addOption = (select, value) => {
	select.append($('<option/>').html(value));
}

/** 
 * Get the names of all the custom timers.
 * @return {string[]} array of names in customTimers
 */
const customTimerNames = () => {
	return customTimers.map((timer) => timer["name"]);
}

/** 
 * Display a given customTimer JSON object in 'Create' table.
 * @param {Object} customTimer - custom timer to display
 */
const displayCustomTimer = (customTimer) => {
	$("#rows").empty();
	$("#custom-name").html = customTimer["name"]; 
	let lastRow = undefined;
	console.log(lastRow);
	// add all phases into table
	for (phase of customTimer["phases"]) {
		addNewRow(false);
		lastRow = $("#rows").children().last();  // note: jQuery selector, not HTML object 
		console.log("phase");
		console.log(phase);
		console.log("lastRow");
		console.log(lastRow);
		lastRow.find(".phase-name").val(phase["phase-name"]);
		console.log(phase["phase-name"]);
		lastRow.find(".direction").val(phase["direction"]);
		lastRow.find(".length").val(phase["length"]);
	}
}

$(document).ready(() => {
	updateTimerLists();
});