"use strict";
// each array lists foreground, accent, then background
const darkMode = [
    "#EBEBEB",
    "#FFF8EB",
    "#1F1F1F",
];
const lightMode = [
    "#1F1F1F",
    "#523500",
    "#EBEBEB"
];
const stylesheet = document.documentElement.style;

window.addEventListener("load", function() {
    var theme = window.localStorage.getItem("notemouseTheme");
    useTheme(theme);
});

function setTheme(theme) {
    if (typeof theme !== "string") return;
    window.localStorage.setItem("notemouseTheme", theme);
    useTheme(theme);
}

function useTheme(theme) {
    if (theme == null || theme == undefined || theme == "") return;
    if (typeof theme !== "string") return;

    if (theme == "dark") {
        var array = darkMode;
    } else if (theme == "light") {
        var array = lightMode;
    } else {
        return;
    }
    
    const background = array[2];
    const accent = array[1];
    const foreground = array[0];

    stylesheet.setProperty("--colorBackground", background);
    stylesheet.setProperty("--colorForeground", foreground);
    stylesheet.setProperty("--colorAccent", accent);
}