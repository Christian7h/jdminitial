// @ts-check
import { defineConfig } from 'astro/config';

import netlify from "@astrojs/netlify";

import db from "@astrojs/db";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output:"server",
  adapter: netlify(),
  integrations: [db(), auth()],
});