allProductsContainer = document.querySelector('.p-container');
/**
 * Handles the click event on the product container, extracts the product ID, and fetches the details of the clicked product.
 * If the event target is a product name, category, price, or star rating, it retrieves the parent element's ID.
 * If the event target is an image, it retrieves the parent element's ID.
 * If the event target is a product card, it retrieves the product card's ID.
 * 
 * Fetches additional product details from the fakestoreapi.com using the product ID.
 * Redirects the user to the product page with the product ID and details in the URL parameters.
 * 
 * @function
 * @name getProductPage
 * @param {Event} event - The click event object.
 * @returns {void} - Modifies the browser location to navigate to the product page.
 * 
 * @listens event:click - Listens for click events on the product container.
 */
async function getProductPage(event) {
    let selectors = ['.product-name', '.product-category', '.price', '.product-stars']
    let productId;

    if(window.location.pathname.split("/").pop() == 'category.html') {
        if (selectors.some(selector => event.target.matches(selector) && !event.target.matches('.addToCart'))) {
            productId = event.target.parentElement.parentElement.id;
        } else if (event.target.matches('img')) {
            productId = event.target.parentElement.parentElement.id;
        } else if (event.target.matches('.product-card')) {
            productId = event.target.id;
        }
    } else {
        if (!event.target.matches('.addToCart')) {
            productId = event.target.parentElement.id;
        } else if (event.target.matches('.product')) {
            productId = event.target.id;
        }
    }

    // Get Product Details
    if (productId) {
        /**
         * Fetches product details from the fakestoreapi.com.
         * @async
         * @function
         * @name productDetails
         * @param {string} id - The product ID.
         * @returns {Object} - Object containing product details.
         */
        async function productDetails(id) {
            var response = await fetch(`https://fakestoreapi.com/products/${id}`)
            var result = await response.json()
    
            return productDetails = {
                'image': result.image,
                'title': result.title,
                'description': result.description,
                'price': result.price,
                'category': result.category,
                'rating': result.rating.rate,
            }
        }
        
        // add the product details with the url
        let params = new URLSearchParams();
        let details = await productDetails(productId);
    
        params.append('productId', productId);
        params.append('productDetails', JSON.stringify(details))
        location.assign('../product-page.html?' + params.toString())
    }
}

// Event listener for click events on the product container
allProductsContainer.addEventListener('click', function(e) {
    getProductPage(e);
})