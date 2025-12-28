export type Theme = 'classic' | 'modern' | 'clean';

export interface WelCardOptions {
    username: string;
    avatarUrl: string;
    theme?: Theme;
    title?: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    fontPath?: string; // Optional path to load custom font
}
