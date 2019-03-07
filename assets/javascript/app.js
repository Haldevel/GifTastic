
//Initial array of topics to search
var topics = ["Howl's Moving Castle", "Spirited Away", "My Neighbor Totoro", "Princess Mononoke", "Kiki's Delivery Service", "Castle in the Sky"];

var ackn = "This data is provided by the GIPHY API";

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {

  var gifName = $(this).attr("data-name");
  console.log(gifName);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=Miyazaki+" + gifName + "+anime&limit=10&rating=g&api_key=gi92ZY69kCG4DHPebCErOXdNEhSBShbI";

  console.log(queryURL);

  var countCards = 0;

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    //emptying the correcponding rows
    $("#gif-view0").empty();
    $("#gif-view1").empty();
    $("#gif-view2").empty();
    $("#gif-view3").empty();
    $("#gif-view4").empty(); 

    //looping through the array of response.data and retrieve the urls and ratings
    for (var j = 0; j < 10; j++) {
      var rating = response.data[j].rating;
      console.log(rating);
      var imgStillURL = response.data[j].images.fixed_width_still.url;
      console.log(imgStillURL);

      var imgURL = response.data[j].images.fixed_width.url;
      console.log(imgURL);

      // Creates a div to hold the movie
      var newDivImg = $("<div>");
      var newDivRating = $("<div>");
      var newDiv = $("<div>");

      //create h6 html element for rating
      var htmlRating = $("<h6>Rating: " + rating + "</h6><hr>");

      var giphyApi = $("<p>" + ackn + "</p>");
      giphyApi.addClass("small-txt");

      //make newDivRating div a card text bootstrap element
      newDivRating.html(htmlRating);
      newDivRating.append(giphyApi);
      newDivRating.addClass("text-class card-text");

      //create img html element
      var htmlGif = $("<img>");
      htmlGif.attr("src", imgStillURL);
      htmlGif.attr("id", imgURL);
      htmlGif.attr("data-name", imgURL); // aniamated gif
      htmlGif.attr("data-still", imgStillURL); //still gif  

      //make newDivImg div a bootstrap card body
      newDivImg.html(htmlGif);
      newDivImg.addClass("card-body");

      //append both divs for card text and card body to a newDiv
      newDiv.append(newDivImg, newDivRating);
      newDiv.addClass("card gif-div");

      $(htmlGif).on("click", function (e) {
        //console.log("Inside event listener src: " + e.target.src);
        //console.log("Inside event listener data-name: " + $(this).attr("data-name"));
        //console.log("Inside event listener data-still: " + $(this).attr("data-still"));
        var srcStr = e.target.src;
        if (checkGif(srcStr) === "still") {
          $(this).attr("src", $(this).attr("data-name"));
        }
        else if (checkGif(srcStr) === "animated") {
          $(this).attr("src", $(this).attr("data-still"));
        }
        else {
          //do nothing - incorrect gif ending
        }
      });

      //caluculates what flex-box row number should the card be appended to if the number of the cards in a row is 3
      $("#gif-view" + Math.floor(countCards / 3)).append(newDiv);

      countCards++;
    }
  });
}


// Function for displaying movie data
function renderButtons() {

  // Deletes the movies prior to adding new movies
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // Create the button element 
    var a = $("<button>");
    // Adds a bunch of classes to our button
    a.addClass("gifka btn btn-success ml-3 mb-3");
    // Added a data-attribute
    a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

//function to check if the gif is animated or still
function checkGif(str) {
  var arr = str.split("/");
  var last = arr.pop();

  if (last === "200w_s.gif") {
    return "still";
  }
  else if (last === "200w.gif") {
    return "animated";
  }
  else return "incorrect";
}

// This function handles events where the 'Add a Movie' button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();

  //Grab the input from the textbox
  var movie = $("#gif-input").val().trim();

  // The Miyazaki's movie from the textbox is added to our array
  topics.push(movie);

  document.getElementById("gif-input").value = "";

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "gifka"
$(document).on("click", ".gifka", displayGif);

renderButtons();



