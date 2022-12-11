import { part2Input as input, part2TestInput as testInput } from '../input.js';
console.clear();
console.log('----------------------------------');

/*
Same as part 1 but now it doesn't divide by 3 and is 10000 rounds
 */

let rounds = 10000;
function solution(input) {
  let superModule = 1;
  input.forEach((monkey) => (superModule *= monkey.testNumber));
  for (let i = 0; i++ < rounds; ) {
    input.forEach((monkey, i) => {
      while (monkey.items.length) {
        monkey.inspections += 1;
        let newValue = monkey.operation(monkey.items.shift() % superModule);
        let monkeyIndex = monkey.test(newValue);
        input[monkeyIndex].items.push(newValue);
      }
    });
  }
  let result = input
    .map((x) => x.inspections)
    .sort((x, y) => y - x)
    .slice(0, 2);
  return result[0] * result[1];
}

console.log(solution(input));
// console.log(solution(testInput));
