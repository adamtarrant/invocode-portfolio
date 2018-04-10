// Developed by Adam Tarrant - 2018

window.$ = window.jQuery = require('jquery');
window.IScroll = require('iscroll/build/iscroll.js');
require('fullpage.js/vendors/scrolloverflow.js');
import 'fullpage.js/dist/jquery.fullpage.js';
import 'slick-carousel';
import TweenLite from 'gsap/TweenMax';
import 'gsap/CSSPlugin';
import 'gsap/EasePack';

import styles from '../scss/main.scss';

// func declaration for setting number of rows - awaiting fix from slick.js
function setNoSlideRows() {
    if ($(window).width() < 840 || $(window).height() < 750) {
        return 1;
    } else {
        return 2;
    }
}

//func declaration for reinitializing slide carousel with new options - awaiting fix from slick.js
function reCalcSlideRows() {
    let newNoRows = setNoSlideRows();
    if (newNoRows == $('.slider').slick('slickGetOption', 'rows')) {
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
                breakpoint: 1200,
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

// add active class for lightbox elements
function openLightBox(e) {
    applyClassToMultipleEls(["section"], "blur", "add");
    applyClassToMultipleEls([".lightbox-container", ".lightbox"], "active", "add");
    document.getElementById(e.target.getAttribute('for')).classList.remove("hide");
}

// remove active class to hide lightbox and add hide class to lightbox content
function closeLightBox() {
    document.querySelector(".lightbox").classList.add("closing");
    setTimeout(() => {
        applyClassToMultipleEls(["section"], "blur", "remove");
        applyClassToMultipleEls([".lightbox-content"], "hide", "add");
        applyClassToMultipleEls([".lightbox-container", ".lightbox"], "active", "remove");
        document.querySelector(".lightbox").classList.remove("closing");
    }, 300);
}

    //animation of menu opening and closing functions
function openNavMenu(){
        applyClassToMultipleEls(['.menu-list-item'], 'closed', 'remove');
        applyClassToMultipleEls(['.fa-list-ul'], 'x', 'add');
        applyClassToMultipleEls(['.fa-list-ul'], 'fa-list-ul', 'remove');
        applyClassToMultipleEls(['.menu-list-item'], 'opened', 'add');
        TweenLite.fromTo(".menu-list-item.open", 1, {rotation:0}, {rotation:1080});
        TweenLite.to(".menu-list-item.home", 1, {y:30, ease: Elastic.easeOut.config(1.3, 1)});
        TweenLite.to(".menu-list-item.about", 1, {y:60, ease: Elastic.easeOut.config(1.3, 1)});
        TweenLite.to(".menu-list-item.portfolio", 1.5, {y:90, ease: Elastic.easeOut.config(1.3, 0.7)});
        TweenLite.to(".menu-list-item.contact", 2, {y:120, ease: Elastic.easeOut.config(1.3, 0.6)});
}
function closeNavMenu() {
        applyClassToMultipleEls(['.menu-list-item'], 'closed', 'add');
        applyClassToMultipleEls(['.x'], 'fa-list-ul', 'add');
        applyClassToMultipleEls(['.fa-list-ul'], 'x', 'remove');
        applyClassToMultipleEls(['.menu-list-item'], 'opened', 'remove');
        TweenLite.fromTo(".menu-list-item.open", 1, {rotation: 0}, {rotation:720});
        TweenLite.to(".menu-list-item.home", 1, {y:-60, ease: Power4.easeOut});
        TweenLite.to(".menu-list-item.about", 1, {y:-120, ease: Power4.easeOut});
        TweenLite.to(".menu-list-item.portfolio", 1, {y:-180, ease: Power4.easeOut});
        TweenLite.to(".menu-list-item.contact", 1, {y:-240, ease: Power4.easeOut});
}

//Utility function for adding/removing a class to multiple selectors and elements
function applyClassToMultipleEls(selectors, className, action) {
    if (!selectors) return;
    let nodeListArr = [];
    selectors.forEach(selector => {
        nodeListArr.push(document.querySelectorAll(selector));
    });
    nodeListArr.forEach(nodeList => {
        nodeList.forEach(el => {
            el["classList"][action](className);
        });
    });
}

//Utility function for adding event listener to all elements in selector
function superAddEventListener(selector, event, handler) {
    if (!selector) return;
    let elements = document.querySelectorAll(selector);
    if (elements.tagName) {
        elements = [elements];
    }
    elements.forEach(el => {
        el.addEventListener(event, handler);
    });
}

$(document).ready(function () {

    //initialises scroll snapping with options using fullpage.js
    $('#fullpage').fullpage({
        menu: '.menu-list',
        anchors: ['home', 'about', 'portfolio', 'contact'],
        recordHistory: false,
        lockAnchors: true,
        navigation: true,
        navigationPosition: 'left',
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
        fitToSectionDelay: 500,
        scrollBar: false,
        scrollOverflow: true,
        scrollOverflowOptions: {
            scrollX: false,
            scrollY: true
        },
        scrollHorizontally: false,
        easingcss3: 'ease-in',
        fadingEffect: false,
        responsiveWidth: 670,
        responsiveHeight: 500,
        responsiveSlides: false,
        sectionSelector: 'section',
        verticalCentered: true
    });

    // initialise Slick
    initSlick();

    //change rows and other options in slide carousel on window resize
    let scrollTimer;
    $(window).resize(() => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(reCalcSlideRows, 1000);
    });

    //initialise mutation observer - callback includes animatons for logo and skills list
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(mutationRecord => {
            let targetClass = mutationRecord.target.classList[0];
            if (!$("." + targetClass).hasClass("active")) {
                if (targetClass == "home-section") {
                    $(".logo").addClass("cornered");
                }
            } else {
                if (targetClass == "home-section") {
                    setTimeout(() => {
                        $(".logo").removeClass("cornered");
                    }, 500);
                } else if (targetClass == "about-section") {
                    $(".about-upper").addClass("show");
                    for (let i = 0; i < $(".skills-grid-item").length; i++) {
                        let delay = i * 100;
                        setTimeout(() => {
                            $(".skills-grid-item:nth-child(" + (i + 1) + ")").addClass("show");
                        }, delay);
                    }
                }
            }
        });
    });

    const observerConfig = { attributes: true, attributeFilter: ['class'], childList: false, characterData: false };
    //logo shrink to corner - listening to changes on home sectoin
    observer.observe($(".home-section")[0], observerConfig);
    //animation of skills list
    observer.observe($(".about-section")[0], observerConfig);


    //home down button event listener and handler
    document.querySelector(".down-btn").addEventListener("click", () => {
        $.fn.fullpage.moveSectionDown();
    });

    document.querySelector("a.menu-btn.open").addEventListener("click", () => {
        if (/\bopened\b/.test(document.querySelector(".menu-list-item").className)) {
            closeNavMenu();
            } else {
            openNavMenu();
            }
    });

    //menu anchor scrolls
    superAddEventListener(".nav-btn", "click", function (e) {
        let targetSection = e.target.attributes.dataanchor.value;
            $.fn.fullpage.moveTo(targetSection);
        closeNavMenu();
   });

    //make lightbox appear at correct portfolio item event listener - using vanilla JS
    superAddEventListener(".open-lightbox-btn", "click", openLightBox);

    //close lightbox event listener
    document.querySelector(".close-btn").addEventListener("click", (e) => {
        closeLightBox();
    });

    //focus on form to hire me click event listener and handler
    document.querySelector(".hire-btn").addEventListener("click", (e) => {
        document.querySelector('input[name="name"]').focus();
    });

    //add event listener on submit confirmation notification so that it closes on clicking of cross
    document.querySelector(".submit-confirm").addEventListener("click", () => {
        document.querySelector(".submit-confirm").classList.remove("show","success","failure");
    });

    //send message to API and display confirmation to user
    document.querySelector("#contact-form").addEventListener("submit", (e) => {
        e.preventDefault();
        let formObj = {
            name: e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
            message: e.target[3].value
        };
        console.log(formObj);
        
        fetch('/form_post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(formObj)
        }).then((response) => {
                return response.text();
            }).then((data) => {
                console.log(data == 'message received');
                let result;
                if (data == 'message received') {
                    result = 'success';
                } else {
                    result = 'failure';
                }

                    document.querySelector(".submit-confirm").classList.add("show", result);
                    setTimeout(() => {
                        document.querySelector(".submit-confirm").classList.remove("show", result); 
                    }, 10000);
                
            }).catch(err => {
                console.log(err.stack);
                
            });
        });

    // makes the forms labels appear and input background change when text is present
    $(".form-item").on("input propertychange", function () {
        let formField = $(this).attr('name');
        $("label[for=" + formField + "]").toggleClass("label-visible", !!$(".form-item[name=" + formField + "]").val());
        $(".form-item[name=" + formField + "]").toggleClass("filled", !!$(".form-item[name=" + formField + "]").val());
    });
});