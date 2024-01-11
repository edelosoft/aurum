(function ($) {
    var screenHeight = $(window).height();    
    var totalScrollHeight = screenHeight * numScenes;
    var numScenes = 5;
    var changedScene = false;
    var prevScene = 1;
    var debug = false;

    log(screenHeight);
    log(numScenes);
    log(totalScrollHeight);

    var sectionHeight = totalScrollHeight + (screenHeight /2);     
    $('.mobile-bottom').css('top', sectionHeight + 'px');

    if ($(window).width() < 768) {
        $('#first-grid .top-left .fourth').appendTo('.mobile-bottom');
        $('#second-grid .top-right .cell-image .fourth').appendTo('.mobile-bottom');      

        $('#first-grid .bottom-left .fifth').appendTo('.mobile-bottom');
        $('#first-grid .top-left .fifth').appendTo('.mobile-bottom');

        $('#second-grid .top-right .fifth').appendTo('.mobile-bottom');
        $('#second-grid .bottom-right .fifth').appendTo('.mobile-bottom');

        $('.div-block-20').appendTo('.mobile-bottom .fourth');

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
    }

    $('.footer-wrapper').appendTo('.mobile-bottom');
    $('.footer').remove();

    setTimeout(function() {        
        recalc(sectionHeight);
    }, 300);    

    $('#pc-iframe').on("load",function(){
        console.log('here');
        var screenHeight = $(window).height();    
        var totalScrollHeight = screenHeight * numScenes;

        var sectionHeight = totalScrollHeight + (screenHeight /2);     
        $('.mobile-bottom').css('top', sectionHeight + 'px');

        recalc(sectionHeight);
    });

    $(document).ready(function() {
        scrollScene();
    });

    $(window).scroll(function() {
        scrollScene();
    });

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
        log(top);

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
                changedScene = true;
                sceneIndex = 4;
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
        prevScene = scene;
    }

    function log(msg) {
        if (!debug) return;

        console.log(msg);
    }
})(jQuery)
