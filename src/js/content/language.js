// this file handles the switching of languages
// function in this file is triggered by event listener in /src/js/event/languageButton.js

import locationAPI from "../api/location";
import chooseLang from "../helpers/chooseLang";
import error from "../helpers/error";

// constant variables for error reduction
const PL = "PL",
  EN = "EN";

const language = (storage) => {
  // dom element grabbers
  const button = document.getElementById("switch-language"),
    lang = storage.get("lang");
  const buttons = {
    en: document.getElementById("en"),
    pl: document.getElementById("pl"),
  };
  const elements = {
    en: document.querySelectorAll('[lang="en"]'),
    pl: document.querySelectorAll('[lang="pl"]'),
  };

  // Initially disable language switching button. This will be enabled by chooseLang function after everything is set up
  button.setAttribute("disabled", "disabled");

  // Check if language cookie already exists.
  if (lang) {
    if (lang === PL) {
      chooseLang(button, buttons.pl, elements.en, elements.pl);
    } else {
      chooseLang(button, buttons.en, elements.pl, elements.en);
    }
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { lat, lng } }) => {
          //make the api call for users country
          const country = await locationAPI(lat, lng);

          if (country === PL) {
            chooseLang(button, buttons.pl, elements.en, elements.pl, {
              storage,
              langCookie: PL,
            });
          } else {
            chooseLang(button, buttons.en, elements.pl, elements.en, {
              storage,
              langCookie: EN,
            });
          }
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            error("Permission denied. Defaulting to English!");
          } else {
            error("Unknown error. Defaulting to English!");
          }
          chooseLang(button, buttons.en, elements.pl, elements.en, {
            storage,
            langCookie: EN,
          });
        }
      );
    } else {
      chooseLang(button, buttons.en, elements.pl, elements.en, {
        storage,
        langCookie: EN,
      });
    }
  }
};

export default language;
