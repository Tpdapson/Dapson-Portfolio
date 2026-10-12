// Shared by the server layout and the client toggle (no "use client" here).

/** localStorage key for the visitor's chosen theme. */
export const THEME_KEY = "theme";

/** Runs in <head> before the page paints, so a saved dark theme doesn't flash light. */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;
