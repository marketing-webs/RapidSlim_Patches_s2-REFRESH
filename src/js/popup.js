import { formValid } from "./form";

let mouseY;
let mouseTouchedTop = false;
let timeoutPopupDisplay = false;
let windowWidth = window.innerWidth;
const layer = document.querySelector(".overlay");
const popUp = document.getElementById("popup");
const popUpClose = document.getElementById("popup-close");
const form = document.querySelector(".form");
const section = document.querySelector(".section-12");

///////////////////////////////////// POPUPS
const popupTimeout = () => {
    setTimeout(() => {
      if (!formValid && !timeoutPopupDisplay) {
        layer.style.display = "block";
        popUp.classList.add("popup--visible");
  
        timeoutPopupDisplay = true;
      }
    }, 60000);
  };
  
  window.addEventListener("load", popupTimeout);
  
  document.addEventListener("mousemove", (e) => {
    // !formValid &&
    mouseY = e.clientY;
    windowWidth = window.innerWidth;
    if (mouseY === 0 && !formValid && !mouseTouchedTop && windowWidth >= 768) {
      layer.style.display = "block";
      popUp.classList.add("popup--visible");
      mouseTouchedTop = true;
    }
  });
  
  popUpClose.addEventListener("click", () => {
    popUp.classList.remove("popup--visible");
    overlay.style.display = "none";
  });
// const popupTimeout = () => {
//     if (section.getBoundingClientRect().y < 1300) {
//         setTimeout(() => {
//             layer.style.display = "block";
//             popUp.classList.add("popup--visible");
//         }, 30000);
//         window.removeEventListener("scroll", popupTimeout);
//     }
// };

// document.addEventListener("mousemove", (e) => {
//     mouseY = e.clientY;
//     windowWidth = window.innerWidth;
//     if (mouseY === 0 && !formValid && !mouseTouchedTop && windowWidth >= 768) {
//         layer.style.display = "block";
//         popUp.classList.add("popup--visible");
//         mouseTouchedTop = true;
//     }
// });

// popUpClose.addEventListener("click", () => {
//     popUp.classList.remove("popup--visible");
//     overlay.style.display = "none";
// });

// window.addEventListener("scroll", popupTimeout);
