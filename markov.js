/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (chains.has(word)) {
        chains.get(chains.get(word).push(nextWord));
      } else {
        chains.set(word, [nextWord]);
      }
    }
    this.chains = chains;
  }


  // randomly chooses element from array
  static choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */
  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let randomKey = MarkovMachine.choice(keys);
    let text = [];

    while (text.length < numWords && randomKey !== null){
      text.push(randomKey);
      randomKey = MarkovMachine.choice(this.chains.get(randomKey)); 
    }
    return text.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
