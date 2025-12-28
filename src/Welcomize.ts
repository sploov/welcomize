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
            const bgColor = this.options.backgroundColor === '#23272A' ? '#FAFAFA' : this.options.backgroundColor!;
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Subtle Noise/Texture
            ctx.fillStyle = 'rgba(0,0,0,0.02)';
            for(let i=0; i<this.width; i+=4) {
                 ctx.fillRect(i, 0, 1, this.height);
            }
        }

        const textColor = this.options.textColor === '#FFFFFF' ? '#333333' : this.options.textColor!;

        // Accent Bar
        ctx.fillStyle = this.options.borderColor!;
        ctx.fillRect(0, 0, 15, this.height);

        // Avatar (Rounded Rect)
        const avatarSize = 200;
        const avatarX = 60;
        const avatarY = (this.height - avatarSize) / 2;
        
        // Shadow for avatar
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 8;

        drawRoundedImage(ctx, avatar, avatarX, avatarY, avatarSize, avatarSize, 30);
        ctx.shadowColor = 'transparent';

        // Text
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';

        // Welcome (Tracking/Letter Spacing simulation by drawing char by char or just using a wide font if avail,
        // but standard canvas doesn't do tracking well. We'll stick to bold sans).
        ctx.font = `900 70px "${fontFamily}"`;
        ctx.fillText('WELCOME', 300, 130);

        ctx.fillStyle = this.options.borderColor!;
        ctx.font = `500 40px "${fontFamily}"`;
        ctx.fillText(this.options.username.toUpperCase(), 300, 190);
        
        ctx.fillStyle = '#888888';
        ctx.font = `300 25px "${fontFamily}"`;
        ctx.fillText(this.options.subtitle!, 300, 230);
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
            // Fresh Morning Gradient
            const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
            gradient.addColorStop(0, '#56ab2f'); // Green
            gradient.addColorStop(1, '#a8e063'); // Light Green
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);

            // Bokeh / Sunspots
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            for(let i=0; i<10; i++) {
                ctx.beginPath();
                ctx.arc(
                    Math.random() * this.width, 
                    Math.random() * this.height, 
                    Math.random() * 50 + 20, 
                    0, Math.PI * 2
                );
                ctx.fill();
            }
            
            // Big organic curves
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.moveTo(0, this.height);
            ctx.bezierCurveTo(this.width / 3, this.height - 100, this.width / 1.5, this.height, this.width, this.height - 50);
            ctx.lineTo(this.width, this.height);
            ctx.fill();
        }

        const borderColor = this.options.borderColor === '#7289DA' ? '#FFFFFF' : this.options.borderColor!;

        // Avatar
        const avatarRadius = 100;
        const avatarX = 150;
        const avatarY = this.height / 2;
        
        // Organic leaf-like border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarRadius + 6, 0, Math.PI * 2);
        ctx.stroke();

        // Dotted outer ring
        ctx.setLineDash([10, 15]);
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarRadius + 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);

        // Text
        ctx.textAlign = 'left';
        ctx.fillStyle = '#FFFFFF';
        
        // Title
        ctx.font = `bold 60px "${fontFamily}"`;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;
        ctx.fillText(this.options.title!, 300, 130);
        ctx.shadowBlur = 0;

        // Username
        ctx.font = `40px "${fontFamily}"`;
        ctx.fillText(this.options.username, 300, 190);

        // Subtitle
        ctx.font = `italic 25px "${fontFamily}"`;
        ctx.fillStyle = '#F1F8E9';
        ctx.fillText(this.options.subtitle!, 300, 230);
    }

    private drawGaming(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            // Dark Tech Background
            ctx.fillStyle = '#0f0c29';
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Hexagon Pattern Overlay
            ctx.strokeStyle = '#302b63';
            ctx.lineWidth = 1;
            const r = 30;
            const w = r * Math.sqrt(3);
            const h = r * 1.5; // distance between rows
            
            for(let y = 0; y < this.height + 50; y += h) {
                 for(let x = 0; x < this.width + 50; x += w) {
                      const xOffset = (Math.floor(y / h) % 2) * (w / 2);
                      ctx.beginPath();
                      // Simple hex approximation or just circles for speed? let's do circles for "dots" tech look
                      // Actually hex is cooler but complicated to draw quickly without helper.
                      // Let's do a Grid with crosshairs
                 }
            }

            // Tech Crosshair Grid
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            for(let x=0; x<this.width; x+=40) {
                 for(let y=0; y<this.height; y+=40) {
                     if (Math.random() > 0.8) ctx.fillRect(x, y, 2, 2);
                 }
            }
            
            // Angled Sidebar
            ctx.fillStyle = '#24243e';
            ctx.beginPath();
            ctx.moveTo(this.width, 0);
            ctx.lineTo(this.width - 350, 0);
            ctx.lineTo(this.width - 200, this.height);
            ctx.lineTo(this.width, this.height);
            ctx.fill();
        }

        const accentColor = this.options.borderColor === '#7289DA' ? '#00b4db' : this.options.borderColor!; // Blue-ish default for Gaming

        // HUD Elements
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        // Top Left Bracket
        ctx.beginPath(); ctx.moveTo(20, 50); ctx.lineTo(20, 20); ctx.lineTo(50, 20); ctx.stroke();
        // Bottom Right Bracket
        ctx.beginPath(); ctx.moveTo(this.width-50, this.height-20); ctx.lineTo(this.width-20, this.height-20); ctx.lineTo(this.width-20, this.height-50); ctx.stroke();

        // Avatar (Diamond Shape Clip)
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
        
        ctx.lineWidth = 6;
        ctx.strokeStyle = accentColor;
        ctx.stroke();
        ctx.fillStyle = accentColor; // Fill behind just in case
        ctx.fill();
        
        ctx.clip();
        ctx.drawImage(avatar, cx - 100, cy - 100, 200, 200);
        ctx.restore();

        // Text
        ctx.textAlign = 'left';
        
        // Title (Gamer font style)
        ctx.font = `italic bold 60px "${fontFamily}"`;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 10;
        ctx.fillText(this.options.title!.toUpperCase(), 300, 130);
        ctx.shadowBlur = 0;

        // Progress Bar
        ctx.fillStyle = '#444';
        ctx.fillRect(300, 145, 300, 6);
        ctx.fillStyle = accentColor;
        ctx.fillRect(300, 145, 200, 6); // 66% loaded
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 5;
        ctx.fillRect(300, 145, 200, 6); // Double draw for glow
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#FFFFFF';
        ctx.font = `40px "${fontFamily}"`;
        ctx.fillText(this.options.username, 300, 200);

        ctx.fillStyle = '#AAAAAA';
        ctx.font = `20px "${fontFamily}"`;
        ctx.fillText(`PLAYER 1 • ${this.options.subtitle}`, 300, 235);
    }

    private drawRetro(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            // Retro Gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
            gradient.addColorStop(0, '#2b1055');
            gradient.addColorStop(0.5, '#7597de');
            gradient.addColorStop(0.5, '#2b1055'); // Horizon line
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);

            // Sun with Glow
            const sunX = this.width / 2;
            const sunY = this.height / 2;
            
            // Glow
            const glow = ctx.createRadialGradient(sunX, sunY, 50, sunX, sunY, 200);
            glow.addColorStop(0, 'rgba(255, 200, 0, 0.4)');
            glow.addColorStop(1, 'rgba(255, 0, 80, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, this.width, this.height);

            // Sun body
            const sunGradient = ctx.createLinearGradient(0, 0, 0, this.height);
            sunGradient.addColorStop(0, '#ffd700');
            sunGradient.addColorStop(1, '#ff0055');
            ctx.fillStyle = sunGradient;
            ctx.beginPath();
            ctx.arc(sunX, this.height, 200, Math.PI, 0); // Bigger sun
            ctx.fill();

            // Sun Stripes
            ctx.fillStyle = '#2b1055'; // Match background/darkness
            for(let y = this.height - 180; y < this.height; y += 15) {
                 const thickness = (y - (this.height - 180)) / 10 + 2;
                 ctx.fillRect(sunX - 200, y, 400, thickness);
            }

            // Grid
            ctx.strokeStyle = '#ff00de';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#ff00de';
            ctx.shadowBlur = 10;
            
            // Perspective Grid (Bottom Half)
            ctx.save();
            ctx.beginPath();
            // Vertical fan
            for(let x = -this.width; x < this.width * 2; x += 100) {
                ctx.moveTo(this.width / 2, this.height / 2); // Horizon
                ctx.lineTo(x, this.height);
            }
            // Horizontal lines getting closer to horizon
            let y = this.height;
            let d = 40; // Start spacing
            while(y > this.height / 2 + 10) { // Stop before hitting exact center to avoid clutter
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(this.width, y);
                ctx.stroke();
                y -= d;
                d *= 0.7; // Tighter perspective
                if (d < 3) break; // Prevent infinite loop
            }
            ctx.restore();
            ctx.shadowBlur = 0;
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
        ctx.font = `italic 900 60px "${fontFamily}"`; // Extra bold italic
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.strokeText(this.options.title!, 250, 130);
        
        const textGradient = ctx.createLinearGradient(0, 80, 0, 130);
        textGradient.addColorStop(0, '#ffff00');
        textGradient.addColorStop(1, '#ff00de');
        ctx.fillStyle = textGradient;
        ctx.fillText(this.options.title!, 250, 130);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = `40px "${fontFamily}"`;
        ctx.shadowColor = '#ff00de';
        ctx.shadowBlur = 5;
        ctx.fillText(this.options.username, 250, 190);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#00ffff';
        ctx.font = `25px "${fontFamily}"`;
        ctx.fillText(this.options.subtitle!.toUpperCase(), 250, 230);
    }

    private drawBubble(ctx: SKRSContext2D, avatar: any, fontFamily: string, background?: any) {
        if (background) {
            ctx.drawImage(background, 0, 0, this.width, this.height);
        } else {
            // Pastel Gradient
            const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
            gradient.addColorStop(0, '#e0c3fc');
            gradient.addColorStop(1, '#8ec5fc');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width, this.height);
            
            // Bubbles (Circles with gradient for 3D effect)
            const drawBubble = (x: number, y: number, r: number) => {
                const bg = ctx.createRadialGradient(x - r/3, y - r/3, r/5, x, y, r);
                bg.addColorStop(0, 'rgba(255,255,255, 0.8)');
                bg.addColorStop(1, 'rgba(255,255,255, 0.1)');
                ctx.fillStyle = bg;
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
            };

            drawBubble(50, 50, 60);
            drawBubble(this.width - 50, this.height - 50, 80);
            drawBubble(this.width / 2, 20, 50);
            drawBubble(200, 250, 30);
            drawBubble(this.width - 150, 80, 40);
        }

        const accentColor = this.options.borderColor === '#7289DA' ? '#FFFFFF' : this.options.borderColor!;

        // Avatar (White border with soft shadow)
        const avatarRadius = 90;
        const avatarX = this.width / 2;
        const avatarY = 110;

        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarRadius + 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        drawCircularImage(ctx, avatar, avatarX, avatarY, avatarRadius);

        // Text
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        
        ctx.font = `bold 50px "${fontFamily}"`;
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 2;
        ctx.fillText(`Hi, ${this.options.username}!`, this.width / 2, 250);
        
        ctx.font = `25px "${fontFamily}"`;
        ctx.fillStyle = '#F0F0F0';
        ctx.fillText(this.options.subtitle!, this.width / 2, 280);
    }
}
