/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          bg: '#F8F8F4',
          card: '#FFFFFF',
          green: '#245B3C',
          greenDark: '#1B472E',
          greenLight: '#E8F0EC',
          mineral: '#65866B',
          ochre: '#E9B949',
          ochreLight: '#FCF5E3',
          text: '#252A25',
          textMuted: '#68716B',
          border: '#E2E8F0',
          borderSubtle: '#EDF2F7',
        },
        earth: {
          sand: '#F5EFEB',
          sandstone: '#E8DFD3',
          clay: '#C8A27A',
          coal: '#2D312E',
        },
        status: {
          healthy: '#15803D',
          healthyBg: '#DCFCE7',
          warning: '#D97706',
          warningBg: '#FEF3C7',
          critical: '#DC2626',
          criticalBg: '#FEE2E2',
          idle: '#64748B',
          idleBg: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'gov': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'gov-card': '0 2px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'gov-hover': '0 8px 16px -2px rgba(36, 91, 60, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
