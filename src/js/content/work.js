import githubReposAPI from "../api/githubRepos";
import "regenerator-runtime/runtime";

export default (async () => {
  const parent = document.getElementById("work");

  const data = await githubReposAPI();
  data.sort((a, b) => b.id - a.id);
  console.log(data);
  data.forEach(
    ({ name, description, html_url, homepage, stargazers_count }) => {
      if (stargazers_count > 0) {
        const child = document.createElement("article");
        child.classList.add("work__article");

        const title = document.createElement("h3");
        title.innerHTML = name.replace("-", " ");

        const desc = document.createElement("p");
        desc.innerHTML = description;

        const cta = document.createElement("div");
        cta.classList.add("cta");

        const gitLink = document.createElement("a");
        gitLink.setAttribute("href", html_url);
        gitLink.setAttribute("target", "_blank");
        const gitButton = document.createElement("button");
        gitButton.classList.add("cta__link");
        gitButton.innerHTML = "Repozytorium na Github";
        gitLink.appendChild(gitButton);

        const webLink = document.createElement("a");
        webLink.setAttribute("href", homepage);
        webLink.setAttribute("target", "_blank");
        const webButton = document.createElement("button");
        webButton.classList.add("cta__link");
        webButton.innerHTML = "Odwiedź opublikowaną stronę";
        webLink.appendChild(webButton);

        cta.append(gitLink, webLink);
        child.append(title, desc, cta);

        parent.appendChild(child);
      }
    }
  );
})();
