"use strict"

let libraryBooks = [
    { title: "The Road Ahead", author: "Bill Gates", ID: 1235 },
    { title: "Walter Isaacson", author: "Steve Jobs", ID: 4268 },
    { title: "The Road Ahead", author: "Bill Gates", ID: 4268 },
    { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", ID: 3257 }
];

// add book
function addBook(title, author, ID) {
    const exists = libraryBooks.some(book => book.ID === ID)
    if (!exists) {
        newBook = { title, author, ID}
        libraryBooks.push(newBook)
        return newBook
    }
    else {
        console.log(`Book with ID ${ID} already exists`)
        return null
    }
}

// get book titles
function getTitles() {
    return libraryBooks.map(book => book.title).sort()
}

// find books
function findBooks(keyword) {
    return libraryBooks.filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()))
                .sort((b1, b2) => b1.ID - b2.ID)
}

// add book
newBook = addBook("Web Application Programming", "Anna", 1)
console.log(newBook)
console.log(libraryBooks)

// get titles
console.log(getTitles())

// find books
console.log(findBooks('final'))