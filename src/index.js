// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from "./app";
//
// ReactDOM.render(
//     <App />,
//     document.getElementById("root")
// );
//
// Override `console.log()`
// const console = {
//     log: function (...args) {
//         return ipcRenderer.invoke("console", args)[0];
//     }
// };
//
// function quit() {
//     return ipcRenderer.invoke("app", "quit")[0];
// }

// Show served page
window.addEventListener("load", async function () {
    let { ipcRenderer } = await import("electron-better-ipc");
    ipcRenderer.on("request", function (event, req, port) {
        const doc = document.implementation.createHTMLDocument(req);
        const h1 = doc.createElement("h1");
        h1.textContent = "Hello DOM: " + req;
        doc.body.appendChild(h1);
        ipcRenderer.send(port, 200, {"content-type": "text/html;charset=UTF-8"}, doc.documentElement.outerHTML);
        // ipcRenderer.send(port, 200, {"content-type": "text/html;charset=UTF-8"}, (
        //         <App />
        // ));
    });
}, false);
