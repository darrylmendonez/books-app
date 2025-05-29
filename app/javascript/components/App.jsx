import React, { useEffect, useState } from 'react';
import { BooksList } from "./BookList"
import { BookForm } from "./BookForm"

const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async (searchQuery = "") => {
        const url = searchQuery
            ? `http://localhost:5000/api/books?search=${encodeURIComponent(searchQuery)}`
            : "http://localhost:5000/api/books";
        setLoading(true);
        try {
            const res =  await fetch(url);
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
