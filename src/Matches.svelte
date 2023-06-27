<script>
    import { addMatchListener, createMatch, joinMatch, getPlayerCount } from "./js/model/matches";
    import { cardList } from "./js/cards";

    let matches = [];
    addMatchListener(data => matches = data);
</script>

<main>
    <h1>Games</h1>
    <button on:click={createMatch}>Create match</button>
    {#if matches.length === 0}
        <p>No open matches</p>
    {:else}
        {#each Object.entries(matches) as [id, match]}
            <div class="game">
                <p>Players: {getPlayerCount(match)}</p>
                <p>Cards:</p>
                <ul>
                    {#each Object.entries(match.cardsLeft) as [card]}
                        {#if cardList[card].type === 'action'}
                            <li>{card}</li>
                        {/if}
                    {/each}
                </ul>
                <button on:click={() => joinMatch(id)}>Join</button>
            </div>
        {/each}
    {/if}
</main>

<style>
    .game {
        width: 300px;
        height: 150px;
        overflow-y: auto;
        padding: .5em;
        margin-top: 1em;
        background-color: green;
        border: 2px solid green;
        color: white;
        position: relative;
    }
    .game button {
        position: absolute;
        bottom: .5em;
        right: 1em;
    }
</style>