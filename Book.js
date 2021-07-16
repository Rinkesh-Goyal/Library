export default class Book{
        
        dateAdded;

    constructor(title, author, number_of_pages, genre, status){
        this.title = title;
        this.author = author;
        this.number_of_pages = number_of_pages;
        this.genre = genre;
        this.status = status;
        let today = new Date();
        let date = `${today.getDate()}`.padStart(2,'0');
        let month = `${today.getMonth()+1}`.padStart(2,'0');
        let year = `${today.getFullYear()}`;
        this.dateAdded = `${date}/${month}/${year}`;
    }   
    

    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title=title;
    }

    getAuthor(){
        return this.author;
    }

    setAuthor(author){
        this.author = author;
    }

    getNumberOfPages(){
        return this.number_of_pages;
    }

    setNumberOfPages(pages){
        this.number_of_pages = pages;
    }

    getGenre(){
        return this.genre;
    }

    setGenre(genre){
        this.genre = genre;
    }

    getStatus(){
        return this.status;
    }

    setStatus(status){
        this.status = status;
    }

    getDate(){
        return this.dateAdded;
    }
}