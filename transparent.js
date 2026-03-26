const fs = require('fs');
const PNG = require('pngjs').PNG;

const inputFile = 'assets/images/logo.png';
const outputFile = 'assets/images/logo.png';

fs.createReadStream(inputFile)
    .pipe(new PNG({ filterType: 4 }))
    .on('parsed', function () {
        // Determine background color from top-left pixel
        const bgR = this.data[0];
        const bgG = this.data[1];
        const bgB = this.data[2];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;

                const r = this.data[idx];
                const g = this.data[idx + 1];
                const b = this.data[idx + 2];

                // If the color matches the background color roughly, make it transparent
                // We'll use a distance threshold of 20
                const dist = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2));

                if (dist < 30) {
                    this.data[idx + 3] = 0; // alpha = 0
                }
            }
        }

        this.pack().pipe(fs.createWriteStream(outputFile)).on('finish', () => {
            console.log('Background removed!');
        });
    });
