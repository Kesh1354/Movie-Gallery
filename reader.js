const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const dataFile = path.join(__dirname, 'data', 'movies.js');

function readMovieData() {
    const folders = fs.readdirSync(imagesDir);
    const movies = [];

    folders.forEach(folder => {
        const folderPath = path.join(imagesDir, folder);

        if (fs.statSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath);

            const jsonFile = files.find(file => file.endsWith('.json'));

            if (jsonFile) {
                const jsonPath = path.join(folderPath, jsonFile);
                try {
                    const data = fs.readFileSync(jsonPath, 'utf8');
                    const movieData = JSON.parse(data);


                    movieData.folder = folder;
                    movies.push(movieData);
                } catch (err) {
                    console.error(`Error parsing ${jsonPath}:`, err);
                }
            }
        }
    });


    const fileContent = `const movies = ${JSON.stringify(movies, null, 4)};\n`;
    fs.writeFileSync(dataFile, fileContent, 'utf8');
    console.log(`Updated data/movies.js with ${movies.length} movies.`);
}


readMovieData();


fs.watch("images", { recursive: true }, function (eventType, filename) {
    if (filename) {
        console.log(`File ${filename} has been ${eventType}`);

        if (filename.endsWith('.json')) {
            readMovieData();
        }
    }
});

