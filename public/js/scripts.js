
$(document).ready(function(){

//initialises scroll snapping with options

$('#fullpage').fullpage({
    menu: '#menu',
    lockAnchors: false,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Home', 'About', 'Portfolio', 'Contact'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 1000,
    scrollBar: true,
    easing: 'easeInOutCubic',
    paddingTop: '3em',
    paddingBottom: '10px',
    fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
    sectionSelector: 'section',
});

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