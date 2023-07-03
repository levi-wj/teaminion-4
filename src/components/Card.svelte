<script>
    import { cardList} from "../js/cards";

    export let click = null;
    export let cardIndex;

    let card = cardList[cardIndex];
</script>

<img src={card.image} alt="card" on:click={click}>

<style>
    img {
        max-width: 150px;
        max-height: 200px;
        border-radius: .4em;
        border: 5px solid black;
        /* margin: 10px; */
    }
</style>