<script>
    import { playerID } from "../js/firebase";
    export let winningPlayer;
</script>

<div class="boxOfFlexation">
    {#if playerID === winningPlayer}
        <h1>You Won!</h1>
        <img src="/src/images/gardenBanner.webp" alt="garden banner">
    {:else} 
        <h1>You Lost!</h1>
        <img src="/src/images/witchBanner.webp" alt="witch banner">
    {/if}
</div>

<style>
    h1{
        text-align: center;
        margin: 0;
    }
    img{
        width: 800px;
        
    }

    .boxOfFlexation {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4em;
        flex-direction: column;
    }
</style>