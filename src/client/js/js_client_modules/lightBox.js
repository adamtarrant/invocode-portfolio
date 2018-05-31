const util = require('./utilityFunctions.js');

// add active class for lightbox elements
export function openLightBox(e) {
    $.fn.fullpage.setAllowScrolling(false);
    util.applyClassToMultipleEls(["section"], "blur", "add");
    util.applyClassToMultipleEls([".lightbox-container", ".lightbox"], "active", "add");
    document.getElementById(e.target.getAttribute('for')).classList.remove("hide");
}

// remove active class to hide lightbox and add hide class to lightbox content
export function closeLightBox() {
    $.fn.fullpage.setAllowScrolling(true);
    document.querySelector(".lightbox").classList.add("closing");
    setTimeout(() => {
        util.applyClassToMultipleEls(["section"], "blur", "remove");
        util.applyClassToMultipleEls([".lightbox-content"], "hide", "add");
        util.applyClassToMultipleEls([".lightbox-container", ".lightbox"], "active", "remove");
        document.querySelector(".lightbox").classList.remove("closing");
    }, 300);
}