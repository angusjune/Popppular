$(function() {
  $("#app-version")
  .html(quark.appVersion)
  .click(function() {
    $(this).toggleClass('pink');
    if (!quark.debug) {
      quark.debug = true;
    } else {
      quark.debug = false;
    }
  });

  if (1 == localStorage.getItem('startAtLogin')) {
    $('#startAtLogin').prop( 'checked', true);
  } else {
    $('#startAtLogin').prop( 'checked', false);
  }


  $('#startAtLogin').change(function() {
    console.log($(this).is(':checked'));
    if ($(this).is(':checked')) {
      quark.setLaunchAtLogin(true);
      localStorage.setItem('startAtLogin', 1);
    } else {
      quark.setLaunchAtLogin(false);
      localStorage.setItem('startAtLogin', 0);
    }
  });

  // $('#checkUpdate').click(function() {
  //   quark.checkUpdate('https://rawgit.com/angusjune/popppular/master/updater/Appcast.xml');
  // });

});
