/**
   * Function to calculate 5 words with highest frequency
   * @param {String} string
   */
  export default function calculateFrequentWords (string) {
    var words = string.replace(/[.]/g, "").split(/\s/);
    var freqMap = {};
    words.forEach(function (w) {
      if (!freqMap[w]) {
        freqMap[w] = 0;
      }
      freqMap[w] += 1;
    });
    words = Object.keys(freqMap);
    return new Promise((resolve, reject) => {
      let a = words
        .sort(function (a, b) {
          return freqMap[b] - freqMap[a];
        })
        .slice(0, 5);
      resolve(a);
    });
  };