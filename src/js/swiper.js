import Swiper from "swiper/bundle";

var mySwiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 120,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    breakpoints: {
        // when window width is >= 480px
        480: {
            spaceBetween: 120,
        },
    },
});
