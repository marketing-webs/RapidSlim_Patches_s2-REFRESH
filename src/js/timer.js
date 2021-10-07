const counter1 = document.getElementById("counter-1");
const counter2 = document.getElementById("counter-2");
let time = 45 * 60;

const timer = setInterval(() => {
    let min = parseInt(time / 60, 10);
    let sec = parseInt(time % 60, 10);
    sec = sec < 10 ? "0" + sec : sec;
    if (time >= 0) {
        time--;
        counter1.innerHTML = `0 h ${min} min ${sec} s`;
        counter2.innerHTML = `0 h ${min} min ${sec} s`;
    } else {
        counter1.innerHTML = `Promocja wygasła!`;
        counter2.innerHTML = `Promocja wygasła!`;
        clearInterval(timer);
    }
}, 1000);

window.onload = () => {
    timer;
};
