<script lang="ts">
    import "./App.scss";
    import BubbleComponent from "./lib/components/bubble/BubbleComponent.svelte";
    import InputComponent from "./lib/components/input/InputComponent.svelte";

    let url = "";
</script>

<main>
    <div class="sidebar">
        <BubbleComponent height="97.5vh" margin="0" width="10vw">
            ahoj
        </BubbleComponent>
    </div>
    <div>
        <div class="topbar">
            <BubbleComponent height="5vh" margin="0" width="87.5vw">
                <InputComponent data={{value: url, type: "text", label: "Browse the Web", change: v => url = v, submit: () => window.electronAPI.setUrl(url)}}/>
            </BubbleComponent>
        </div>

        <div class="page">
            <BubbleComponent height="91.25vh" margin="0" width="87.5vw">
            </BubbleComponent>
        </div>
    </div>
</main>