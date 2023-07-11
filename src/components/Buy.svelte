<script>
    import { cardList } from "../js/cards";
    import Card from "./Card.svelte"
    import { buyCard } from "../js/model/game.js";

    export let cards;
    export let playerData;
</script>


{#if cards}
    <div class="buyGrid">
        {#each cards as cardCount, cardIndex}
            <div>
                {#if cardCount > 0}
                    <Card cardID={cardIndex} click={() => buyCard(cardIndex)} />
                {/if}
            </div>
        {/each}
    </div>
{/if}

<!-- <div class= "actionTop">
    <Card cardName="cellar" click={clickEve} />
    <Card cardName="merchant" click={clickEve} />
    <Card cardName="militia" click={clickEve} />
    <Card cardName="mine" click={clickEve} />
    <Card cardName="workshop" click={clickEve} />    
</div>
<div class= "actionBottom">
    <Card cardIndex="market" click={clickEve} />
    <Card cardIndex="moat" click={clickEve} />
    <Card cardIndex="remodel" click={clickEve} />
    <Card cardIndex="smithy" click={clickEve} />
    <Card cardIndex="village" click={clickEve} />
</div>
    treasure
    <Card cardName="copper" click={clickEve} />
    <Card cardName="silver" click={clickEve} />
    <Card cardName="gold" click={clickEve} />
    victory
    <Card cardName="estate" click={clickEve} />
    <Card cardName="duchy" click={clickEve} />
    <Card cardName="province" click={clickEve} />
</div> -->

<style>
    .buyGrid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 10px;
    }
</style>
