/*function mask(id) {
    var fleche = document.getElementById("develope-icon-" + id);
    var detailsElement = document.getElementById(id);
    var text = document.getElementById("content-" + id)

    if (fleche.style.transform == "rotate(90deg)") { //Ferme
        //fleche
        fleche.classList.add("rotate-right");
        function handleAnimationEnd() {
            fleche.style.transform = "rotate(0deg)"; 
            fleche.classList.remove("rotate-right");
            detailsElement.removeAttribute('open'); // Fermer

            fleche.removeEventListener("animationend", handleAnimationEnd);
        }

        // Ajoute l'événement 'animationend'
        fleche.addEventListener("animationend", handleAnimationEnd);
    }
    if (fleche.style.transform == "rotate(0deg)") { //ouvre
        fleche.classList.add("rotate-left");
        function handleAnimationEnd() {
            fleche.style.transform = "rotate(90deg)";
            fleche.classList.remove("rotate-left");

            fleche.removeEventListener("animationend", handleAnimationEnd);
            detailsElement.setAttribute('open', ''); // Ouvrir
        }

        fleche.addEventListener("animationend", handleAnimationEnd);
    }
}*/

const detailsElements = document.querySelectorAll('details');

detailsElements.forEach((details) => {

    // Ajouter un événement toggle pour récupérer l'ID à chaque ouverture/fermeture
    details.addEventListener('toggle', function() {
        var id = details.className;
        
        var fleche = document.getElementById("develope-icon-" + id);

        if (details.open) {
            //console.log(`L'élément ${details.className} a été ouvert.`);
            fleche.classList.add("rotate-left");
            function handleAnimationEnd() {
                fleche.style.transform = "rotate(90deg)";
                fleche.classList.remove("rotate-left");

                fleche.removeEventListener("animationend", handleAnimationEnd);
            }

            fleche.addEventListener("animationend", handleAnimationEnd);
            
        } else {
            //console.log(`L'élément ${details.id} a été fermé.`);
                        
            fleche.classList.add("rotate-right");
            function handleAnimationEnd() {
                fleche.style.transform = "rotate(0deg)"; 
                fleche.classList.remove("rotate-right");

                fleche.removeEventListener("animationend", handleAnimationEnd);
            }

            // Ajoute l'événement 'animationend'
            fleche.addEventListener("animationend", handleAnimationEnd);
        }
    });
});


document.querySelectorAll('details').forEach(function(detail) {
    detail.addEventListener('toggle', function() {
        const content = detail.querySelector('.content');
        // Réinitialiser l'animation en réinitialisant la max-height
        content.style.maxHeight = '0';  // Réinitialiser la hauteur à 0 avant de rouvrir
        // Utiliser un setTimeout pour attendre que la réinitialisation soit prise en compte avant de rouvrir
        setTimeout(function() {
            if (detail.open) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.overflow = "hidden";
                content.style.transition = 'max-height 2s ease-out;';  // Définir la hauteur dynamique
            }
        }, 10); // Délai très court pour que le navigateur prenne en compte la réinitialisation

    });
});

const header = document.getElementById('header');
const content = document.getElementsByClassName('container')[0];

/*/ Ajouter un événement de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});*/

content.style.paddingTop = header.scrollHeight + "px";