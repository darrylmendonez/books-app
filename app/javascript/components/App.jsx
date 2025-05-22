import React, { useEffect, useState } from 'react';
import { BooksList } from "./BookList"
import { BookForm } from "./BookForm"

const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        console.log('fetchBooks fired');
        const res =  await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
        console.log('Books fetched');
        console.log('Books: ', data);
    }

    const handleDelete = async  (id) => {
        console.log("Deleting book with ID:", id);
        fetch(`/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => {
                fetchBooks(); // Refresh the list
                console.log(`Book with ${id} has been deleted`);
            })
            .catch((err) => {
                setError(err.message)
                console.error(`Delete error: ${err}`)
            });
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
    };

    const handleBookSaved = () => {
        setSelectedBook(null);
        fetchBooks();
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div style={{ padding: "1rem"}}>
            <h1>Book CRUD App</h1>
            <BookForm book={selectedBook} onSaved={handleBookSaved} onBookCreated={fetchBooks} />
            <BooksList books={books} onDelete={handleDelete} onEdit={handleEdit} setBooks={setBooks} />
        </div>
    );
};

export default App;
