
gifArray = ["dog", "cat", "fish", "ice cream", "coffee", "tea", "odell", "backflip","paint","dance","travel","food","pizza","spaghetti", "chocolate", "basketball", "programming", "video games", "cake", "cookies"];

function generateGifs(){

        var searchWord = $(this).attr('data-name');
        var giphyBaseURL =  "http://api.giphy.com/v1/gifs/search?q=" + searchWord + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({url: giphyBaseURL, method: "GET"}).done(function(response){

            var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="gifDivClass col-lg-6">');

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var gifImage = $('<img>');
                    gifImage.attr('src', results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("class", "imgClass");

                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    $(".allTheGifs").prepend(gifDiv);

                }

        });

    }

function renderButtons(){ 

		
		$('.allTheButtons').empty();

		for (var i = 0; i < gifArray.length; i++){

		    var newButton = $('<button>');
		    newButton.addClass('gifButtons btn btn-success');
		    newButton.attr('data-name', gifArray[i]);
		    newButton.text(gifArray[i]);
		    $('.allTheButtons').append(newButton);

		}
	}


$('.addGifButton').on('click', function(){

		var newGif = $('.userInput').val().trim();
		gifArray.push(newGif);
		renderButtons();
		return false;

	});


$(document).on("click", ".gifButtons", generateGifs);

renderButtons();





$(document).on('click','.imgClass', function(){
    var state = $(this).attr('data-state');
     if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", 'animate');
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", 'still');
                }
    
});