const myLibrary = [];


class Book{
    constructor(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let hobbit = new Book("The Hobbit","J.R.R Tolkien", 295, false);
myLibrary.push(hobbit);

function addBook(newBook){
     // Check if a book with the same title and author already exists
     const existingBook = myLibrary.find(book => book.title === newBook.title && book.author === newBook.author);

     if (existingBook){
         alert(newBook.title + " by " + newBook.author + " Already exists");
         return;
     } else {
         myLibrary.push(newBook);
     }
    
}

function delBook(event){
    event.preventDefault();
    let removeBookInput = document.getElementById('rem-title');
    let removeBook = removeBookInput.value;

    const existingBook = myLibrary.findIndex(book => book.title === removeBook);

    if (existingBook !== -1){
        myLibrary.splice(existingBook,1);
        console.log(removeBook + `removed from the library`);
        populateTable();
        removeBookInput.value = '';
    } else{
        alert(removeBook + " does not exists");
        removeBookInput.value = '';
        return;
    }

}

function createBook(event){
    event.preventDefault();

    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');
    let pagesInput = document.getElementById('pages');
    let checkboxInput = document.getElementById('checkbox');

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = checkboxInput.checked;

    title = new Book (title,author,pages,read);
    addBook(title);

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    checkboxInput.checked = false;

    populateTable();
}

function populateTable(){
    const table = document.getElementById('main-table');

    while (table.rows.length > 1){
        table.deleteRow(1);
    }

    myLibrary.forEach((book)=>{
        const row = table.insertRow(-1);
        row.classList.add('table-row');

        const titleCell = row.insertCell(0);
        const authorCell = row.insertCell(1);
        const pagesCell = row.insertCell(2);
        const readCell = row.insertCell(3);
        
        const checkbox = document.createElement('input');
        checkbox.type ='checkbox';
        checkbox.checked = book.read;

        if(checkbox.checked){
            row.classList.add('checked-row');
        }

        checkbox.addEventListener('click', () =>{
            row.classList.toggle('checked-row');
            book.read = checkbox.checked;
        })

        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages;
        readCell.appendChild(checkbox);
    });
}

const addButton = document.getElementById('add-button');
addButton.addEventListener('click',event =>{
    createBook(event);
});

const remButton = document.getElementById('rem-button');
remButton.addEventListener('click',event=>{
    delBook(event);
})

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', populateTable);


window.addEventListener('load', populateTable);

