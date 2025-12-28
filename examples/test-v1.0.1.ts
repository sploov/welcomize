import { Welcomize } from '../src';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.join(__dirname, 'output');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

const avatarUrl = 'https://avatars.githubusercontent.com/u/1?v=4';
const fontPath = path.join(__dirname, '../assets/Roboto-Regular.ttf');
const backgroundImageUrl = path.join(__dirname, '../assets/background.jpg');

async function run() {
    console.log('Generating Card with Custom Font...');
    const card1 = new Welcomize({
        username: 'CustomFontUser',
        avatarUrl,
        theme: 'modern',
        fontPath: fontPath,
        subtitle: 'This uses Roboto Font'
    });
    const buf1 = await card1.render();
    fs.writeFileSync(path.join(outDir, 'v1.0.1-font.png'), buf1);

    console.log('Generating Card with Background Image...');
    const card2 = new Welcomize({
        username: 'BackgroundUser',
        avatarUrl,
        theme: 'classic',
        backgroundImageUrl: backgroundImageUrl, // Can be local path or URL
        subtitle: 'Custom Background Image',
        textColor: '#FFFFFF'
    });
    // Note: Local file loading for images usually requires 'fs' reading or file:// protocol if using canvas's loadImage with path strings that aren't URLs.
    // However, @napi-rs/canvas loadImage supports file paths.
    
    const buf2 = await card2.render();
    fs.writeFileSync(path.join(outDir, 'v1.0.1-bg.png'), buf2);

    console.log('Done! Check examples/output/v1.0.1-*.png');
}

run().catch(console.error);
