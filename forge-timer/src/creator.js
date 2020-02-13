let newRow = 
`<tr class="row">
    <tr hidden><td>col1</td><td>col3</td><td>col1</td><td>col2</td><td>col3</td></tr>
    <td colspan="2"><input type="text" class="phase-name" placeholder="Phase Name" /></td>
    <td colspan="2"><select class="direction">
    	<option value="up">Stopwatch</option>
		<option value="down">Timer</option>
    </select></td>
    <td colspan="1"><div class="length">
    	<input type="text" class="hours time-in" placeholder="hh" size="2" maxlength="2" />:
    	<input type="text" class="minutes time-in" placeholder="mm" size="2" maxlength="2" />:
    	<input type="text" class="seconds time-in" placeholder="ss" size="2" maxlength="2" />.
    	<input type="text" class="centiseconds time-in" placeholder="cc" size="2" maxlength="2" />
    </div></td>
</tr>`;

/**
 * Make time input better, with autofocusing and no letters.
 */
const inputFixer = () => {
    $(".time-in").numberFilter();
    $("#rows").children().last()
};

/** 
 * Append a new row onto 'rows'. 
 * @param {boolean} animate - whether the row should animate height when added
 */ 
const addNewRow = (animate) => {
 	$("#rows").append(newRow);
 	inputFixer();
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
	// let timerSelect = $("#direction-select");
	let customTimerSelect = $("#type-select");

	// Delete current options in selectors
	// timerSelect.empty();
	$("#default-options").empty();
	$("#custom-options").empty();
	customTimerSelect.empty();
	
	// Add 'Stopwatch' and 'Timer' to #direction-select
	addOption($("#default-options"), "Stopwatch");
	addOption($("#default-options"), "Timer");

	addOption(customTimerSelect, "Custom");

	// Add custom timer names to selectors
	names = customTimerNames();
	for (var name of names) {
		addOption($("#custom-options"), name);
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