
$(document).ready(function(){

//initialises scroll snapping with options using fullpage.js
$('#fullpage').fullpage({
    menu: '.nav-list',
    anchors: ['home', 'about', 'portfolio', 'contact'],
    recordHistory: false,
    lockAnchors: false,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Home', 'About', 'Portfolio', 'Contact'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
    bigSectionsDestination: 'top',
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    dragAndMove: false,
    fitToSection: true,
    fitToSectionDelay: 1000,
    scrollBar: true,
    scrollOverflow: false,
    scrollOverflowReset: false,
    scrollOverflowOptions: {scrollX: false, scrollY: true},
    scrollHorizontally: false,
    easing: 'easeInOutCubic',
    fadingEffect: false,
    responsiveWidth: 750,
    responsiveHeight: 400,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
    sectionSelector: 'section',
    verticalCentered: true
});



// func declaration for setting number of rows - awaiting fix from slick.js
function setNoSlideRows() {
    console.log('setting number of rows...');
    if ($(window).width() < 840 || $(window).height() < 700) {
        return 1;
    } else {
        return 2;
    }    
}

//func declaration for reinitializing slide carousel with new options - awaiting fix from slick.js
function reCalcSlideRows() {
    let newNoRows = setNoSlideRows();
    if(newNoRows == $('.slider').slick('slickGetOption', 'rows')) {        
        return;
    } else {
        $('.slider').slick('unslick');
        $('.slider').slick(setupSlideOptions(newNoRows));
    }
}

//setup slick options
function setupSlideOptions(rows) {
    let slideOptions = {
        rows: rows,
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
            breakpoint: 1600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
            {
                breakpoint: 840,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
]
  };
  return slideOptions;
}

//func declaration for init of the slider carousel using the slick library
function initSlick() {
      $('.slider').slick(setupSlideOptions(setNoSlideRows()));
}

// initialise Slick
initSlick();

//change rows in slide carousel on window resize
    let timer;
      $(window).resize(() => {
        clearTimeout(timer);

        timer = setTimeout(reCalcSlideRows, 1000);
        console.log('resizing...');
        
      });


// makes the forms labels appear and input background change when text is present
    $(".form-item").on("input propertychange",function(){
     let formField = $(this).attr('name');
      $("label[for="+formField+"]").toggleClass("label-visible",!! $(".form-item[name="+formField+"]").val());
      $(".form-item[name="+formField+"]").toggleClass("filled",!! $(".form-item[name="+formField+"]").val());
    });

// makes hamburger button expand the nav menu
    $(".menu-hamburger").on("click", function(){
       $(".nav-list").toggleClass("visible"); 
    });


//makes nav menu buttons move to header when not on home section
    $(".home-section").bind("DOMSubtreeModified", function(e) {
        if (!$(".home-section").hasClass("active")) {
        $("nav").removeClass("nav-home");
        } else {
        $("nav").addClass("nav-home"); 
        }
    });

    });