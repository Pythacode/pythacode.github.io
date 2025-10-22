const nav = document.querySelector("nav");
nav.addEventListener("click", () => scrollDown(1));
window.addEventListener("scroll", updateButtonVisibility);
updateButtonVisibility();

function scrollDown(i) {
    window.scrollTo({
        top: window.innerHeight*i,
        behavior: 'smooth'
    });
}

function updateButtonVisibility(i) {
    if (window.scrollY > 0) {
        nav.style.opacity = "0";
        nav.style.pointerEvents = "None";
    } else {
        nav.style.opacity = "1";
        nav.style.pointerEvents = "auto";
    }
}
