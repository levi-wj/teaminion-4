<script>
    import { playerID } from "../js/firebase";
    import { startGameListeners, leaveGame } from '../js/model/game.js';
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
            <button class="leave" on:click={leaveGame}><i class="fa-solid fa-arrow-right-from-bracket"></i></button>

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
                <Buy cards={gameData.cardsLeft} playerData={playerData} money={playerData.money ?? 0} />
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

    .leave {
        position: absolute;
        top: 0.1em;
        right: 0.2em;
        min-width: 3em;
        width: 3em;
    }

    
</style>