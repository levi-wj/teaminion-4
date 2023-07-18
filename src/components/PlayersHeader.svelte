<script>
    export let players; // List of players, each with a nickname, id, gold, and actions
    export let playerTurn; // Player ID
    export let playerWon = false;
</script>

{#if players}
    <div class="header">
    {#each Object.entries(players) as [id, player]}
        {#if id == playerTurn && playerWon==false}
            <div class="player player--current">
                <div class="player__items">
                    <div><i class="fa fa-bolt"></i> - {player.actions ?? 0}</div>
                    <!-- <div><i class="fa fa-sack-dollar"></i> - {player.gold ?? 0}</div> -->
                </div>
                <div class="player__name">{player.nickname}</div>
            </div>
        {:else}
            <div class="player">
                <div class="player__name">{player.nickname}</div>
                {#if playerWon === true}
                    <span><i class="fa fa-star"></i> - {player.victory}</span>
                {/if}
            </div>
        {/if}
        
    {/each}
    </div>
{/if}

<style>
    .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
    }

    .player {
        background-color: var(--primary-dark);
        box-shadow: 0 5px 25px var(--primary-dark);
        padding: 1em 0;
        text-align: center;
        width: 10em;
        color: white;
        border-radius: 0 0 12px 12px;
        font-size: var(--step--1);
    }

    .player--current {
        background-color: var(--primary);
        padding: 1.4em 0;
        box-shadow: 0 5px 25px var(--primary);
        font-weight: 600;
    }

    .player__items {
        padding-bottom: .4em;
    }
    .player__items div {
        display: inline;
        padding: 0 .4em;
    }

    .player__name {
        font-size: var(--step-1);
    }
</style>