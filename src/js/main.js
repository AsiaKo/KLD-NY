/* ==========================================================================
  MAIN.JS
   ========================================================================== */
"use strict";

console.log(" %cHopfully nothing to see here... constructive criticism welcome ", "color: gray; text-transform: uppercase");


// Service Worker 
if('serviceWorker'in navigator) {
  window.addEventListener('load', () =>{
    navigator.serviceWorker
      .register('sw.js')
      // .then(reg => console.log('Service Worker Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  })
}


$(document).ready(function(){

   var scrollLink = $(".scroll");
  // Smooth scrolling
    scrollLink.click(function(e) {
    if (this.hash !== ""){
        e.preventDefault();

         var target = this.hash;
         var targetOffset = $(target).offset().top - 50;

        $("body,html").animate({
          scrollTop: targetOffset
        }, 1000,  function(){
          window.location.hash = targetOffset;
      });
    }  // End if
  });

    $(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
    // Assign active class to nav links while scrolling
    $('section').each(function(i) {
        if ($(this).position().top <= scrollDistance) {
            $('.nav .active-link').removeClass('active-link');
            $('.nav a').eq(i).addClass('active-link');
        }
    });
}).scroll();


  // BURGER MENU/ OVERLAY NAV OPEN

  $(".nav-toggle").on("click", function(e) {
      e.preventDefault();
    $("header").toggleClass("overlay-open");
    $(".menu-items, #nav-burger").toggleClass("open");

  });

  $("a").on("click", function(){
      setTimeout(function() {
         $("header").removeClass("overlay-open");
          }, 800);

     setTimeout(function() {
          $(".menu-items, #nav-burger").removeClass("open");
          }, 800);
  });

  $(window).on("scroll", function() {

  //  CHANGE NAV HEIGHT AND ADD BOX-SHADOW ON SCROLL

        if($(window).scrollTop() > 100)  {
            $("nav, header,  .nav-toggle").addClass("scroll-nav"); 
              } else  {
              $("nav, header").removeClass("scroll-nav");        
              }
          });

// ANIMATION FADE IN ON SCROLL
//Cache reference to window and animation items
var $animation_elements = $(".animate, .portfolio-item");
var $window = $(window);

$window.on("scroll", check_if_in_view);
$window.on("scroll resize", check_if_in_view);
$window.trigger("scroll");

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
         $element.addClass("fade-up");
       } 
  });
}
 
  // --------LINE SCROLL DOWN -------------  

    $(window).scroll(function(){
            if ($(this).scrollTop() > 200) {
                $(".line-scroll").fadeOut(400);
            } 
        });

  // -------- BACK TO TOP -------------  

     $(window).scroll(function(){
            if ($(this).scrollTop() > 600) {
                $(".line-top").css({"opacity": "1", "transform": "translate3d(0,0,0)"});     
            } else {
                $(".line-top").css({"opacity": "0", "transform": "translate3d(0,30px,100px)"});
            }
        });
       
    });


  // -------- SCROLL TO TOP ------------  

    $(".line-top").click(function(){
        $("html, body").animate({scrollTop : 0},700);
        $(".line-top").css({"opacity": "0"});
        return false;   
});  

  // -------- CURRENT YEAR  FOOTER-------------  


let date = new Date().getFullYear();

document.querySelector(".year").textContent = date;


  //------- CUSTOM GOOGLE MAP-------------  

function initMap() {

        var kldny = {lat: 40.743901, lng: -73.984238};
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            streetViewControl:false, 
            center: kldny,
            styles: [{
            elementType:"all",
            stylers:[ 
              {"saturation": -100}, 
              {"gamma": 0.95} 
              ]
          }]
        });

        var image = {
            url: "https://kldny.com/assets/icons/location-color.png", 
            size: new google.maps.Size(63, 63),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(14, 16),
        }

        var marker = new google.maps.Marker({
            position: kldny,
            map: map,
            title:"KLD NY", 
            icon: image,
           
         });
    }

  // ------- LAZY LOADING - INTERSECTION OBSERVER ------------- 


  const images = document.querySelectorAll('[data-srcset]');
const config = {
  // if the image gets within 50px in the Y axis, start the download.
  rootMargin: '0px 0px',
  threshold: 0.01
};

if (!('IntersectionObserver' in window)) {
  // no support for intersection observer, load the images immediately
  Array.from(images).forEach(image => loadImage(image));
} else {

  // observer for the images on the page
  var observer = new IntersectionObserver(onIntersection, config);
  images.forEach(image => {
    observer.observe(image);
      
  });
}

function onIntersection(entries) {
  
  // loop through the entries
  entries.forEach(entry => {
    
    // are we in viewport?
    if (entry.intersectionRatio > 0) {

      // stop watching
      observer.unobserve(entry.target);
      
      // load image
      loadImage(entry.target);
    }
  });
}

function loadImage(e) {
  e.srcset = e.dataset.srcset;
  e.classList.add('fade-up');
}


// CONTACT LINKS 

function clickToEmail() {
      window.location.href = 'mailto:kathy@kldny.com';
    }

    function clickToSms() {     
      window.location.href = 'sms:646-725-1966';
    }

    function clickToCall() {    
      window.location.href = 'tel:646-725-1966';
    }


    //LAZY LOADING - update when Safari IntersectionObserver

//   document.addEventListener("DOMContentLoaded", function() {
//   var lazyloadImages;    

//   if ("IntersectionObserver" in window) {
//     lazyloadImages = document.querySelectorAll("[data-src],[data-srcset]");
//     var imageObserver = new IntersectionObserver(function(entries, observer) {
//       entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//           var image = entry.target;
//           image.src = image.dataset.src;
//           image.srcset = image.
//           image.classList.add(".fade-up");
//           image.classList.remove("lazy");
//           imageObserver.unobserve(image);
//         }
//       });
//     });

//     lazyloadImages.forEach(function(image) {
//       imageObserver.observe(image);
//     });
//   } else {  
//     var lazyloadThrottleTimeout;
//     lazyloadImages = document.querySelectorAll("[data-src],[data-srcset]");
    
//     function lazyload () {
//       if(lazyloadThrottleTimeout) {
//         clearTimeout(lazyloadThrottleTimeout);
//       }    

//       lazyloadThrottleTimeout = setTimeout(function() {
//         var scrollTop = window.pageYOffset;
//         lazyloadImages.forEach(function(img) {
//             if(img.offsetTop < (window.innerHeight + scrollTop)) {
//               img.src = img.dataset.src;
//               img.srcset = img.dataset.srcset;
//               img.classList.add(".fade-up");
//               img.classList.remove('lazy');
//             }
//         });
//         if(lazyloadImages.length == 0) { 
//           document.removeEventListener("scroll", lazyload);
//           window.removeEventListener("resize", lazyload);
//           window.removeEventListener("orientationChange", lazyload);
//         }
//       }, 20);
//     }

//     document.addEventListener("scroll", lazyload);
//     window.addEventListener("resize", lazyload);
//     window.addEventListener("orientationChange", lazyload);
//   }
// })




