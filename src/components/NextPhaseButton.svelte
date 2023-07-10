<script>
    import { endTurn, startBuyPhase } from "../js/model/game";

    export let currentPhase;
</script>

{#if currentPhase === 'action'}
    <button on:click={startBuyPhase}>End actions</button>
{:else if currentPhase === 'buy'}
    <button on:click={endTurn}>End buy</button>
{/if}

<style>
    button {
        position: absolute;
        right: 1em;
        bottom: 15em;
    }
</style>