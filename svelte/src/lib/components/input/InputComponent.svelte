<script lang="ts">
    import "./InputComponent.scss";
    import {onMount} from "svelte";

    export let height: string = "100%";
    export let inputWidth: string = "100%";
    export let data: {
        type: "text",
        value: string,
        label: string,
        submit: () => void,
        change: (value: number) => void
    } | {
        type: "number",
        max?: number
        min?: number,
        step: number,
        value: number
    } | {
        type: "toggle",
        value: boolean,
        toggle: (checked: boolean) => void
    } | {
        type: "button",
        text: string,
        loading: boolean,
        click: void
    } | {
        type: "select",
        value: number,
        multiple: false,
        options: string[],
        change: (value: number) => void
    } | {
        type: "select",
        value: number[],
        multiple: true,
        options: string[],
        change: (value: number[]) => void
    };
    let padding: number;
    let id = "";
    let idSelect = "";
    let expanded = false;
    let width = 0;
    let radiusExpanded = false;
    let interval;

    onMount(() => {
        if (data.type === "select") {
            // for (let i = 0; i < 10; i++) {
            //    idSelect += Math.floor(Math.random() * 10);
            // }
            // interval = setInterval(() => {
            //    width = document.getElementById(idSelect).getBoundingClientRect().width;
            // }, 10);
            // setTimeout(() => {
            //    document.getElementById(idSelect).addEventListener("resize", () => {
            //        width = document.getElementById(idSelect).getBoundingClientRect().width;
            //    });
            //    clearInterval(interval)
            // }, 5000);
        } else if (data.type === "number") {
            for (let i = 0; i < 10; i++) {
                id += Math.floor(Math.random() * 10);
            }
            setTimeout(() => {
                padding = (document.getElementById(id).clientHeight - 2 * 6.67) / 4;
            }, 10);
        }
    });
</script>
<div style="height: {height}; width: {inputWidth}; margin: 0!important" class="input-component">
    {#if data.type === "text"}
        <input style="height: 100%" placeholder={data.label} type="text" on:change={event => {
            data.change(event.target.value);
        }} on:keypress={e => {data.change(e.target.value); if(e.code === "Enter") data.submit()}}
               value={data.value}/>
    {:else}
        {#if data.type === "number"}
            <div class="number">
                <input id={id} class="n" on:load={e => {
                    padding = (e.target.clientHeight - 2*6.67)/4;
                    console.log(padding);
                }} on:resize={e => {
                    padding = (e.target.clientHeight - 2*6.67)/4;
                }} type="text" placeholder={data.label} value={data.value} on:keydown={event => {
                if (event.key === "ArrowUp" && (data.max === undefined || parseInt(event.target.value) + data.step <= data.max)) {
                    data.value += data.step;
                    return;
                } else if (event.key === "ArrowDown" && (data.min === undefined || parseInt(event.target.value) - data.step >= data.min)) {
                    data.value -= data.step;
                    return;
                }

               if (event.key === "Backspace" || (event.key === "-" && (data.min === undefined || data.min < 0)) || event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Shift" || event.key === "Delete" || event.key === "Tab" || event.key === "Escape" || event.key === "Enter") {
                    return;
                }

                const char = event.shiftKey ? String.fromCharCode(event.keyCode) : event.key;

                if (/^\d$/.test(char) && (data.max === undefined || parseInt(event.target.value + char) <= data.max) && (data.min === undefined || parseInt(event.target.value + char) >= data.min || data.min >= 0) && (data.min === undefined || char !== "-" || data.min < 0)) {
                    return;
                }

                event.preventDefault();
            }}/>
                <div class="buttons">
                    <div on:click={() => {
                        if (data.max === undefined || data.value + data.step <= data.max) {
                            data.value += data.step;
                        }
                    }} style="padding: {padding}px" class="button"><img alt="up" src="uparrow.svg" width="15px"
                    /></div>
                    <div on:click={() => {
                    if (data.min === undefined || data.value - data.step >= data.min) {
                        data.value -= data.step;
                    }
                }} style="padding: {padding}px" class="button"><img alt="down" src="downarrow.svg" width="15px"
                    /></div>
                </div>
            </div>
        {:else}
            {#if data.type === "toggle"}
                <div class="toggle {data.value ? 'on' : 'off'}" on:click={event => {
                        data.toggle(!data.value);
                    }}>
                    <div class="inside"></div>
                </div>
            {:else}
                {#if data.type === "button"}
                    <button class="btn {data.loading ? 'loading' : ''}" on:click={data.click}>{data.text}</button>
                {:else}
                    {#if data.type === "select"}
                        <div class="select {radiusExpanded ? 'radius-expanded' : ''} {expanded ? 'expanded' : ''} {data.multiple ? 'multi' : ''}">
                            <div class="value {data.multiple ? (data.value.length > 0 ? '' : 'empty') : ''}" on:click={e => {
                                    expanded = !expanded;
                                    if(radiusExpanded === true) {
                                        setTimeout(() => {
                                            radiusExpanded = false;
                                        }, 500);
                                    } else {
                                        radiusExpanded = true;
                                    }
                            }}>
                                {#if data.multiple}
                                    {#if data.value.length === 0}
                                        <span class="single-value">{data.label}</span>

                                    {:else}
                                        <div class="values">
                                            {#each data.value as value}
                                                <div class="multi-value">{data.options[value]}</div>
                                            {/each}
                                        </div>
                                    {/if}
                                    <div class="{data.value.length ? 'plus' : 'arrow'} {expanded ? 'rotate' : ''}">
                                        <img alt="plus" src="{data.value.length ? 'plus' : (radiusExpanded ? 'uparrow' : 'downarrow')}.svg" width="15px" height="15px"/>
                                    </div>
                                {:else}
                                    <span class="single-value">{data.value >= 0 ? data.options[data.value] : data.label}</span>
                                    <div class="arrow">
                                        <img alt="arrow" src="{radiusExpanded ? 'up' : 'down'}arrow.svg" width="15px"/>
                                    </div>
                                {/if}

                            </div>
                            <div class="options">
                                {#if data.options.length === 0}
                                    <div class="option">Nothing to show</div>
                                {:else}
                                    {#each data.options as option, index}
                                        <div class="option {data.multiple ? (data.value.includes(index) ? 'selected' : '') : (data.value === index ? 'selected' : '')}"
                                             on:click={() => {
                                        if (data.multiple) {
                                            if (data.value.includes(index)) {
                                                data.value.splice(data.value.indexOf(index), 1);
                                            } else {
                                                data.value.push(index);
                                            }
                                            data.change(data.value);
                                        } else {
                                            data.change(index);
                                            expanded = false;
                                            setTimeout(() => {
                                                radiusExpanded = false;
                                            }, 500);
                                        }
                                    }}>
                                            <span>{option}</span>
                                            {#if data.multiple}
                                                {#if data.value.includes(index)}
                                                    <div class="tick">
                                                        <img width="15px" src="tick.svg" alt="Tick"/>
                                                    </div>
                                                {/if}
                                            {:else}
                                                {#if data.value === index}
                                                    <div class="tick">
                                                        <img width="15px" src="tick.svg" alt="Tick"/>
                                                    </div>
                                                {/if}
                                            {/if}
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    {/if}
                {/if}
            {/if}
        {/if}
    {/if}
</div>