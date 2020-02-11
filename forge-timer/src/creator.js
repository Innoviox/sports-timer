let newRow = 
`<tr class="row">
    <td><input type="text" class="phase-name"></input></td>
    <td><input class="direction"></input></td>
    <td><input type="text" class="length"></input></td>
</tr>`;

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