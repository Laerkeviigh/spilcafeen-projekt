"use strict"

/*FORSIDE*/

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  const splash = document.querySelector(".splash-screen");

  // logo-animation efter kort delay
  setTimeout(() => {
    logo.classList.add("animate");
  }, 800); // 0.8 sekunder efter load

  // fade splash-screen ud
  setTimeout(() => {
    splash.classList.add("fade-out");
  }, 2500); // fade starter efter 2.5 sekunder

  // skift til næste side (location.html)
  setTimeout(() => {
    window.location.href = "sites/location.html";
  }, 3500); 
});

