import React, {useCallback, useEffect, useState} from 'react';
import {BooksList} from "./BookList"
import {BookForm} from "./BookForm"

const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("title");
    const [sortDir, setSortDir] = useState("asc");

    const fetchBooks = useCallback(async (searchQuery = "") => {
        let url = 'http://localhost:5000/api/books';
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append("search", searchQuery);
        queryParams.append("sort", sortBy);
        queryParams.append("direction", sortDir);
        url += `?${queryParams.toString()}`;
        console.log("Fetching:", url);
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            console.error("Failed to fetch books: ", err);
        } finally {
            setLoading(false);
        }
    }, [sortBy, sortDir]);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [sortBy, sortDir]);

    return (
        <div style={{ padding: "1rem"}}>
            <h1>Book CRUD App</h1>
            {loading ? (
                <p>Loading books...</p>
            ) : (
                <>
                    <BookForm
                        book={selectedBook}
                        fetchBooks={fetchBooks}
                        setSelectedBook={setSelectedBook}
                    />
                    <BooksList
                        books={books}
                        fetchBooks={fetchBooks}
                        setBooks={setBooks}
                        setSelectedBook={setSelectedBook}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortDir={sortDir}
                        setSortDir={setSortDir}
                    />
                </>
            )}
        </div>
    );
};

export default App;
