// Developed by Adam Tarrant - 2018

//Node module imports
require('core-js/fn/array/from');
window.$ = window.jQuery = require('jquery');
window.IScroll = require('iscroll/build/iscroll.js');
require('fullpage.js/vendors/scrolloverflow.js');
import 'fullpage.js/dist/jquery.fullpage.js';
import 'slick-carousel';
import 'gsap/TweenLite';
import 'gsap/CSSPlugin';
import 'gsap/EasePack';

//Custom JS module imports
const slickInit = require('./js_client_modules/slickInit.js');
const lightBox = require('./js_client_modules/lightBox.js');
const util = require('./js_client_modules/utilityFunctions.js');
const navMenu = require('./js_client_modules/navMenu.js');

import styles from '../scss/main.scss';



document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        setTimeout(() => {
            //initialises scroll snapping with options using fullpage.js
            //inside the document onreadstatechange complete timeout so that users cannot scroll before page is fully loaded
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
                scrollOverflow: $(window).width() > 670,
                scrollOverflowOptions: {
                    scrollX: false,
                    scrollY: true,
                    disablePointer: true,
                    click: false,
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
            TweenLite.to(".loader", 1, {
                y: -1000,
                opacity: 0,
                onComplete: () => {
                    document.querySelector(".loader").style.display = "none";
                }
            });
        }, 2000);
    }
}

$(document).ready(function () {
    // initialise Slick
    slickInit.initSlick();

    //change rows and other options in slide carousel on window resize
    let scrollTimer;
    $(window).resize(() => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(slickInit.reCalcSlideRows.call(slickInit), 1000);
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
                        if (document.querySelector('.home-section').classList.contains('active')) {
                            $(".logo").removeClass("cornered");
                        }
                    }, 400);
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

    const observerConfig = {
        attributes: true,
        attributeFilter: ['class'],
        childList: false,
        characterData: false
    };
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
            navMenu.closeNavMenu();
        } else {
            navMenu.openNavMenu();
        }
    });

    //menu anchor scrolls
    util.superAddEventListener(".nav-btn", "click", function (e) {
        let targetSection = e.target.attributes.dataanchor.value;
        $.fn.fullpage.moveTo(targetSection);
        navMenu.closeNavMenu();
    });

    //Logo link to home
    document.querySelector(".logo").addEventListener("click", (e) => {
        $.fn.fullpage.moveTo("home");
    });

    //make lightbox appear at correct portfolio item event listener - using vanilla JS
    util.superAddEventListener(".open-lightbox-btn", "click", lightBox.openLightBox);

    //close lightbox event listener
    document.querySelector(".close-btn").addEventListener("click", (e) => {
        lightBox.closeLightBox();
    });

    //focus on form to hire me click event listener and handler
    document.querySelector(".hire-btn").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('input[name="name"]').focus();
    });

    //add event listener on submit confirmation notification so that it closes on clicking of cross
    document.querySelector(".submit-confirm").addEventListener("click", () => {
        document.querySelector(".submit-confirm").classList.remove("show", "success", "failure");
    });

    //Set custom validation on email field

    document.querySelector('input[name="email"]').addEventListener('input', e => {
        let email = document.querySelector('input[name="email"]');

        if (email.validity.patternMismatch) {
            email.setCustomValidity("Please provide a valid email address");
        } else {
            email.setCustomValidity("");
        }

    });

    //send message to API and display pending spinner and confirmation/failure message to user
    document.querySelector("#contact-form").addEventListener("submit", (e) => {
        e.preventDefault();
        document.querySelector(".contact-button").classList.add("sending");
        let formObj = {
            name: e.target[0].value,
            email: e.target[1].value,
            message: e.target[2].value
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
            //console.log(data);
            let result;
            if (data == 'message received') {
                result = 'success';
            } else {
                result = 'failure';
            }
            document.querySelector(".contact-button").classList.remove("sending");
            document.querySelector(".submit-confirm").classList.add("show", result);
            setTimeout(() => {
                document.querySelector(".submit-confirm").classList.remove("show", result);
            }, 15000);

        }).catch(err => {
            //console.log(err.stack);

        });
    }, );

    // makes the forms labels appear and input background change when text is present
    $(".form-item").on("input propertychange", function () {
        let formField = $(this).attr('name');
        $("label[for=" + formField + "]").toggleClass("label-visible", !!$(".form-item[name=" + formField + "]").val());
        $(".form-item[name=" + formField + "]").toggleClass("filled", !!$(".form-item[name=" + formField + "]").val());
    });
});