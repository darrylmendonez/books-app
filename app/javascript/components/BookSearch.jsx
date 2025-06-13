import React, { useState } from "react";

export default function BookSearch({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query)
    };

    return (
        <div>
            <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title"
                type="text"
                value={query}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
