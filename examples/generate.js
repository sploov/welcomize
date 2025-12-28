"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const outDir = path.join(__dirname, 'output');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}
const avatarUrl = 'https://avatars.githubusercontent.com/u/1?v=4'; // GitHub Octocat or generic
async function run() {
    console.log('Generating Classic Card...');
    const card1 = new src_1.WelCard({
        username: 'SploovDev',
        avatarUrl,
        theme: 'classic',
        subtitle: 'Joined the server'
    });
    const buf1 = await card1.render();
    fs.writeFileSync(path.join(outDir, 'classic.png'), buf1);
    console.log('Generating Modern Card...');
    const card2 = new src_1.WelCard({
        username: 'SploovDev',
        avatarUrl,
        theme: 'modern',
        borderColor: '#00FFFF'
    });
    const buf2 = await card2.render();
    fs.writeFileSync(path.join(outDir, 'modern.png'), buf2);
    console.log('Generating Clean Card...');
    const card3 = new src_1.WelCard({
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
