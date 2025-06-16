import React, { useState } from "react";
import BookSearch from "./BookSearch";

export const BooksList = ({
                              books,
                              fetchBooks,
                              setBooks,
                              setSelectedBook,
                              sortBy,
                              setSortBy,
                              sortDir,
                              setSortDir,
}) => {
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
                headers: { Accept: 'application/json' },
            });

            if (response.ok) {
                fetchBooks(); // ✅ use the stable version, no args
            } else {
                setError("Failed to delete book");
            }
        } catch (err) {
            setError(err.message);
            console.error(`Delete error: ${err}`);
        }
    };


    const handleEdit = (book) => {
        setSelectedBook(book);
    };

    return (
        <div>
            <h2>All Books</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <BookSearch onSearch={fetchBooks} />
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label>
                    Sort by:{" "}
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="created_at">Date Created</option>
                    </select>
                </label>

                <label>
                    Direction:{" "}
                    <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <ul>
                <hr/>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author}
                        <button onClick={() => handleEdit(book)} style={{ marginLeft: "1rem"}}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(book.id)} style={{marginLeft: "0.5rem"}}>
                            Delete
                        </button>
                        <br/>
                        <br/>
                        <ul>
                            <li>{book.description}</li>
                        </ul>
                        <br/>
                        <hr/>
                    </li>
                ))}
            </ul>
        </div>
    );
};
