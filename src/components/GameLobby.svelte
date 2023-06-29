<script>
    import { isGameStartable, startGame } from '../js/model/game.js';
    import { isPlayerLeader } from '../js/model/matches'

    export let matchID;
    export let matchData;
</script>

<h2>Players</h2>
<ul>
    {#each Object.entries(matchData.players) as [id, player]}
        <li>{player.nickname} {#if player.isLeader} (leader){/if}</li>
    {/each}
</ul>

{#if isPlayerLeader(matchData)}
    <h3>You are the match leader</h3>
    {#if isGameStartable(matchData)}
        <button on:click={e => startGame(matchID)}>Start Game</button>
    {:else}
        <p>You need at least 2 players to start the game</p>
    {/if}
{:else}
    <h3>Waiting for the match leader to start the game...</h3>
{/if}