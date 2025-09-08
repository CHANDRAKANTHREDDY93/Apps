import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');
  const baseURL = env.VITE_API_BASE_URL;
  console.log("Loaded API base URL:", baseURL);

  if (!baseURL) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }
  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    server: {
      proxy: {
        "/api": {
          target: baseURL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }

});
