import styles from '../scss/twitchtv.scss';

//variable keeps track of the current view and target view - featured, all, online or offline
var mode = "featured";
var target = "";

//this function calls functions for api - function also hides and reveals html already created and updated i.e. api has already been called
function getChannelData(e) {
  var channelsArr = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];
  var type = "streams";
  if (e === "featured") {
    target = "featured";
  } else {
    target = e.target.className.split(" ")[1];
  }
  console.log($('input[type="search"]').val());
  switch (target) {
    case "featured":
      $(".channel-list").empty();
      callTwitchAPI(type, "featured");
      break;
    case "all":
    case "online":
    case "offline":
      if (mode !== target && mode == "featured" || (target !== "online" && target !== "offline")) {
        // empties the channel-list - place here as we only want this to run once and not be caught in the forEach loop
        $(".channel-list").empty();
        channelsArr.forEach(function(channel) {
          callTwitchAPI(type, channel);
        });
      } else {
        updateHTML(undefined);
      }
      break;
    case "search":
            $(".channel-list").empty();
            
            callTwitchAPI(type, $('input[type="search"]').val());
      break;
  }
  mode = target;
}

function callTwitchAPI(type, query) {
  console.log(query);
  $.getJSON(
    "https://wind-bow.gomix.me/twitch-api/" +
      type +
      "/" +
      query +
      "?callback=?",
    function(response) {
      console.log(response);
      //call all data and hide with css rather than making a call with every click of a menu button and ignoring the items not relevant to the mode - online, offline, etc
      if (
        response.featured === undefined &&
        response._id === undefined &&
        response.stream === null
      ) {
        //call different twitch API method if channel is offline to get channel info
        callTwitchAPI("channels", query);
      } else {
        if (response !== undefined) {
          if (target == "featured") {
            response.featured.forEach(function(response) {
              updateHTML(createHTMLObj(response));
            });
          } else {
            updateHTML(createHTMLObj(response));
          }
        }
      }
    }
  );
}

//takes Twitch API response data and creates object to be passed to update HTML function
function createHTMLObj(channelData) {
  var htmlObj = {
    channelLink: "",
    streamLink: "",
    logoSrc: "",
    channelName: "",
    status: "",
    game: "",
    description: "",
    previewSrc: "",
    channelClasses: "",
  };
  var channel = channelData;
  if (channel.stream !== undefined) {
    channel = channelData.stream.channel;
    htmlObj.previewSrc = channelData.stream.preview.medium;
    htmlObj.streamLink = channelData.stream._links.self;
    htmlObj.status = "Online";
    htmlObj.channelClasses = "online-channel";
  } else {
    htmlObj.status = "Offline";
    htmlObj.channelClasses = "offline-channel";
  }
  htmlObj.channelLink = channel.url;
  htmlObj.logoSrc = channel.logo;
  htmlObj.channelName = channel.display_name;
  htmlObj.game = channel.game;
  htmlObj.description = channel.status;

  if (htmlObj.previewSrc === "") {
    htmlObj.previewSrc =
      "https://puregaming.es/wp-content/uploads/2017/02/maxresdefault-1-2-397x310_c.jpg";
  }
  if (htmlObj.logoSrc === null) {
    htmlObj.logoSrc =
      "https://puregaming.es/wp-content/uploads/2017/02/maxresdefault-1-2-397x310_c.jpg";
  }
  if (htmlObj.game === null) {
    htmlObj.game = "...";
  }
  if (htmlObj.description === null) {
    htmlObj.description = "";
  }
  return htmlObj;
}

//takes HTML object properties and populates HTML channel list
function updateHTML(htmlObj) {
  var scrollBarColor;
  if (htmlObj !== undefined && htmlObj.channelName !== undefined) {
    $(".channel-list").append(
      '<li class="channel-item ' +
        htmlObj.channelClasses +
        '"><img class="channel-logo" src="' +
        htmlObj.logoSrc +
        '"/><div><a target="_blank" href="' +
        htmlObj.channelLink +
        '"><h3>' +
        htmlObj.channelName +
        '</h3></a><span class="status">' +
        htmlObj.status +
        "</span><p>Game: " +
        htmlObj.game +
        "</p><p>" +
        htmlObj.description +
        '</p></div><a class="preview" href="' +
        htmlObj.streamLink +
        '"><img src="' +
        htmlObj.previewSrc +
        '"/></a></li>'
    );
  } else if (htmlObj.channelName == undefined) {
    $(".channel-list").append('<p>Sorry! No results were found for that user name<p>');
  }
  switch (target) {
    case "featured":
      $(".tv-screen > h2").html("Featured Live Streams");
      scrollBarColor = "#FFC300";
      $(".tv-screen").removeClass("all online offline").addClass("featured");
      break;
    case "all":
      $(".tv-screen > h2").html("All Favourite Streamers");
      scrollBarColor = "#2ABCE0";
      $(".tv-screen").removeClass("featured online offline").addClass("all");
      $(".channel-item").removeClass("hide");
      break;
    case "online":
      $(".tv-screen > h2").html("Live Favourite Streamers");
      scrollBarColor = "#94E661";
      $(".tv-screen").removeClass("featured all offline").addClass("online");
      $(".offline-channel").addClass("hide");
      $(".online-channel").removeClass("hide");
      break;
    case "offline":
      $(".tv-screen > h2").html("Offline Favourite Streamers");
      scrollBarColor = "#C65B7C";
      $(".tv-screen").removeClass("featured online all").addClass("offline");
      $(".online-channel").addClass("hide");
      $(".offline-channel").removeClass("hide");
      break;
    case "search":
      $(".tv-screen > h2").html("Search Results...");
  }
  //change colour of scrollbar using root CSS variable
  document.documentElement.style.setProperty(
    `--scrollbar_color`,
    scrollBarColor
  );
}

$(document).ready(function() {
  getChannelData("featured");
  $(".menu-item").click(getChannelData);
  
  $(".search-form").on("submit", function (e) {
    e.preventDefault();
    getChannelData(e);
  });
  
});
