//Array of Default Giphy items
var giphyArray = ['chicken', 'dogs', 'cats', 'ducks', 'moose', 'owls']

//populate dropdown li with giphyArray
function populateGiphyDropdown(){
	//First clear the dropdown
	$('.giphy-items').empty();
	for(var i=0; i < giphyArray.length; i++){
		var li = $('<li>');
		var a = $('<a>');
		a.attr('href', '#');
		a.html(giphyArray[i]);
		li.append(a);
		$('.giphy-items').append(li);
	}
}

//Giphy API Call
function giphyAPI(searchTerm){
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+searchTerm+"&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    	console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          //Clearing the current giphys
          $('#gifs-appear-here').empty();

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var gifDiv = $("<div>");

            //add class to gifDiv
            gifDiv.addClass('gif-div');

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            // Initially sets to a still item.
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', 'still');
            gifImage.addClass('gif');


           	//gifImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImage);

            // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(gifDiv);
          }
    });
}

//Displays the Giphy from the API Response
function displayGiphy(json){
	console.log('Displayed')
}

//Capture User Input and Push to the giphyArray
function addGiphy(item){
	giphyArray.push(item);
	populateGiphyDropdown();
}

//End of Function Definitions
//Start Application logic
populateGiphyDropdown();

//Captures the Users input and adds it to the dropdown
$('.btn-add').on('click', function(){
	var newItem = $('#new-giphy').val().trim();
	if(newItem != ''){
		addGiphy(newItem);
		$('#new-giphy').val('');
	}

});

//Captures the click of a giphy item
$(document).on('click', '.giphy-items li a', function(){
	var item = this.text;
	giphyAPI(item);
});

//Captures the click of a giphy image and swaps the still for the animation.
$(document).on("click", '.gif', function() {
	console.log('clicked gif');
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});


