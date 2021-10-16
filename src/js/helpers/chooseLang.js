import languageButton from "../event/languageButton";
import hide from "./hide";

const chooseLang = (
  button,
  langButton,
  hiddenElements,
  chosenElements,
  { storage = "", langCookie = "" } = {}
) => {
  hide(hiddenElements);
  langButton.classList.add("button__lang--chosen");
  languageButton(button, hiddenElements, chosenElements);
  if (langCookie) storage.set("lang", langCookie, { expires: 7 });
};

export default chooseLang;
