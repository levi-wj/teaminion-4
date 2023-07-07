<script>
    import { isGameStartable, startGame } from '../js/model/game.js';
    import { isPlayerLeader } from '../js/model/matches'

    
    export let gameData;
</script>

<h2>Players</h2>
{#if gameData.players}
<ul>
    {#each Object.entries(gameData.players) as [id, player]}
        <li>{player.nickname} {#if player.isLeader} (leader){/if}</li>
    {/each}
</ul>

{#if isPlayerLeader(gameData)}
    <h3>You are the match leader</h3>
    {#if isGameStartable()}
        <button on:click={e => startGame()}>Start Game</button>
    {:else}
        <p>You need at least 2 players to start the game</p>
    {/if}
{:else}
    <h3>Waiting for the match leader to start the game...</h3>
{/if}
{/if}