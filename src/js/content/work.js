import githubReposAPI from "../api/githubRepos";
import "regenerator-runtime/runtime";

const work = async () => {
  const parent = document.getElementsByClassName("work__content")[0];

  const data = await githubReposAPI();
  data
    .sort((a, b) => b.id - a.id)
    .forEach(
      ({ name, description, html_url, homepage, topics, stargazers_count }) => {
        if (stargazers_count > 0) {
          const child = document.createElement("article");
          child.classList.add("work__article");

          const title = document.createElement("h3");
          title.innerHTML = name.replace(/-/g, " ");

          const desc = document.createElement("p");
          desc.innerHTML = description;

          const usedTechs = document.createElement("div");

          const usedTechsTitlePL = document.createElement("h4");
          usedTechsTitlePL.setAttribute("lang", "pl");
          usedTechsTitlePL.innerHTML = "Użyte technologie: ";

          const usedTechsTitleEN = document.createElement("h4");
          usedTechsTitleEN.setAttribute("lang", "en");
          usedTechsTitleEN.innerHTML = "Used technologies: ";

          const usedTechsList = document.createElement("ul");
          topics.forEach((topic) => {
            const topicElement = document.createElement("li");
            topicElement.innerHTML = topic.replace(/-/g, " ");
            usedTechsList.appendChild(topicElement);
          });

          usedTechs.append(usedTechsTitlePL, usedTechsTitleEN, usedTechsList);

          const cta = document.createElement("div");
          cta.classList.add("cta");

          const gitLink = document.createElement("a");
          gitLink.setAttribute("href", html_url);
          gitLink.setAttribute("target", "_blank");
          gitLink.setAttribute("rel", "noopener noreferrer");

          const gitButtonPL = document.createElement("button");
          gitButtonPL.setAttribute("lang", "pl");
          gitButtonPL.classList.add("cta__link");
          gitButtonPL.innerHTML = "Repozytorium na Github";
          gitLink.appendChild(gitButtonPL);

          const gitButtonEN = document.createElement("button");
          gitButtonEN.setAttribute("lang", "en");
          gitButtonEN.classList.add("cta__link");
          gitButtonEN.innerHTML = "Github repo";
          gitLink.appendChild(gitButtonEN);

          const webLink = document.createElement("a");
          webLink.setAttribute("href", homepage);
          webLink.setAttribute("target", "_blank");
          webLink.setAttribute("rel", "noopener noreferrer");

          const webButtonPL = document.createElement("button");
          webButtonPL.setAttribute("lang", "pl");
          webButtonPL.classList.add("cta__link");
          webButtonPL.innerHTML = "Odwiedź stronę";
          webLink.appendChild(webButtonPL);

          const webButtonEN = document.createElement("button");
          webButtonEN.setAttribute("lang", "en");
          webButtonEN.classList.add("cta__link");
          webButtonEN.innerHTML = "Visit website";
          webLink.appendChild(webButtonEN);

          cta.append(gitLink, webLink);
          child.append(title, desc, usedTechs, cta);

          parent.appendChild(child);
        }
      }
    );
};

export default work;
