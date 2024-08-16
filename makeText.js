const fs = require("fs");
const markov = require("./markov");
const process = require("process");


function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}


function makeTextFromFile(path){
    fs.readFile(path, "utf8", function cb(err, data){
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}


// command line argument handling
let path = process.argv[2];
makeTextFromFile(path);


