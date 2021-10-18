// this file handles the switching of languages
// function in this file is triggered by event listener in /src/js/event/languageButton.js

//import chooseLang helper for cleaner code
import chooseLang from "../helpers/chooseLang";

// constant variables for error reduction
const PL = "PL",
  EN = "EN";

const language = (storage) => {
  const button = document.getElementById("switch-language"),
    cookieLang = storage.get("lang");
  const buttons = {
    en: document.getElementById("en"),
    pl: document.getElementById("pl"),
  };
  const elements = {
    en: document.querySelectorAll('[lang="en"]'),
    pl: document.querySelectorAll('[lang="pl"]'),
  };

  // initially disable language switching button this will be enabled by chooseLang function after everything is set up
  button.setAttribute("disabled", "disabled");

  if (cookieLang) {
    if (cookieLang === PL) {
      chooseLang(button, buttons.pl, elements.pl, elements.en);
    } else {
      chooseLang(button, buttons.en, elements.en, elements.pl);
    }
  } else {
    // check users language using the navigator.language property, docs: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    if (/^pl\b/.test(navigator.language)) {
      chooseLang(button, buttons.pl, elements.pl, elements.en, {
        storage,
        langCookie: PL,
      });
    } else {
      chooseLang(button, buttons.en, elements.en, elements.pl, {
        storage,
        langCookie: EN,
      });
    }
  }
};

export default language;
