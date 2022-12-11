function getCompleted(part, total) {
  //Euclid Algorithm
  let reduceFraction = (n, d) => {
    let gcd = (a, b) => (b ? gcd(b, a % b) : a);
    gcd = gcd(n, d);
    return `${n / gcd}/${d / gcd}`;
  };

  let [partSeconds, totalSeconds] = [part, total].map(
    (time) =>
      time
        .split(':')
        .reduce((seconds, time, i) => seconds + time * 60 ** (2 - i), 0) //This reduce is clever, was not my idea
  );
  let result = reduceFraction(partSeconds, totalSeconds);
  return result;
}

console.log(getCompleted('03:30:30', '05:50:50'));
