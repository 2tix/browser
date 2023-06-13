import {svelte} from '@sveltejs/vite-plugin-svelte';
// @ts-ignore
import sass from 'sass';
import sveltePreprocess from 'svelte-preprocess';
import {build, defineConfig} from 'vite';


export default defineConfig({
    plugins: [
        svelte({
            preprocess: sveltePreprocess({
                scss: {
                    implementation: sass,
                },
            }),
        }),
    ],
    base: './',
    build: {
        outDir: '../electron/build',
    },
});
