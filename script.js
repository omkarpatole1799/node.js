console.log("hello");

const data = [
    { currentWaterTax: 2, currentDivaTax: 2 },
    { currentWaterTax: 1, currentDivaTax: 1 },
    { currentWaterTax: 1, currentDivaTax: 1 },
    { currentWaterTax: 1, currentDivaTax: 1 },
    { currentWaterTax: 1, currentDivaTax: 2 },

    { currentWaterTax: 1, currentDivaTax: 1 },
    { currentWaterTax: 1, currentDivaTax: 1 },
    { currentWaterTax: 1, currentDivaTax: 1 },
    { currentWaterTax: 1, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },

    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
    { currentWaterTax: 10, currentDivaTax: 1 },
];
let finalArray = [];
let dataObject = { totalCurrentWaterTax: 0, totalCurrentDivaTax: 0 };
let start = 0;
let count = 0;
let totalPages = Math.ceil(data.length / 5);

for (let i = 0; i < totalPages; i++){
    start = count * 5;
    let array1 = data.slice(start, (start+5));
    for (let i = 0; i < array1.length; i++){
        dataObject.totalCurrentWaterTax += array1[i].currentWaterTax;
        dataObject.totalCurrentDivaTax += array1[i].currentDivaTax;
    }
    finalArray.push(dataObject);
    dataObject = { totalCurrentWaterTax: 0, totalCurrentDivaTax: 0 }
    count++;
}

console.log(finalArray)