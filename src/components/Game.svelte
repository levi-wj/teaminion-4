<script>
    import PlayersHeader from "./PlayersHeader.svelte";
    import GameLobby from "./GameLobby.svelte";
    import Card from "./Card.svelte";
    import { playerID } from "../js/firebase";
    import { startMatchListener, isGameStartable, startGame } from '../js/model/game.js';
    import { getCurrentMatchID, isPlayerLeader } from '../js/model/matches'
    import Hand from "./Hand.svelte";
    import { matchData } from "../js/stores";

    import Buy from "./Buy.svelte";

    

    let playerData; 
    let gameData;


    getCurrentMatchID().then((id) => {
        startMatchListener(id);
        matchData.subscribe((value) => {
            gameData = value;
            if (gameData !== null){
                if (Object.keys(gameData).length === 0) {
                    // There's no current match! Go back to the match list page
                    window.location.href = '/';
                } else {
                    // @ts-ignore
                    playerData = gameData.players[playerID];
                }
            }
            console.log(gameData)
        })
    });
</script>
{#if gameData}
    {#if gameData.started}
        <PlayersHeader players={gameData.players} playerTurn={gameData.playerTurn} />
        <Hand hand={playerData.hand} canPlayCards={gameData.playerTurn === playerID && playerData.actions > 0}/>
    {:else}
        <!-- Handle if the game hasn't started yet -->
        <GameLobby {gameData} />
    {/if}
{/if}


<style>
   
</style>