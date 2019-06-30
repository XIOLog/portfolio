/*
    Общая работа скрипта:
    При нажатии кнопки "Купить", в блоке товара увеличивается счетчик количества и общая стоимость добавленных товаров
*/

var products = document.querySelector(".products");
var priceTotal = document.querySelector(".price_total span");
var countTotal = document.querySelector(".product_count");

function init() {
    products.addEventListener('click', addPrice);
}

function addPrice(event) {
    var price = event.target.previousElementSibling.dataset.price; // Получаем стоимость товара
    countTotal.innerHTML = Number(countTotal.innerHTML) + 1; // Увеличиваем количество товаров в корзине
    priceTotal.innerHTML = Number(priceTotal.innerHTML) + Number(price); // Увеличиваем общую стоимость товара в корзине
}

window.onload = init;
products.removeEventListener('click', addPrice);
