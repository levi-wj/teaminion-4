<script>
    import { cardList } from "../js/cards";
    import Card from "./Card.svelte";
    import { playCard } from "../js/model/game";

    export let matchID;
    export let matchData;
    export let hand;
    export let canPlayCards = false;

    function clickCard (card) {
        if (canPlayCards) {
            playCard(matchID, matchData, cardList[card]);
        }
    }
</script>

{#if hand}
    <div class="hand">
        {#each hand as cardIndex}
            <Card {cardIndex} />
        {/each}
    </div>
{/if}

<style>
    img {
        width: 100%;
        min-width: 100px;
        height: 100%;
        cursor: pointer;
        transition: transform .2s ease-in-out;
    }

    img:hover:not(.disabled) {
        transform: scale(1.15);
    }

    img.disabled {
        filter: saturate(40%) brightness(70%);
        cursor: not-allowed;
    }

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