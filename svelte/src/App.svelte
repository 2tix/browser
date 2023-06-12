<script lang="ts">
    import "./App.scss";
    import BubbleComponent from "./lib/components/bubble/BubbleComponent.svelte";
    import InputComponent from "./lib/components/input/InputComponent.svelte";

    let url = "";
</script>

<main>
    <div>
        <div class="topbar">
            <BubbleComponent height="7.5vh" margin="0" inputWidth="98.33vw">
                <InputComponent height="7.5vh" width="98.33vw" data={{value: url, type: "text", label: "Browse the Web", change: v => url = v, submit: () => window.electronAPI.setUrl(url)}}/>
            </BubbleComponent>
        </div>

        <div class="page">
            <BubbleComponent height="88.75vh" margin="0" width="98.33vw">
            </BubbleComponent>
        </div>
    </div>
</main>