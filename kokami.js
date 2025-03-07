let height = 50;
let width = 50;
const kokami = document.getElementById('kokami');

document.addEventListener("mousemove", (event) => {
    kokami.style.maskImage = kokami.style.webkitMaskImage = 
                `linear-gradient(transparent, transparent),
                 radial-gradient(circle at ${event.clientX + width / 2}px ${event.clientY + height / 2}px, transparent 200px, black 250px)`;
});

let touches = []; // Liste pour stocker les touches

document.addEventListener('keydown', (event) => {
    const key = event.key;

    touches.push(key);

    if (touches.length > 10) {
        touches.shift()
    }

    if (touches.join(", ") == "ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a" ) {
        console.log("kokami !");
        kokami.style.display = "block";
    }
});