import React, { useEffect, useState } from 'react';
import { BooksList } from "./BookList"
import { BookForm } from "./BookForm"

const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res =  await fetch("/api/books");
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            console.error("Failed to fetch books: ", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div style={{ padding: "1rem"}}>
            <h1>Book CRUD App</h1>
            {loading ? (
                <p>Loading books...</p>
            ) : (
                <>
                    <BookForm book={selectedBook} fetchBooks={fetchBooks} setSelectedBook={setSelectedBook}/>
                    <BooksList books={books} fetchBooks={fetchBooks} setBooks={setBooks} setSelectedBook={setSelectedBook} />
                </>
            )}
        </div>
    );
};

export default App;
