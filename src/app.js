import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import TurtleHome from "./components/turtle-home";

export default function App() {
    return (
        <div>
            <div className="container-fluid mt-3">
                <TurtleHome />
            </div>
        </div>
    );
}
