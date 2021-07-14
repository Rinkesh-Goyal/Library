const deleteContainer = document.querySelector('.delete-modal-container');
const deleteAllButton = document.querySelector('#delete-all-btn');
const modal = document.querySelector('.delete-modal-card');

//Delete all boooks modal
deleteAllButton.addEventListener('click', () => {
    deleteContainer.style.display = 'block';
})

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        deleteContainer.style.display = 'none';
    } else if (e.target.classList.contains('confirm-removal')) {
        // empty the local storage
       deleteContainer.style.display = 'none';
      }
})

window.onclick = function(event) {
   if (event.target == deleteContainer) {
        deleteContainer.style.display = "none";
   }
}

// Delete particular book modal
const deleteBookButton = document.querySelector(".delete-button");

deleteBookButton.addEventListener('click', () => {
    deleteContainer.style.display = 'block';
})


//Show book info modal
const viewBookButton = document.querySelector(".view-button");
const infoModalContainer = document.querySelector('.info-modal-container');
const infoModal = document.querySelector(".info-modal-card");

viewBookButton.addEventListener('click', () => {
    infoModalContainer.style.display = 'block';
})

infoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        infoModalContainer.style.display = 'none';
    }
})

//Add book modal
const formModalContainer = document.querySelector('.form-modal-container');
const formModal = document.querySelector('.form-modal');
const addBookButton = document.querySelector('.new-book');

addBookButton.addEventListener('click', () => {
    formModalContainer.style.display = 'block';
})

formModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        formModalContainer.style.display = 'none';
    }
})





