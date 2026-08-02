/**
 * Minimal Tailwind config added for future use.
 * This file does not change runtime styles by itself but provides
 * a canonical config if the project adopts Tailwind later.
 */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          300: 'var(--color-primary-300)',
          500: 'var(--color-primary-500)',
          700: 'var(--color-primary-700)'
        }
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)'
      }
    }
  },
  plugins: []
}
