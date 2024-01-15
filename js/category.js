let productsContainer = document.querySelector('.p-container');
let priceRange = document.querySelector('input[type=range]');
let price =  priceRange.value;
let maxPrice =  priceRange.getAttribute('max');
let Electronics = document.querySelector('.electronics');
let Jewelery = document.querySelector('.jewelery');
let Men =document.querySelector('.men');
let Women= document.querySelector('.women');
let search=document.querySelector('.search');
let categoryCounter = document.querySelector('.catCounter');
getAllProducts(price,maxPrice);

priceRange.addEventListener('change',()=>{
    price =  priceRange.value;
    maxPrice =  priceRange.getAttribute('max');
    getAllProducts(price,maxPrice)
})
Electronics.addEventListener('click',()=>{
    getCategory ('electronics');
})

Jewelery.addEventListener('click',()=>{
getCategory('jewelery');
})

Men.addEventListener('click',()=>{
    getCategory("men's clothing");
})

Women.addEventListener('click',()=>{
    getCategory("women's clothing");
})

async function getAllProducts (price,maxPrice) {
    var apiresponse = await fetch('https://fakestoreapi.com/products')
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.price >= price && i.price < maxPrice)
        {
            box += `
            <div class="product-card" id='${i.id}'>
                <img src="${i.image}">
                <div>
                    <h2 class="product-name">${i.title}</h2>
                    <p class="product-category">${i.category}</p>
                    <p class="price">${i.price}</p>
                    <p class="product-stars">${i.rating.rate}</p>
                </div>
                <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
          </div>
            `
        }
    }
    productsContainer.innerHTML=box;
}

async function getCategory (category) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        box += `
        <div class="product-card" id='${i.id}'>
            <img src="${i.image}">
            <div>
                <h2 class="product-name">${i.title}</h2>
                <p class="product-category">${i.category}</p>
                <p class="price">${i.price}</p>
                <p class="product-stars">${i.rating.rate}</p>
            </div>
            <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
        </div>
            `
    }
    productsContainer.innerHTML=box;
}


async function searchProduct (match) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products/`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.title.toLowerCase().includes(match.toLowerCase())){

        
        box += `
        <div class="product-card" id='${i.id}'>
            <img src="${i.image}">
            <div>
                <h2 class="product-name">${i.title}</h2>
                <p class="product-category">${i.category}</p>
                <p class="price">${i.price}</p>
                <p class="product-stars">${i.rating.rate}</p>
            </div>
            <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
        </div> `
    }
    productsContainer.innerHTML=box;
}}

search.addEventListener('input',()=>{
    searchProduct(search.value);
})