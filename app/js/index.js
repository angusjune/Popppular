var POP_URL = 'http://api.dribbble.com/shots/popular';
var perPage = 15;
var maxPage = 50;
var loading = false;
var lock = false;
var page = 0;
var d;
// var allShots = [];

var btnPin = $('.js-pin');
var btnQuit = $('.js-quit');
var btnRefresh = $('.js-refresh');
var btnPref = $('.js-preferences');

$(function() {

  addshots = setInterval(function() {

    if (960 - $('.edge').offset().top > $('.container').height()) {
      console.log('page: ' + page);

      page++;
      add(page, 'popular');

      if (page >= maxPage) {
        lockAdd();
        hideLoading();
      }
    }
  }, 500);

  var opened = false;

  // Toggle open
  quark.setClickAction(function() {
    console.log(opened);
    if (!opened) {
      opened = true;
    } else {
      opened = false;
    }
  });

  // Refresh every 30 min
  autorefresh = setInterval(function() {
    if (!opened && page <= 1) {
      refresh();
    }
  }, 1800000);

});

/*
 * Add shots to page
 * Currently using old Dribbble API and will be retired on May 20, 2015
 */
function add(page, from) {
  $('#images').data('page', page);
  var pageURL;

  // Execute only when it is not loading
  if (!loading && !lock) {
    if (from === 'popular') {
      pageURL = POP_URL;
    }

    var pages = pageURL + '?per_page=' + perPage + '&page=' + page;

    data = $.ajax({
      type: 'GET',
      url: pages,
      dataType: 'jsonp',
      success: function(data) {
        d = data; //For debugging
        createShots(data);
        console.log('Loading succeeded!');
      },
      beforeSend: function() {
        showLoading();
      },
      complete: function() {
        hideLoading();
      }
    });
  }

  function createShots(data) {
    if (data.shots.length > 0) {
      console.log(data.shots[0]);

      for (i = 0; i < data.shots.length; i++) {
        var id = data.shots[i].id;
        var url = data.shots[i].url;
        var largeImage = data.shots[i].image_url;
        var mediumImage = data.shots[i].image_400_url;
        var teaserImage = data.shots[i].image_teaser_url;

        // Get file type of the image
        extension = largeImage.replace(/^.*\./, '');
        imageType = 'teaser';

        // allShots.push(id);

        // imageType = $.cookie('imagetype');
        // if (!imageType) {
        //   imageType = 'large';
        // }

        // if (imageType == 'small') {
        //   var img1 = teaserImage;
        //   var img2 = largeImage;
        // } else {
        //   var img1 = largeImage;
        //   var img2 = teaserImage;
        // }

        if (!$('#id' + id).exists()) {

          var img = $('<img/>', {
            id: 'id' + id,
            src: teaserImage,
            class: 'shot-img'
          });

          var a = $('<div/>', {
              class: 'shot ' + imageType + ' ' + extension
            })
            .append(img)
            .appendTo('#images')
            .data('html-url', url)
            .data('large-image', largeImage)
            .data('ext', extension)
            .mouseenter(function() {
              if ($(this).data('ext') == 'gif') {

                var gifImg = $('<img/>', {
                  src: $(this).data('large-image'),
                  class: 'large-img'
                });

                $(this).append(gifImg);
              }

            })
            .mouseleave(function() {
              $(this).find('.large-img').remove();
            })
            .click(function() {
              quark.openURL($(this).data('html-url'));
            });
        }
      }
      // END OF LOOP

      if ((data.shots.length < perPage) || (page >= maxPage)) {
        lockAdd();
      }
    } else {
      lockAdd();
    }
  }
}

function lockAdd() {
  lock = true;
  $('#shotsEnd').fadeIn();
}

function unlockAdd() {
  lock = false;
  $('#shotsEnd').fadeOut();
}

function refresh() {
  $('#images').html('');
  page = 0;
  lock = false;
  hideLoading();
  unlockAdd();
}

function showLoading() {
  loading = true;
  $('#loading').css('bottom', 10).css('opacity', 0.8);
  btnRefresh.addClass('animate');
}

function hideLoading() {
  loading = false;
  $('#loading').css('bottom', 0).css('opacity', 0);
  btnRefresh.removeClass('animate');
}







$(function() {

  quark.debug = false;
  quark.setMenubarIcon('data:image/png;base64,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');
  quark.setMenubarHighlightedIcon('data:image/png;base64,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');
  quark.setLaunchAtLogin(false);

  btnPin.click(function(e) {
    e.preventDefault();
    if ($(this).hasClass('pinned')) {
      quark.unpin();
    } else {
      quark.pin();
    }

    $(this).toggleClass('pinned');
  });

  btnRefresh.click(function(e) {
    e.preventDefault();
    refresh();
  });

  btnPref.click(function(e) {
    quark.openPreferences();
  })

  btnQuit.click(function(e) {
    e.preventDefault();
    quark.quit();
  });

  quark.setupPreferences([{
    "label": "General",
    "identifier": "general",
    "icon": "NSPreferencesGeneral",
    "height": 192
  }]);

  quark.setSecondaryClickAction(function() {
    return false;
  });
});
