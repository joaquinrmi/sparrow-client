import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

const container = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(container);

root.render(<BrowserRouter>
    <App />
</BrowserRouter>);