
  try {
    importScripts("https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js");
  } catch (e) {
    console.error(e);
  }
  try {
    importScripts("https://www.gstatic.com/firebasejs/7.9.2/firebase-database.js");
  } catch (e) {
    console.error(e);
  }
  try {
    importScripts("background.js");
  } catch (e) {
    console.error(e);
  }