import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind CSS configuration
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({

  plugins:
  [tailwindcss(),
    [react()],
  
  ],
})
