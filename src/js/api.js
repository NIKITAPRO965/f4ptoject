const BASE_URL ="https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "0WWL1P2bMiHay23k871w1SovwR8BsLG9";

async function getEvents(page = 0, keyword = "") {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&size=20&countryCode=US&page=${page}&keyword=${keyword}`
  );

  return await res.json();
}

export { getEvents };