function fetch_footer(translate=false) {
    let url;
    if (translate) {
        url = "/res/html/footer-translate.html"
    } else {
        url = "/res/html/footer.html"
    }
    fetch(url)
    .then(res => res.text())
    .then(data => {
        const div = document.querySelector("footer");
        div.innerHTML = data;

        // Réexécuter les scripts du footer
        div.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) newScript.src = oldScript.src;
        if (oldScript.type) newScript.type = oldScript.type;
        if (oldScript.defer) newScript.defer = oldScript.defer;
        if (!oldScript.src) newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
        });
    });
}