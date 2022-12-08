// Hacky solution
// function checkPart(part) {
//   if (new Set([...part.split('')]).size == part.length) return false;
//   return [0, 2, part.length].includes(
//     part.split('').reduce((acc, curr, i, array) => {
//       if (curr !== array[array.length - i - 1]) acc.push(curr);
//       return acc;
//     }, []).length
//   );
// }

// Trying to fix it
function checkPart(part) {
  let partArray = part.split('');
  return [0, 1].includes(
    partArray.splice(0, part.length / 2).reduce((acc, curr, i) => {
      if (partArray.includes(curr) == i) acc.push(curr);
      return acc;
    }, []).length
  );
}
console.log(checkPart('ymolomoloy')); // > true (should be false)
