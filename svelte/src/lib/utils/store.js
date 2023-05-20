import {writable} from "svelte/store";

export const cursorStore = writable({
    x: 0,
    y: 0
});