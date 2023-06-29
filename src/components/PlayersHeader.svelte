<script>
    export let players; // List of players, each with a nickname, id, gold, and actions
    export let playerTurn; // Player ID
</script>

{#if players}
    <div class="header">
    {#each Object.entries(players) as [id, player]}
        {#if id == playerTurn}
            <div class="player player--current">
                <div class="player__gold">Gold: {player.gold ?? 0}</div>
                <div class="player__actions">Actions: {player.actions ?? 0}</div>
                <div class="player__name">{player.nickname}</div>
            </div>
        {:else}
            <div class="player">
                <div class="player__name">{player.nickname}</div>
            </div>
        {/if}
    {/each}
    </div>
{/if}

<style>
    .header {
        padding: .25em;
        padding-top: 0;
        margin: 0;
        display: flex;
        justify-content: space-around;
    }

    .player {
        background-color: rgb(25, 25, 112);
        padding: .5em 3em 1em 3em;
        color: white;
        border-radius: 0 0 12px 12px;
        height: 1em;
    }

    .player.player--current {
        height: 3.25em;
        box-shadow: 0 5px 25px rgb(79, 128, 207);
    }

    .player__actions {
        margin-bottom: .25em;
    }

    .player__name {
        font-size: 1.2em;
        font-weight: 200;
        text-align: center;
    }
</style>