import React, {useState, useEffect } from "react";

export const BookForm = ({ book, fetchBooks, setSelectedBook }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setTitle(book?.title || '');
        setAuthor(book?.author || '');
        setDescription(book?.description || '');
    }, [book]);

    const handleBookSaved = () => {
        setSelectedBook(null);
        fetchBooks();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors(null);

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
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                handleBookSaved();
                setTitle('');
                setAuthor('');
                setDescription('');
            } else {
                const data = await res.json();
                setErrors(data.errors || "Failed to save book");
            }
        } catch (e) {
            console.error("Submission error: ", e)
            setErrors("Unexpected error occurred");
        } finally {
            setSubmitting((false));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{book ? "Edit Book" : "Add Book"}</h2>
            {errors?.map((error, idx) => <p key={`${error}-${idx}`} style={{ color: 'red' }}>{error}</p>)}
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
            <button disabled={submitting} type="submit">{book ? "Update Book" : "Add Book"}</button>
        </form>
    )
}
