const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

const quill = new Quill('#message', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

const form = document.getElementById('contactForm');
emailjs.init('kQntJTIis5HL5JgnX');

function formatDate(date) {
  const joursMois = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  const jour = date.getDate();
  const mois = joursMois[date.getMonth()];
  const annee = date.getFullYear();

  let heures = date.getHours();
  let minutes = date.getMinutes();

  // Ajouter un zéro devant les minutes si < 10
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${jour} ${mois} ${annee} ${heures}h${minutes}`;
}

const SubmitButton = document.getElementById('submit');

var email;
var subject;
var name;
var message;
var templateParams;
var date;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    SubmitButton.value = "Chargement..."
        SubmitButton.style = "cursor:default;"
    SubmitButton.disabled = true;

    email = document.getElementById('mail').value;
    subject = document.getElementById('subject').value;
    name = document.getElementById('name').value;
    message = quill.root.innerHTML;

    if (message == "<p><br></p>") {
        alert('Entrez un message')
        SubmitButton.value = "Valider"
        SubmitButton.style = ""
        SubmitButton.disabled = false;
        return
    }

    date = formatDate(new Date());

    console.log("E-mail :", email);
    console.log("Sujet :", subject);
    console.log("Message (HTML) :", message);

    templateParams = {
            title: subject,
            name: name,
            time: date,
            message: message,
            mail: email,
        };

    emailjs.send('service_msk0cz5', 'template_nvzblfj', templateParams)
    .then(function(response) {
        window.location.href += '/confirm';
    }, function(error) {
        console.error('Erreur envoi email:', error);
        alert('Erreur lors de l’envoi, réessaiez plus tard.\nErreur : ' + error);
        form.reset();
        quill.setContents([]);
        SubmitButton.value = "Valider"
        SubmitButton.style = ""
        SubmitButton.disabled = false;

    });

    // Empêcher le formulaire de s’envoyer (rechargement)
    return false;
});
