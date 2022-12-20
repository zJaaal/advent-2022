function howManyReindeers(reindeerTypes, gifts) {
  return gifts.map((gift) => {
    let currentMax = gift.weight;
    let weights = reindeerTypes
      .filter((x) => x.weightCapacity < currentMax)
      .sort((x, y) => y.weightCapacity - x.weightCapacity);

    let currentCapacity = weights.reduce(
      (acc, curr) => (acc += curr.weightCapacity),
      0
    );

    let reindeerQuantity = weights.map(({ type, weightCapacity }) => {
      let quantity = (currentMax / currentCapacity) >> 0;
      currentCapacity -= weightCapacity;
      currentMax -= quantity * weightCapacity;
      return { type, num: quantity };
    });

    return { country: gift.country, reindeers: reindeerQuantity };
  });
}
const reindeerTypes = [
  { type: 'Diesel', weightCapacity: 1 },
  { type: 'Gasoline', weightCapacity: 5 },
];

const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'Germany', weight: 7 },
];

console.log(JSON.stringify(howManyReindeers(reindeerTypes, gifts)));
// [{
//   country: 'Spain',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }, {
//   country: 'France',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 1 },
//     { type: 'Diesel', num: 2 }
//   ]
//  }, {
//   country: 'Italy',
//   reindeers: [
//     { type: 'Electric', num: 3 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }]

// [
//   {
//     country: 'Spain',
//     reideers: [
//       { type: 'Electric', num: 1 },
//       { type: 'Gasoline', num: 3 },
//       { type: 'Diesel', num: 5 },
//     ],
//   },
//   {
//     country: 'France',
//     reideers: [
//       { type: 'Electric', num: 1 },
//       { type: 'Gasoline', num: 1 },
//       { type: 'Diesel', num: 2 },
//     ],
//   },
//   {
//     country: 'Italy',
//     reideers: [
//       { type: 'Electric', num: 3 },
//       { type: 'Gasoline', num: 3 },
//       { type: 'Diesel', num: 5 },
//     ],
//   },
// ];
