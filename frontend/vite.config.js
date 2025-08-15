import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	server: {
		port: 3000,
	},
	build: {
		outDir: path.resolve(__dirname, "../backend/build"), // carpeta de salida
		emptyOutDir: true, // limpia la carpeta antes de build
	},
});
