import { Welcomize } from '../src';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.join(__dirname, 'output');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

const avatarUrl = 'https://avatars.githubusercontent.com/u/1?v=4'; // GitHub Octocat or generic

async function run() {
    console.log('Generating Classic Card...');
    const card1 = new Welcomize({
        username: 'SploovDev',
        avatarUrl,
        theme: 'classic',
        subtitle: 'Joined the server'
    });
    const buf1 = await card1.render();
    fs.writeFileSync(path.join(outDir, 'classic.png'), buf1);

    console.log('Generating Modern Card...');
    const card2 = new Welcomize({
        username: 'SploovDev',
        avatarUrl,
        theme: 'modern',
        borderColor: '#00FFFF'
    });
    const buf2 = await card2.render();
    fs.writeFileSync(path.join(outDir, 'modern.png'), buf2);

    console.log('Generating Clean Card...');
    const card3 = new Welcomize({
        username: 'SploovDev',
        avatarUrl,
        theme: 'clean',
        borderColor: '#FF5733'
    });
    const buf3 = await card3.render();
    fs.writeFileSync(path.join(outDir, 'clean.png'), buf3);

    console.log('Done! Check examples/output/');
}

run().catch(console.error);
