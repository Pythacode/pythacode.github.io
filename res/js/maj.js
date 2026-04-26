async function getDate() {
  const url = `https://api.github.com/repos/Pythacode/pythacode.github.io/commits`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("response");
      
    }

    const commits = await response.json();
    return new Date(commits[0].commit.author.date);

  } catch (erreur) {
    console.error(erreur.message);
  }
}

export function setUpdateDate(lang) {
    const dateText = new Intl.DateTimeFormat(lang, options).format(date);    
    MAJchamp.innerText = dateText
    MAJchamp.classList.remove('skeleton-load')
}

const options = {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
};

const MAJchamp = document.getElementById('MAJ')
const date = await getDate()
setUpdateDate('fr')