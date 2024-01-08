const container = document.getElementById('container');
const regBtn = document.getElementById('register');
const logBtn = document.getElementById('login');

regBtn.addEventListener('click', ()=>{
    container.classList.add("active")
});

logBtn.addEventListener('click', ()=>{
    container.classList.remove("active")
});