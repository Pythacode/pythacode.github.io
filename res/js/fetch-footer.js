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
            for (const attr of oldScript.attributes) {
                newScript.setAttribute(attr.name, attr.value);
            }
            if (!oldScript.src) newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);
        });
    });
}