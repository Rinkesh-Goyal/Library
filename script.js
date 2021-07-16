import * as modal from './modal.js';
import Book from './Book.js';
import Validate from './Validate.js'
import Storage from './Storage.js';
import * as data from './Data.js';
modal.modalView();




//Add Book Form validation and adding book to local storage

document.querySelector('.add-book').addEventListener('click',()=>{
    
    if(Validate()){
        Storage.addBookToStorage(new Book(data.getBookData().title, 
                                          data.getBookData().author, 
                                          data.getBookData().pages, 
                                          data.getBookData().genre, 
                                          data.getBookData().status
                                        )
                                );
        document.querySelector('.form-modal-container').style.display = "none";
    }
    
})

    document.querySelector('.clear').addEventListener('click',() => {
    document.querySelector('#b-title').value='';
    document.querySelector('#b-author').value='';
    document.querySelector('#b-nbr_of_pages').value='';
    document.querySelector('#b-genre').value='';
    document.querySelector('#b-read_status').value=null;
})



