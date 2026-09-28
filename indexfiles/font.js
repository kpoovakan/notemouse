"use strict";
const fonts = [
    '"Amaranth", sans-serif;',
    '"Caveat", cursive;',
    '"Lexend", sans-serif;',
    '"Redacted Script", cursive;',
    '"Share Tech", sans-serif;'
];

window.addEventListener("load", function() {
    var font = window.localStorage.getItem("notemouseFont");
    var font = Number(font);
    useFont(font);
});

function setFont(font) {
    if (typeof font !== "number") return;
    window.localStorage.setItem("notemouseFont", font);
    useFont(font);
}

function useFont(font) {
    if (typeof font !== "number") return;
    const toSet = fonts[font];
    //console.log(toSet);
    document.documentElement.style.setProperty("--font", toSet);
}