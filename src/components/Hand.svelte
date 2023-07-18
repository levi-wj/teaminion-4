<script>
    import { cardList } from "../js/cards";
    import Card from "./Card.svelte";
    import { playCard } from "../js/model/game";
    import { fade, fly } from 'svelte/transition';

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
            <div transition:fade>
                <Card {cardID} disabled={canPlayCards === false} click={() => clickCard(cardID, handIndex)} />
            </div>
        {/each}
    </div>
{/if}

<style>
    .hand {
        display: flex;
        flex-wrap: wrap;
        gap: .75em;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin-bottom: 1em;
    }
</style>