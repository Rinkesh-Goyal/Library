import * as data from './Data.js';

export default function validateForm() {
  const titleElement = document.querySelector('#b-title');
  const authorElement = document.querySelector('#b-author');
  const pagesElement = document.querySelector('#b-nbr_of_pages');
  const genreElement = document.querySelector('#b-genre');

  const title = data.getBookData().title;
  const author = data.getBookData().author;
  const pages = data.getBookData().pages;
  const genre = data.getBookData().genre;

  const status = data.getBookData().status;
  let formStatus = true;
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/;
  
    
  if (title.length < 4 ||format.test(title)) {
      document.querySelector('.title-err-msg').style.display = 'flex';
      titleElement.value = '';
      formStatus = false;
  }
    
  
    
  if (author.length < 4) {
      document.querySelector('.author-err-msg').style.display = 'flex';
      authorElement.value = '';
      formStatus = false;
  }
    
  
    
  if (genre.length < 4 || format.test(genre)) {
      document.querySelector('.genre-err-msg').style.display = 'flex';
      genreElement.value = '';
      formStatus = false;
  }
    

    
  if (pages === '') {
      document.querySelector('.pages-err-msg').style.display = 'flex';
      pagesElement.value = '';
      formStatus = false;
  }
    
  
    
  if (status === "null") {
      document.querySelector('.status-err-msg').style.display = 'flex';
      formStatus = false;
  }
    
    
  return formStatus;
  }