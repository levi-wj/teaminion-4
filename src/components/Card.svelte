<script>
    import { cardList} from "../js/cards";

    export let cardName;
    let theCard = "/src/images/"+cardName+".jpg";
    // let cardName = cardList.cellar.image;
    
</script>

<img src={theCard} alt="card">


<style>
    img {
        max-width: 150px;
        max-height: 200px;
        border-radius: .4em;
        border: 10px solid black;
        /* margin: 10px; */
    }
</style>