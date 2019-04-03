// console.log($('.filter a'))
$('.filter a').on('click', function(e){
  e.preventDefault();
  var hash = $(this).attr('href');
   window.location.hash = hash
  $('[data-anchor]').addClass('is-hidden')
  hash = hash.substring(1);
  $('[data-anchor="'+hash+'"]').removeClass('is-hidden')
  $('.filter a').parent().removeClass('is-active')
  $(this).parent().addClass('is-active')
})