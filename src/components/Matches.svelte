<script>
    import { addMatchListener, createMatch, joinMatch } from "../js/model/matches";
    import { cardList } from "../js/cards";

    // initialize array for matches and current match data
    let matches = [];
    let nicknameBox;
    addMatchListener(data => matches = data);

    // set player nickname to local storage
    function setNickname(e) {
        localStorage.setItem('nickname', e.target.value);
    }

    function checkNicknameAndJoin(matchID) {
        if (nicknameBox.reportValidity() === true) {
            joinMatch(matchID);
        }
    }

    function checkNicknameAndCreate() {
        if (nicknameBox.reportValidity() === true) {
            createMatch();
        }
    }

    // open and close view cards dialog
    function showCards() {
        let cardSet = document.getElementById("cardSet");
        // @ts-ignore
        cardSet.showModal();
    }
    function hideCards() {
        let cardSet = document.getElementById("cardSet");
        // @ts-ignore
        cardSet.close();
    }
</script>

<main>
    <div class="header">
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" name="nickname" value={localStorage.getItem('nickname')} bind:this={nicknameBox} on:change={setNickname} required>
    </div>

    <div class="matches">
        <h1>Games</h1>
        <!-- create match button -->
        <button on:click={checkNicknameAndCreate}>Create match</button>
        {#if matches}
            {#if matches.length === 0}
                <p>No open matches</p>
            {:else}
                {#each Object.entries(matches) as [id, match]}
                    <div class="game">
                        <!-- display player names, view cards button, and join button -->
                        <div>
                            Players:
                            {#each Object.entries(match.players) as [id, player]}
                                <span>{player.nickname} </span>
                            {/each}
                        </div>
                        <div>
                            <button on:click={() => checkNicknameAndJoin(id)}>Join</button>
                            <button on:click={showCards}><i class="fa-solid fa-window-restore"></i></button>
                        </div>

                        <!-- dialog pop up to show action cards -->
                        <dialog id="cardSet">
                            <i class="fa fa-x" on:click={hideCards}></i>
                            <div>
                                {#each match.cardsLeft as card, id}
                                    {#if cardList[id].type === 'action'}
                                        <img src={cardList[id].image} alt="{card}">
                                    {/if}
                                {/each}
                            </div>
                        </dialog>
                    </div>
                {/each}
            {/if}
        {/if}
    </div>
</main>

<style>
    .header {
        background-color: var(--secondary);
        padding: .6em 1em;
        text-align: right;
    }
    input {
        background-color: transparent;
        height: 45px;
        width: 200px;
        text-align: center;
        border: none;
        border-bottom: 2px solid var(--black);
        padding: .4em;
    }
    input:focus-visible {
        outline: none;
        cursor: var(--black);
        border-bottom: 2px solid var(--primary);
    }

    .matches {
        text-align: center;
    }

    .game {
        width: 80%;
        margin: 1em auto;
        background-color: var(--primary-light);
        border-radius: .6em;
        padding: .6em;
    }
    .game button {
        background-color: var(--primary-dark);
        color: white;
        font-weight: 600;
        margin: 1em 1em 0 1em;
    }
    .game div button:first-of-type {
        background-color: var(--primary);
    }
    .game div button:last-of-type {
        width: 1em;
    }

    
    #cardSet {
        text-align: right;
    }
    #cardSet div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(6em, 1fr));
        gap: 1em;
        background-color: var(--primary);
        border-radius: .6em;
        border: none;
        padding: 1em;
    }
    #cardSet div img {
        width: 100%;
        border-radius: .4em;
        border: 10px solid black;
    }
    #cardSet i {
        margin-bottom: .8em;
    }

    dialog {
        background-color: var(--primary-light);
        border-radius: .6em;
        border: none;
        /* border: 5px solid var(--primary); */
        color: var(--primary);
    }
</style>