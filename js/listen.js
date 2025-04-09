/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');

	initMenu();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var hamb = $('.hamburger');
			var menu = $('.menu');
			var menuOverlay = $('.menu_overlay');

			hamb.on('click', function()
			{
				menu.addClass('active');
			});

			menuOverlay.on('click', function()
			{
				menu.removeClass('active');
			});
		}
	}

});


var slideIndex = 1;
var currentAudio = null;

// Initialize the slideshow
document.addEventListener("DOMContentLoaded", function() {
  showDivs(slideIndex);
  
  // Add click event to play buttons
  var playButtons = document.querySelectorAll(".play-button");
  for (var i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", function(e) {
      e.stopPropagation(); // Prevent event bubbling
      var slideDiv = this.closest(".mySlides");
      var audio = slideDiv.querySelector("audio");
      
      if (audio) {
        if (audio.paused) {
          playAudio(audio, slideDiv);
        } else {
          pauseAudio(audio, slideDiv);
        }
      }
    });
  }
});

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  
  // Stop any currently playing audio when changing slides
  if (currentAudio) {
    var currentSlide = currentAudio.closest(".mySlides");
    pauseAudio(currentAudio, currentSlide);
  }
  
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  
  x[slideIndex-1].style.display = "block";
}

function playAudio(audio, slideDiv) {
  // First pause any other audio that might be playing
  var allSlides = document.getElementsByClassName("mySlides");
  for (var i = 0; i < allSlides.length; i++) {
    allSlides[i].classList.remove("playing");
    var otherAudio = allSlides[i].querySelector("audio");
    if (otherAudio && otherAudio !== audio) {
      otherAudio.pause();
      otherAudio.currentTime = 0;
    }
  }
  
  // Add playing class to the current slide
  slideDiv.classList.add("playing");
  
  // Play the audio
  audio.play().catch(function(error) {
    console.log("Audio playback error:", error);
    alert("Unable to play audio. Please check if the audio file exists and try clicking again.");
    slideDiv.classList.remove("playing");
  });
  
  // Listen for audio end
  audio.onended = function() {
    slideDiv.classList.remove("playing");
  };
  
  currentAudio = audio;
}

function pauseAudio(audio, slideDiv) {
  audio.pause();
  slideDiv.classList.remove("playing");
}