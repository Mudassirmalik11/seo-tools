module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        secondary: '#f0f2f5',
        accent: '#ff6b35',
        success: '#06b6d4',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
