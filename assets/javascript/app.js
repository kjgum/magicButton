var showsAry = ['funny','love','food porn'];

$( document ).ready(function() {
    for (i = 0; i < showsAry.length; i++) {
        let $showBtn = $('<button>')
            .addClass('btn-show')
            .attr('data-input',showsAry[i])
            .attr('type','button')
            .text(showsAry[i]);
        $('#available-shows').append($showBtn); 
    }
});


// Get & display gifs on button click
$(document.body).on('click', '.btn-show', function() {

    $('#gif-area').empty() 
    var show = $(this).data('input');

    // XML request 
    var url = "http://api.giphy.com/v1/gifs/search?q=" 
    + show + "&api_key=dc6zaTOxFJmzC&limit=12";
    console.log(url);
    $.ajax({url: url, method: 'GET'})
    // upon response append gifs to gif-area
    .done(function(response) {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
            let $outerDiv = $('<div>').addClass('col-md-4');
            let $gifDiv = $('<div>').addClass('panel');
            let $ratingP = $('<p>').addClass('panel-heading')
                .text("rating: " + data[i].rating);
            let $showImg = $('<img>').addClass('panel-body');



            $showImg.addClass('show-image')
                .attr('src', data[i].images.url)
                .attr('data-animate', data[i].images.fixed_height.url)
                .attr('data-state', 'still')
                .attr('data-still', data[i].images.fixed_height_still.url);

            $gifDiv.append($ratingP)
            $gifDiv.append($showImg);
            $outerDiv.append($gifDiv);
            $('#gif-area').prepend($outerDiv);
        }
        // $('.gif').gifplayer();
    })
})

// create new show button
$(document.body).on('click', '#btn-create', function() {
    
    var btnText = $('#text-input').val().trim();
    if (btnText == "") {
        console.log('No input');
        return false;
    }
    

    var $btn = $('<button>')
            .addClass('btn-show')
            .attr('data-input',btnText)
            .attr('type','button')
            .text(btnText);
    $('#available-shows').append($btn);
     $('#text-input').val('');
     return false;

   
})


// play gif on click
$(document.body).on('click', '.show-image', function() {
    var state = $(this).attr('data-state'); 
    if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
})