
let bookList = []

const cardWrapperEl = document.querySelector('.card-wrapper');

const formWrapper = document.querySelector('.form-wrapper');
const addBookBtn = document.querySelector('#add-book-btn');
const closeBtn = document.querySelector('#close-btn');
const formSubmit = document.querySelector('#form-submit')

//Form fiels
const bookTitleEL = document.querySelector('#book-title');
const authorNameEl = document.querySelector('#author-name');
const totalPageEl = document.querySelector('#total-pages');
const readingStatusEL = document.querySelector("#reading-status")

//book log
const totalBooksEl = document.querySelector('#totalBooks')
const unreadBooksEL = document.querySelector('#unreadBooks')
const readBooksEL = document.querySelector('#readBooks')


//hiding the form initially
formWrapper.style.display = 'none'

//Constructor to create the obj
class book {
    constructor(title, author, totalPages, isRead) {
        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.isRead = isRead;
    }
    //Prototype to change the status
    changeReadStatus() {
        this.isRead ? this.isRead = false : this.isRead = true;
    }
}

//function to display the books
function addBookToLibrary() {

    cardWrapperEl.innerHTML = ""

    for (let i = 0; i < bookList.length; i++) {
        cardWrapperEl.innerHTML +=
            `
            <div class="book-card">

                <h2>${bookList[i].title}</h2>

                <p>
                    <span>Author:</span> ${bookList[i].author}
                </p>

                <p>
                    <span>Total Pages:</span> ${bookList[i].totalPages}
                </p>

                <p class = "toggle-swtich">
                    <span>Status:</span>

                    Not Read

                    <label class="switch">
                        <input class = "checkbox" type="checkbox" id="readStatus${i}" data-index =${i}>
                        <span class="slider round"></span>
                    </label>

                    Read
                </p>

                <div class="card-btn">
                    <button class="delt-btn" data-index="${i}">
                        Delete
                    </button>
                </div>
                
            </div>        
        `
        changeCheckboxMark(i);
    }
}

//displaying the reading status
function changeCheckboxMark(index) {

    let checkbox = document.querySelector(`#readStatus${index}`)

    if (bookList[index].isRead) {
        checkbox.setAttribute("checked", "");
    }

}

//count of read and unread books
function countReadBooks() {
    let readBooks = 0;
    let totalBooks = bookList.length;

    bookList.forEach((book) => {
        book.isRead ? readBooks++ : '';
    })

    totalBooksEl.innerHTML = `Total Books: <span>${totalBooks}</span>`;
    unreadBooksEL.innerHTML = `Unread Books: <span>${totalBooks - readBooks}</span>`;
    readBooksEL.innerHTML = `Read Books: <span>${readBooks}</span>`;
}


//displaying the book details form
addBookBtn.addEventListener('click', () => {
    formWrapper.style.display = 'block'
})


//hiding the form 
closeBtn.addEventListener('click', (e) => {
    formWrapper.style.display = 'none';
    e.preventDefault();
})


formSubmit.addEventListener('submit', (e) => {

    let bookTitle = bookTitleEL.value;
    let authorName = authorNameEl.value;
    let totalPage = totalPageEl.value;
    let isRead = readingStatusEL.checked;


    //storing the obj in array
    bookList.push(new book(bookTitle, authorName, totalPage, isRead))

    //hiding the form
    formWrapper.style.display = 'none';

    //Reseting the form
    formSubmit.reset();

    addBookToLibrary();
    countReadBooks();

    e.preventDefault();
})


//Deleting Items
document.addEventListener('click', (e) => {

    if (e.target.classList.contains("delt-btn")) {
        let index = Number(e.target.dataset.index)
        bookList.splice(index, 1);
        addBookToLibrary()
    }
    countReadBooks();

})


document.addEventListener('click', (e) => {

    if (e.target.classList.contains('checkbox')) {

        let index = Number(e.target.dataset.index)

        bookList[index].changeReadStatus();

        countReadBooks();
    }
})


//creating some obj
bookList.push(new book("Gurkha", "Peter Harclerode", 700, false))
bookList.push(new book("Home Body", "Barack Obama", 300, true))
bookList.push(new book("The Archer", "Paulo Coelho", 700, false))
bookList.push(new book("Find Me", "Andre Aciman", 700, true))


//Rendering Book's details
addBookToLibrary()
countReadBooks();





