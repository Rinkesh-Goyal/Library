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


    static sortLibraryByTitleAsc(){
      const library = Storage.getLibrary();
      const books = library.getBooks();
      
        books.sort((a,b)=>{
          if(a.getTitle()<b.getTitle()){
            return -1;
          }
          else if(a.getTitle()>b.getTitle()){
            return 1;
          }
          return 0;
        })
      Storage.saveLibrary(library);
    }

    static sortLibraryByTitleDesc(){
      const library = Storage.getLibrary();
      const books = library.getBooks();
      
        books.sort((a,b)=>{
          if(a.getTitle()>b.getTitle()){
            return -1;
          }
          else if(a.getTitle()<b.getTitle()){
            return 1;
          }
          return 0;
        })
      Storage.saveLibrary(library);
    }

    static sortLibraryByAuthorAsc(){
      const library = Storage.getLibrary();
      const books = library.getBooks();
      
        books.sort((a,b)=>{
          if(a.getAuthor()<b.getAuthor()){
            return -1;
          }
          else if(a.getAuthor()>b.getAuthor()){
            return 1;
          }
          return 0;
        })
      Storage.saveLibrary(library);
    }

    static sortLibraryByAuthorDesc(){
      const library = Storage.getLibrary();
      const books = library.getBooks();
      
        books.sort((a,b)=>{
          if(a.getAuthor()>b.getAuthor()){
            return -1;
          }
          else if(a.getAuthor()<b.getAuthor()){
            return 1;
          }
          return 0;
        })
      Storage.saveLibrary(library);
    }

    static sortLibraryByDateAsc(){
      const library = Storage.getLibrary();
      const books = library.getBooks();
      
        books.sort((a,b)=>{
          return new Date(a.getDate())-new Date(b.getDate());
        })
      Storage.saveLibrary(library);
    }

    static sortLibraryByDateDesc(){
      const library = Storage.getLibrary();
      const books = library.getBooks();
      
        books.sort((a,b)=>{
          return new Date(b.getDate())-new Date(a.getDate());
        })
      Storage.saveLibrary(library);
    }
}


