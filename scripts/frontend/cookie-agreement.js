(function() {
  var cookieAgreement = window.Cookies('cookie-agreement');

  if(!cookieAgreement) {
    $('#cookie-nav').removeClass('d-none');
  }

  $('#cookie-btn')
    .on('click', function() {
      window.Cookies('cookie-agreement', 'true', { expires: 364 });
      $('#cookie-nav').addClass('d-none');
    });
})();