import githubReposAPI from "../api/githubRepos";
import "regenerator-runtime/runtime";

export default (async () => {
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

          const usedTechsTitle = document.createElement("h4");
          usedTechsTitle.innerHTML = "Użyte technologie: ";

          const usedTechsList = document.createElement("ul");
          topics.forEach((topic) => {
            const topicElement = document.createElement("li");
            topicElement.innerHTML = topic.replace(/-/g, " ");
            usedTechsList.appendChild(topicElement);
          });

          usedTechs.append(usedTechsTitle, usedTechsList);

          const cta = document.createElement("div");
          cta.classList.add("cta");

          const gitLink = document.createElement("a");
          gitLink.setAttribute("href", html_url);
          gitLink.setAttribute("target", "_blank");
          gitLink.setAttribute("rel", "noopener noreferrer");

          const gitButton = document.createElement("button");
          gitButton.classList.add("cta__link");
          gitButton.innerHTML = "Repozytorium na Github";
          gitLink.appendChild(gitButton);

          const webLink = document.createElement("a");
          webLink.setAttribute("href", homepage);
          webLink.setAttribute("target", "_blank");
          webLink.setAttribute("rel", "noopener noreferrer");

          const webButton = document.createElement("button");
          webButton.classList.add("cta__link");
          webButton.innerHTML = "Odwiedź stronę";
          webLink.appendChild(webButton);

          cta.append(gitLink, webLink);
          child.append(title, desc, usedTechs, cta);

          parent.appendChild(child);
        }
      }
    );
})();
