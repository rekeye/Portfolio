const axios = require("axios");

const githubReposAPI = () =>
  axios
    .get("https://api.github.com/users/rekeye/repos")
    .then(({ data }) => data);

export default githubReposAPI;
