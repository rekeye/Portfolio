const axios = require("axios");

const locationAPI = (lat, lng) =>
  axios({
    method: "GET",
    url: "https://eu1.locationiq.com/v1/reverse.php",
    data: {
      key: process.env.LOCATIONIQ_ACCESS_TOKEN,
      lat: lat,
      lng: lng,
    },
  })
    .then(
      ({ data }) => data.results[response.results.length - 1].formatted_address
    )
    .catch((error) => console.error(error));

export default locationAPI;
