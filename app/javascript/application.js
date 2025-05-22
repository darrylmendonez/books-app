import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

console.log('applications.js fired');
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
