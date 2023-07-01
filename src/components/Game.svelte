<script>
    import PlayersHeader from "./PlayersHeader.svelte";
    import GameLobby from "./GameLobby.svelte";
    import Card from "./Card.svelte";
    import { addMatchListener, isGameStartable, startGame } from '../js/model/game.js';
    import { getCurrentMatchID, isPlayerLeader } from '../js/model/matches'

    let matchID = '';
    let matchData;

    getCurrentMatchID().then((id) => {
        matchID = id;
        addMatchListener(matchID, (match) => {
            matchData = match;
            console.log('match update', matchData);
            if (match === null) {
                // There's no current match! Go back to the match list page
                window.location.href = '/';
            }
        });
    });
</script>

{#if matchData}
    {#if matchData.started}
        <PlayersHeader players={matchData.players} playerTurn={matchData.playerTurn} />
    {:else}
        <!-- Handle if the game hasn't started yet -->
        <GameLobby {matchID} {matchData} />
    {/if}
{/if}

<style>
    main {
        background-color: var(--secondary-light);
    }
</style>