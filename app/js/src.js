var _ = require('lodash'); 
var Hammer = require('./hammer.min.js');


// var $ = require('jquery');
var menuOpener = document.querySelector('.menu-opener');
var body = document.querySelector('body');
var mobileMenu = document.querySelector('.header__menu');
var headerShadow = document.querySelector('.header__shadow');
var header = document.querySelector('.header');
var footer = document.querySelector('.footer');
var multiples = document.querySelectorAll('[multiple]')
var lastScrollTop = 0;
var timeToToggleMenu = 500;
var currentTeamTranslate = 0;
var controlls = document.querySelectorAll('.team__next-prev div');
var up = document.querySelector('.up');
var formFooter = document.querySelector('.footer .form');
formFooter.addEventListener('submit', function(event){
  event.preventDefault();
  console.log('here put your fetch query');
  var inputWraps =  formFooter.querySelectorAll('.form__input');
  [].forEach.call(inputWraps, function(item){
    item.classList.remove('is-error');
  });
  formFooter.querySelector('[type="submit"]').classList.add('is-done')
});
console.log(Scrollbar)

var scrollbar = Scrollbar.init(document.querySelector('.smooth-scroll'), {
  duration: 10000,
  damping : .08,
  thumbMinSize: 0
});
function scrollReaction(pos, end){
  var st = pos; 
  var pageEnd = end;

  if($('.end-of-page').length){
    var pageEnd = $('.end-of-page').offset().top;
  }
  var pageLess = pageEnd-st-window.innerHeight;
  pageLess = Math.floor(pageLess / pageEnd*100);
  if(up)
  if(pageLess < 25){
    up.style.display = 'block';
    up.style.opacity = 1-pageLess/25
  }else{
    up.style.display = 'none';
  }
  if (st > lastScrollTop  ){
      header.classList.add('header_hidden')
  }else {
    if(lastScrollTop !=0)
      header.classList.remove('header_hidden')
  }
  if(st < lastScrollTop ){
    if(st == 0 && header.classList.contains('zero-no-show')){
      header.classList.add('header_hidden')
    }
  }
  lastScrollTop = st <= 0 ? 0 : st;

  var elToShow = document.querySelectorAll('.scroll-show');
  [].forEach.call(elToShow, function(item){
    if(isInViewport(item)){
      item.classList.add('scroll-show_active')
    }
  })
}

scrollbar.addListener( function(e){
  scrollReaction(e.offset.y,e.limit.y  )
});



var authors = document.querySelectorAll('.testimonials__authors .author');
var testimonials = document.querySelectorAll('.testimonial')
if(authors.length)
  authors[0].classList.add('is-active');
if(testimonials.length){
  testimonials[0].classList.add('is-active');
  var testimonialsWrap = document.querySelector('.testimonials__items');
  testimonialsWrap.style.height = testimonials[0].offsetHeight+'px'
}

if(up){
  up.style.display = 'none';
  up.addEventListener('click', function(){
    lp = 0;
    $('body,html').stop().animate({scrollTop:0 }, 500, 'swing', function() { 
    });
  })
}
function nextTeamMember(slider){
  var current = slider.querySelector('.is-active');
  
  var next = current.nextElementSibling
  if(!next)
    return false
  var nextWidth = next.offsetWidth;
  controlls[0].classList.remove('not-active')
  current.classList.remove('is-active');
  next.classList.add('is-active')
  currentTeamTranslate -= nextWidth
  var members = slider.querySelectorAll('.member');
  [].forEach.call(members, function(member){
    member.style.transform = 'translateX('+currentTeamTranslate+'px)'
  })
};
function prevTeamMember(slider){
  var current = slider.querySelector('.is-active');
  
  var next = current.previousElementSibling
  if(!next.previousElementSibling){
    controlls[0].classList.add('not-active')
  }
  if(!next)
    return false
  var nextWidth = next.offsetWidth;
  current.classList.remove('is-active');
  next.classList.add('is-active')
  currentTeamTranslate += nextWidth
  var members = slider.querySelectorAll('.member');
  [].forEach.call(members, function(member){
    member.style.transform = 'translateX('+currentTeamTranslate+'px)'
  })
};
var teamSlider = document.querySelector('.team__members');
if(teamSlider){
  var hummerTeamControll = new Hammer.Manager(teamSlider);
  hummerTeamControll.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 }) );
  hummerTeamControll.on("pan", _.debounce( function(e){
    if(e.additionalEvent == "panleft"){
      nextTeamMember(teamSlider);
    }
    if(e.additionalEvent == "panright"){

      prevTeamMember(teamSlider);
    }
  }, 50));
}

if(controlls.length){
  controlls[0].addEventListener('click', function(){
    prevTeamMember(teamSlider)
  });
  controlls[1].addEventListener('click', function(){
    nextTeamMember(teamSlider)
  });
}

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        // bounding.top >= 0 &&
        // bounding.left >= 0 
        // &&
        bounding.bottom - elem.offsetHeight <= (window.innerHeight || document.documentElement.clientHeight) 
        // &&1
        // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
