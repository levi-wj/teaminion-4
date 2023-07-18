<script>
    import { isGameStartable, startGame } from '../js/model/game.js';
    import { isPlayerLeader } from '../js/model/matches'

    
    export let gameData;
</script>
<div class="main">
    <div class="header">
        <h1>Waiting for the game to start...</h1>
    </div>
    <h2>Players</h2>
    <ul>
        {#each Object.entries(gameData.players) as [id, player]}
            <li>{player.nickname} {#if player.isLeader} (leader){/if}</li>
        {/each}
    </ul>
    
    {#if isPlayerLeader(gameData)}
        <h3>You are the match leader</h3>
        <!--
            We put gameData in this if statement instead of just isGameStartable() 
            to force svelte to re-run the isGameStartable function when gameData updates
            I hope there's a better way to do this but I sure don't know it
        -->
        {#if gameData && isGameStartable()}
            <button on:click={startGame}>Start Game</button>
        {:else}
            <p>You need at least 2 players to start the game</p>
        {/if}
    {:else}
        <h3>Waiting for the match leader to start the game...</h3>
    {/if}
</div>

<style>
    .header {
        background-color: var(--secondary);
        padding: .6em 1em;
        text-align: center;
    }
    .main {
        text-align: center;
    }
    ul {
        list-style: none;
        padding: 0;
    }
</style>