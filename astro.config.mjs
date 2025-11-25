import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";
import { remarkAlert } from "remark-github-blockquote-alert";
import mermaid from "astro-mermaid";


const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
    site: "https://obnitram.cloud/",
    markdown: {
        remarkPlugins: [remarkDirective, remarkAlert],
    },
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
        mdx(),
        mermaid({
            autoTheme: true
        }),
    ],
    base: "/",
    vite: {
        define: {
            global: "globalThis",
        }
    }
});
