<script>
    import { cardList } from "../js/cards";
    import Card from "./Card.svelte";
    import { playCard } from "../js/model/game";

    export let hand;
    export let canPlayCards = false;

    function clickCard (cardID, handIndex) {
        const cardData = cardList[cardID];
        if (canPlayCards && cardData.type === 'action') {
            playCard(cardID, handIndex, cardData);
        }
    }
</script>

{#if hand}
    <div class="hand">
        {#each hand as cardID, handIndex}
            <Card {cardID} disabled={canPlayCards === false} click={() => clickCard(cardID, handIndex)} />
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