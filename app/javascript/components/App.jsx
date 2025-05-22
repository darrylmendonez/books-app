import React, { useEffect, useState } from 'react';
import { BooksList } from "./BookList"
import { BookForm } from "./BookForm"

const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchBooks = async () => {
        console.log('fetchBooks fired');
        const res =  await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
        console.log('Books fetched');
        console.log('Books: ', data);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div style={{ padding: "1rem"}}>
            <h1>Book CRUD App</h1>
            <BookForm book={selectedBook} fetchBooks={fetchBooks} setSelectedBook={setSelectedBook}/>
            <BooksList books={books} fetchBooks={fetchBooks} setBooks={setBooks} setSelectedBook={setSelectedBook} />
        </div>
    );
};

export default App;
