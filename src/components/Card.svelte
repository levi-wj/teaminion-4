<script>
    import { cardList} from "../js/cards";
    export let click;
    export let cardName;
    let theCard = "/src/images/"+cardName+".jpg";
    // let cardName = cardList.cellar.image;
    
</script>

<img src={theCard} alt="card" on:click={click}>


<style>
    img {
        max-width: 150px;
        max-height: 200px;
        border-radius: .4em;
        border: 10px solid black;
        /* margin: 10px; */
    }
</style>