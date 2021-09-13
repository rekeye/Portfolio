const axios = require("axios");

const githubReposAPI = () =>
  axios({
    method: "GET",
    url: "https://api.github.com/users/rekeye/repos",
    headers: {
      Accept: "application/vnd.github.mercy-preview+json",
    },
  }).then(({ data }) => data);

export default githubReposAPI;
