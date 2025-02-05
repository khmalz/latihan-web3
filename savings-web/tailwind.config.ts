import { content, plugin } from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
   darkMode: "class",
   content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", content()],
   theme: {
      container: {
         center: true,
         padding: {
            DEFAULT: "1rem",
            sm: "2rem",
         },
      },
      extend: {},
   },
   plugins: [plugin()],
};
export default config;
