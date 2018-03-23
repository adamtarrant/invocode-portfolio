
$(document).ready(function(){
//initialises the slider carousel using the slick library
      $('.slider').slick({
        dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
  ]
      });
      
// makes the forms labels appear when text is present
    $(".form-item").on("input propertychange",function(){
     let formField = $(this).attr('name');
      $("label[for="+formField+"]").toggleClass("label-visible",!! $(".form-item[name="+formField+"]").val());
    });

// makes hamburger button expand the nav menu
    $(".menu-hamburger").on("click", function(){
       $(".nav-list").toggleClass("visible"); 
    });
    
    });