const submit = document.querySelector('.submit')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const form = document.querySelector('form')
const books = document.querySelector('.books')

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
  changeRead(value) {
    return (this.read = value)
  }
}

class Library {
  constructor() {
    this._library = []
  }

  get library() {
    return this._library
  }

  addBookToLibrary(book) {
    this._library.push(book)
  }
}

const Run = (() => {
  const library = new Library()

  form.addEventListener('submit', getForm)

  function getForm(e) {
    e.preventDefault()
    const book = new Book(title.value, author.value, pages.value, read.checked)
    library.addBookToLibrary(book)
    Display.displayClearInput()
    Display.displayLibrary(library.library)
  }
})()

const Display = (() => {
  const displayClearInput = () => {
    title.value = ''
    author.value = ''
    pages.value = ''
    read.checked = false
  }

  const displayLibrary = (myLibrary) => {
    let index = 0
    books.textContent = ''
    for (let book of myLibrary) {
      const div = document.createElement('div')
      const h4 = document.createElement('h4')
      const au = document.createElement('p')
      const pa = document.createElement('p')
      const read = document.createElement('button')
      const btn = document.createElement('button')
      div.classList.add('book')
      div.setAttribute('data-index', index)
      index++
      btn.classList.add('btn')
      read.classList.add('btn')
      btn.addEventListener('click', function () {
        myLibrary.splice(div.dataset.index, 1)
        books.removeChild(div)
        displayLibrary(myLibrary)
      })
      read.addEventListener('click', function () {
        book.changeRead(!book.read)
        if (book.read) {
          read.textContent = 'Finished'
          read.style.backgroundColor = '#0ea5e9'
        } else {
          read.textContent = 'Not yet'
          read.style.backgroundColor = 'red'
        }
      })
      h4.textContent = 'Title ' + book.title
      au.textContent = 'Author: ' + book.author
      pa.textContent = 'Pages: ' + book.pages
      btn.textContent = 'Remove'
      console.log(book.read)
      if (book.read) {
        read.textContent = 'Finished'
      } else {
        read.textContent = 'Not yet'
        read.style.backgroundColor = 'red'
      }
      div.appendChild(h4)
      div.appendChild(au)
      div.appendChild(pa)
      div.appendChild(read)
      div.appendChild(btn)
      books.appendChild(div)
    }
  }
  return { displayClearInput, displayLibrary }
})()
