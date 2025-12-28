# 🃏 WelCard

> A powerful, lightweight, and customizable Discord welcome card generator powered by @napi-rs/canvas.

![License](https://img.shields.io/npm/l/welcard)
![Version](https://img.shields.io/npm/v/welcard)
![Downloads](https://img.shields.io/npm/dt/welcard)

**WelCard** makes it incredibly easy to generate beautiful welcome images for your Discord bot. It comes with built-in themes and customization options, built with performance in mind.

## ✨ Features

*   **3 Built-in Themes:** Classic, Modern, and Clean.
*   **High Performance:** Built on top of `@napi-rs/canvas` (Rust-based).
*   **Fully Typed:** Written in TypeScript with complete type definitions.
*   **Easy Customization:** Change colors, texts, and backgrounds effortlessly.

## 📦 Installation

```bash
npm install welcard
# or
yarn add welcard
# or
pnpm add welcard
```

## 🚀 Quick Start

Here is a simple example of how to generate a "Classic" welcome card.

```typescript
import { WelCard } from 'welcard';
import { AttachmentBuilder } from 'discord.js'; // Example for Discord.js

// Inside your command or event listener
const card = new WelCard({
    username: 'SploovDev',
    avatarUrl: user.displayAvatarURL({ extension: 'png' }),
    theme: 'classic',
    title: 'Welcome!',
    subtitle: 'Thanks for joining our server.'
});

const buffer = await card.render();
const attachment = new AttachmentBuilder(buffer, { name: 'welcome.png' });

channel.send({ files: [attachment] });
```

## 🎨 Themes & Examples

### Classic
The default look. Solid background, circular avatar.

```typescript
new WelCard({
    username: 'User',
    avatarUrl: '...',
    theme: 'classic'
})
```

### Modern
Gradient background, centered layout, sleek look.

```typescript
new WelCard({
    username: 'User',
    avatarUrl: '...',
    theme: 'modern',
    borderColor: '#00FFFF' // Glow color
})
```

### Clean
Minimalist white/light theme with a rounded square avatar.

```typescript
new WelCard({
    username: 'User',
    avatarUrl: '...',
    theme: 'clean',
    borderColor: '#FF5733' // Accent color
})
```

## ⚙️ API Reference

### `WelCardOptions`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Required** | The username to display. |
| `avatarUrl` | `string` | **Required** | URL of the user's avatar (png/jpg). |
| `theme` | `'classic' \| 'modern' \| 'clean'` | `'classic'` | The design template to use. |
| `title` | `string` | `'Welcome'` | Main title text. |
| `subtitle` | `string` | `'To the server!'` | Secondary text. |
| `backgroundColor` | `string` | (Theme dependent) | Hex color or usage dependent. |
| `textColor` | `string` | `'#FFFFFF'` | Color of the text. |
| `borderColor` | `string` | (Theme dependent) | Border, glow, or accent color. |

## 🛠️ Development

```bash
# Clone the repo
git clone https://github.com/sploov/welcard.git

# Install dependencies
npm install

# Run example generator
npx ts-node examples/generate.ts

# Build
npm run build
```

## 📄 License

MIT © Sploov
