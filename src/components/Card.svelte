<script>
    import { cardList} from "../js/cards";

    export let click = null;
    export let cardID;
    export let disabled = false;

    $: card = cardList[cardID];
</script>

<div>
    <!-- {cardID} -->
    <img class:disabled class:clickable={click !== null} src={card.image} alt="card" on:click={click}>
</div>

<style>
    img {
        max-width: 150px;
        max-height: 200px;
        border-radius: .4em;
        border: 5px solid black;
        transition: transform .15s;
    }

    img.clickable {
        cursor: pointer;
    }

    img.clickable:hover:not(.disabled) {
        transform: scale(1.1);
    }

    img.disabled {
        filter: saturate(60%) brightness(70%);
        cursor: not-allowed;
    }
</style>