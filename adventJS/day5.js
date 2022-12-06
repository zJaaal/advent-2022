console.clear();
function getMaxGifts(giftsCities, maxGifts, maxCities) {
  const backtrackSums = (giftsCities, maxGifts, maxCities, currentGifts) => {
    for (let gift of giftsCities) {
      if (!currentGifts.includes(gift) && currentGifts.length < maxCities)
        currentGifts.push(gift);
      else continue;

      let currentSum = backtrackSums(
        giftsCities,
        maxGifts,
        maxCities,
        currentGifts
      );
      if (currentGifts.length == maxCities && currentSum <= maxGifts)
        return currentSum;

      if (currentSum <= maxGifts)
        return currentGifts.reduce((acc, curr) => (acc += curr), 0);
      else {
        currentGifts.pop();
      }
    }
    return currentGifts.reduce((acc, curr) => (acc += curr), 0);
  };

  giftsCities = giftsCities
    .map((gift) => backtrackSums(giftsCities, maxGifts, maxCities, [gift]))
    .filter((x) => x <= maxGifts);
  return Math.max(...(giftsCities.length ? giftsCities : [0]));
}

console.log(getMaxGifts([50], 15, 1));
