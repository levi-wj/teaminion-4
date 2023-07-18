<script>
    import Card from "./Card.svelte";
    import { onMount } from "svelte";

    export let windowTitle;
    export let cardsToShow;
    export let finishPickingEvent;
    export let howManyCardsToPick = 0; // If 0, there's no limit on how many cards a user can pick
    export let mandatory = false;

    let cardsClicked = [];
    let dialog;

    const clickCard = (cardID, handIndex) => {
        // Add to the cardsClicked array
        cardsClicked = [
            ...cardsClicked,
            {
                cardID,
                handIndex,
            }
        ];

        // If we've picked enough cards, close the window and call the finishPickingEvent function
        if (cardsClicked.length >= howManyCardsToPick && howManyCardsToPick !== 0) {
            closeWindow();
        }
    }

    const hasCardBeenPicked = (handIndex) => {
        // Is card in our list of cardsClicked?
        return cardsClicked.some(card => card.handIndex === handIndex);
    }

    const closeWindow = () => {
        dialog.close();
        finishPickingEvent(cardsClicked);
    }

    onMount(() => {
        dialog.showModal();
    })
</script>


<dialog id="window" bind:this={dialog}>
    <h2>{windowTitle}</h2>
    <div class="pickFlex">
        {#each cardsToShow as cardID, handIndex}
            <div class="card">
                {#if cardsClicked && hasCardBeenPicked(handIndex)}
                    <Card {cardID} disabled={true} />
                {:else}
                    <Card {cardID} click={() => clickCard(cardID, handIndex)} />
                {/if}
            </div>
        {/each}
    </div>
    <div class="btnRow">
        {#if !mandatory}
            <button on:click={closeWindow}>Done</button>
        {/if}
    </div>
</dialog>


<style>
    dialog {
        position: absolute;
        top: calc(50vh - 30em);
        border-radius: 10px;
        background-color: var(--primary-light);
        border: 3px solid var(--primary);
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.596);
    }

    .pickFlex {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        max-width: 80vw;
        max-height: 60vh;
        overflow: scroll;
        background-color: var(--primary);
        border-radius: 10px;
        padding: .5em;
    }

    .pickFlex .card {
        margin: 1em;
    }

    .btnRow {
        text-align: center;
        margin-top: 1em;
    }

    .btnRow button {
        background-color: var(--primary-dark);
        color: white;
    }
</style>