const makeRequest = require("./makeRequest");

function generateRequestsArray(goalMap) {
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

export default generateRequestsArray;
