const username_h1 = document.getElementById("username");
const acount_link = document.getElementById("acount_link");
const blog = document.getElementById("blog");
const spanId = document.getElementById("id");
const created = document.getElementById('created')
const bio_h3 = document.getElementById("bio");
const followers_span = document.getElementById("followers");
const following_span = document.getElementById("following");
const repos_span = document.getElementById("repos")
const compagnie = document.getElementById('compagnie')
const profile_picture_img = document.getElementById("pictureProfile");

var input_string = window.location.href;
var url = new URL(input_string);
var username = url.searchParams.get('username');

if (username == null) {
    username = "Pythacode"
}

var requestURL = "https://api.github.com/users/" + username;

var request = new XMLHttpRequest();

request.open("GET", requestURL);
request.responseType = "json";
request.send();

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

request.onload = function () {
    var user_info = request.response;
    username_h1.innerText = user_info.login
    spanId.innerText = '#' + user_info.id
    acount_link.href = user_info.html_url
    blog.innerHTML = blog.href = user_info.blog
    created.innerText = "Membre since " + formatDate(user_info.created_at)
    bio_h3.innerText = user_info.bio
    compagnie.innerHTML = user_info.company
    followers_span.innerHTML = user_info.followers + ' follower' + (user_info.followers > 1 ? 's' : '')
    followers_span.href = user_info.followers_url
    following_span.innerHTML = user_info.following + ' following'
    following_span.href = user_info.following_url
    repos_span.innerHTML = user_info.public_repos + ' repo' + (user_info.public_repos > 1 ? 's' : '')
    repos_span.href = user_info.repos_url
    profile_picture_img.src = user_info.avatar_url
    console.log(user_info.avatar_url)
};