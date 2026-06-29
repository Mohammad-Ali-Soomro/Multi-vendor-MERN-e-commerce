module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      sans: ['DM Sans', 'system-ui', 'sans-serif'],
      editorial: ['Playfair Display', 'Georgia', 'serif'],
      mono: ['DM Mono', 'monospace'],
    },
    extend: {
      colors: {
        cream: '#F7F3E8',
        'cream-dark': '#EDE9D8',
        dark: '#0D1F1A',
        'dark-mid': '#162B24',
        forest: '#1B4332',
        lavender: '#C9B1F0',
        'lavender-dark': '#B09AE0',
        'lavender-light': '#E8DEFF',
        'text-muted': '#6B6B5E',
        'text-light': '#9B9B8E',
        'card-dark': '#1C2F28',
        'orange-badge': '#F97316',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px"
      },
    },
  },
  plugins: [],
};
