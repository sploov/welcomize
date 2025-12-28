export type Theme = 'classic' | 'modern' | 'clean' | 'cyberpunk' | 'nature' | 'gaming' | 'retro' | 'bubble';

export interface WelcomizeOptions {
    username: string;
    avatarUrl: string;
    theme?: Theme;
    title?: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    fontPath?: string; // Optional path to load custom font
    backgroundImageUrl?: string; // Optional path to load background image
}
