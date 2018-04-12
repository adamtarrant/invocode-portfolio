import styles from '../less/oldportfolio.less';

$(document).ready(function() {
    // makes the forms labels appear when text is present
    $(".form-item").on("input propertychange",function(){
     var formField = $(this).attr('name');
      $("label[for="+formField+"]").toggleClass("label-visible",!! $(".form-item[name="+formField+"]").val());
    });
    
    // makes navbar collapse when clicked on and moves main container back up
    $("#mainNavbar").on("click",function(){
      $("#mainNavbar").collapse("hide");
      $("#main-container").removeClass("push-down");
    });
    
    // makes main container move with expanding navbar downwards
    $(".navbar-toggle").click(function(){
        $("#main-container").toggleClass("push-down", ! $("#mainNavbar").hasClass("in"))
    });
    
    // jQuery for page scrolling feature - requires jQuery Easing plugin
$("body").on("click", "a.scrollable", function(event) {
  var anchor = $(this);
  $("html,body").stop().animate({scrollTop: $(anchor.attr("href")).offset().top -120},1500,"easeOutExpo");
  event.preventDefault();
  });
    });