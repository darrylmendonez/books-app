import React, {useState, useEffect } from "react";

export const BookForm = ({ book, onSaved }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        setTitle(book?.title || '');
        setAuthor(book?.author || '');
        setDescription(book?.description || '');
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('book: ', book);
        const method = book ? 'PATCH' : 'POST'
        console.log('method: ', method);
        const url = book
            ? `/api/books/${book.id}`
            : '/api/books/';
        console.log('url: ', url);
        const payload = {
            book:
                {
                    title,
                    author,
                    description
                }
        };
        console.log(' payload :>> ', payload);

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.log('res -> ', res)
        if (res.ok) {
            onSaved();
        } else {
            let err;
            try {
                err = await res.json();
            } catch (e) {
                console.error("Failed to parse error response:", e);
                const text = await res.text();
                console.error("Raw response body:", text);
                return;
            }
            console.error("Failed to save book:", err.errors);
            setError(err.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{book ? "Edit Book" : "Add Book"}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
            </div>
            <div>
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    required
                />
            </div>
            <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">{book ? "Update Book" : "Add Book"}</button>
        </form>
    )
}
