// this file handles the switching of languages
// function in this file is triggered by event listener in /src/js/event/languageButton.js

import locationAPI from "../api/location";
import languageButton from "../event/languageButton";
import work from "./work";
import Cookies from "js-cookie";

const hide = (elArray) =>
  elArray.forEach((el) => {
    if (el.nodeName === "HTML") return;
    el.classList.add("hide");
  });

export default (async () => {
  await work();

  const button = document.getElementById("switch-language");
  const polishButton = document.getElementById("pl");
  const englishButton = document.getElementById("en");

  // Initially disable language switching button. This will be enabled by languageButton function
  button.setAttribute("disabled", "disabled");

  const polishElements = document.querySelectorAll('[lang="pl"]');
  const englishElements = document.querySelectorAll('[lang="en"]');

  // Check if language cookie already exists.
  if (Cookies.get("lang")) {
    const lang = Cookies.get("lang");
    if (lang === "pl") {
      hide(englishElements);
      polishButton.classList.add("button__lang--chosen");
      languageButton(button, polishElements, englishElements);
    } else {
      hide(polishElements);
      englishButton.classList.add("button__lang--chosen");
      languageButton(button, polishElements, englishElements);
    }
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const country = locationAPI(latitude, longitude);

          if (country === "Poland") {
            hide(englishElements);
            polishButton.classList.add("button__lang--chosen");
            Cookies.set("lang", "pl", { expires: 7 });
            languageButton(button, polishElements, englishElements);
          } else {
            hide(polishElements);
            englishButton.classList.add("button__lang--chosen");
            Cookies.set("lang", "en", { expires: 7 });
            languageButton(button, polishElements, englishElements);
          }
        },
        (error) => {
          if (error.code == error.PERMISSION_DENIED) {
            console.error("Permission denied. Defaulting to English!");
          } else {
            console.error("Unknown error. Defaulting to English!");
          }
          hide(polishElements);
          englishButton.classList.add("button__lang--chosen");
          Cookies.set("lang", "en", { expires: 7 });
          languageButton(button, polishElements, englishElements);
        }
      );
    } else {
      // geolocation IS NOT available
      hide(polishElements);
      englishButton.classList.add("button__lang--chosen");
      Cookies.set("lang", "en", { expires: 7 });
      languageButton(button, polishElements, englishElements);
    }
  }
})();
