const views_windows = Array.from(document.getElementById('views_windows').querySelectorAll('img'));
const nav = Array.from(document.getElementById('carousel_nav').querySelectorAll('div'));
var index = 0

function restart(e) {
    index = 0
    views_windows.forEach(child => {
        child.style.transitionDuration = '0s'
        child.style.transform = `translateX(0)`
    });
    views_windows.forEach(child => {
        child.offsetWidth;
        child.style.transitionDuration = '2s'
        child.removeEventListener("transitionend", restart)
    });
}

function scroll_carousel() {
    nav[index%6].style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
    index ++;
    nav[index%6].style.backgroundColor = 'rgba(255, 255, 255, 1)'
    
    views_windows.forEach(child => {
        if (index == 6 & views_windows.indexOf(child) == 0) {
            child.addEventListener("transitionend", restart)
        }
        child.style.transform = `translateX(calc(${-index}*(50vw + 10px)))`
    });
}
setInterval(scroll_carousel, 5000)