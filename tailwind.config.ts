import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        category: {
          'core': '#3B82F6',
          'framework': '#10B981',
          'state': '#8B5CF6',
          'architecture': '#F97316',
          'perf': '#EF4444',
          'tooling': '#FACC15',
          'leadership': '#92400E',
        }
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        xl2: '1rem'
      }
    },
  },
  plugins: [],
} satisfies Config
