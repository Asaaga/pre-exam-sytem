const overlay = document.getElementById("overlay");
const navTrigger = document.getElementById("navTrigger");
const navContainer = document.getElementById("navContainer");
const closeBtn = document.getElementById("closeBtn");

const modalBox = document.getElementById("modalBox");


const alertModal = document.getElementById("alertModal");

setTimeout(() => {
    alertModal.style.display = "none";
}, 4000);

navTrigger.addEventListener('click', () => {
    openNavContainer()
});

closeBtn.addEventListener('click', () => {
    closeNavContainer()
});

function openNavContainer() {
    modalBox.style.display = 'none';
    overlay.style.display = 'block';
    navContainer.style.display = 'block';
}

function closeNavContainer() {
    overlay.style.display = 'none';
    navContainer.style.display = 'none';
}

closeNavContainer();

function activateUserModlaBox() {
    modalBox.style.display = 'block';
}
function DeactivateUserModlaBox() {
    modalBox.style.display = 'none';
}


DeactivateUserModlaBox();


