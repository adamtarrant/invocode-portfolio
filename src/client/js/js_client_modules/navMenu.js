const util = require('./utilityFunctions.js');

module.exports = {
//animation of menu opening and closing functions
    openNavMenu: function () {
        util.applyClassToMultipleEls(['.menu-list-item'], 'closed', 'remove');
        util.applyClassToMultipleEls(['.fa-list-ul'], 'x', 'add');
        util.applyClassToMultipleEls(['.fa-list-ul'], 'fa-list-ul', 'remove');
        util.applyClassToMultipleEls(['.menu-list-item'], 'opened', 'add');
        TweenLite.fromTo(".menu-list-item.open", 1, {
            rotation: 0
        }, {
            rotation: 1080
        });
        TweenLite.to(".menu-list-item.home", 1, {
            y: 30,
            ease: Elastic.easeOut.config(1.3, 1)
        });
        TweenLite.to(".menu-list-item.about", 1, {
            y: 60,
            ease: Elastic.easeOut.config(1.3, 1)
        });
        TweenLite.to(".menu-list-item.portfolio", 1.5, {
            y: 90,
            ease: Elastic.easeOut.config(1.3, 0.7)
        });
        TweenLite.to(".menu-list-item.contact", 2, {
            y: 120,
            ease: Elastic.easeOut.config(1.3, 0.6)
        });
    },
    closeNavMenu: function () {
        util.applyClassToMultipleEls(['.menu-list-item'], 'closed', 'add');
        util.applyClassToMultipleEls(['.x'], 'fa-list-ul', 'add');
        util.applyClassToMultipleEls(['.fa-list-ul'], 'x', 'remove');
        util.applyClassToMultipleEls(['.menu-list-item'], 'opened', 'remove');
        TweenLite.fromTo(".menu-list-item.open", 1, {
            rotation: 0
        }, {
            rotation: 720
        });
        TweenLite.to(".menu-list-item.home", 1, {
            y: -60,
            ease: Power4.easeOut
        });
        TweenLite.to(".menu-list-item.about", 1, {
            y: -128,
            ease: Power4.easeOut
        });
        TweenLite.to(".menu-list-item.portfolio", 1, {
            y: -192,
            ease: Power4.easeOut
        });
        TweenLite.to(".menu-list-item.contact", 1, {
            y: -256,
            ease: Power4.easeOut
        });
    }
};