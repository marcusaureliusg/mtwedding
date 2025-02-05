import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const ReactCompilerConfig = {
  target: "18", // '17' | '18' | '19'
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
});
