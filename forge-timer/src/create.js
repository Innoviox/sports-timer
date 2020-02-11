/**
 * Reduce an array to milliseconds
 * @param arr
 * @returns {number | any | BigInt | T}
 */
const reduceToMs = (arr) => arr.map((e, idx) => e * [3600000, 60000, 1000, 10][idx]).reduce((a, b) => a + b);


$(document).ready(() => {
    // const { unwrapGrid, forceGridAnimation } = animateCSSGrid.wrapGrid(document.querySelector('#create-form'), {duration : 600});

    $("#direction-select").change((e) => {
        switch ($("#direction-select").val()) {
            case "Stopwatch": {
                $("#amount-container").hide();
                $('#direction-select').css('grid-column', '1 / 3');
                $('#submit-button').css('grid-column', '3 / 5');
                // forceGridAnimation();
                break;
            }
            case "Timer": {
                $("#amount-container").show();
                $('#direction-select').css('grid-column', '1 / 1');
                $('#submit-button').css('grid-column', '5 / 5');
                // forceGridAnimation();
                break;
            }
            default: break;
        }
    });

    //Form on 'Timer' page
    $("#create-form").on('submit', (e) => {
        e.preventDefault();
        direction = $("#direction-select").val();
        amount = $(".amount").map(function() { // get user time input
            let v = parseInt(this.value);
            if (isNaN(v)) {
                return 0;
            }
            return v
        }).get();
        if (direction === "Stopwatch") { amount = [0, 0, 0, 0]; }
        // represent amount as milliseconds
        total = reduceToMs(amount);
        reset();
    });
          
    $("#create-custom-form").on('submit', (e) => {
        e.preventDefault();
    });

    $("#type-select").change(() => {
              if ($("#type-select").val() === "Football") {
                  $("#user-text").val("# Football\n" +
                      "1. 1st Quarter - down 15:00\n" +
                      "2. 2nd Quarter - down 15:00\n" +
                      "3. 3rd Quarter - down 15:00\n" +
                      "4. 4th Quarter - down 15:00");
              }
          });
      });

$(function () {
  'use strict';

  var $swipeTabsContainer = $('.swipe-tabs'),
      $swipeTabs = $('.swipe-tab'),
      $swipeTabsContentContainer = $('.swipe-tabs-container'),
      currentIndex = 0,
      activeTabClassName = 'active-tab';

  $swipeTabsContainer.on('init', function(event, slick) {
      $swipeTabsContentContainer.removeClass('invisible');
      $swipeTabsContainer.removeClass('invisible');

      currentIndex = slick.getCurrent();
      $swipeTabs.removeClass(activeTabClassName);
      $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
  });

  $swipeTabsContainer.slick({
      //slidesToShow: 3.25,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      swipeToSlide: true,
      touchThreshold: 10
  });

  $swipeTabsContentContainer.slick({
      asNavFor: $swipeTabsContainer,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: false,
      swipeToSlide: true,
      draggable: false,
      touchThreshold: 10
  });


  $swipeTabs.on('click', function(event) {
      // gets index of clicked tab
      currentIndex = $(this).data('slick-index');
      $swipeTabs.removeClass(activeTabClassName);
      $('.swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTabClassName);
      $swipeTabsContainer.slick('slickGoTo', currentIndex);
      $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
  });

  //initializes slick navigation tabs swipe handler
  $swipeTabsContentContainer.on('swipe', function(event, slick, direction) {
      currentIndex = $(this).slick('slickCurrentSlide');
      $swipeTabs.removeClass(activeTabClassName);
      $('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
  });
});

