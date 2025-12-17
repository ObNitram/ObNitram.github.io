import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";
import { remarkAlert } from "remark-github-blockquote-alert";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import { remarkReadingTime } from "./src/plugins/remark-reading-time";
import mermaid from "astro-mermaid";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";


const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
    site: "https://obnitram.cloud/",
    base: "/",
    markdown: {
        remarkPlugins: [remarkDirective, remarkAlert, remarkReadingTime, remarkMath],
        rehypePlugins: [rehypeAccessibleEmojis, rehypeKatex],
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
    vite: {
        define: {
            global: "globalThis",
        }
    }
});
