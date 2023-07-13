<script>
    import Card from "./Card.svelte";
    import { fade, fly } from 'svelte/transition';

    export let cards;
</script>


{#if cards}
    <div class="cardsinplay" transition:fade>
        {#each cards as cardID}
            <div transition:fade>
                <Card {cardID} />
            </div>
        {/each}
    </div>
{/if}

<style>
    .cardsinplay {
        display: flex;
        flex-wrap: wrap;
        gap: .75em;
        justify-content: center;
        padding: 5em 1em;
    }

</style>