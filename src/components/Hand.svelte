<script>
    import { cardList } from "../js/cards";
    import Card from "./Card.svelte";
    import { playCard } from "../js/model/game";

    
    
    export let hand;
    export let canPlayCards = false;

    function clickCard (card) {
        if (canPlayCards) {
            playCard(cardList[card]);
        }
    }
</script>

{#if hand}
    <div class="hand">
        {#each hand as cardIndex}
            <Card {cardIndex} click={() => clickCard(cardIndex)} />
        {/each}
    </div>
{/if}

<style>
    .hand {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: .75em;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        margin-bottom: 1em;
        max-width: 600px;
        min-width: 500px;
    }
</style>