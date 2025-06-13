import React, { useEffect, useState } from "react";
import BookSearch from "./BookSearch";

export const BooksList = ({ books, fetchBooks, setBooks, setSelectedBook }) => {
    const [error, setError] = useState(null);

    const handleDelete = async  (id) => {
        fetch(`/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => {
                fetchBooks(); // Refresh the lis
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
            <BookSearch onSearch={fetchBooks} />
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
