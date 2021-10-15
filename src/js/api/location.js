// this file contains api calls for user's location

// api call using axios (switched to fetched due to problems with cors)
/*
const axios = require("axios");

const locationAPI = (lat, lng) =>
  axios({
    method: "GET",
    url: "https://eu1.locationiq.com/v1/reverse.php",
    headers: {
			'Access-Control-Allow-Origin': '*',
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
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
*/

//api call using fetch
const locationAPI = (lat, lng) => {
  const url = new URL(
    `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json`
  );
  const params = {
    key: process.env.TOM_TOM_API_KEY,
  };
  url.search = new URLSearchParams(params).toString();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = new Request(url, {
    method: "GET",
    mode: "cors",
    headers: headers,
  });

  return fetch(request)
    .then((res) => res.json())
    .then((res) => res.addresses[0].address.countryCode)
    .catch((error) => console.error(error));
};

export default locationAPI;