function multerChange(e){
  let files = this.files;
  let _this = this;
  let listOfFiles = _this.parentElement.parentElement.querySelector('.form__files-list');
  listOfFiles.innerHTML = '';
  [].forEach.call(files, function(file) {
    let fileToRemove = document.createElement('div');
    var node = document.createTextNode(file.name);
    fileToRemove.appendChild(node);
    fileToRemove.addEventListener('click', function(){
      multerRemoveFile(_this, this.innerHTML)
    })
    listOfFiles.appendChild(fileToRemove)
  });
  window.dispatchEvent(new Event('resize'))
}
function multerRemoveFile(input, fileName){
  const dt = new DataTransfer()

  for (let file of input.files)
    if (file.name !== fileName) 
      dt.items.add(file)

  input.files = dt.files // this will trigger a change event
}
[].forEach.call(multiples, function(multiple) {
  multiple.addEventListener('change', multerChange)
});

menuOpener.addEventListener('click', function(){
  if(menuOpener.classList.contains('is-active')){
    menuOpener.classList.remove('is-active');
    mobileMenu.classList.remove('is-active');
    headerShadow.classList.remove('is-active');
    headerShadow.style.height = 0
    body.classList.remove('no-scroll');
    setTimeout(function(){
      mobileMenu.classList.add('is-hidden');
      
    },timeToToggleMenu)
  }else{
    mobileMenu.classList.remove('is-hidden');
    headerShadow.style.height = mobileMenu.clientHeight+'px'
    menuOpener.classList.add('is-active');
    mobileMenu.classList.add('is-active');
    headerShadow.classList.add('is-active');
    body.classList.add('no-scroll');
  }
  
});
function scrollPercentage(){
  var h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';

  return  (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}


var teamMebers = document.querySelectorAll('.member');
var teamMebersWrap = document.querySelector('.team__members');
window.addEventListener('resize', _.debounce(function(){
  if(teamMebers.length && window.innerWidth > 767){

    var width = (window.innerWidth - teamMebersWrap.getBoundingClientRect().left)/2;
    [].forEach.call(teamMebers, function(item){ 
      item.style.width = width+'px'
      item.style.minWidth = width+'px'
    })
  }
},400))
window.dispatchEvent(new Event('resize'))
window.dispatchEvent(new Event('scroll'))
window.addEventListener("load", function(event) {
  setTimeout(function(){

    body.classList.add('content-loaded')
    window.dispatchEvent(new Event('scroll'))
    scrollReaction(0 , $('.page').height())
  },20)
  
});


function initTestimonialsCount(){
  let counter = document.querySelector('.testimonials__count');
  let count = testimonials.length;
  if(count.toString().length == 1)
    count = '0'+count
  let countLayout = '<span>01</span>/'+count
  counter.innerHTML = countLayout
}

function setCounter(index){
  let counter = document.querySelector('.testimonials__count span');
  let count =  index+1
  if(count.toString().length == 1)
    count = '0'+count
  counter.innerHTML = count
}
function setTestimonial(index){
  [].forEach.call(testimonials, function(item){
    item.classList.remove('is-active')
  });
  [].forEach.call(authors, function(item){
    item.classList.remove('is-active')
  });
  testimonials[index].classList.add('is-active');
  authors[index].classList.add('is-active');
  testimonialsWrap.style.height = testimonials[index].offsetHeight+'px'
}
function nextTestimonial(){
  let current = document.querySelector('.testimonial.is-active')
  var next = current.nextElementSibling
  if(!next)
    return false
  var index = [].indexOf.call(testimonials, next);
  setTestimonial(index)
  setCounter(index)
}
function prevTestimonial(){
  let current = document.querySelector('.testimonial.is-active')
  var next = current.previousElementSibling
  if(!next)
    return false
  var index = [].indexOf.call(testimonials, next);
  setTestimonial(index)
  setCounter(index)
}
var testimonialsControll = document.querySelectorAll('.testimonials__next-prev div');
if(testimonialsControll.length){
  initTestimonialsCount();
  testimonialsControll[0].addEventListener('click', function(){
    prevTestimonial()
  })
  testimonialsControll[testimonialsControll.length-1].addEventListener('click', function(){
    nextTestimonial()
  })
}
$('.portfolio-slider').slick({
  autoplay: true,
  arrows: false,
  mobileFirst: true,
  pauseOnHover: true,
  useTransform: true,
  slidesToScroll:1,
  easing:'linear',
  autoplaySpeed: 0,
  infinite: true,
  speed: 2000,
  cssEase: 'linear',
  draggable: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '15px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1100,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '15px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1700,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '15px',
        slidesToShow: 4
      }
    },
    {
      breakpoint: 2400,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '15px',
        slidesToShow: 5
      }
    },
    {
      breakpoint: 3000,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '15px',
        slidesToShow: 6
      }
    }
  ]
})
