const fs = require('fs');
const path = require('path');

// Function to parse questions and convert to JSON format
function convertToJSON(inputText) {
    const lines = inputText.split("\n");
    const questionsArray = [];
    
    let questionObj = {};
    
    lines.forEach((line) => {
        line = line.trim();
        if (line.startsWith("Q")) {
            // Start a new question
            questionObj = {};
            const idMatch = line.match(/^Q(\d+):/);
            if (idMatch) {
                questionObj.id = parseInt(idMatch[1], 10);
                questionObj.question = line.split(":")[1].trim();
                questionObj.options = [];
            }
        } else if (line.startsWith("A)")) {
            questionObj.options.push(line.substring(2).trim());
        } else if (line.startsWith("B)")) {
            questionObj.options.push(line.substring(2).trim());
        } else if (line.startsWith("C)")) {
            questionObj.options.push(line.substring(2).trim());
        } else if (line.startsWith("D)")) {
            questionObj.options.push(line.substring(2).trim());
        } else if (line.startsWith("Answer:")) {
            const answerLetter = line.split(":")[1].trim().toLowerCase();
            const answerMap = { a: 1, b: 2, c: 3, d: 4 };
            questionObj.answer = answerMap[answerLetter];
            questionsArray.push(questionObj);
        }
    });

    return JSON.stringify(questionsArray, null, 4);
}

// File paths
const inputFilePath = path.join(__dirname, '../../MCQ.txt'); // Input file
const outputFilePath = path.join(__dirname, 'MCQ.json'); // Output file

// Read from the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading input file:", err);
        return;
    }
    
    // Convert data to JSON
    const jsonOutput = convertToJSON(data);
    
    // Write JSON to the output file
    fs.writeFile(outputFilePath, jsonOutput, (err) => {
        if (err) {
            console.error("Error writing to output file:", err);
            return;
        }
        
        console.log("Conversion successful! JSON saved to", outputFilePath);
    });
});
