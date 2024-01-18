let productsContainer = document.querySelector('.p-container');
let minPrice =  document.querySelector('.range-min');
let maxPrice =  document.querySelector('.range-max');
let all = document.querySelector('.all');
let Electronics = document.querySelector('.electronics');
let Jewelery = document.querySelector('.jewelery');
let Men =document.querySelector('.men');
let Women= document.querySelector('.women');
let search=document.querySelector('.search');
let categoryTitle = document.querySelector('.category-title');
let sortingSelect = document.querySelector('#sorting');


getAllProducts(minPrice.value,maxPrice.value,sortingSelect.value);

sortingSelect.addEventListener('input',()=>{
    if(categoryTitle.innerHTML == "All"){
        getAllProducts(minPrice.value,maxPrice.value,sortingSelect.value)
    }else{
        getCategory(minPrice.value,maxPrice.value,categoryTitle.innerHTML.toLowerCase(),sortingSelect.value)
    }
})

minPrice.addEventListener('change',()=>{
    min =  minPrice.value;
    max =  maxPrice.value;
    if(categoryTitle.innerHTML == "All"){
        getAllProducts(min,max,sortingSelect.value)
    }else{
        getCategory(min,max,categoryTitle.innerHTML.toLowerCase(),sortingSelect.value)
    }
    
})
maxPrice.addEventListener('change',()=>{
    min =  minPrice.value;
    max =  maxPrice.value;
    if(categoryTitle.innerHTML == "All"){
        getAllProducts(min,max,sortingSelect.value)
    }else{
        getCategory(min,max,categoryTitle.innerHTML.toLowerCase(),sortingSelect.value)
    }
})

all.addEventListener('click',()=>{
    categoryTitle.innerHTML = "All";
    getAllProducts(minPrice.value,maxPrice.value,sortingSelect.value);
})

Electronics.addEventListener('click',()=>{
    categoryTitle.innerHTML = "Electronics";
    getCategory (minPrice.value,maxPrice.value,'electronics',sortingSelect.value);
})

Jewelery.addEventListener('click',()=>{
    categoryTitle.innerHTML = "Jewelery";
getCategory(minPrice.value,maxPrice.value,'jewelery',sortingSelect.value);
})

Men.addEventListener('click',()=>{
    categoryTitle.innerHTML = "Men's clothing";
    getCategory(minPrice.value,maxPrice.value,"men's clothing",sortingSelect.value);
})

Women.addEventListener('click',()=>{
    categoryTitle.innerHTML = "Women's clothing";
    getCategory(minPrice.value,maxPrice.value,"women's clothing",sortingSelect.value);
})


async function getAllProducts (minPrice,maxPrice,sorting) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products?sort=${sorting}`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.price >= minPrice && i.price < maxPrice)
        {
            box += `
          <div class="col-md-3  p-0 mx-3 rounded product-card" id='${i.id}'>
                        <div class="product-img">
                            <img src="${i.image}" alt="" class="w-100">
                        </div>
                        <div class="p-2">
                            <h2 class="product-name long-text">${i.title}</h2>
                            <p class="product-category text-muted m-0">${i.category}</p>
                            <p class="price fw-semibold m-0">$${i.price}</p>
                            <p class="product-stars"><i class="fa-solid fa-star fs-6 me-1"></i>${i.rating.rate}</p>
                        </div>
                        <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
            </div>
            `
        }
    }
    productsContainer.innerHTML=box;
    addProduct = document.querySelectorAll('.addToCart');
}

async function getCategory (minPrice,maxPrice,category,sorting) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products/category/${category}?sort=${sorting}`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.price >= minPrice && i.price < maxPrice){
            box += `
            <div class="col-md-3  p-0 mx-3 rounded product-card" id='${i.id}'>
                            <div class="product-img">
                                <img src="${i.image}" alt="" class="w-100">
                            </div>
                            <div class="p-2">
                                <h2 class="product-name long-text">${i.title}</h2>
                                <p class="product-category text-muted m-0">${i.category}</p>
                                <p class="price fw-semibold m-0">$${i.price}</p>
                                <p class="product-stars">${i.rating.rate}</p>
                            </div>
                            <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
                </div>
                `
        }
       
    }
    productsContainer.innerHTML=box;
    document.querySelectorAll('.addToCart');
}


async function searchProduct (match) {
    var apiresponse = await fetch(`https://fakestoreapi.com/products/`)
    var finalResult = await apiresponse.json()
    // console.log(finalResult[0]);
    let box = '';
    for (const i of finalResult) {
        if(i.title.toLowerCase().includes(match.toLowerCase())){

        
        box += `
        <div class="col-md-3  p-0 mx-3 rounded product-card" id='${i.id}'>
        <div class="product-img">
            <img src="${i.image}" alt="" class="w-100">
        </div>
        <div class="p-2">
            <h2 class="product-name">${i.title}</h2>
            <p class="product-category text-muted m-0">${i.category}</p>
            <p class="price fw-semibold m-0">$${i.price}</p>
            <p class="product-stars">${i.rating.rate}</p>
        </div>
        <button class="addToCart"><i class="fa-solid fa-bag-shopping"></i></button>
        </div> 
        `
    }
    productsContainer.innerHTML=box;
}}

search.addEventListener('input',()=>{
    searchProduct(search.value);
})