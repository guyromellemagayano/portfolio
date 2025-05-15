import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/**
 * A shared TailwindCSS configuration for the repository.
 * @type {import("tailwindcss").Config}
 */
export const baseTailwindConfig = {
  content: ['**/*.{ts,tsx}'],
  darkMode: 'class',
  plugins: [typography, forms, aspectRatio, containerQueries],
};
