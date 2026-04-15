const username_h1 = document.getElementById("username");
const profileLink = document.getElementById("link");
const bio_h3 = document.getElementById("bio");
const followers_span = document.getElementById("followers");
const following_span = document.getElementById("following");
repos_span = document.getElementById("repos")
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

request.onload = function () {
    var user_info = request.response;
    username_h1.innerText = user_info.login
    profileLink.href = user_info.html_url
    bio_h3.innerText = user_info.bio
    followers_span.innerHTML = user_info.followers
    following_span.innerHTML = user_info.following
    repos_span.innerHTML = user_info.public_repos
    profile_picture_img.src = user_info.avatar_url
    console.log(user_info.avatar_url)
};