
/* ==========================================================================
  MAIN.JS
   ========================================================================== */
"use strict";


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


	// BURGER MENU/ OVERLAY NAV OPEN

  $("#nav-burger").on("click", function(e) {
      e.preventDefault();
    $(this).toggleClass("open");
    console.log("overlay open");
    $("header").toggleClass("overlay-open");
    $(".menu-items").toggleClass("open");
  });


  $("a").on("click", function(){
  $("header").removeClass("overlay-open");
  $(".menu-items, #nav-burger").removeClass("open");
  });

// -------- END ANIMATIONS ON SCROLL -------------

  $(window).on("scroll", function() {

  //  CHANGE NAV HEIGHT AND ADD BOX-SHADOW ON SCROLL

        if($(window).scrollTop()> 100)  {
            $("nav, header,  .nav-toggle").addClass("scroll-nav"); 
              }else  {
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
 
  // -------- SCROLL DOWN -------------  
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

 //Click event to scroll to top

    $(".line-top").click(function(){
        $("html, body").animate({scrollTop : 0},700);
        $(".line-top").css({"opacity": "0"});
        return false;   
});  

   

  // -------- CURRENT YEAR  FOOTER-------------  


let date = new Date().getFullYear();

document.querySelector(".year").textContent = date;


  // ------- CUSTOM GOOGLE MAP-------------  

function initMap() {

        // var kldny = {lat: 40.7439012, lng: -73.98423819999996};
         var kldny = {lat: 40.743901, lng: -73.984238};
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            streetViewControl:false, 
            center: kldny,
            styles: [{
            featureType: "",
            elementType:"all",
            stylers:[ 
              {"saturation": -100}, 
              {"gamma": 0.95} 
              ]
          }]
        });

        var image = {
          url: "https://github.com/AsiaKo/KLD-NY/blob/gh-pages/assets/icons/location-color.png?raw=true", 
            size: new google.maps.Size(63, 63),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(14,16),
        }

        var marker = new google.maps.Marker({
            position: kldny,
          
            map: map,
            title:"KLD NY", 
            icon: image,
            // icon:"https://github.com/AsiaKo/KLD-NY/blob/gh-pages/assets/icons/location-color.png?raw=true"
         });
    }


document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});


  // $(document).ready(function() {    
  //   $('#lightSlider').lightSlider({
  //     item:1,
  //     autoWidth:true,
  //     // loop: true,
  //     controls: false,
  //     speed: 2000,
  //     auto: false,
  //     pause: 6000,
  //     pauseOnHover: true,
  //     mode: 'slide',
  //   });
  // });


 
  //   $(document).ready(function() {
  //       var slider = $("#light-slider").lightSlider();
  //       slider.refresh();
  //   });


