<script>
    import { cardList} from "../js/cards";

    // export let cardName;
    let cardName = cardList.cellar.image;
</script>

<img src={cardName} alt="card">


<style>
    img {
        max-width: 300px;
        max-height: 300px;
        border-radius: .4em;
        border: 10px solid black;
    }
</style>