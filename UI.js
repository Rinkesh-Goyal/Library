import * as data from './Data.js';
import Book from './Book.js';
import Validate from './Validate.js'
import Storage from './Storage.js';


export default class UI {
    
    static loadHomePage(){
        UI.initAddDeleteAllButton();
        UI.windowClickForModal();
        UI.loadBooks();
        UI.initSort();
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


        //Change book status Read/Unread
        const statusButton = document.querySelectorAll('.status-button');
        statusButton.forEach((button) =>{
            button.addEventListener('click', (event)=>{
                UI.changeStatus(event.target.id, event.target.innerHTML);
                UI.loadBooks();
            })
        } )
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
            <td><button id = "${book.title}" class="status-button ${book.status}">${book.status}</button></td>
            <td><button id = "${book.title}" class="view-button">View</button></td>
            <td><button id = "${book.title}" class="delete-button">Delete</button></td>
        </tr>
        `
        UI.initBookButton();
        UI.displayLibraryInfo();
        // Storage.sortLibraryByTitleAsc();

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
        UI.displayLibraryInfo();
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
        UI.loadBooks();
    }

    /*************************************************************************************************** */
    //Error---Criteria and Order is returning the first value only i.e null for criteria and asc for order
    /*************************************************************************************************** */
    static initSort(){
        const criteriaElement= document.querySelector('#sort');
        const orderElement = document.querySelector('#order');

        const criteria = criteriaElement.options[criteriaElement.selectedIndex].value;
        const order = orderElement.options[orderElement.selectedIndex].value;    

        const sortButton = document.getElementById('sort-btn');

        sortButton.addEventListener('click', () => {
            console.log(criteria);
            console.log(order);
            if(criteria === 'title' && order === 'asc')
                Storage.sortLibraryByTitleAsc();
            if(criteria === 'title' && order === 'desc')
                Storage.sortLibraryByTitleDesc();
            if(criteria === 'author' && order === 'asc')
                Storage.sortLibraryByAuthorAsc();
            if(criteria === 'author' && order === 'desc')
                Storage.sortLibraryByAuthorDesc();
            if(criteria === 'date' && order === 'asc')
                Storage.sortLibraryByDateAsc();
            if(criteria === 'date' && order === 'desc')
                Storage.sortLibraryByDateDesc();
        })    
            UI.loadBooks();
    }
    /****************************************************************** */
    /****************************************************************** */

    static displayLibraryInfo(){
        const booksUnread = document.querySelector('#books-unread');
        const booksRead = document.querySelector('#books-read');
        const totalBooks =  document.querySelector('#total-books');
        let booksReadCount = 0;
        let booksUnReadCount = 0;

        totalBooks.innerHTML = Storage.getLibrary().getBooks().length;
        Storage.getLibrary().getBooks().forEach((book) => {
            if(book.getStatus() === "Read" ) booksReadCount++;
            else if (book.getStatus() === "Unread") booksUnReadCount++;
        })

        booksRead.innerHTML = booksReadCount;
        booksUnread.innerHTML = booksUnReadCount;
    }

    static changeStatus(bookTitle,status){
        const library = Storage.getLibrary();
        const book = library.getBooks().find((b) => b.getTitle() === bookTitle);
        if(status === 'Read') book.setStatus('Unread');
        else if(status === 'Unread') book.setStatus('Read');
        Storage.saveLibrary(library);
        UI.loadBooks();
    }
}

 