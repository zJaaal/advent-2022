function distributeGifts(packOfGifts, reindeers) {
  let maxLengthArray =
    packOfGifts.length > reindeers.length ? packOfGifts : reindeers;

  let result = maxLengthArray.reduce(
    (acc, curr, i) => {
      if (packOfGifts[i]) acc[0] += packOfGifts[i].length;
      if (reindeers[i]) acc[1] += reindeers[i].length * 2;
      return acc;
    },
    [0, 0]
  );

  return (result[1] / result[0]) >> 0;
}

console.log(
  distributeGifts(
    ['music'],
    [
      'midudev',
      'pheralb',
      'codingwithdani',
      'carlosble',
      'blasco',
      'facundocapua',
      'madeval',
      'memxd',
    ]
  )
);
