const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_KEY = 'your_api_key_here';

async function translateToUrdu(text) {
    try {
        const response = await axios.post('https://libretranslate.com/translate', {
            q: text,
            source: 'en',
            target: 'ur'
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Error with translation API:', error);
        return text; // Return original text if API fails
    }
}

async function translateJSON(inputJSON, targetLanguage) {
    const translatedJSON = [];
    
    for (const item of inputJSON) {
        const translatedItem = { id: item.id };
        translatedItem.question = (await translateToUrdu(item.question));
        translatedItem.options = [];
        for (const option of item.options) {
            const translatedOption = (await translateToUrdu(option));
            translatedItem.options.push(translatedOption);
        }
        translatedItem.answer = item.answer;
        translatedJSON.push(translatedItem);
    }

    return translatedJSON;
}
// File paths
const inputFilePath = path.join(__dirname, 'mybody-en.json'); // Input JSON file
const outputFilePath = path.join(__dirname, 'mybody_ur.json'); // Output JSON file

// Read the input JSON file
fs.readFile(inputFilePath, 'utf8', async (err, data) => {
    if (err) {
        console.error("Error reading input file:", err);
        return;
    }

    try {
        const inputJSON = JSON.parse(data);
        const translatedJSON = await translateJSON(inputJSON, 'ur');
        
        // Write the translated JSON to the output file
        fs.writeFile(outputFilePath, JSON.stringify(translatedJSON, null, 4), (err) => {
            if (err) {
                console.error("Error writing to output file:", err);
                return;
            }
            console.log("Translation successful! JSON saved to", outputFilePath);
        });
    } catch (error) {
        console.error("Error during translation:", error);
    }
});
 