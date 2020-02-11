let newRow = 
`<div class="row">
    <input id="name"></input>
    <input id="direction"></input>
    <input id="length"></input>
</div>`;

const addNewRow = () => {
    $("#rows").append(newRow);
}

const deleteLastRow = () => {
    $("#rows").children().last().remove();
}