$(".draggable").draggable({
    scroll: false,
    helper: 'clone',
    revert: 'invalid',
    appendTo: 'body'
});

$(".favGames").droppable({ //makes products droppable
    /*
    drop: function(event, ui) {
        var id = ui.draggable.attr("id");
        if ($("#fav_" + id).css("display") === "none") {
            localShoe.push(id);
            localStorage.setItem('localShoe', JSON.stringify(localShoe));
        }
        $("#clearButton").css("display", "block");
        $("#fav_" + id).css("display", "block");
    }
    */
});