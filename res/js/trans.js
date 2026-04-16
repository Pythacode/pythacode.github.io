import {setUpdateDate} from './maj.js'

const segments = window.location.pathname.split('/').filter(s => s !== '')
const page = segments.pop() || 'home'
const texts = document.querySelectorAll('[data-i18n]')
const language_auto_info = document.getElementsByClassName("select_language")[0]
const language_auto_select = document.getElementById("languages-auto")
const language_select = document.getElementById("languages")
const langCookie = document.cookie.split('; ').find(c => c.startsWith('lang='))
let lang = null

if (langCookie) {
  lang = langCookie.split('=')[1]
  document.cookie = `lang=${lang}; path=/; max-age=315360000`
  document.documentElement.setAttribute('lang', lang)
  language_auto_info.style.display = 'None' 
} else {
  lang = navigator.language.split('-')[0]
  setTimeout(mask_lang, 10000)
}

function change_language(lang) {
  document.cookie = `lang=${lang}; path=/; max-age=315360000`
  language_select.value = lang
  language_auto_select.value = lang
  setData(page, lang)
  setUpdateDate(lang)
}

function mask_lang() {
  language_auto_info.style.animation = "2s forwards ease-out slide-out"
}

async function getData(page, lang="en") {
  const url = `/res/languages/${page}/${lang}.json`;

  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      return getData(page, 'en')
    }

    return await reponse.json();

  } catch (erreur) {
    console.error(erreur.message);
  }
}

async function setData(page, lang) {
  const data = await getData(page, lang)

  texts.forEach(text => {
      text.innerHTML = data[text.dataset.i18n]
  });
}

language_select.addEventListener('change', (e) => change_language(e.target.value))
language_auto_select.addEventListener('change', (e) => change_language(e.target.value))

change_language(lang)