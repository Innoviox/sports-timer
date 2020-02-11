let newRow = 
`<div class="row">
    <input id="name"></input>
    <input id="direction"></input>
    <input id="length"></input>
</div>`;

const addNewRow = () => {
    console.log($("#rows").append(newRow));
}

const deleteLastRow = () => {
    $("#rows").children().last().animate({height: '0%'});
    $("#rows").children().last().remove();
}