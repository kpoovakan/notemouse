"use strict";
const textarea = document.getElementById("textarea");

window.addEventListener("load", function() {
    const localText = window.localStorage.getItem("notemouse");
    if (localText == null || localText == undefined || localText == "" || localText == "<br>") return;
    textarea.innerHTML = localText;
});

document.addEventListener("keydown", function(e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        const text = textarea.innerHTML;
        downloadAsFile(text, "notemouse.md");
    }
    if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        window.localStorage.setItem("notemouse", textarea.innerHTML);
    }
    if (e.key.toLowerCase() === "q") {
        e.preventDefault();
        const dialog = document.getElementById("help");
        if (dialog.open) {
            dialog.close();
        } else {
            dialog.showModal();
        }
    }
    if (e.key.toLowerCase() === "y") {
        e.preventDefault();
        let current = window.localStorage.getItem("notemouseTheme");
        if (current == "dark") {
            setTheme("light")
        } else if (current == "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }
});

function downloadAsFile(content, filename, contentType = "text/plain") {
    const blob = new Blob([content], { type: contentType });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
}