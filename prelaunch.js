(function ($) {
    var screenHeight = getScreenHeight();
    var totalScrollHeight = screenHeight * numScenes;
    var numScenes = 5;
    var changedScene = false;
    var prevScene = 1;
    var debug = false;
    var prevTop = 0;
    var handling = false;
    var registering = false;

    log(screenHeight);
    log(numScenes);
    log(totalScrollHeight);

    var sectionHeight = totalScrollHeight;     
    $('.mobile-bottom').css('top', sectionHeight + 'px');

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
        recalc(sectionHeight);
    }, 300);    

    $('#pc-iframe').on("load",function(){  
        var screenHeight = getScreenHeight();    
        var totalScrollHeight = screenHeight * numScenes;

        var sectionHeight = totalScrollHeight;     
        $('.mobile-bottom').css('top', sectionHeight + 'px');
        recalc(sectionHeight);
    });

    $(document).ready(function() {
        scrollScene();
        initButtons();
    });

    $(window).scroll(function() {
        scrollScene();
    });

    function getScreenHeight() {
        return isMobile() ? $(window).height() : $(window).height() / 2;
    }

    function initButtons() {
        $('.markers .circle').click(function(e) {
            var i = $(this).data("index") - 1; 
            var start = i < 0 ? 0 : (screenHeight * i) + (screenHeight / 2);
            var body = $("html, body");
            body.stop().animate({ scrollTop: start }, 1000, 'swing');
        });

        $('.register-button').click(function(e) {
            e.stopPropagation();
            e.preventDefault();

            registering = true;
            $('.mobile-bottom').addClass('active');

            var top = $('.div-block-35').offset().top;
            console.log(top);
            var body = $("html, body");
            body.stop().animate({ scrollTop: top + 5 }, 1000, 'swing', function() {
                registering = false;
            });
        });

        $('.footer-arrow').click(function() {
            var body = $("html, body");
            body.stop().animate({ scrollTop: 0 }, 1000, 'swing');
        });
    }

    function recalc(sectionHeight) {
        $('.div-block-35').css('min-height', 'calc(100vh - ' + $('.footer-container').outerHeight(true) + 'px)');

        var mobileBottomHeight = $('.mobile-bottom').outerHeight(true);
        sectionHeight += mobileBottomHeight;

        $('.animation-section').css('height', sectionHeight + 'px');   
    }

    function replaceClass(element, source, target) {
        element.removeClass(source);
        element.addClass(target);
    }

    function isMobile() {
        return $(window).width() < 768;
    }

    function scrollScene() {
        var top = $(window).scrollTop();
        log(prevTop + " " + top);

        handleMobileScroll(top)

        var sceneIndex = 0;
        for (var i = 0; i < numScenes; i++) {
            var start = (screenHeight * i) + (screenHeight / 2);
            var end = start + (screenHeight / 2);
            log(top + " " + start + " " + end);
            if (top >= start && top <= end) {
                changedScene = true;
                sceneIndex = i + 1;
                break;
            } else if (top >= 0 && top < screenHeight / 2) {
                sceneIndex = 0;
                break;
            } else if (top >= end && i == numScenes - 1) {
                console.log('here');
                changedScene = true;
                sceneIndex = 4;

                if (isMobile()) {
                    $('.mobile-bottom').addClass('active');
                }
                break;
            } else {
                changedScene = false;
            }
        }

        changeScene(sceneIndex, changedScene);
        prevTop = top;
    }

    function handleMobileScroll(top) {
        if (!isMobile()) return;
        if (handling) return;

        if (top <= $('.mobile-bottom').offset().top - $(window).height() || top >= $('.mobile-bottom').offset().top) return; 

        if (prevTop < top) {
            if (!$('.mobile-bottom').hasClass('active')) {    
                handling = true;
                $('#main-grid').addClass('invisible');  
                $('.mobile-bottom').addClass('active');            
                $('body').css('overflow', 'hidden');

                var body = $("html, body");
                body.stop().animate({ scrollTop: $('.mobile-bottom').offset().top }, 750, 'swing');
                setTimeout(function() {
                    $('body').css('overflow', 'auto');
                    handling = false;
                }, 1500);
            }
        } else if (prevTop > top) {
            if ($('.mobile-bottom').hasClass('active')) {
                handling = true;
                $('#main-grid').removeClass('invisible');     
                $('.mobile-bottom').removeClass('active');

                var body = $("html, body");
                body.stop().animate({ scrollTop: $('.mobile-bottom').offset().top - $(window).height() }, 1000, 'swing');

                $('body').css('overflow', 'hidden');
                setTimeout(function() {
                    $('body').css('overflow', 'auto');
                    handling = false;
                }, 1500);
            }
        } 
    }

    function changeScene(scene, changedScene) {
        if (!changedScene) return;

        scene += 1;
        scene = scene > numScenes ? numScenes : scene;
        log(scene);

        if (prevScene) {
            $('.animation-section').removeClass('scene-' + prevScene);
        }

        $('.animation-section').addClass('scene-' + scene);
        $('.circle').removeClass('active');
        $('.marker-' + scene + '.circle').addClass('active');
        prevScene = scene;
    }

    function log(msg) {
        if (!debug) return;

        console.log(msg);
    }
})(jQuery)
