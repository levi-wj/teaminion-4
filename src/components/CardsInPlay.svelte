<script>
    import Card from "./Card.svelte";

    export let cards;
</script>


{#if cards}
    <div class="hand">
        {#each cards as cardID}
            <Card {cardID} />
        {/each}
    </div>
{/if}

<style>
    .hand {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: .75em;
    }
</style>