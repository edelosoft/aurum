(function ($) {
    var screenHeight = $(window).width() >= 768 ? $(window).height() / 2 : $(window).height();    
    var totalScrollHeight = screenHeight * numScenes;
    var numScenes = 5;
    var changedScene = false;
    var prevScene = 1;
    var debug = true;

    log(screenHeight);
    log(numScenes);
    log(totalScrollHeight);

    var sectionHeight = totalScrollHeight + screenHeight;     
    $('.mobile-bottom').css('top', sectionHeight + 'px');

    rearrangeMobile();

    setTimeout(function() {        
        recalc(sectionHeight);
    }, 300);    

    $('#pc-iframe').on("load",function(){  
        var screenHeight = $(window).width() >= 768 ? $(window).height() / 2 : $(window).height();    
        var totalScrollHeight = screenHeight * numScenes;

        var sectionHeight = totalScrollHeight + screenHeight;     
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

    function createSixthScene() {
        $('.top-left .cell-container').append('<div class="sixth"></div>');

        var sixth = '.top-left .sixth';

        $('#first-grid .top-left .fourth').appendTo(sixth);
        $('#second-grid .top-right .cell-image .fourth').appendTo(sixth);      

        $('#first-grid .bottom-left .fifth.image-holder').appendTo(sixth);
        $('#first-grid .top-left .fifth.content-block').appendTo(sixth);

        $('#second-grid .top-right .fifth').appendTo(sixth);
        $('#second-grid .bottom-right .fifth').appendTo(sixth);

        $('.div-block-20').appendTo(sixth + ' .fourth:not(.image-holder)');

        $('.sixth').scroll(function() {
            var top = $('.sixth').scrollTop();
            if (top == 0) {                
                var start = (screenHeight * 4) + ($(window).height() / 2);
                var body = $("html, body");
                body.scrollTop(start);
            }
        })
    }

    function rearrangeMobile() {
        if ($(window).width() >= 768) return;

        numScenes = 6;
        totalScrollHeight = screenHeight * numScenes;

        createSixthScene();

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

        // $('.mobile-bottom').remove();
        $('.footer-wrapper').appendTo('.sixth');
        $('.footer').remove();
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

            var top = $('.div-block-35').offset().top;
            var body = $("html, body");
            body.stop().animate({ scrollTop: top }, 1000, 'swing');
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

    function scrollScene() {
        var top = $(window).scrollTop();
        log("num: " + numScenes);

        var sceneIndex = 0;
        for (var i = 0; i < numScenes; i++) {
            var start = (screenHeight * i) + 100;
            var end = start + (screenHeight / 2);
            log(top + " " + start + " " + end + " " + i);
            if (top >= start && top <= end) {
                changedScene = true;
                sceneIndex = i + 1;
                break;
            } else if (top >= 0 && top < screenHeight / 2) {
                sceneIndex = 0;
                break;
            } else if (top >= end && i == numScenes - 1) {    
                changedScene = true;
                sceneIndex = numScenes - 1;
                break;
            } else {
                changedScene = false;
            }
        }

        changeScene(sceneIndex, changedScene);
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
