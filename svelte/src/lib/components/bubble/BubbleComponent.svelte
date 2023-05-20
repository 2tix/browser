<script>
    import "./BubbleComponent.scss";

    export let width = "100%";
    export let height = "100%";

    export let margin = "0px";

    export let direction = "left";

</script>
<div style="width: {width.includes('%') || width.includes('px') || width.includes('rem') || width.includes('content') || width.includes('em') || width.includes('vw') || width.includes('mm') ? width : width + 'px'}; height: {height.includes('%') || height.includes('px') || height.includes('rem') || height.includes('em') || height.includes('content') || height.includes('vh') || height.includes('mm') ? height : height + 'px'}; margin: {margin.includes('%') || margin.includes('px') || margin.includes('rem') || margin.includes('em') || margin.includes('vh') || margin.includes('vw') || margin.includes('mm') ? margin : margin + 'px'}"
     class="bubble-component {direction}">
    <slot></slot>
</div>