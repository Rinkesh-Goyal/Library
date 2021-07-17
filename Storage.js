import Library from "./Library.js";
import Book from "./Book.js";
export default class Storage{

    static saveLibrary(data) {
        localStorage.setItem('library', JSON.stringify(data));
    }
    
    static getLibrary(){
        const library = Object.assign(
            new Library(),
            JSON.parse(localStorage.getItem('library')),
          );
      
          library.setBooks(
            library
              .getBooks()
              .map((book) => Object.assign(new Book(), book)),
          );
            
          return library;
    }

    static addBookToStorage(book) {
        const library = Storage.getLibrary();
        library.addBook(book);
        Storage.saveLibrary(library);
      }
    
    static deleteBookFromStorage(bookTitle) {
      const library = Storage.getLibrary();
      library.deleteBook(bookTitle);
      Storage.saveLibrary(library);
    }
    
    static findBookFromStorage(bookTitle){
      return (Storage.getLibrary().getBook(bookTitle));
    }
}


