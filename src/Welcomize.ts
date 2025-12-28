import { createCanvas, loadImage, GlobalFonts, SKRSContext2D } from '@napi-rs/canvas';
import { WelcomizeOptions } from './types';
import { drawCircularImage, drawRoundedImage } from './utils';

export class Welcomize {
    private options: WelcomizeOptions;
    private width: number = 800;
    private height: number = 300;

    constructor(options: WelcomizeOptions) {
        this.options = {
            theme: 'classic',
            title: 'Welcome',
            subtitle: 'To the server!',
            backgroundColor: '#23272A',
            textColor: '#FFFFFF',
            borderColor: '#7289DA',
            ...options
        };
    }

    public async render(): Promise<Buffer> {
        const canvas = createCanvas(this.width, this.height);
        const ctx = canvas.getContext('2d');

        // Register Custom Font
        let fontFamily = 'sans-serif';
        if (this.options.fontPath) {
            const success = GlobalFonts.registerFromPath(this.options.fontPath, 'CustomFont');
            if (success) {
                fontFamily = 'CustomFont';
            }
        }

        // Load Images
        let avatar;
        let background;
        try {
            const promises = [loadImage(this.options.avatarUrl)];
            if (this.options.backgroundImageUrl) {
                promises.push(loadImage(this.options.backgroundImageUrl));
            }
            const results = await Promise.all(promises);
            avatar = results[0];
            if (this.options.backgroundImageUrl) {
                background = results[1];
            }
        } catch (e) {
            throw new Error('Failed to load images: ' + e);
        }

        switch (this.options.theme) {
            case 'modern':
                this.drawModern(ctx, avatar, fontFamily, background);
                break;
            case 'clean':
                this.drawClean(ctx, avatar, fontFamily, background);
                break;
            case 'classic':
            default:
                this.drawClassic(ctx, avatar, fontFamily, background);
                break;
        }

        return canvas.toBuffer('image/png');
    }

    private drawClassic(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        // Background
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            ctx.fillStyle = this.options.backgroundColor!;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        // Border
        ctx.strokeStyle = this.options.borderColor!;
        ctx.lineWidth = 15;
        ctx.strokeRect(0, 0, this.width, this.height);

        // Avatar
        const avatarRadius = 100;
        const avatarX = 150;
        const avatarY = this.height / 2;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarRadius + 5, 0, Math.PI * 2);
        ctx.fillStyle = this.options.borderColor!;
        ctx.fill();
        ctx.restore();

        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);

        // Text
        ctx.fillStyle = this.options.textColor!;
        ctx.textAlign = 'left';
        
        // Welcome
        ctx.font = `bold 60px "${fontFamily}"`;
        ctx.fillText(this.options.title!, 300, 130);

        // Username
        ctx.font = `40px "${fontFamily}"`;
        ctx.fillText(this.options.username, 300, 190);

        // Subtitle
        ctx.fillStyle = '#CCCCCC';
        ctx.font = `25px "${fontFamily}"`;
        ctx.fillText(this.options.subtitle!, 300, 230);
    }

    private drawModern(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        // Background
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
            // Add a slight dark overlay to ensure text readability
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fillRect(0, 0, this.width, this.height);
        } else {
            // Gradient Background
            const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
            gradient.addColorStop(0, '#0F2027');
            gradient.addColorStop(0.5, '#203A43');
            gradient.addColorStop(1, '#2C5364');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);

            // Decoration
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(this.width, 0, 300, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, this.height, 200, 0, Math.PI * 2);
            ctx.fill();
        }

        // Avatar (Centered)
        const avatarRadius = 90;
        const avatarX = this.width / 2;
        const avatarY = 110;

        // Glow
        ctx.shadowColor = this.options.borderColor!;
        ctx.shadowBlur = 25;
        
        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);
        ctx.shadowBlur = 0; // Reset shadow

        // Text
        ctx.fillStyle = this.options.textColor!;
        ctx.textAlign = 'center';

        ctx.font = `bold 50px "${fontFamily}"`;
        ctx.fillText(`Welcome, ${this.options.username}`, this.width / 2, 240);

        ctx.font = `25px "${fontFamily}"`;
        ctx.fillStyle = '#AAAAAA';
        ctx.fillText(this.options.subtitle!, this.width / 2, 275);
    }

    private drawClean(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        // Background
        if (background) {
             ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            const bgColor = this.options.backgroundColor === '#23272A' ? '#FFFFFF' : this.options.backgroundColor!;
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        const textColor = this.options.textColor === '#FFFFFF' ? '#333333' : this.options.textColor!;

        // Accent Bar
        ctx.fillStyle = this.options.borderColor!;
        ctx.fillRect(0, 0, 20, this.height);

        // Avatar (Rounded Rect)
        const avatarSize = 200;
        const avatarX = 60;
        const avatarY = (this.height - avatarSize) / 2;
        
        // Shadow for avatar
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;

        drawRoundedImage(ctx, avatar, avatarX, avatarY, avatarSize, avatarSize, 20);
        ctx.shadowColor = 'transparent';

        // Text
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';

        ctx.font = `bold 70px "${fontFamily}"`;
        ctx.fillText('WELCOME', 300, 140);

        ctx.fillStyle = this.options.borderColor!;
        ctx.font = `40px "${fontFamily}"`;
        ctx.fillText(this.options.username, 300, 200);
    }
}
