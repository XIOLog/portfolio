"use strict";

function init() {
    var slider = document.querySelector('.slider');
    slider.addEventListener('click', changeBigPicture);
}

var bigImage = document.createElement('img');

function changeBigPicture(event) {
    var appDiv = document.querySelector('.show-full-img');
    appDiv.innerHTML = "";

    bigImage.src = event.target.dataset.big;

    bigImage.onerror = function () {
        appDiv.innerHTML = "Картинки не существует";
    }

    bigImage.onload = function () {
        appDiv.appendChild(bigImage);
    }
}

window.onload = init;