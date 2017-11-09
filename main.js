
AOS.init({
  duration: 800,
  animation:"slide-up",
  once:true
})

// PRELOADER

$(document).ready(function(){
    setTimeout(function(){
      $('body').addClass('loaded');
 }, 2000);
});



// RESPONSIVE MENU

$(document).ready(function(){
  $('#nav-burger').click(function(){
    $(this).toggleClass('open');
    $('ul').toggleClass('open').slideToggle(); 
  });   
});



// SCROLL TO TOP

// $(window).scroll(function() {
//     if($(document).scrollTop() >100) {
//         $('.logo').addClass('shrink'); 
//             }else  {
//                 $('.logo').removeClass('shrink');        
//             };
// });




















