//Developed by Adam Tarrant - 2017

import styles from '../scss/wikisearch.scss';

// to toggle focus on search box - timeout is to allow another function to focus so there isnt a blip in the overlay
function toggleOverlay() {
    setTimeout(function(){
        if ($(".search-input").is(":focus")) {
        $(".prompt, button[type='submit']").addClass("highlight-text");
        $(".search-label").addClass("search-overlay");
    } else {
        $(".prompt, button[type='submit']").removeClass("highlight-text");
        $(".search-label").removeClass("search-overlay");
    }
    }, 120);
  
  }
  
  function moveSearchInput() {
    $(".wrapper > h1").addClass("results-show-h1")
  }
  
  //toggles cancel icon and also resets any invalid input warnings
  function toggleClearIcon(e) {
    $(".search-input").removeClass("invalid-q").attr("placeholder", "Please enter your query")
    if ($(".search-input").val().length !== 0 && e.type !== "reset") {
        $("button[type='reset']").addClass("clear-icon");
        } else {
          $("button[type='reset']").removeClass("clear-icon");
              $(".search-input").focus();
              $("#spinner").removeClass("loader");
        }
  }
  
  // call Wikipedia API with input from search field on page. Success function clears element before starting. start of function inserts loader icon
  function callWiki(formInput) {
    if (formInput == "") {
      $(".search-input").addClass("invalid-q").attr("placeholder", "Please enter a query!");
    } else {
    $("#spinner").addClass("loader");
    var queryString = encodeURIComponent(formInput);
fetch('/wikisearch/search?q=' + queryString)
    .then(response => response.json())
    .then((searchResults) => {
        var pageResults = searchResults.query.pages;
        // empty contents from previous searches
        $(".results-container").empty();
        $.each(pageResults, updatePageResult);
        });
    }
  }
  
  // populate results container element with search results - li items and uses moveSearchINput function to move to make room
  function updatePageResult() {
    moveSearchInput();
    var wikiLink = "https://en.wikipedia.org/?curid=" + this.pageid;
    var pageTitle = this.title;
    var extract = this.extract;
    // if statement to capture undefined thumbnails as not all articles have them
    if (this.thumbnail == undefined) {
      var thumb = " ";
    } else {
      var thumb = this.thumbnail.source;
    }
    $("#spinner").removeClass("loader");
    $(".results-container").append(
      '<li class="results-item flex-item"><a href="' +
        wikiLink +
        '"target="_blank"><h3>' +
        pageTitle +
        '</h3><img src="' +
        thumb +
        '"><p>' +
        extract +
        "</p></a></li>"
    );
  }
  
  // main function includes all event listeners on the page to trigger functions/event handlers
  $(document).ready(function() {
    $("input[name='query']").on('focusin blur', function(){
      toggleOverlay();
    });
    $("input[name='query']").on('input', function(e) {
      toggleClearIcon(e);
    });
    $("#queryForm").on('reset', function(e){
        toggleClearIcon(e);
    });
    $("#queryForm").submit(function(e) {
      e.preventDefault();
      $(".search-input").blur();
      var formInput = $("input[name='query']").val();
      callWiki(formInput);
    });
  });