export const getBookData = () => {
    const title = document.querySelector('#b-title').value;
    const author = document.querySelector('#b-author').value;
    const pages = document.querySelector('#b-nbr_of_pages').value;
    const genre = document.querySelector('#b-genre').value;
    const statusElement = document.querySelector('#b-read_status');

    const status = statusElement.options[statusElement.selectedIndex].value;

    return {title, author, pages, genre, status};
}