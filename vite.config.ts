import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["frontend-jobs-n2.onrender.com"],
    host: "0.0.0.0",
    port: 5173,
  },
});
