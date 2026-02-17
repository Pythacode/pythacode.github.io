const smiley_background = [
    "❤️",
    "🩵",
    "💜",
    "🤍",
    "❤️‍🔥",
    "💖",
    "✨",
    "✨",
    "✨",
    "⬜",
    "🟦",
    "🚀",
    "🚀",
    "🛰️",
    "🛰️",
]

const main = document.getElementsByTagName('main')[0]
let spans = []
const min = 4
const max = 5

function def_left(span) {
    span.style.left = (Math.random() * window.innerWidth-10).toString() + 'px';
}


for (let i=0;i<smiley_background.length;i++) {
    console.log(i, smiley_background[i])
    let span = document.createElement('span')
    span.innerHTML = smiley_background[i]
    span.className = 'fall';

    def_left(span)
    span.style.top = '-30px'
    span.style.animationDuration = ((Math.random() * (max - min + 1)) + min).toString() + 's';
    span.style.animationDelay = (Math.random() * 5).toString() + 's';

    span.addEventListener('animationiteration', function() { // Randomize respawn
        def_left(span)
    });

    main.prepend(span);
    spans.push(span);
}

function resize() {
    for (let i=0;i<spans.length;i++) {
        def_left(spans[i])
    }
}

window.onresize = resize;