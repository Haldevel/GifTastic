


    // Example queryURL for Giphy API
    var topics = ["Spirited Away", "Howl's Moving Castle", "My Neighbor Totoro", "Princess Mononoke", "Kiki's Delivery Service", "The Wind Rises", "Castle in the Sky"];

    //var queryStr;


    /* $("#buttons-view").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the text
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
          });
      

    } */

     // displayMovieInfo function re-renders the HTML to display the appropriate content
     function displayGif() {

        var gifName = $(this).attr("data-name");
        console.log(gifName);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=Miyazaki+" + gifName + "+anime&limit=10&rating=g&api_key=gi92ZY69kCG4DHPebCErOXdNEhSBShbI";

        console.log(queryURL);

        var count = 0;

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          $("#gif-view").empty();
          console.log(response);
          for(var j = 0; j < 10; j++) {
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

            
            var htmlRating = $("<h6>Rating: " + rating  + "</h6></br>"); 
            newDivRating.html(htmlRating);   
            newDivRating.addClass("text-class card-text");    
      
            var htmlGif = $("<img>");
            htmlGif.attr("src", imgStillURL); 
            htmlGif.attr("id", imgURL);
            htmlGif.attr("data-name", imgURL); // aniamated gif
            htmlGif.attr("data-still", imgStillURL); //still gif
            //htmlGif.method()
            //newDivImg.addClass("img-class");

            newDivImg.html(htmlGif);
            newDivImg.addClass("card-body");

            newDiv.append(newDivImg, newDivRating);
            newDiv.addClass("card gif-div");
            /* newDiv.addClass("d-flex"); */

            console.log("Outside of event listener " + htmlGif);

          /*   $( "#dataTable tbody tr" ).on( "click", function() {
                console.log( $( this ).text() );
              }); */

            //$(document).on("click", ".img-class", function(e) {
            $(htmlGif).on("click", function(e) {    
                console.log(e.target);
                //console.log("Inside event listener id: " + e.target.id);
                console.log("Inside event listener src: " +  e.target.src);
                console.log("Inside event listener data-name: " +   $(this).attr("data-name"));
                console.log("Inside event listener data-still: " +   $(this).attr("data-still"));
                var srcStr =  e.target.src;
                if(checkGif(srcStr) === "still") {
                    $(this).attr("src", $(this).attr("data-name"));
                }
                else if (checkGif(srcStr) === "animated") {
                    $(this).attr("src", $(this).attr("data-still"));
                }
                else {
                    //do nothing - incorrect gif ending
                }
                //$(this).attr("src", e.target.id);
            });
 
 
            $("#gif-view").append(newDiv);
            //$("#gif-view").html(newDiv);

          }

        

         
   /*        $(document).on("click", ".img-class", function() {
            console.log("Inside event listener " + imgURL);
            console.log($(this));
            //$(htmlGif).attr("src", imgURL);
        }); */

                
         /*     
          newDiv.append(toAppendRating, htmlGif);
          $("#gif-view").html(newDiv);
          */
    

          //$("#movies-view").append(newDiv);
          // Retrieves the release year
          // Creates an element to hold the release year
          // Displays the release year
          // Retrieves the plot
          // Creates an element to hold the plot
          // Appends the plot
          // Creates an element to hold the image
          // Appends the image
          // Puts the entire Movie above the previous movies.
        });

      }

    
    // Function for displaying movie data
    function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("gifka");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
    }

    function checkGif(str) {
        var arr = str.split("/");
        var last = arr.pop();
        //var type =last.substr(0, last.indexOf('.')); 
        if(last === "200w_s.gif") {
            return "still";
        }
        else if (last === "200w.gif") {
            return "animated";
        }
        else return "incorrect";
    }

    // Adding click event listeners to all elements with a class of "movie"
    $(document).on("click", ".gifka", displayGif);

    //$(document).on("click", ".img-class", );

    renderButtons();

  

      /*
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    }); */


