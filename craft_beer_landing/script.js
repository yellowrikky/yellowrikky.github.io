/*
    Лабораторна робота 3: JavaScript
    У цьому файлі реалізована інтерактивність:
    1) мобільне меню;
    2) фільтрація карток пива;
    3) калькулятор вартості;
    4) перевірка форми замовлення.
*/

// Мобільне меню
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Фільтр видів пива
const filterButtons = document.querySelectorAll(".filter-btn");
const beerCards = document.querySelectorAll(".beer-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        beerCards.forEach((card) => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// Калькулятор вартості дегустаційного набору з кількома видами пива
const beerCountInputs = document.querySelectorAll(".beer-count");
const totalPrice = document.getElementById("totalPrice");
const totalBottles = document.getElementById("totalBottles");

function updateTotalPrice() {
    let sum = 0;
    let bottles = 0;

    beerCountInputs.forEach((input) => {
        let count = Number(input.value);
        const price = Number(input.dataset.price);

        if (count < 0) {
            count = 0;
            input.value = 0;
        }

        if (count > 24) {
            count = 24;
            input.value = 24;
        }

        bottles += count;
        sum += count * price;
    });

    totalBottles.textContent = bottles;
    totalPrice.textContent = `${sum} грн`;
}

beerCountInputs.forEach((input) => {
    input.addEventListener("input", updateTotalPrice);
});

// Перевірка форми
const orderForm = document.getElementById("orderForm");
const formMessage = document.getElementById("formMessage");

orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name === "" || phone === "") {
        formMessage.textContent = "Будь ласка, заповніть ім'я та телефон.";
        formMessage.style.color = "#ffb6a3";
        return;
    }

    formMessage.textContent = `Дякуємо, ${name}! Заявку прийнято. Ми зв'яжемося з вами найближчим часом.`;
    formMessage.style.color = "#ffd08f";

    orderForm.reset();
});
