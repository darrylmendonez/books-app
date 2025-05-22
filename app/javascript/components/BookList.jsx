import React, { useEffect, useState } from "react";

export const BooksList = ({ books, onDelete, onEdit, setBooks }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/books')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                return response.json();
            })
            .then((data) => setBooks(data))
            .catch((err) => setError(err.message));
    }, [])

    return (
        <div>
            <h2>All Books</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author}
                        <button onClick={() => onEdit(book)} style={{ marginLeft: "1rem"}}>
                            Edit
                        </button>
                        <button onClick={() => onDelete(book.id)} style={{marginLeft: "0.5rem"}}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
