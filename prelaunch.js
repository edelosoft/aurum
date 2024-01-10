(function ($) {
    var screenHeight = $(window).height();
    var numScenes = 5;
    var totalScrollHeight = screenHeight * numScenes;
    var changedScene = false;
    var prevScene = 1;
    var debug = false;

    log(screenHeight);
    log(numScenes);
    log(totalScrollHeight);

    var sectionHeight = totalScrollHeight + (screenHeight /2);     
    if ($(window).width() < 768) {
    $('.mobile-bottom').css('top', sectionHeight + 'px');
        
    $('#first-grid .top-left .fourth').appendTo('.mobile-bottom');
    $('#second-grid .top-right .cell-image .fourth').appendTo('.mobile-bottom');      

    $('#first-grid .bottom-left .fifth').appendTo('.mobile-bottom');
    $('#first-grid .top-left .fifth').appendTo('.mobile-bottom');

    $('#second-grid .top-right .fifth').appendTo('.mobile-bottom');
    $('#second-grid .bottom-right .fifth').appendTo('.mobile-bottom');

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

    var mobileBottomHeight = $('.mobile-bottom').height();
    sectionHeight += mobileBottomHeight;
    }

    $('.section-2').css('height', sectionHeight + 'px');     

    $(document).ready(function() {
    scrollScene();
    });

    $(window).scroll(function() {
    scrollScene();
    });

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
        $('#main-grid').removeClass('scene-' + prevScene);
    }

    $('#main-grid').addClass('scene-' + scene);
    prevScene = scene;
    }

    function log(msg) {
    if (!debug) return;

    console.log(msg);
    }
})(jQuery)
