//this file creates an event listener handling smooth scrolling of anchors

import Cookies from "js-cookie";

const languageButton = (button, polishElements, englishElements) => {
  const polishButton = document.getElementById("pl");
  const englishButton = document.getElementById("en");

  const toggle = (el) => {
    if (el.nodeName === "HTML") return;
    if (el.classList.contains("hide")) {
      el.classList.remove("hide");
    } else {
      el.classList.add("hide");
    }
  };

  button.addEventListener("click", (e) => {
    e.preventDefault();

    polishElements.forEach((el) => toggle(el));
    englishElements.forEach((el) => toggle(el));

    if (Cookies.get("lang") === "en") {
      Cookies.set("lang", "pl", { expires: 7 });
      polishButton.classList.add("button__lang--chosen");
      englishButton.classList.remove("button__lang--chosen");
    } else {
      Cookies.set("lang", "en", { expires: 7 });
      englishButton.classList.add("button__lang--chosen");
      polishButton.classList.remove("button__lang--chosen");
    }
  });

  button.removeAttribute("disabled");
};

export default languageButton;
