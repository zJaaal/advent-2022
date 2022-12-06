console.clear();

//Backtracking approach (not good at all)
// function getMaxGifts(giftsCities, maxGifts, maxCities) {
//   const backtrackSums = (giftsCities, maxGifts, maxCities, currentGifts) => {
//     for (let gift of giftsCities) {
//       if (!currentGifts.includes(gift) && currentGifts.length < maxCities)
//         currentGifts.push(gift);
//       else continue;

//       let currentSum = backtrackSums(
//         giftsCities,
//         maxGifts,
//         maxCities,
//         currentGifts
//       );
//       if (currentGifts.length == maxCities && currentSum <= maxGifts)
//         return currentSum;

//       if (currentSum <= maxGifts)
//         return currentGifts.reduce((acc, curr) => (acc += curr), 0);
//       else {
//         currentGifts.pop();
//       }
//     }
//     return currentGifts.reduce((acc, curr) => (acc += curr), 0);
//   };

//   giftsCities = giftsCities
//     .map((gift) => backtrackSums(giftsCities, maxGifts, maxCities, [gift]))
//     .filter((x) => x <= maxGifts);
//   return Math.max(...(giftsCities.length ? giftsCities : [0]));
// }

// JS Pure Approach
function getMaxGifts(giftsCities, maxGifts, maxCities) {
  giftsCities = giftsCities
    .sort((x, y) => y - x)
    .reduce((subSets, _, i) => {
      if (!i) subSets.push(giftsCities.slice(0, maxCities));
      else {
        giftsCities.unshift(giftsCities.pop());
        subSets.push(giftsCities.slice(0, maxCities));
        subSets.push(giftsCities.slice(0, maxCities - 1));
      }
      return subSets;
    }, [])
    .reduce(
      (result, subSets, i) => (
        (i = subSets.reduce((acc, curr) => (acc += curr), 0)),
        i <= maxGifts && result.push(i),
        result
      ),
      []
    );
  return Math.max(...(giftsCities.length ? giftsCities : [0]));
}

console.log(getMaxGifts([50, 10, 40, 1000, 500, 200], 199, 4));
