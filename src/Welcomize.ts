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
            case 'cyberpunk':
                this.drawCyberpunk(ctx, avatar, fontFamily, background);
                break;
            case 'nature':
                this.drawNature(ctx, avatar, fontFamily, background);
                break;
            case 'gaming':
                this.drawGaming(ctx, avatar, fontFamily, background);
                break;
            case 'retro':
                this.drawRetro(ctx, avatar, fontFamily, background);
                break;
            case 'bubble':
                this.drawBubble(ctx, avatar, fontFamily, background);
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
            // Radial Gradient for depth instead of flat color
            const gradient = ctx.createRadialGradient(this.width / 2, this.height / 2, 0, this.width / 2, this.height / 2, this.width);
            gradient.addColorStop(0, this.options.backgroundColor!);
            gradient.addColorStop(1, '#000000'); // darken edges
            ctx.fillStyle = gradient;
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
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.fillText(this.options.title!, 300, 130);
        ctx.shadowBlur = 0;

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
            // Add a slight dark overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fillRect(0, 0, this.width, this.height);
        } else {
            // Complex Gradient Background
            const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
            gradient.addColorStop(0, '#1cb5e0');
            gradient.addColorStop(1, '#000046');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);

            // Abstract Shapes (Soft Overlay)
            ctx.globalCompositeOperation = 'overlay';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(0, 0, 400, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.width, this.height, 300, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }

        // Glassmorphism Card
        const cardWidth = this.width - 100;
        const cardHeight = this.height - 60;
        const cardX = 50;
        const cardY = 30;

        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 10;
        
        // Draw rounded rect manually for glass box
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 20);
        ctx.fill();
        
        // Glass border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Avatar (Centered)
        const avatarRadius = 80;
        const avatarX = this.width / 2;
        const avatarY = 100;

        // Glow
        ctx.shadowColor = this.options.borderColor!;
        ctx.shadowBlur = 25;
        
        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);
        ctx.shadowBlur = 0; // Reset shadow

        // Text
        ctx.fillStyle = this.options.textColor!;
        ctx.textAlign = 'center';

        ctx.font = `bold 50px "${fontFamily}"`;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 10;
        ctx.fillText(`Welcome, ${this.options.username}`, this.width / 2, 230);

        ctx.font = `25px "${fontFamily}"`;
        ctx.fillStyle = '#EEEEEE';
        ctx.fillText(this.options.subtitle!, this.width / 2, 265);
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

    private drawCyberpunk(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        // Background: Dark Blue/Purple
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            ctx.fillStyle = '#05070a'; // Darker background
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Grid lines (Perspective)
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            
            // Vertical lines
            for (let i = 0; i < this.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, this.height);
                ctx.stroke();
            }
            // Horizontal lines
            for (let i = 0; i < this.height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(this.width, i);
                ctx.stroke();
            }

            // Scanlines
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            for (let i = 0; i < this.height; i += 4) {
                ctx.fillRect(0, i, this.width, 2);
            }
        }

        const neonColor = this.options.borderColor === '#7289DA' ? '#FEE715' : this.options.borderColor!; // Default to Neon Yellow
        const secondaryNeon = '#FF0055';

        // Glitchy Avatar Border
        const avatarSize = 180;
        const avatarX = 60;
        const avatarY = (this.height - avatarSize) / 2;

        ctx.shadowColor = neonColor;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = secondaryNeon;
        ctx.lineWidth = 4;
        ctx.strokeRect(avatarX - 4, avatarY - 4, avatarSize, avatarSize);
        
        ctx.strokeStyle = neonColor;
        ctx.strokeRect(avatarX + 4, avatarY + 4, avatarSize, avatarSize);
        ctx.shadowBlur = 0;

        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);

        // Text with Glitch Effect
        ctx.textAlign = 'left';
        const titleX = 300;
        const titleY = 130;

        // Glitch 1
        ctx.fillStyle = secondaryNeon;
        ctx.font = `bold 60px "${fontFamily}"`;
        ctx.globalAlpha = 0.7;
        ctx.fillText(this.options.title!, titleX - 3, titleY);

        // Glitch 2
        ctx.fillStyle = neonColor;
        ctx.fillText(this.options.title!, titleX + 3, titleY);
        ctx.globalAlpha = 1.0;

        // Main Text
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = secondaryNeon;
        ctx.shadowBlur = 5;
        ctx.fillText(this.options.title!, titleX, titleY);
        ctx.shadowBlur = 0;

        // Username
        ctx.font = `40px "${fontFamily}"`;
        ctx.fillStyle = neonColor;
        ctx.fillText(`> ${this.options.username}_`, titleX, 200);

        // Subtitle
        ctx.font = `20px "${fontFamily}"`;
        ctx.fillStyle = '#AAAAAA';
        ctx.fillText(`SYSTEM: ${this.options.subtitle}`, titleX, 240);
    }

    private drawNature(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
         if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            // Soft Green Gradient
            const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
            gradient.addColorStop(0, '#56ab2f');
            gradient.addColorStop(1, '#a8e063');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);

            // Leafy/Organic overlay (Circles)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.arc(this.width - 50, 50, 100, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.width - 150, this.height + 50, 120, 0, Math.PI * 2);
            ctx.fill();
        }

        const borderColor = this.options.borderColor === '#7289DA' ? '#FFFFFF' : this.options.borderColor!;

        // Avatar
        const avatarRadius = 100;
        const avatarX = 150;
        const avatarY = this.height / 2;
        
        // Organic border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarRadius + 8, 0, Math.PI * 2);
        ctx.stroke();

        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);

        // Text
        ctx.textAlign = 'left';
        ctx.fillStyle = '#FFFFFF';
        
        ctx.font = `bold 60px "${fontFamily}"`;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 5;
        ctx.fillText(this.options.title!, 300, 130);
        ctx.shadowBlur = 0;

        ctx.font = `40px "${fontFamily}"`;
        ctx.fillText(this.options.username, 300, 190);

        ctx.font = `italic 25px "${fontFamily}"`;
        ctx.fillStyle = '#F0F0F0';
        ctx.fillText(this.options.subtitle!, 300, 230);
    }

    private drawGaming(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            // Dark Grey/Black
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Angled Shapes
            ctx.fillStyle = '#2a2a2a';
            ctx.beginPath();
            ctx.moveTo(this.width, 0);
            ctx.lineTo(this.width - 300, 0);
            ctx.lineTo(this.width, 300);
            ctx.fill();
        }

        const accentColor = this.options.borderColor === '#7289DA' ? '#ff0044' : this.options.borderColor!;

        // Avatar (Hexagon-ish - actually just square with thick borders for now or clipped)
        // Let's do a diamond shape clip for "gaming" feel
        const avatarSize = 180;
        const cx = 150;
        const cy = this.height / 2;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 100);
        ctx.lineTo(cx + 100, cy);
        ctx.lineTo(cx, cy + 100);
        ctx.lineTo(cx - 100, cy);
        ctx.closePath();
        ctx.lineWidth = 8;
        ctx.strokeStyle = accentColor;
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(avatar, cx - 100, cy - 100, 200, 200);
        ctx.restore();

        // Text
        ctx.textAlign = 'left';
        ctx.fillStyle = '#FFFFFF';
        
        ctx.font = `bold italic 60px "${fontFamily}"`;
        ctx.fillText(this.options.title!.toUpperCase(), 300, 130);

        // Underline
        ctx.fillStyle = accentColor;
        ctx.fillRect(300, 140, 200, 5);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = `40px "${fontFamily}"`;
        ctx.fillText(this.options.username, 300, 200);

        ctx.fillStyle = '#888888';
        ctx.font = `20px "${fontFamily}"`;
        ctx.fillText(`Lvl 1 • ${this.options.subtitle}`, 300, 235);
    }

    private drawRetro(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            // Synthwave Gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
            gradient.addColorStop(0, '#2b1055');
            gradient.addColorStop(1, '#7597de');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);

            // Sun
            const sunGradient = ctx.createLinearGradient(0, 0, 0, this.height);
            sunGradient.addColorStop(0, '#ffd700');
            sunGradient.addColorStop(1, '#ff0055');
            ctx.fillStyle = sunGradient;
            ctx.beginPath();
            ctx.arc(this.width / 2, this.height, 150, Math.PI, 0);
            ctx.fill();

            // Grid
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)';
            ctx.lineWidth = 2;
            // Horizontal lines (perspective)
            for(let y = this.height / 2; y < this.height; y += 20) {
                 ctx.beginPath();
                 ctx.moveTo(0, y);
                 ctx.lineTo(this.width, y);
                 ctx.stroke();
            }
            // Vertical lines (perspective fan)
            for(let x = -this.width; x < this.width * 2; x += 100) {
                ctx.beginPath();
                ctx.moveTo(this.width / 2, this.height / 2);
                ctx.lineTo(x, this.height);
                ctx.stroke();
            }
        }
        
        // Avatar
        const avatarRadius = 90;
        const avatarX = 120;
        const avatarY = this.height / 2;
        
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20;
        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);
        ctx.shadowBlur = 0;

        // Text
        ctx.textAlign = 'left';
        
        // Title (Outlined 80s style)
        ctx.font = `bold 60px "${fontFamily}"`;
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.strokeText(this.options.title!, 250, 130);
        ctx.fillStyle = '#ff00de';
        ctx.fillText(this.options.title!, 250, 130);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = `40px "${fontFamily}"`;
        ctx.fillText(this.options.username, 250, 190);

        ctx.fillStyle = '#00ffff';
        ctx.font = `25px "${fontFamily}"`;
        ctx.fillText(this.options.subtitle!, 250, 230);
    }

    private drawBubble(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            // Pastel Blue
            ctx.fillStyle = '#E0F7FA';
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Bubbles (Circles)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath(); ctx.arc(50, 50, 80, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(this.width - 50, this.height - 50, 100, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(this.width / 2, 0, 60, 0, Math.PI*2); ctx.fill();
            
            ctx.fillStyle = '#B2EBF2';
             ctx.beginPath(); ctx.arc(200, 250, 40, 0, Math.PI*2); ctx.fill();
        }

        const accentColor = this.options.borderColor === '#7289DA' ? '#4DD0E1' : this.options.borderColor!;

        // Avatar (White border)
        const avatarRadius = 100;
        const avatarX = this.width / 2;
        const avatarY = 120;

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarRadius + 10, 0, Math.PI * 2);
        ctx.fill();

        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);

        // Text
        ctx.textAlign = 'center';
        ctx.fillStyle = '#006064'; // Dark Teal
        
        ctx.font = `bold 50px "${fontFamily}"`;
        ctx.fillText(`Hi, ${this.options.username}!`, this.width / 2, 260);
    }
}
