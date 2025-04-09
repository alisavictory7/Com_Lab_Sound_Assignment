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
var currentPath = null; // To track which path the user chose
var totalInitialSlides = 3; // Original slides before branching (Act 1 Scene 1, Act 1 Scene 2, Act 2 Scene 1)

// Initialize the slideshow
document.addEventListener("DOMContentLoaded", function() {
  showDivs(slideIndex);

document.querySelector('.slideshow-container').addEventListener('click', function(e) {
	// Check if the click happened on a play button (or one of its children)
	var playButton = e.target.closest(".play-button");
	if (playButton) {
	  e.stopPropagation(); // Prevent event bubbling if needed
  
	  // Find the parent slide container
	  var slideDiv = playButton.closest(".mySlides");
	  if (!slideDiv) return; // Safety check
  
	  // Get the audio element inside this slide
	  var audio = slideDiv.querySelector("audio");
	  if (!audio) return;
	  
	  // Toggle play / pause
	  if (audio.paused) {
		playAudio(audio, slideDiv);
	  } else {
		pauseAudio(audio, slideDiv);
	  }
	}
  });
  
  updateNavButtons;
  
});

function plusDivs(n) {
  // Handle navigation differently based on whether we're in a branching path
  if (currentPath) {
    navigatePathSlides(n);
  } else {
    showDivs(slideIndex += n);
  }
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var regularSlides = [];
  
  // Filter out path-specific slides
  for (i = 0; i < x.length; i++) {
    if (!x[i].classList.contains('path-a') && !x[i].classList.contains('path-b')) {
      regularSlides.push(x[i]);
    }
  }
  
  // Stop any currently playing audio when changing slides
  if (currentAudio) {
    var currentSlide = currentAudio.closest(".mySlides");
    pauseAudio(currentAudio, currentSlide);
  }
  
  if (n > regularSlides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = regularSlides.length}
  
  // Hide all slides first
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  
  // Show only the current regular slide
  regularSlides[slideIndex-1].style.display = "block";
}

function navigatePathSlides(n) {
  var pathSlides = document.querySelectorAll('.mySlides.path-' + currentPath.toLowerCase());
  var currentPathIndex = 0;
  
  // Find the currently displayed slide's index
  for (var i = 0; i < pathSlides.length; i++) {
    if (pathSlides[i].style.display === "block") {
      currentPathIndex = i;
      break;
    }
  }
  
  // Calculate new index
  currentPathIndex += n;
  
  // Handle bounds
  if (currentPathIndex >= pathSlides.length) {

    alert("You've reached the end of this story path!");
    return;
  }
  if (currentPathIndex < 0) {
    currentPathIndex = 0; // Don't go back before the first path slide
  }
  
  // Stop any currently playing audio
  if (currentAudio) {
    var currentSlide = currentAudio.closest(".mySlides");
    pauseAudio(currentAudio, currentSlide);
  }
  
  // Hide all slides first
  var allSlides = document.querySelectorAll('.mySlides');
  for (var i = 0; i < allSlides.length; i++) {
    allSlides[i].style.display = "none";
  }
  
  // Show the current path slide
  pathSlides[currentPathIndex].style.display = "block";

  updateNavButtons;
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
  
  // Check if this is Act 2 Scene 1
  var isAct2Scene1 = slideDiv.querySelector("img").alt === "A2S1";

  
  // Listen for audio end
  audio.onended = function() {
    slideDiv.classList.remove("playing");
    


    if (isAct2Scene1) {
      document.getElementById("decisionContainer").style.display = "block";
      // Hide the navigation buttons when showing decision
      document.querySelector(".slideshow-nav").style.display = "none";
    }
  };
  
  currentAudio = audio;
}

function pauseAudio(audio, slideDiv) {
  audio.pause();
  slideDiv.classList.remove("playing");
}

function makeDecision(choice) {
  // Hide the decision container
  document.getElementById("decisionContainer").style.display = "none";
  // Show the navigation again
  document.querySelector(".slideshow-nav").style.display = "flex";
  
  // Set the current path based on choice
  currentPath = choice;
  
  // Hide all regular slides
  var regularSlides = document.querySelectorAll('.mySlides:not(.path-a):not(.path-b)');
  for (var i = 0; i < regularSlides.length; i++) {
    regularSlides[i].style.display = "none";
  }
  
  // Show the first slide of the chosen path
  var pathSlides = document.querySelectorAll('.mySlides.path-' + choice.toLowerCase());
  if (pathSlides.length > 0) {
    for (var i = 0; i < pathSlides.length; i++) {
      pathSlides[i].style.display = (i === 0) ? "block" : "none";
    }
    
    // Add event listeners to new play buttons if they weren't initialized before
    var newPlayButtons = document.querySelectorAll('.path-' + choice.toLowerCase() + ' .play-button');
    for (var i = 0; i < newPlayButtons.length; i++) {
      newPlayButtons[i].addEventListener("click", function(e) {
        e.stopPropagation();
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
  }
}


function updateNavButtons() {
	// Find the currently visible slide.
	var slides = document.getElementsByClassName("mySlides");
	var currentSlide = null;
	for (var i = 0; i < slides.length; i++) {
	  if (slides[i].style.display === "block") {
		currentSlide = slides[i];
		break;
	  }
	}
	
	if (!currentSlide) return; // No slide found, exit early.
	
	// Get the alt attribute from the image inside the slide.
	var img = currentSlide.querySelector("img");
	var altText = img ? img.alt.trim() : "";
	
	// Select navigation buttons.
	var prevButton = document.querySelector(".prev-button");
	var nextButton = document.querySelector(".next-button");
	
	// Hide the previous button if at Act 1 Scene 1.
	if (altText === "Act 1 Scene 1") {
	  prevButton.style.display = "none";
	} else {
	  prevButton.style.display = "block";
	}
	
	// Hide the next button if at Act 2 Scene 1, Act 3 Scene 2B, or Act 3 Scene 2A.
	if (altText === "A2S1" || altText === "Act 3 Scene 2B" || altText === "Act 3 Scene 2A" || altText === "Act 3 Scene 1B" || altText === "Act 3 Scene 2B") {
	  nextButton.style.display = "none";
	} else {
	  nextButton.style.display = "block";
	}
  }
  