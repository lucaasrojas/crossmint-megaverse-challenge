const axios = require("axios");
const { REQUEST_TYPES, ASTRAL_TYPES } = require("./types");
const { api, candidateId } = require("./values");
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
module.export = makeRequest;
