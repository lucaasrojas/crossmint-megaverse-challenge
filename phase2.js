const axios = require("axios");
const generateRequestsArray = require("./utils/generateRequestArray");
const { api, candidateId } = require("./utils/values");

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
