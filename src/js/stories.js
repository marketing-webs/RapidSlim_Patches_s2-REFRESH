const close = document.querySelectorAll(".story__close");
const overlay = document.getElementById("overlay");
const story1 = document.getElementById("story-1");
const button1 = document.getElementById("story-1__button");
const story2 = document.getElementById("story-2");
const button2 = document.getElementById("story-2__button");
const story3 = document.getElementById("story-3");
const button3 = document.getElementById("story-3__button");

button1.addEventListener("click", () => {
    overlay.style.display = "block";
    story1.style.display = "block";
});

button2.addEventListener("click", () => {
    overlay.style.display = "block";
    story2.style.display = "block";
});

button3.addEventListener("click", () => {
    overlay.style.display = "block";
    story3.style.display = "block";
});

close.forEach((x) => {
    x.addEventListener("click", () => {
        story1.style.display = "none";
        story2.style.display = "none";
        story3.style.display = "none";
        overlay.style.display = "none";
    });
});

overlay.addEventListener("click", () => {
    if (
        story1.style.display === "block" ||
        story2.style.display === "block" ||
        story3.style.display === "block"
    ) {
        story1.style.display = "none";
        story2.style.display = "none";
        story3.style.display = "none";
        overlay.style.display = "none";
    }
});
