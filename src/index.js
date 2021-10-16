// libraries
import Cookies from "js-cookie";
// styles
import "./scss/main.scss";
// api
import "./js/api/githubRepos";
import "./js/api/location";
// event listeners
import "./js/event/scroll";
import "./js/event/languageButton";
// content
import work from "./js/content/work";
import stickyNav from "./js/content/stickyNav";
import language from "./js/content/language";

const storage = Cookies;

(async () => {
  await work();
  await language(storage);
  stickyNav();
})();
