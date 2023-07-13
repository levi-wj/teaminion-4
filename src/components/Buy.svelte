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
        <div class="shmunny centered">
            <img src="/src/images/coin.png"> 
            <span>{playerData.money ?? 0}</span>
        </div> 
        <div class="buys centered">
            <span>{playerData.buys ?? "error"}</span>
        </div>
    </div>
{/if}


<style>
    .buyGrid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 10px;
    }

    .shmunny {
        color: black;
        
        font-family: serif;
        font-weight: bold;
    }

    .shmunny img{
        width: 125px;
    }

    .shmunny span{
        position: absolute;
    }

    .centered {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4em;
    }

    .buys span{
        color: white;
        border: 2px solid white;
        padding: 10px calc(10px + .4em);
        border-radius: 100%;
    }
</style>
