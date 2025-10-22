async function getVersion(name) {
  const requestURL = `https://api.github.com/repos/Pythacode/${name}/releases`;
  const response = await fetch(requestURL);
  if (!response.ok) throw new Error("Erreur HTTP " + response.status);
  const infos = await response.json();
  return infos;
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
  });
}

function formatFileSize(bytes) {
  const units = ['octets', 'Ko', 'Mo', 'Go', 'To'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return bytes.toFixed(2) + ' ' + units[i];
}

function createLigne(table, url, title, date_text, size_text) {
    var ligne = document.createElement('tr')
    var nameColumn = document.createElement('td')
    nameColumn.innerHTML = `<a href="${url}" target="_blank" class="file">${title}</a>`

    var size = document.createElement('td')
    size.innerHTML = size_text

    var date = document.createElement('td')
    date.innerText = date_text
    date.classList.add('date')
    
    ligne.appendChild(nameColumn);
    ligne.appendChild(size);
    ligne.appendChild(date);
    table.appendChild(ligne);

}

function showVersion(name, container) {
    getVersion(name).then(infos => {
        infos.forEach(info => {
            const newDiv = document.createElement("fieldset");
            const title = document.createElement("legend");
            title.textContent = info.name || info.tag_name || "Version inconu";
            const table = document.createElement("table");

            // GitHub Link
            createLigne(table, info.html_url, "Lien GitHub", `${formatDate(info.published_at)} UTC +2`, "")

            // Full Changelog
            createLigne(table, info.html_url.replace('releases/tag', 'commits'), "Changelog", `${formatDate(info.published_at)} UTC +2`, "")

            info.assets.forEach(asset => {
                createLigne(table, asset.browser_download_url, asset.name, `${formatDate(asset.updated_at)} UTC +2`, formatFileSize(asset.size))
            })
            
            // Zip            
            createLigne(table, info.zipball_url, "Code source (.zip)", `${formatDate(info.published_at)} UTC +2`, "")

            // tar.gz
            createLigne(table, info.tarball_url, "Code source (.tar.gz)", `${formatDate(info.published_at)} UTC +2`, "")

            newDiv.appendChild(title);
            newDiv.appendChild(table);
            document.getElementById(container).appendChild(newDiv);
        });
    });
}