(function ($) {
    var screenHeight = getScreenHeight();
    var totalScrollHeight = screenHeight * numScenes;
    var numScenes = isMobile() ? 6 : 5;
    var prevScene = 1;
    var debug = false;
    var prevResult = null;
    var currScene = 1;
    var prevScene = 1;
    var mobileBottomHeight = 0;
    var touchstartY = 0;
    var touchendY = 0;
    var touchmoveY = 0;
    var hasMobileTouch = false;

    log(screenHeight);
    log(numScenes);
    log(totalScrollHeight);

    if ($(window).width() < 768) {
        $('#first-grid .top-left .fourth').appendTo('.mobile-bottom');
        $('#second-grid .top-right .cell-image .fourth').appendTo('.mobile-bottom');      

        $('#first-grid .bottom-left .fifth').appendTo('.mobile-bottom');
        $('#first-grid .top-left .fifth').appendTo('.mobile-bottom');

        $('#second-grid .top-right .fifth').appendTo('.mobile-bottom');
        $('#second-grid .bottom-right .fifth').appendTo('.mobile-bottom');

        $('.div-block-20').appendTo('.mobile-bottom .fourth:not(.image-holder)');

        var serene = $('#first-grid .top-left .third');
        replaceClass(serene, 'third', 'fourth');
        serene.appendTo('#second-grid .top-right .cell-image');

        $('.div-block-11.cell-image').remove('.first');
        var img = $('#first-grid .top-left .second');
        replaceClass(img, 'second', 'first')
        img.appendTo('.div-block-11.cell-image');

        $('#second-grid .bottom-right .first').remove();
        $('#second-grid .top-right .third').remove();

        var carousel = $('#second-grid .bottom-right .third');
        replaceClass(carousel, 'third', 'fifth')

        var spaces = $('#second-grid .bottom-right .second');
        replaceClass(spaces, 'second', 'third');

        img = $('#second-grid .top-right .second');
        replaceClass(img, 'second', 'first');
        img.appendTo('#second-grid .bottom-right .slides-container');        

        $('.footer-wrapper').appendTo('.mobile-bottom');
        $('.footer').remove();
    }

    setTimeout(function() {        
        recalc();
    }, 300);    

    $('#pc-iframe').on("load",function(){  
        $('.mobile-bottom').css('top', getScreenHeight() + 'px');
        mobileBottomHeight = $('.mobile-bottom').outerHeight(true);
    });

    var lethargy = new Lethargy();

    // Define the function to run on mousewheel
    var checkScroll = function (e) {
        // e.preventDefault()
        // e.stopPropagation();

        // Lethargy.check() must only be called once per mouse event
        // If you need to use the result in more than one place
        // you MUST store it as a variable and use that variable instead
        // See https://github.com/d4nyll/lethargy/issues/5
        var result = lethargy.check(e);
        log(result);

        // false means it's not a scroll intent, 1 or -1 means it is
        // console.log(result);
        if (result !== false && prevResult != result) {            
            var direction = result === -1 ? 'down' : 'up';
            scrollScene(direction);
        }

        prevResult = result;
    };   
   
    if ('ontouchstart' in document.documentElement) {
        hasMobileTouch = true;
        $('body').addClass('touch-lock');

        window.addEventListener('touchstart', e => {
            touchstartY = e.changedTouches[0].screenY;
            // console.log('touch start');
        })
        
        window.addEventListener('touchend', e => {
            touchendY = e.changedTouches[0].screenY;

            if (currScene == 6 && isMobile() && $(window).scrollTop() >= $('.mobile-bottom').offset().top + 200) {
                return;
            }
            // console.log('touch end');
            checkDirection()
        })
    }

    // Cross-browser way to bind to mouse events
    addEvent(window, 'mousewheel', checkScroll);
    addEvent(window, 'DOMMouseScroll', checkScroll);
    addEvent(window, 'wheel', checkScroll);
    addEvent(window, 'MozMousePixelScroll', checkScroll); 

    function checkDirection() {
        if (touchendY < touchstartY) {
            scrollScene('down');
        }

        if (touchendY > touchstartY) {                
            scrollScene('up');
        }
    }

    function addEvent(el, eventType, handler) {
        if (el.addEventListener) { // DOM Level 2 browsers
            el.addEventListener(eventType, handler, false);
        } else if (el.attachEvent) { // IE <= 8
            el.attachEvent('on' + eventType, handler);
        } else { // ancient browsers
            el['on' + eventType] = handler;
        }
    };

    function scrollScene(direction, skip) {
        skip = skip || false;
        var screenBottom = $(window).scrollTop() + $(window).height();
        if (screenBottom >= $('.footer-wrapper').offset().top && !skip) {
            return;
        }

        if (currScene != numScenes && direction == 'down') {
            currScene++;
        } else if (currScene != 1 && direction == 'up') {
            currScene--;
        }

        if (currScene != numScenes) {
            $(window).scrollTop(0);            
        }
                
        if (prevScene && prevScene != currScene) {
            $('.animation-section').removeClass('scene-' + prevScene);
            recalc();
        }

        handleMobileScroll();

        $('.animation-section').addClass('scene-' + currScene);
        $('.circle').removeClass('active');
        $('.marker-' + currScene + '.circle').addClass('active');

        prevScene = currScene;
    }

    function handleMobileScroll() {
        if (!isMobile()) {            
            if (currScene == 5) {
                $('body').removeClass('touch-lock');    
            }            
        } else if (currScene < 6 && !$('body').hasClass('touch-lock') && hasMobileTouch) {
            $('body').addClass('touch-lock');            
        }

        if (currScene != 6 || $('.animation-section').hasClass('scene-6')) {
            return;
        }

        $(window).scrollTop(0);
        $('body').removeClass('touch-lock');
        $('.mobile-bottom').addClass('fixed');
        $('html, body').css('overflow', 'hidden');
        setTimeout(function() {
            $(window).scrollTop(0);
            $('html, body').css('overflow', '');
            $('.mobile-bottom').removeClass('fixed');
        }, 1500);

        $('.animation-section').css('height', mobileBottomHeight + 'px');
    }

    $(document).ready(function() {
        $(window).scrollTop(0);
        initButtons();
    });

    function getTotalScrollHeight() {
        var factor = currScene == 5 && !isMobile() ? 1.1 : 2 ;
        return getScreenHeight() * numScenes * factor;
    }

    function getScreenHeight() {
        return  $(window).height();
    }

    function initButtons() {
        $('.markers .circle').click(function(e) {
            currScene = $(this).data("index");
            scrollScene('down');
        });

        $('.register-button').click(function(e) {
            e.stopPropagation();
            e.preventDefault();

            currScene = isMobile() ? 6 : 5;
            scrollScene('down');

            if (isMobile()) {
                setTimeout(function() {
                    scrollToForm();
                }, 1600);
            } else {
                scrollToForm();
            }
        });

        $('.footer-arrow').click(function() {
            currScene = 0;
            scrollScene('down', true);
            $(window).scrollTop(0);
        });
    }

    function scrollToForm() {
        var top = $('.div-block-35').offset().top;
        var body = $("html, body");
        body.stop().animate({ scrollTop: top + 5 }, 1000, 'swing');
    }

    function recalc() {
        var sectionHeight = getTotalScrollHeight();
        $('.div-block-35').css('min-height', 'calc(100vh - ' + $('.footer-container').outerHeight(true) + 'px)');
        $('.animation-section').css('height', sectionHeight + 'px');   
    }

    function replaceClass(element, source, target) {
        element.removeClass(source);
        element.addClass(target);
    }

    function isMobile() {
        return $(window).width() < 768;
    }

    function log(msg) {
        if (!debug) return;

        console.log(msg);
    }
})(jQuery)
