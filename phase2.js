const axios = require("axios");
const { ASTRAL_TYPES, REQUEST_TYPES, ASTRAL_OBJECTS } = require("./types");
const generateRequestsArray = require("./utils/generateRequestArray");
const api = "https://challenge.crossmint.io/api";
const candidateId = "f30901be-433e-4414-8caf-30de7d82b2a8";

async function init() {
    const goalMap = await getGoal();
    const requests = generateRequestsArray(goalMap);
    Promise.all(requests.filter(Boolean))
        .then((res) => console.log("RESPONSE", res))
        .catch((err) => console.log("ERROR", err));
}

async function getGoal() {
    return await axios
        .get(`${api}/map/${candidateId}/goal`)
        .then((res) => res.data.goal);
}

init();
