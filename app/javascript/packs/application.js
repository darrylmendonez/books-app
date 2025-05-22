import React from "react";
import ReactDOM from "react-dom/client";

import App from "../components/App"; // You'll create this

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("root");
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
});
