// SIDEBAR SCRIPT
const sidebar = document.querySelector('.sidebar'),
    toggle = document.querySelector('.toggle-sidebar'),
    toggle2 = document.querySelector('#cart-slider-toggle');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('closed')
})

toggle2.addEventListener('click', (e) => {
    sidebar.classList.toggle('closed')
})

// PRICE RANGE SCRIPT
const rangeInput = document.querySelectorAll('.range-input input'),
    priceInput = document.querySelectorAll('.price-input input')
progress = document.querySelector('.slider .slider-progress');
let priceGap = 50;


rangeInput.forEach(input => {
    input.addEventListener('input', e => {
        // getting two ranges values and parsing them into numbers
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);



        if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") { // if active slider is min slider
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }

        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    })
})


priceInput.forEach(input => {
    input.addEventListener('input', e => {
        // getting two inputs values and parsing them into numbers
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        if ((maxVal - minVal >= priceGap) && maxVal <= rangeInput[1].max && minVal >= rangeInput[0].min) {
            if (e.target.className === "input-min") { // if active input is min input
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            }else {
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        } 
    })
})