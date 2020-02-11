let newRow = 
`<div class="row">
    <input id="name"></input>
    <input id="direction"></input>
    <input id="length"></input>
</div>`;

/** 
 * Append a new row onto 'rows'. 
 */ 
const addNewRow = () => {
 	$("#rows").append(newRow);	
 	$("#rows").children().last().css('height', '0px');
 	$("#rows").children().last().animate({height: '30px'});
}

/**
 * Shrink height of last element in 'rows' to zero, then remove it. 
 */
const deleteLastRow = () => {
    $("#rows").children().last().animate({height: '0px'}, () => {
		$("#rows").children().last().remove();
    });
}