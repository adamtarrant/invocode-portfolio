
module.exports = {
    // func declaration for setting number of rows - awaiting fix from slick.js
    setNoSlideRows: function () {
        if ($(window).width() < 840 || $(window).height() < 750) {
            return 1;
        } else {
            return 2;
        }
    },
    //func declaration for reinitializing slide carousel with new options - awaiting fix from slick.js
    reCalcSlideRows: function () {
        let newNoRows = this.setNoSlideRows();
        if (newNoRows == $('.slider').slick('slickGetOption', 'rows')) {
            return;
        } else {
            $('.slider').slick('unslick');
            $('.slider').slick(this.setupSlideOptions(newNoRows));
        }
    },
    //setup slick options
    setupSlideOptions: function (rows) {
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
    },
    //func declaration for init of the slider carousel using the slick library
    initSlick: function () {
        $('.slider').slick(this.setupSlideOptions(this.setNoSlideRows()));
    }
};