import { SKRSContext2D, Image } from '@napi-rs/canvas';

export function drawRoundedImage(
    ctx: SKRSContext2D,
    image: Image,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5);
    ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image, x, y, width, height);
    ctx.restore();
}

export function drawCircularImage(
    ctx: SKRSContext2D,
    image: Image,
    x: number,
    y: number,
    radius: number
) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    // drawImage takes top-left corner, so subtract radius
    ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
}
