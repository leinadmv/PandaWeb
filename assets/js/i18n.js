async function loadLocale(lang) {
  const response = await fetch(`./assets/locales/${lang}.json`);
  return await response.json();
}


async function changeLang(lang) {
  const resources = await loadLocale(lang);

  // Guardar idioma en localStorage
  localStorage.setItem("lang", lang);

  // Actualizar contenido
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = resources;
    keys.forEach(k => text = text[k]); // navega el JSON
    if (text) el.innerHTML = text;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Verificar si hay idioma guardado
  let lang = localStorage.getItem("lang");

  // 2. Si no, usar idioma del navegador
  if (!lang) {
    const browserLang = navigator.language || navigator.userLanguage; // ej: "es-CO" o "en-US"
    lang = browserLang.startsWith("es") ? "es" : "en"; // aquí decides qué idiomas soportas
  }

  changeLang(lang);

  document.querySelectorAll(".submenu ul li[data-lang]").forEach(item => {
    item.addEventListener("click", () => {
      const selectedLang = item.getAttribute("data-lang");
      changeLang(selectedLang);
    });
  });
});




