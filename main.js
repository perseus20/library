const submit = document.querySelector('.submit')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const form = document.querySelector('form')
const books = document.querySelector('.books')
const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book)
}

function displayBooks() {
  let index = 0
  books.textContent = ''
  for (let book of myLibrary) {
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    const au = document.createElement('p')
    const pa = document.createElement('p')
    const read = document.createElement('p')
    const btn = document.createElement('button')
    div.classList.add('book')
    div.setAttribute('data-index', index)
    index++
    btn.classList.add('btn')
    btn.addEventListener('click', function () {
      myLibrary.splice(div.dataset.index, 1)
      books.removeChild(div)
      displayBooks()
      console.log(myLibrary)
    })
    h4.textContent = 'Title ' + book.title
    au.textContent = 'Author: ' + book.author
    pa.textContent = 'Pages: ' + book.pages
    btn.textContent = 'Remove'
    // readtext = book.read ? 'finished' : 'not yet'
    read.textContent = 'Read: ' + (book.read ? 'finished' : 'not yet')
    div.appendChild(h4)
    div.appendChild(au)
    div.appendChild(pa)
    div.appendChild(read)
    div.appendChild(btn)
    books.appendChild(div)
  }
}
function displayLibary() {
  for (let book of myLibrary) {
    displayBooks(book)
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  addBookToLibrary(title.value, author.value, pages.value, read.checked)
  title.value = ''
  author.value = ''
  pages.value = ''
  read.checked = false
  displayBooks()
  console.log(myLibrary)
})
