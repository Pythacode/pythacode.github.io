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

const MAJchamp = document.getElementById('MAJ')

function updtadeMaj(value) {
    MAJchamp.innerText = value
}

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.github.com/repos/Pythacode/pythacode.github.io/commits", true);
xhr.responseType = "json";

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        const response = xhr.response;
        const lastCommitDate = response[0].commit.author.date;

        const dateObj = new Date(lastCommitDate);

        const options = {
            timeZone: 'Europe/Paris',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        const dateFr = new Intl.DateTimeFormat('fr-FR', options).format(dateObj);

        updtadeMaj("Dernière mise à jour : " + dateFr);
    } else {
        console.error("Erreur : " + xhr.statusText);
        updtadeMaj("Erreur lors de la récupération de la dernière version : " + xhr.statusText);
    }
};


xhr.onerror = function () {
    updtadeMaj("La requête a échoué");
};

xhr.send();
