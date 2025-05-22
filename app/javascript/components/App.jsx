import React, { useEffect, useState } from 'react';
import { BooksList } from "./BookList"
import { BookForm } from "./BookForm"

const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchBooks = async () => {
        const res =  await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
    }

    const handleDelete = async  (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this book?");
        if (!confirmed) return;

        const res = await fetch(`/books/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            setBooks((prev) => prev.filter((book) => book.id !== id));
        } else {
            console.error("Failed to delete book");
        }
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
            <BooksList books={books} onDelete={handleDelete} onEdit={handleEdit}/>
        </div>
    );
};

export default App;
