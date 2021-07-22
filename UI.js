import * as data from './Data.js';
import Book from './Book.js';
import Validate from './Validate.js'
import Storage from './Storage.js';


export default class UI {
    
    static loadHomePage(){
        UI.initAddDeleteAllButton();
        UI.windowClickForModal();
        UI.loadBooks();
        // UI.initSort();
    }

    static initAddDeleteAllButton(){
        const deleteContainer = document.querySelector('.delete-modal-container');
        const deleteAllButton = document.querySelector('#delete-all-btn');
        const modal = document.querySelector('.delete-modal-card');

        deleteAllButton.addEventListener('click', () => {
            deleteContainer.style.display = 'block';
        })
        
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                deleteContainer.style.display = 'none';
            } else if (e.target.classList.contains('confirm-removal')) {
                // empty the local storage
                localStorage.clear();
                UI.loadBooks();
               deleteContainer.style.display = 'none';
              }
        })

        //Add book modal
        const formModalContainer = document.querySelector('.form-modal-container');
        const formModal = document.querySelector('.form-modal');
        const addBookButton = document.querySelector('.new-book');

        addBookButton.addEventListener('click', () => {
            UI.initAddBookPopup();
            formModalContainer.style.display = 'block';
        })

        formModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                formModalContainer.style.display = 'none';
            }
        })

        
        
    }

    static initBookButton(){
        // Delete particular book modal
        // const deleteBookContainer = document.querySelector('.delete-book-modal-container');
        // const modal = document.querySelector('.delete-book-modal-card');
        const deleteBookButton = document.querySelectorAll(".delete-button");

        deleteBookButton.forEach((button)=>{
            button.addEventListener('click',(e)=>{
                    if(confirm("Do you really want to delete the book.")){
                        UI.deleteBook(e.target.id);
                    }
                    else{
                        return;
                    }
                })                
        })


        //Show book info modal
        const viewBookButton = document.querySelectorAll(".view-button");
        const infoModalContainer = document.querySelector('.info-modal-container');
        const infoModal = document.querySelector(".info-modal-card");

        viewBookButton.forEach((button)=>{
            // console.log(button);
            button.addEventListener('click', (e)=>{
                UI.viewBookInfo(e.target.id);
                infoModalContainer.style.display = 'block';
            })
        })

        infoModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                infoModalContainer.style.display = 'none';
            }
        })
    }

    static windowClickForModal(){
        const deleteBookContainer = document.querySelector('.delete-book-modal-container');
        const infoModalContainer = document.querySelector('.info-modal-container');
        const deleteContainer = document.querySelector('.delete-modal-container');
        const formModalContainer = document.querySelector('.form-modal-container');

        window.onclick = function(event) {
            if (event.target == deleteContainer) {
                deleteContainer.style.display = "none";
            }
            if (event.target == formModalContainer) {

                formModalContainer.style.display = "none";
            }
            if (event.target == infoModalContainer) {
                infoModalContainer.style.display = "none";
            }
            if (event.target == deleteBookContainer) {
                deleteBookContainer.style.display = "none";
            }
        }        
    }

    static initAddBookPopup(){
        const addBookButton = document.querySelector('.add-book');
        const clearBookFormButton = document.querySelector('.clear');
        
        addBookButton.addEventListener('click',UI.addBook);
        clearBookFormButton.addEventListener('click', UI.clearAddBookForm);
    }

    static addBook(){
        if(Validate()){
            const book = new Book(data.getBookData().title, 
                                  data.getBookData().author, 
                                  data.getBookData().pages, 
                                  data.getBookData().genre, 
                                  data.getBookData().status
                                )
            Storage.addBookToStorage(book);
            document.querySelector('.form-modal-container').style.display = "none";
            UI.createBook(book);
            UI.clearAddBookForm();

        }
    }
    
    static createBook(book){
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML +=`
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><button id = "${book.title}" class="status-button Read">Read</button></td>
            <td><button id = "${book.title}" class="view-button">View</button></td>
            <td><button id = "${book.title}" class="delete-button">Delete</button></td>
        </tr>
        `
        UI.initBookButton();
    }

    static clearAddBookForm(){
        document.querySelector('#b-title').value='';
        document.querySelector('#b-author').value='';
        document.querySelector('#b-nbr_of_pages').value='';
        document.querySelector('#b-genre').value='';
        document.querySelector('#b-read_status').value="null";
    }
    
    static loadBooks() {
        UI.clearBookList();
        Storage.getLibrary()
          .getBooks()
          .forEach((book) => UI.createBook(book));
    }

    static clearBookList(){
        document.querySelector('#table-body').innerHTML = '';
    }


    static viewBookInfo(bookTitle){
        const book = Storage.findBookFromStorage(bookTitle);
        document.getElementById('b-title-header').innerHTML = book.title;
        document.getElementById('b-info-author').innerHTML = book.author;
        document.getElementById('b-info-pages').innerHTML = book.number_of_pages;
        document.getElementById('b-info-date').innerHTML = book.dateAdded;
        document.getElementById('b-info-genre').innerHTML = book.genre;
        document.getElementById('b-info-status').innerHTML = book.status;
    }

    static deleteBook(bookTitle){
        Storage.deleteBookFromStorage(bookTitle);
        // UI.clearBookList();
        UI.loadBooks();
    }

    // static sortLibrary(){
    //     const criteriaElement = document.querySelector('#sort');
    //     const orderElement  =  document.querySelector('#order');

    //     const criteria = criteriaElement.options[criteriaElement.selectedIndex].value;
    //     const order = orderElement.options[orderElement.selectedIndex].value === 'asc'?true:false;    
    //     const bookCollection = Storage.getLibrary().getBooks();
    //     console.log(bookCollection);
    //     if(criteria === 'date'){
    //         bookCollection.sort(function (a, b) {
    //             return order
    //               ? new Date(b.dateAdded) - new Date(a.dateAdded)
    //               : new Date(a.dateAdded) - new Date(b.dateAdded);
    //           });
    //     }

    //     if(criteria === 'title'){
    //         bookCollection.sort(function (a, b) {
    //             return order
    //               ? (b.title) - (a.title)
    //               : (a.title) - (b.title);
    //           });
    //     }

    //     if(criteria === 'author'){
    //         bookCollection.sort(function (a, b) {
    //             return order
    //               ? (b.author) - (a.author)
    //               : (a.author) - (b.author);
    //           });
    //     }
    // }

    // static initSort(){
    //     document.querySelector('#sort').addEventListener('change',(e)=>{
    //         UI.sortLibrary();
    //         UI.loadBooks();
    //     })

    //     document.querySelector('#order').addEventListener('change',(e)=>{
    //         UI.sortLibrary();
    //         UI.loadBooks();
    //     })
    // }

    static createDeleteModal(id){
        const deleteBookContainer =  document.querySelector('.delete-book-modal-container');
        deleteBookContainer.innerHTML = `
        <div class="delete-book-modal-card" id=${id}>
                <div class="modal-header">
                    <h2 class="delete-book-header">BOOK REMOVAL</h2>
                    <span class="close-modal close">&times;</span>
                </div>
                <div class="modal-content">
                    <p>Do you really want to delete the books from your library?</p>
                    <div class="modal-options">
                        <button type="button" class="cancel-removal close">Cancel</button>
                        <button type="button" class="confirm-book-removal">Delete</button>
                    </div>
                </div>
            </div>`
        
        
    }
}

 