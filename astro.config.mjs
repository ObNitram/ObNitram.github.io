import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import icon from "astro-icon";


const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
    site: "https://obnitram.cloud/",
    integrations: [
        tailwind(),
        sitemap(),
        robotsTxt({
            policy: [
                {
                    userAgent: '*',
                    allow: '/',
                }
            ],
        }),
        icon(),
    ],
    base: "/",
    vite: {
        define: {
            global: "globalThis",
        }
    }
});
