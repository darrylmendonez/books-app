import React, {useState, useEffect } from "react";

export const BookForm = ({ book, fetchBooks, setSelectedBook }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        console.log('success: --> ', success)
    }, [success]);

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
        const url = book
            ? `/api/books/${book.id}`
            : '/api/books/';
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
                setTitle('');
                setAuthor('');
                setDescription('');
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    handleBookSaved();
                }, 3000);
            } else {
                let data;
                try {
                    data = await res.json();
                    const err = typeof data.errors === 'object' ? data.errors : {
                        general: ["Failed to save book"]
                    };
                    setErrors(err);
                } catch {
                    setErrors({
                        general: ["Server returned an unexpected response"]
                    });
                }
            }
        } catch (e) {
            console.error("Submission error: ", e)
            setErrors({
                general: ["Unexpected error occurred"]
            });
        } finally {
            setSubmitting((false));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{book ? "Edit Book" : "Add Book"}</h2>
            {errors?.general?.map((error, idx) => (
                <p key={`general-${idx}`} style={{ color: 'red' }}>{error}</p>)
            )}
            <div>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                {errors?.title?.map((error, idx) => (
                    <p key={`title-${idx}`} style={{ color: 'red' }}>{error}</p>
                ))}
            </div>
            <div>
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                />
                {errors?.author?.map((error, idx) => (
                    <p key={`author-${idx}`} style={{ color: 'red' }}>{error}</p>
                ))}
            </div>
            <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors?.description?.map((error, idx) => (
                    <p key={`desc-${idx}`} style={{ color: 'red' }}>{error}</p>
                ))}
            </div>
            <button disabled={submitting} type="submit">{book ? "Update Book" : "Add Book"}</button>
            {submitting && <p>Saving book...</p>}
            {success && <p style={{ color: "green" }}>Book saved!</p>}
        </form>
    )
}
