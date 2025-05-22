import React, { useEffect, useState } from "react";

export const BooksList = ({ books, fetchBooks, setBooks, setSelectedBook }) => {
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

    return (
        <div>
            <h2>All Books</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author}
                        <button onClick={() => handleEdit(book)} style={{ marginLeft: "1rem"}}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(book.id)} style={{marginLeft: "0.5rem"}}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
