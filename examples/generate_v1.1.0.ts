import { Welcomize } from '../src';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.join(__dirname, 'output');
const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

const avatarUrl = 'https://avatars.githubusercontent.com/u/1?v=4';

async function run() {
    console.log('Generating Cyberpunk...');
    const cyberpunk = new Welcomize({
        username: 'Sploov',
        avatarUrl,
        theme: 'cyberpunk',
        subtitle: 'Initiated'
    });
    fs.writeFileSync(path.join(assetsDir, 'cyberpunk.png'), await cyberpunk.render());

    console.log('Generating Nature...');
    const nature = new Welcomize({
        username: 'Sploov',
        avatarUrl,
        theme: 'nature',
        subtitle: 'Found Peace'
    });
    fs.writeFileSync(path.join(assetsDir, 'nature.png'), await nature.render());

    console.log('Generating Gaming...');
    const gaming = new Welcomize({
        username: 'Sploov',
        avatarUrl,
        theme: 'gaming',
        subtitle: 'Press Start'
    });
    fs.writeFileSync(path.join(assetsDir, 'gaming.png'), await gaming.render());

    console.log('Generating Retro...');
    const retro = new Welcomize({
        username: 'Sploov',
        avatarUrl,
        theme: 'retro',
        subtitle: '1984'
    });
    fs.writeFileSync(path.join(assetsDir, 'retro.png'), await retro.render());

    console.log('Generating Bubble...');
    const bubble = new Welcomize({
        username: 'Sploov',
        avatarUrl,
        theme: 'bubble',
        subtitle: 'So Soft!'
    });
    fs.writeFileSync(path.join(assetsDir, 'bubble.png'), await bubble.render());

    console.log('Done! Check assets/ folder.');
}

run().catch(console.error);
