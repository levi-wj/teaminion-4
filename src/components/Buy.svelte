<script>
    import { cardList } from "../js/cards";
    import Card from "./Card.svelte"

    export let cards;
    export let playerData;
    
    function clickEve(e) {
        console.log('card bought');
    }
</script>


{#if cards}
    {#each cards as card}
        <Card cardID={card} click={clickEve} />
    {/each}
{/if}

<!-- <div class= "actionTop">
    <Card cardName="cellar" click={clickEve} />
    <Card cardName="merchant" click={clickEve} />
    <Card cardName="militia" click={clickEve} />
    <Card cardName="mine" click={clickEve} />
    <Card cardName="workshop" click={clickEve} />    
</div>
<div class= "actionBottom">
    <Card cardName="market" click={clickEve} />
    <Card cardName="moat" click={clickEve} />
    <Card cardName="remodel" click={clickEve} />
    <Card cardName="smithy" click={clickEve} />
    <Card cardName="village" click={clickEve} />
</div>
<div class= "treasureAndVictory">
    treasure
    <Card cardName="copper" click={clickEve} />
    <Card cardName="silver" click={clickEve} />
    <Card cardName="gold" click={clickEve} />
    victory
    <Card cardName="estate" click={clickEve} />
    <Card cardName="duchy" click={clickEve} />
    <Card cardName="province" click={clickEve} />
</div> -->