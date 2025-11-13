import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false
  },
  server: {
    allowedHosts: [ "06ab2c4da281.ngrok-free.app"]
  }
});
