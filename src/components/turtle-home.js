import React from "react";
import Split from "react-split";
import "./turtle-home.css";

export default function TurtleHome() {
    return (
        <Split className="split" sizes={[80, 20]}>
            <div>
                Hello
            </div>
            <div>
                World
            </div>
        </Split>
    );
}
