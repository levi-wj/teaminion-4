<script>
    import PlayersHeader from "./PlayersHeader.svelte";
    import GameLobby from "./GameLobby.svelte";
    import Card from "./Card.svelte";
    import { playerID } from "../js/firebase";
    import { addMatchListener, isGameStartable, startGame } from '../js/model/game.js';
    import { getCurrentMatchID, isPlayerLeader } from '../js/model/matches'
    import Hand from "./Hand.svelte";

    import Buy from "./Buy.svelte";



    let matchID = '';
    let matchData;
    let playerData = {};

    getCurrentMatchID().then((id) => {
        matchID = id;
        addMatchListener(matchID, (match) => {
            matchData = match;
            console.log('match update', matchData);
            if (match === null) {
                // There's no current match! Go back to the match list page
                window.location.href = '/';
            } else {
                playerData = match.players[playerID];
            }
        });
    });
</script>

{#if matchData}
    {#if matchData.started}
        <PlayersHeader players={matchData.players} playerTurn={matchData.playerTurn} />
        <Hand {matchID} {matchData} hand={playerData.hand} canPlayCards={matchData.playerTurn === playerID && playerData.actions > 0}/>
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