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

var currentHash = window.location.hash;
if(currentHash.length){
  $('[data-anchor]').addClass('is-hidden')
  $('[href="'+currentHash+'"]').parent().addClass('is-active')
  currentHash = currentHash.substring(1);
  $('[data-anchor="'+currentHash+'"]').removeClass('is-hidden')
}
$('.my-scrollbar').each(function(){

})
Scrollbar.init($('.my-scrollbar').get(0), {
  damping: 0.2
});
var content = Scrollbar.init($('.my-scrollbar').get(1), {
  damping: 0.2
});
$('.sidebar').on('click', function(){
  content.scrollTo(0,0 ,1000)
})
