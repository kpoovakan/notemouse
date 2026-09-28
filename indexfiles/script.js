"use strict";
const textarea = document.getElementById("textarea");

window.addEventListener("load", function() {
    let commandsSeen = window.localStorage.getItem("notemouseCommands");
    commandsSeen = Number(commandsSeen);
    if (commandsSeen !== 1) {
        window.localStorage.setItem("notemouseCommands", 1);
        showCommands();
    }

    const localText = window.localStorage.getItem("notemouse");
    if (localText == null || localText == undefined || localText == "" || localText == "<br>") return;
    textarea.innerHTML = localText;
});

document.addEventListener("focusin", (e) => {
    if (e.target !== textarea) {
        e.stopImmediatePropagation();
        textarea.focus();
    }
}, true);
document.addEventListener("click", function() {
    textarea.focus();
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
        document.getElementById("changes").innerHTML = "changes saved!";
    }
    if (e.key.toLowerCase() === "q") {
        e.preventDefault();
        const commands = document.getElementById("help");
        if (commands.style.display == "block") {
            hideCommands();
        } else {
            showCommands();
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
    window.focus();
    textarea.focus();
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

function hideCommands() {
    document.getElementById("help").style.display = "none";
}
function showCommands() {
    document.getElementById("help").style.display = "block";
}

function changesNotSaved() {
    document.getElementById("changes").innerHTML = "CTRL+A to save your changes";
}