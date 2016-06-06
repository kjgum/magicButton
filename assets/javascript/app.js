var showsArray = ['funny','food porn','lesbian'];



$( document ).ready(function() {
    for (i = 0; i < showsArray.length; i++) {
        let $showBtn = $('<button>')
            .addClass('btn btn-info btn-show')
            .attr('data-input',showsArray[i])
            .attr('type','button')
            .text(showsArray[i]);
        $('#available-shows').append($showBtn); 
    }
});

   
// 
var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=family+guy";


  // Get & display show gifs on button click
$(document).on('click', '.btn-show', function() {

    $('#gif-area').empty() 
    var show = $(this).data('input').trim();

    // XML request 
    var url = "http://api.giphy.com/v1/gifs/search?q=" 
        + show + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(url);
    $.ajax({url: url, method: 'GET'})
    // upon response append gifs to gif-area
    .done(function(response) {
        console.log(`Response--->${JSON.stringify(response)}`);
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
            let $outerDiv = $('<div>').addClass('col-md-4');
            let $gifDiv = $('<div>').addClass('panel panel-primary');
            let $ratingP = $('<p>').addClass('panel-heading')
                .text("Rating: " + data[i].rating);
            let $showImg = $('<img>').addClass('panel-body');
            $showImg.attr('src', data[i].images.fixed_height.url);

            $gifDiv.append($ratingP)
            $gifDiv.append($showImg);
            $outerDiv.append($gifDiv);
            $('#gif-area').prepend($outerDiv);
        }
    })
return false;
})
