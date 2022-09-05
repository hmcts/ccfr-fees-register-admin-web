function randomString(length = 10) {
  return Math.random().toString(36).substr(2, length);
}

function generatePassword(passwordLength) {
  const numberChars = "0123456789";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  let allChars = numberChars + upperChars + lowerChars;
  let randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

module.exports = {
  getRandomEmailAddress: () => randomString() + "@mailtest.gov.uk",
  getRandomUserPassword: () => generatePassword(12),
};
