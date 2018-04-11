//Developed by Adam Tarrant - 2018

import styles from '../scss/randomquote.scss';

function getQuote(firstLoad) {
    //Fades out text and fades in loading text
             if (firstLoad == "false") {
             $("#quote").animate({opacity: 0}, 100);
             $("#quote-author").animate({opacity: 0}, 100);
             $("#text").text("Loading...");
             $("#quote").animate({opacity: 1}, 1000);
             }
          // Get quote function on page load and button click.
          fetch('/randomquote/newquote')
                    .then(response => response.json())
                    .then(jsonObj => {
                            //fades out loading text
                            $("#quote").animate({opacity: 0}, 100);
                            //timeout set so that loading text does not appear when element fades in
                            setTimeout(function(){$("#text").html(jsonObj.quote);
                            if (jsonObj.author == "") {
                              $("#quote-author").html("<i>Anon</i>");
                            } else {
                              $("#quote-author").html("<i>" + jsonObj.author + "</i>");
                            }
                              $('#tweet-link').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent(jsonObj.quote + ' -' + jsonObj.author));}, 1000);
                   //Fades quote text back in after successful call to api
                         setTimeout(function() {
                         $("#quote").animate({opacity: 1}, 2000);
                         $("#quote-author").animate({opacity: 1}, 2000);}, 1000);

          });
  }
  
  
          // Func declare - Reset Trianglify on window resize and apply to existing canvas element - with delay
  var currentColour;
     function updateBg(changeCol){
      
            // Declare theme colour variables
    var colours = ["YlGn","Purples", "OrRd", "YlGnBu", "GnBu", "Oranges", "BuGn","PuBuGn", "PuBu", "Blues", "PiYG", "PuOr", "YlOrRd", "Greens", "RdBu", "YlOrBr", "PuRd"];
    var textCol = ["#00AF56", "#AD4FE1", "#F86B4D", "#32A087", "#35AA78", "#F58F00", "#00A36E", "#027399", "#533FE6", "#204C85", "#9D1B70", "#D54141", "#E97B00", "#24B42D", "#6C3A70", "#AC4702", "#C11A55"];
              if (changeCol == "true"){
              var changedCol = Math.floor(Math.random() * colours.length);
               currentColour = changedCol;
              } else {
              var changedCol = currentColour;
              }
              var pattern = Trianglify({
              height: document.documentElement.clientHeight,
              width: window.innerWidth,
              x_colors: colours[changedCol],
              cell_size: 40
            });
       if($("canvas").length){
         document.body.appendChild(pattern.canvas(document.querySelector("canvas")));
       } else {
         document.body.appendChild(pattern.canvas());
       }
       $("body").animate({color: textCol[changedCol]}, 500);
       $(".button").animate({'background-color': textCol[changedCol]}, 500);
     }
  
  $(document).ready(function() {
        //Initial call of getQuote func and click to getQuote which also updates background colour - Uses Trianglify library to create textured background
    getQuote();
    updateBg("true");
    $("#get-quote").on("click", function(e){
      getQuote("false");
    });
    $("#get-quote").on("click", function(e){
      updateBg("true");
    });
    //Reset Trianglify on window resize and apply to existing canvas element - with delay
        $(window).resize(function() {
          clearTimeout(window.resizedFinished);
          window.resizedFinished = setTimeout(function() {
              updateBg();
          }, 200);
        });
  
  
        });