const logo = document.getElementsByClassName('logo')[0]
const audio = document.getElementById("babyNoise")

logo.addEventListener("click", () => {
    audio.play();
})