function getBooksFromStorage() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books;
}

function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

window.onload = function () {
    const books = getBooksFromStorage();
    books.forEach(book => {
        const shelfId = book.isComplete ? 'selesai' : 'belumSelesai';
        addBookToShelf(book, shelfId);
    });
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value); // mengganti string ke Int dengan parseInt
    const isComplete = document.getElementById('isComplete').value === 'true';

    if (!title || !author || isNaN(year)) {
        alert("Harap isi semua field sebelum menambahkan buku dan pastikan tahun adalah angka.");
        return;
    }

    const book = { id: generateId(), title, author, year, isComplete };
    const books = getBooksFromStorage();
    books.push(book);
    saveBooksToStorage(books);

    const shelfId = isComplete ? 'selesai' : 'belumSelesai';
    addBookToShelf(book, shelfId);

    clearForm();
}
function addBookToShelf(book, shelfId) {
    const shelf = document.getElementById(shelfId);

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('bookContainer');
    bookContainer.id = book.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerText = 'Hapus Buku';
    deleteBtn.onclick = function () {
        deleteBook(bookContainer, shelfId);
    };

    const toggleStatusBtn = document.createElement('button');
    toggleStatusBtn.classList.add('toggleStatusBtn');
    toggleStatusBtn.innerText = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    toggleStatusBtn.onclick = function () {
        toggleStatus(book, bookContainer, shelfId);
    };

    const bookInfo = document.createElement('div');
    const status = book.isComplete ? 'Selesai Dibaca' : 'Belum selesai dibaca';

    bookInfo.innerHTML = `<h3>${book.title}</h3>
                         <p>Penulis: ${book.author}</p>
                         <p>Tahun: ${book.year}</p>
                         <p>Status: ${status}</p>`;

    bookContainer.appendChild(bookInfo);
    bookContainer.appendChild(deleteBtn);
    bookContainer.appendChild(toggleStatusBtn);

    shelf.appendChild(bookContainer);
}

function toggleStatus(book, bookContainer, shelfId) {
    const newStatus = !book.isComplete;
    book.isComplete = newStatus;

    const shelf = document.getElementById(shelfId);
    shelf.removeChild(bookContainer);

    const books = getBooksFromStorage();
    const updatedBooks = books.map(b => (b.id === book.id ? book : b));
    saveBooksToStorage(updatedBooks);

    const newShelfId = newStatus ? 'selesai' : 'belumSelesai';
    addBookToShelf(book, newShelfId);
}

function deleteBook(bookContainer, shelfId) {
    const isConfirmed = confirm("Apakah Anda yakin ingin menghapus buku?");
    
    if (isConfirmed) {
        const shelf = document.getElementById(shelfId);
        shelf.removeChild(bookContainer);

        const books = getBooksFromStorage();
        const updatedBooks = books.filter(b => b.id !== bookContainer.id);
        saveBooksToStorage(updatedBooks);
    }
}


function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isComplete').value = 'false';
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function searchBooks() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const books = getBooksFromStorage();

    const belumlahSelesai = document.getElementById('belumSelesai');
    const selesai = document.getElementById('selesai');

    belumlahSelesai.innerHTML = '<h2>Belum Selesai Dibaca</h2>';
    selesai.innerHTML = '<h2>Selesai Dibaca</h2>';

    books.forEach(book => {
        const title = book.title.toLowerCase();
        if (title.includes(searchInput)) {
            const shelfId = book.isComplete ? 'selesai' : 'belumSelesai';
            addBookToShelf(book, shelfId);
        }
    });
}