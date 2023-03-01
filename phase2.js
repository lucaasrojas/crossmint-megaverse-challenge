const axios = require("axios");
const { ASTRAL_TYPES, REQUEST_TYPES, ASTRAL_OBJECTS } = require("./types");
const api = "https://challenge.crossmint.io/api";
const candidateId = "f30901be-433e-4414-8caf-30de7d82b2a8";

let goalMap = [];

async function init() {
    goalArr = await getGoal();
    const requests = generateRequests();
    Promise.all(requests.filter(Boolean))
        .then((res) => console.log("RESPONSE", res))
        .catch((err) => console.log("ERROR", err));
}
function makeRequest(row, column, astral, time) {
    const headers = {
        "Content-Type": "application/json",
    };
    const baseParams = {
        row,
        column,
        candidateId,
    };
    const [property, type] = astral.split("_");
    if (astral === ASTRAL_TYPES.POLYANET) {
        return setTimeout(
            () =>
                axios.post(`${api}/${REQUEST_TYPES.POLYANET}`, baseParams, {
                    headers,
                }),
            time
        );
    } else if (type === ASTRAL_TYPES.COMETH) {
        return setTimeout(
            () =>
                axios.post(
                    `${api}/${REQUEST_TYPES.COMETH}`,
                    {
                        ...baseParams,
                        direction: property,
                    },
                    {
                        headers,
                    }
                ),
            time
        );
    } else if (type === ASTRAL_TYPES.SOLOON) {
        return setTimeout(
            () =>
                axios.post(
                    `${api}/${REQUEST_TYPES.SOLOON}`,
                    {
                        ...baseParams,
                        color: property,
                    },
                    {
                        headers,
                    }
                ),
            time
        );
    }
}
function generateRequests() {
    const astralObjects = Object.values(ASTRAL_OBJECTS);
    const requests = [];
    let counter = 1;
    goalMap.forEach((row, x) => {
        row.forEach((object, y) => {
            if (astralObjects.includes(object)) {
                const time = counter * 1000;
                coordinates.push(makeRequest(x, y, object.toLowerCase(), time));
                counter++;
            }
        });
    });
    return requests;
}

async function getGoal() {
    return await axios
        .get(
            "https://challenge.crossmint.io/api/map/f30901be-433e-4414-8caf-30de7d82b2a8/goal"
        )
        .then((res) => res.data.goal);
}

init();
