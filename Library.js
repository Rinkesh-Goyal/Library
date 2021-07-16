
export default class Library{
  constructor(){
    this.books = [];
  }

  setBooks(books) {
    this.books = books;
  }
  
  getBooks() {
    return this.books;
  }

  getBook(bookTitle) {
    return this.books.find((book) => book.getTitle() === bookTitle);
}
  
  contains(bookTitle) {
    return this.books.some((book) => book.getTitle() === bookTitle);
  }

  addBook(book) {
        this.books.push(book);
    }
    
    deleteBook(bookTitle) {
      const bookToDelete = this.books.find(
        (book) => book.getTitle() === bookTitle);
      this.books.splice(this.books.indexOf(bookToDelete), 1);
    }

}





