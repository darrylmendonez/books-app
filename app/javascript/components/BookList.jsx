import React from "react";

export const BooksList = ({ books, onDelete, onEdit }) => (
    <div>
        <h2>All Books</h2>
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
