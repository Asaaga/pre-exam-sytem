
const boxToggleBtn = document.querySelector('#adminBtnToggle');
const boxToggleBtn2 = document.querySelector('#adminBtnToggle2');
const sidebarBox = document.getElementById('box');
const sidebarBox2 = document.getElementById('box2');

boxToggleBtn.addEventListener('click', ()=>{
    sidebarBox.classList.toggle('active');
});
boxToggleBtn2.addEventListener('click', ()=>{
    sidebarBox2.classList.toggle('active');
});
