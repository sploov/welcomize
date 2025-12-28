<div align="center">

# 🃏 Welcomize

**Create stunning, customizable welcome images for your Discord communities in milliseconds.**

[![npm version](https://img.shields.io/npm/v/welcomize?style=flat-square&color=5865F2)](https://www.npmjs.com/package/welcomize)
[![Downloads](https://img.shields.io/npm/dt/welcomize?style=flat-square&color=blue)](https://www.npmjs.com/package/welcomize)
[![License](https://img.shields.io/npm/l/welcomize?style=flat-square&color=green)](https://github.com/sploov/welcomize/blob/main/LICENSE)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<br />

<img src="./assets/modern.png" width="800" alt="Welcomize Modern Theme Preview" />

<br />

[**Installation**](#-installation) •
[**Quick Start**](#-quick-start) •
[**Themes**](#-themes) •
[**API Reference**](#-api-reference) •
[**Contributing**](#-contributing)

</div>

---

## ✨ Features

- **🚀 High Performance:** Powered by `@napi-rs/canvas` for blazing fast image generation.
- **🎨 Pre-built Themes:** Comes with `Classic`, `Modern`, and `Clean` themes out of the box.
- **🛠 Fully Customizable:** Control colors, fonts, backgrounds, and layouts.
- **📘 TypeScript:** Written in TypeScript with full type definitions included.
- **📦 Lightweight:** Zero heavy dependencies (uses pre-compiled binaries).

---

## 📦 Installation

Install `welcomize` using your favorite package manager:

```bash
# npm
npm install welcomize

# yarn
yarn add welcomize

# pnpm
pnpm add welcomize
```

---

## 🚀 Quick Start

Generate your first welcome card in just a few lines of code.

```typescript
import { Welcomize } from 'welcomize';
import { AttachmentBuilder } from 'discord.js';

// 1. Create the card
const card = new Welcomize({
    username: 'SploovDev',
    avatarUrl: 'https://github.com/sploov.png',
    theme: 'modern',
    title: 'Welcome!',
    subtitle: 'To the Sploov Community',
    borderColor: '#5865F2'
});

// 2. Render to buffer
const buffer = await card.render();

// 3. Send to Discord
const attachment = new AttachmentBuilder(buffer, { name: 'welcome.png' });
channel.send({ files: [attachment] });
```

---

## 🎨 Themes

Welcomize comes with beautiful built-in themes.

### 🔹 Modern
A sleek, gradient-based design with a glowing avatar.
<img src="./assets/modern.png" width="100%" style="border-radius: 10px; margin-bottom: 20px;" alt="Modern Theme" />

```typescript
new Welcomize({ theme: 'modern', borderColor: '#00FFFF', ... });
```

### 🔹 Clean
Minimalist, bright, and professional.
<img src="./assets/clean.png" width="100%" style="border-radius: 10px; margin-bottom: 20px;" alt="Clean Theme" />

```typescript
new Welcomize({ theme: 'clean', borderColor: '#FF5733', ... });
```

### 🔹 Classic
The timeless solid-color Discord style.
<img src="./assets/classic.png" width="100%" style="border-radius: 10px; margin-bottom: 20px;" alt="Classic Theme" />

```typescript
new Welcomize({ theme: 'classic', backgroundColor: '#23272A', ... });
```

---

## ⚙️ API Reference

### `WelcomizeOptions`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Required** | The username to display. |
| `avatarUrl` | `string` | **Required** | The user's avatar URL (png/jpg). |
| `theme` | `Theme` | `'classic'` | `'classic'`, `'modern'`, or `'clean'`. |
| `title` | `string` | `'Welcome'` | Main heading text. |
| `subtitle` | `string` | `'To the server!'` | Subtitle/message text. |
| `backgroundColor` | `string` | *Theme Default* | Hex color background. |
| `textColor` | `string` | `'#FFFFFF'` | Hex color for text. |
| `borderColor` | `string` | *Theme Default* | Accent/Border color. |
| `fontPath` | `string` | `undefined` | Custom font file path. |

---

## 🤝 Contributing

We love contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

1. Fork the repo.
2. Create your feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

<div align="center">

Made with ❤️ by the **Sploov** Team

[GitHub](https://github.com/sploov) • [Issues](https://github.com/sploov/welcomize/issues)

</div>
