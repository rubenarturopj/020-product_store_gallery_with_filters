// let-s make a copy of the original array so we can go back all the time to the original
// list when there's nothing typed in the input box
// that's why we use LET instead of const, because we're gonna modifiy this copy
let filteredProducts = [...products];

const productsContainer = document.querySelector(".products-container");

const displayProducts = () => {
    // if statement   in case there's no product that matches the input entered by the user
    if (filteredProducts.length < 1) {
        productsContainer.innerHTML = `<h6>Sorry, no product matches your search, please try with another word.</h6>`;
        return;
    }

    // replacing the content of the DIV productsContainer
    productsContainer.innerHTML = filteredProducts
        .map(({ id, title, image, price }) => {
            return `<article class="product" data-id=${id}>
            <img
                class="product-img img"
                src=${image}
                alt="product-img img"
            />
            <footer>
                <h5 class="product-name">${title}</h5>
                <span class="product-price">$${price}</span>
            </footer>
        </article>`;
        })
        .join("");
};

displayProducts();

// Text filter
const form = document.querySelector(".input-form"); // the form
const searchInput = document.querySelector(".search-input"); // the data from the input of the form

form.addEventListener("keyup", () => {
    const inputValue = searchInput.value;
    // console.log(inputValue);
    filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(inputValue);
    });
    displayProducts();
});

// ////////////////////////////////////////////
// filter buttons
const companiesDOM = document.querySelector(".companies");

const displayButtons = () => {
    const buttons = [
        "all",
        ...new Set(products.map((product) => product.company)),
    ];
    companiesDOM.innerHTML = buttons
        .map((company) => {
            return `<button class="company-btn" data-id="${company}" >${company}</button>`;
        })
        .join("");
};

displayButtons();

companiesDOM.addEventListener("click", (event) => {
    const element = event.target;

    if (element.classList.contains("company-btn")) {
        if (element.dataset.id === "all") {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter((product) => {
                return product.company === element.dataset.id;
            });
        }
        searchInput.value = "";
        displayProducts();
    }
});
