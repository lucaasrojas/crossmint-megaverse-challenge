const axios = require("axios");
const limit = 10;
const api = "https://challenge.crossmint.io/api/";
const candidateId = "f30901be-433e-4414-8caf-30de7d82b2a8";
const requests = [];

async function run() {
    let counter = 1;
    for (let i = 2; i < 9; i++) {
        requests.push(
            setTimeout(
                () =>
                    makeRequest({
                        row: i,
                        column: i,
                        candidateId,
                    }),
                counter * 1000
            )
        );
        counter++;

        requests.push(
            setTimeout(
                () =>
                    makeRequest({
                        row: i,
                        column: limit - i,
                        candidateId,
                    }),
                counter * 1500
            )
        );
        counter++;
    }
    Promise.all(requests);
}
function makeRequest(params) {
    return axios.post(api + "polyanets", params, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

run();
