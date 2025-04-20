let touches = []; // Liste pour stocker les touches

document.addEventListener('keydown', (event) => {
    const key = event.key;

    touches.push(key);

    if (touches.length > 10) {
        touches.shift()
    }

    if (touches.join(", ") == "ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowRight, ArrowLeft, ArrowRight, ArrowLeft, a, b" ) {
        console.log("kokami !");
        window.location.href = "/kokami";
    }
});
