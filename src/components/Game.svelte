<script>
    import { playerID } from "../js/firebase";
    import { startGameListeners } from '../js/model/game.js';
    import { getCurrentMatchID } from '../js/model/matches'
    import { matchData } from "../js/stores";

    import PlayersHeader from "./PlayersHeader.svelte";
    import GameLobby from "./GameLobby.svelte";
    import Buy from "./Buy.svelte";
    import Hand from "./Hand.svelte";
    import CardsInPlay from "./CardsInPlay.svelte";
    import NextPhaseButton from "./NextPhaseButton.svelte";

    let buyWindow;
    let gameData;
    // Playerdata is a reactive variable that gets the client's player data from the gameData
    $: playerData = gameData ? gameData.players[playerID] : {};
    $: isMyTurn = gameData ? gameData.playerTurn === playerID: false;

    function gameDataUpdate (value) {
        gameData = value;
        if (gameData !== null){
            if (Object.keys(gameData).length === 0) {
                // There's no current match! Go back to the match list page
                window.location.href = '/';
            }
        }
    }

    getCurrentMatchID().then((id) => {
        // Tell the database to update the stores when changes happen
        startGameListeners(id);
        // Listen for changes in the store
        matchData.subscribe(gameDataUpdate);
    });
</script>

{#if gameData}
    {#if gameData.started}
        <div class="game">
            <PlayersHeader players={gameData.players} playerTurn={gameData.playerTurn} />

            {#if gameData.phase === 'action'}
                <CardsInPlay cards={gameData.cardsInPlay} />
            {/if}

            {#if isMyTurn}
                <NextPhaseButton currentPhase={gameData.phase} />
            {/if}

            <Hand hand={playerData.hand} canPlayCards={isMyTurn && playerData.actions > 0}/>
        </div>
    {:else}
        <!-- Handle if the game hasn't started yet -->
        <GameLobby {gameData} />
    {/if}

    {#if isMyTurn && gameData.phase === 'buy'}
        <dialog id="buyWindow" bind:this={buyWindow} open>
            <div>
                <Buy cards={gameData.cardsLeft} playerData={playerData} />
            </div>
        </dialog>
    {/if}
{/if}


<style>
    .game {
        position: relative;
        width: 100vw;
        height: 100vh;
    }

    dialog {
        position: absolute;
        top: 0;
        background-color: var(--primary-light);
        border-radius: .6em;
        border: none;
        /* border: 5px solid var(--primary); */
        color: var(--primary);
    }

    dialog div {
        background-color: var(--primary);
        border-radius: .6em;
        border: none;
        padding: 1em;
    }
</style>